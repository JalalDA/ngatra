"use server";

import { getSession } from "@/lib/auth";
import {
  addDomainToVercel,
  removeDomainFromVercelProject,
  validDomainRegex,
} from "@/lib/domains";
import { getBlurDataURL } from "@/lib/utils";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import { revalidateTag } from "next/cache";
import { withPostAuth, withSiteAuth } from "./auth";
import db from "./db";
import {
  TPost,
  TSite,
  posts,
  sites,
  users,
  category,
  product,
  siteVendor,
  sitePaymentMethod,
  transaction,
  ETransactionStatus,
  TTransaction,
  siteLanguage,
} from "./schema";
import { tr } from "date-fns/locale";
import bcrypt from 'bcrypt'
import { signIn } from "next-auth/react";

export type AuthFormInputs = {
  email: string;
  password: string;
  username?: string;
}

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string
export const getTransactionFromDB = async (transactionId: string) => {
  const transactionData = await db.query.transaction.findFirst({
    where: eq(transaction.id, transactionId),
  });
  return transactionData;
};
export const createSite = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;

  try {
    const [response] = await db
      .insert(sites)
      .values({
        name,
        description,
        subdomain,
        userId: session.user.id,
      })
      .returning();

    revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createCategory = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const category_name = formData.get("category_name") as string;
  try {
    const [response] = await db
      .insert(category)
      .values({
        category_name,
      })
      .returning();

    // revalidateTag(
    //   `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    // );
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateCategory = async (
  formData: FormData,
  _id: string,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    const [response] = await db
      .update(category)
      .set({
        [key]: value,
      })
      .where(eq(category.id, _id))
      .returning();

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createProduct = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const productName = formData.get("product_name") as string;
  const categoryId = formData.get("category") as string;
  const code = nanoid();
  const vendor = formData.get("vendor") as string;
  const price = parseFloat(formData.get("price") as string);
  const status = formData.get("status") ? true : false;
  try {
    const [response] = await db
      .insert(product)
      .values({
        code,
        categoryId,
        productName,
        price,
        vendor,
        status,
      })
      .returning();

    // revalidateTag(
    //   `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    // );
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateProduct = async (formData: FormData, _id: string) => {
  console.log("_id is =" + _id);
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const setData = {
    productName: formData.get("productName") as string,
    price: parseFloat(formData.get("price") as string),
    categoryId: formData.get("category") as string,
    vendor: formData.get("vendor") as string,
    status: formData.get("status") ? true : false,
  };

  try {
    const [response] = await db
      .update(product)
      .set(setData)
      .where(eq(product.id, _id))
      .returning();

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateSitePaymentMethod = async (data: any, _id: string) => {
  try {
    await db
      .delete(sitePaymentMethod)
      .where(eq(sitePaymentMethod.siteId, _id))
      .returning();
    data = data.sitePaymentMethod.map((item: string) => {
      return { siteId: _id, masterPaymentMethodId: item };
    });
    let [response] = await db
      .insert(sitePaymentMethod)
      .values(data)
      .returning();
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateSiteVendor = async (data: any, _id: string) => {
  try {
    await db.delete(siteVendor).where(eq(siteVendor.siteId, _id)).returning();
    data = data.siteVendor.map((item: string) => {
      return { siteId: _id, masterVendorId: item };
    });
    let [response] = await db.insert(siteVendor).values(data).returning();
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createTransactions = async (orderData: TTransaction) => {
  const siteId = orderData.siteId as string;
  const productId = orderData.productId as string;
  const name = orderData?.name as string;
  const phone = orderData?.phone as string;
  const params = orderData?.params as string;
  const qty = parseInt(orderData?.qty as unknown as string) as number;
  const status =
    (orderData?.status as
      | "waiting_payment"
      | "processed"
      | "completed"
      | "failed") ?? "waiting_payment";
  try {
    const [response] = await db
      .insert(transaction)
      .values({
        siteId,
        productId,
        name,
        phone,
        params,
        status,
        qty,
      })
      .returning();

    // revalidateTag(
    //   `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    // );
    // return transaction id
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateTransactionStatus = async (
  _id: string,
  status: ETransactionStatus,
) => {
  try {
    const [response] = await db
      .update(transaction)
      .set({
        status: status,
      })
      .where(eq(transaction.id, _id))
      .returning();

    return { ...response, error: null };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateSite = withSiteAuth(
  async (formData: FormData, site: TSite, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;

      if (key === "customDomain") {
        if (value.includes("vercel.pub")) {
          return {
            error: "Cannot use vercel.pub subdomain as your custom domain",
          };

          // if the custom domain is valid, we need to add it to Vercel
        } else if (validDomainRegex.test(value)) {
          response = await db
            .update(sites)
            .set({
              customDomain: value,
            })
            .where(eq(sites.id, site.id))
            .returning()
            .then((res) => res[0]);

          await Promise.all([
            addDomainToVercel(value),
            // Optional: add www subdomain as well and redirect to apex domain
            // addDomainToVercel(`www.${value}`),
          ]);

          // empty value means the user wants to remove the custom domain
        } else if (value === "") {
          response = await db
            .update(sites)
            .set({
              customDomain: null,
            })
            .where(eq(sites.id, site.id))
            .returning()
            .then((res) => res[0]);
        }

        // if the site had a different customDomain before, we need to remove it from Vercel
        if (site.customDomain && site.customDomain !== value) {
          response = await removeDomainFromVercelProject(site.customDomain);

          /* Optional: remove domain from Vercel team 

          // first, we need to check if the apex domain is being used by other sites
          const apexDomain = getApexDomain(`https://${site.customDomain}`);
          const domainCount = await db.select({ count: count() }).from(sites).where(or(eq(sites.customDomain, apexDomain), ilike(sites.customDomain, `%.${apexDomain}`))).then((res) => res[0].count);


          // if the apex domain is being used by other sites
          // we should only remove it from our Vercel project
          if (domainCount >= 1) {
            await removeDomainFromVercelProject(site.customDomain);
          } else {
            // this is the only site using this apex domain
            // so we can remove it entirely from our Vercel team
            await removeDomainFromVercelTeam(
              site.customDomain
            );
          }
          
          */
        }
      } else if (key === "image" || key === "logo") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = key === "image" ? await getBlurDataURL(url) : null;

        response = await db
          .update(sites)
          .set({
            [key]: url,
            ...(blurhash && { imageBlurhash: blurhash }),
          })
          .where(eq(sites.id, site.id))
          .returning()
          .then((res) => res[0]);
      } else {
        response = await db
          .update(sites)
          .set({
            [key]: value,
          })
          .where(eq(sites.id, site.id))
          .returning()
          .then((res) => res[0]);
      }

      console.log(
        "Updated site data! Revalidating tags: ",
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        `${site.customDomain}-metadata`,
      );
      revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      site.customDomain && revalidateTag(`${site.customDomain}-metadata`);

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const deleteSite = withSiteAuth(async (_: FormData, site: TSite) => {
  try {
    const [response] = await db
      .delete(sites)
      .where(eq(sites.id, site.id))
      .returning();

    revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    response.customDomain && revalidateTag(`${site.customDomain}-metadata`);
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getSiteFromPostId = async (postId: string) => {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
    columns: {
      siteId: true,
    },
  });

  return post?.siteId;
};

export const createPost = withSiteAuth(async (_: FormData, site: TSite) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const [response] = await db
    .insert(posts)
    .values({
      siteId: site.id,
      userId: session.user.id,
    })
    .returning();

  revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
  );
  site.customDomain && revalidateTag(`${site.customDomain}-posts`);

  return response;
});

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: TPost) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, data.id),
    with: {
      site: true,
    },
  });

  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post not found",
    };
  }

  try {
    const [response] = await db
      .update(posts)
      .set({
        title: data.title,
        description: data.description,
        content: data.content,
      })
      .where(eq(posts.id, data.id))
      .returning();

    revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.site?.customDomain &&
      (revalidateTag(`${post.site?.customDomain}-posts`),
        revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePostMetadata = withPostAuth(
  async (
    formData: FormData,
    post: TPost & {
      site: TSite;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);
        response = await db
          .update(posts)
          .set({
            image: url,
            imageBlurhash: blurhash,
          })
          .where(eq(posts.id, post.id))
          .returning()
          .then((res) => res[0]);
      } else {
        response = await db
          .update(posts)
          .set({
            [key]: key === "published" ? value === "true" : value,
          })
          .where(eq(posts.id, post.id))
          .returning()
          .then((res) => res[0]);
      }

      revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
      );
      revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      post.site?.customDomain &&
        (revalidateTag(`${post.site?.customDomain}-posts`),
          revalidateTag(`${post.site?.customDomain}-${post.slug}`));

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const deletePost = withPostAuth(async (_: FormData, post: TPost) => {
  try {
    const [response] = await db
      .delete(posts)
      .where(eq(posts.id, post.id))
      .returning({
        siteId: posts.siteId,
      });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    const [response] = await db
      .update(users)
      .set({
        [key]: value,
      })
      .where(eq(users.id, session.user.id))
      .returning();

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createSiteLanguage = async (siteId:string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const [response] = await db
    .insert(siteLanguage)
    .values({
      siteId,
      tagLine: 'Beli Layanan Sosmed Dan Buat Website Sosmed GRATIS DISINI',
      beraneka: 'Beraneka ragam',
      jumlahLayanan: 'Lebih dari 100 layanan dalam katalog',
      berjalan: 'Semuanya berjalan otomatis',
      realTime: 'Semuanya dilakukan secara realtime',
      dukungan: 'Dukungan pelanggan terbaik',
      agen: 'Agen kami akan selalu membantu anda',
    })
    .returning();
    return response;
}


export const registerCredentials = async (data: AuthFormInputs) => {
  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, data.email),
    })

    if (user) {
      return {
        status: false,
        message: "User has been registered",
      };
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(data.password, salt)

    await db
      .insert(users)
      .values({
        email: data.email,
        username: data?.username,
        password: hashedPassword, // Pastikan variabel password di-hash
        name: data?.username,
        updatedAt: new Date(),
      });
    return {
      status: true,
      message: "Register success"
    }
  } catch (error) {
    console.log({ error });
    return {
      status: false,
      message: "Register failed"
    }
  }
}


export const signInCredentials = async (data: AuthFormInputs) => {
  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, data.email),
    })
    console.log({ user });

    if (!user) {
      return {
        status: false,
        message: "user not found"
      }
    }

    const result = await signIn("credentials", {
      email: data?.email,
      password: data?.password
    })
    console.log({ result });
    return {
      status: true,
      message: "Register success"
    }
  } catch (error) {
    console.log({ error });
    return {
      status: false,
      message: "Register failed"
    }
  }
}