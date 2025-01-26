import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  varchar,
  uniqueIndex,
  char,
  pgEnum,
} from "drizzle-orm/pg-core";
export const userRole = pgEnum("user_role", ["admin", "user"]);
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  // if you are using Github OAuth, you can get rid of the username attribute (that is for Twitter OAuth)
  username: text("username"),
  role: userRole("role").notNull().default("user"),
  type: text("type").default("email"),
  password: varchar("password", { length: 255 }).default(""),
  // email: text("email").notNull().unique(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const sessions = pgTable(
  "sessions",
  {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      userIdIdx: index().on(table.userId),
    };
  },
);

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      compositePk: primaryKey({ columns: [table.identifier, table.token] }),
    };
  },
);

export const examples = pgTable("examples", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  domainCount: integer("domainCount"),
  url: text("url"),
  image: text("image"),
  imageBlurhash: text("imageBlurhash"),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    refreshTokenExpiresIn: integer("refresh_token_expires_in"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    oauth_token_secret: text("oauth_token_secret"),
    oauth_token: text("oauth_token"),
  },
  (table) => {
    return {
      userIdIdx: index().on(table.userId),
      compositePk: primaryKey({
        columns: [table.provider, table.providerAccountId],
      }),
    };
  },
);

export const sites = pgTable(
  "sites",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name"),
    description: text("description"),
    logo: text("logo").default(
      "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/JRajRyC-PhBHEinQkupt02jqfKacBVHLWJq7Iy.png",
    ),
    font: text("font").default("font-cal").notNull(),
    image: text("image").default(
      "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png",
    ),
    imageBlurhash: text("imageBlurhash").default(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC",
    ),
    subdomain: text("subdomain").unique(),
    customDomain: text("customDomain").unique(),
    whatsapp: text("whatsapp"),
    currency: text("currency").default("IDR"),
    message404: text("message404").default(
      "Blimey! You''ve found a page that doesn''t exist.",
    ),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$onUpdate(() => new Date()),
    userId: text("userId").references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      userIdIdx: index().on(table.userId),
    };
  },
);

export const posts = pgTable(
  "posts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title"),
    description: text("description"),
    content: text("content"),
    slug: text("slug")
      .notNull()
      .$defaultFn(() => createId()),
    image: text("image").default(
      "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png",
    ),
    imageBlurhash: text("imageBlurhash").default(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC",
    ),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$onUpdate(() => new Date()),
    published: boolean("published").default(false).notNull(),
    siteId: text("siteId").references(() => sites.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    userId: text("userId").references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      siteIdIdx: index().on(table.siteId),
      userIdIdx: index().on(table.userId),
      slugSiteIdKey: uniqueIndex().on(table.slug, table.siteId),
    };
  },
);

export const category = pgTable("category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  category_name: text("category_name"),
  iconUrl: text("iconUrl").default(
    "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png",
  ),
});

export const product = pgTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  code: text("code"),
  categoryId: text("categoryId").references(() => category.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  productName: text("productName"),
  price: real("price"),
  vendor: text("vendor"),
  status: boolean("status"),
});
export const masterVendor = pgTable("masterVendor", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  vendorName: text("vendorName"),
});

export const masterPaymentMethod = pgTable("masterPaymentMethod", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
});

export const siteVendor = pgTable("siteVendor", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  masterVendorId: text("masterVendorId").references(() => masterVendor.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  siteId: text("siteId").references(() => sites.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  })
});

export const sitePaymentMethod = pgTable("sitePaymentMethod", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  masterPaymentMethodId: text("masterPaymentMethodId").references(() => masterPaymentMethod.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  siteId: text("siteId").references(() => sites.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  })
});

export const siteLanguage = pgTable("siteLanguage", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  siteId: text("siteId").references(() => sites.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  tagLine: text("tagLine").default("BELI LAYANAN SOSMED DAN BUAT WEBSITE SOSMED GRATIS DISINI"),
  beraneka: text("beraneka").default("Beraneka ragam"),
  jumlahLayanan: text("jumlahLayanan").default("Lebih dari 100 layanan dalam katalog"),
  berjalan: text("berjalan").default("Semuanya berjalan otomatis"),
  realTime: text("realTime").default("Semuanya dilakukan secara realtime"),
  dukungan: text("dukungan").default("Dukungan pelanggan terbaik"),
  agen: text("agen").default("Agen kami akan selalu membantu anda")
})

export const transactionEnum = pgEnum("transaction_status", [
  "waiting_payment",
  "processed",
  "completed",
  "failed",
]);

export const transaction = pgTable("transaction", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  siteId: text("siteId").references(() => sites.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  productId: text("productId").references(() => product.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  name: text("name"),
  phone: text("phone"),
  qty: real("qty"),
  totalAmount: real("totalAmount"),
  paymentMethod: text("paymentMethod"),
  params: text("params"),
  status: transactionEnum("status").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  site: one(sites, { references: [sites.id], fields: [posts.siteId] }),
  user: one(users, { references: [users.id], fields: [posts.userId] }),
}));

export const sitesRelations = relations(sites, ({ one, many }) => ({
  posts: many(posts),
  transaction: many(transaction),
  user: one(users, { references: [users.id], fields: [sites.userId] }),
  siteLanguage: many(siteLanguage)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { references: [users.id], fields: [sessions.userId] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { references: [users.id], fields: [accounts.userId] }),
}));

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  sites: many(sites),
  posts: many(posts),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  product: many(product),
}));

export const productRelations = relations(product, ({ one, many }) => ({
  category: one(category, {
    references: [category.id],
    fields: [product.categoryId],
  }),
  transaction: many(transaction),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
  product: one(product, {
    references: [product.id],
    fields: [transaction.productId],
  }),
}));

export type TSite = typeof sites.$inferSelect;
export type TPost = typeof posts.$inferSelect;
export type TExample = typeof examples.$inferSelect;
export type TLanguage = typeof siteLanguage.$inferSelect
export type TCategory = typeof category.$inferSelect;
export type TProduct = typeof product.$inferSelect;
export type TTransaction = typeof transaction.$inferSelect;
export type TUser = typeof users.$inferSelect;
export type TSession = typeof sessions.$inferSelect;
export type TAccount = typeof accounts.$inferSelect;
export type TVerificationToken = typeof verificationTokens.$inferSelect;

export type TSiteRelations = typeof sitesRelations;
export type TPostRelations = typeof postsRelations;
export type TCategoryRelations = typeof categoryRelations;
export type TProductRelations = typeof productRelations;
export type TTransactionRelations = typeof transactionRelations;
export type TUserRelations = typeof userRelations;
export type TSessionRelations = typeof sessionsRelations;
export type TAccountRelations = typeof accountsRelations;

export type ETransactionStatus = typeof transactionEnum.enumValues[number]; 
