import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import db from "@/lib/db";

export default async function SiteSettingsDomains({
  params,
}: {
  params: { id: string };
}) {
  const data = await db.query.sites.findFirst({
    where: (sites, { eq }) => eq(sites.id, decodeURIComponent(params.id)),
  });

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white sm:p-8 lg:p-12">
      <h1 className="text-2xl font-bold sm:text-3xl">Site Domain Settings</h1>
      <p className="mt-2 text-gray-400">
        Configure the domains associated with your site. Use a subdomain or set up a custom domain for your site.
      </p>

      <div className="mt-6 flex flex-col space-y-8">
        {/* Subdomain Form */}
        <Form
          title="Subdomain"
          description="The subdomain for your site."
          helpText="Please use 32 characters maximum."
          inputAttrs={{
            name: "subdomain",
            type: "text",
            defaultValue: data?.subdomain!,
            placeholder: "subdomain",
            maxLength: 32,
          }}
          handleSubmit={updateSite}
        />

        {/* Custom Domain Form */}
        <Form
          title="Custom Domain"
          description="The custom domain for your site."
          helpText="Please enter a valid domain."
          inputAttrs={{
            name: "customDomain",
            type: "text",
            defaultValue: data?.customDomain!,
            placeholder: "yourdomain.com",
            maxLength: 64,
            pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
          }}
          handleSubmit={updateSite}
        />
      </div>
    </div>
  );
}
