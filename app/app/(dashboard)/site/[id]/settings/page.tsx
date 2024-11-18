import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import db from "@/lib/db";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await db.query.sites.findFirst({
    where: (sites, { eq }) => eq(sites.id, decodeURIComponent(params.id)),
  });

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white sm:p-8 lg:p-12">
      <h1 className="text-2xl font-bold sm:text-3xl">General Settings</h1>
      <p className="mt-2 text-gray-400">
        Configure the general details of your site, such as its name and description. These settings are critical for SEO and user experience.
      </p>

      <div className="mt-6 flex flex-col space-y-8">
        {/* Site Name Form */}
        <Form
          title="Name"
          description="The name of your site. This will be used as the meta title on Google as well."
          helpText="Please use 32 characters maximum."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: data?.name!,
            placeholder: "My Awesome Site",
            maxLength: 32,
          }}
          handleSubmit={updateSite}
        />

        {/* Site Description Form */}
        <Form
          title="Description"
          description="The description of your site. This will be used as the meta description on Google as well."
          helpText="Include SEO-optimized keywords that you want to rank for."
          inputAttrs={{
            name: "description",
            type: "text",
            defaultValue: data?.description!,
            placeholder: "A blog about really interesting things.",
          }}
          handleSubmit={updateSite}
        />

        {/* Delete Site Form */}
        <DeleteSiteForm siteName={data?.name!} />
      </div>
    </div>
  );
}
