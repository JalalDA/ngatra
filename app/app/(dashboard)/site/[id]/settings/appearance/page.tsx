import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import db from "@/lib/db";

export default async function SiteSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
  const data = await db.query.sites.findFirst({
    where: (sites, { eq }) => eq(sites.id, decodeURIComponent(params.id)),
  });

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white sm:p-8 lg:p-12">
      <h1 className="text-2xl font-bold sm:text-3xl">Site Appearance Settings</h1>
      <p className="mt-2 text-gray-400">
        Customize the appearance of your site. Upload images, select a font, and add personalized messages to enhance your branding.
      </p>
      
      <div className="mt-6 flex flex-col space-y-8">
        {/* Thumbnail Image Form */}
        <Form
          title="Thumbnail Image"
          description="The thumbnail image for your site. Accepted formats: .png, .jpg, .jpeg."
          helpText="Max file size 50MB. Recommended size 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updateSite}
        />

        {/* Logo Form */}
        <Form
          title="Logo"
          description="The logo for your site. Accepted formats: .png, .jpg, .jpeg."
          helpText="Max file size 50MB. Recommended size 400x400."
          inputAttrs={{
            name: "logo",
            type: "file",
            defaultValue: data?.logo!,
          }}
          handleSubmit={updateSite}
        />

        {/* Font Form */}
        <Form
          title="Font"
          description="The font for the heading text on your site."
          helpText="Please select a font."
          inputAttrs={{
            name: "font",
            type: "select",
            defaultValue: data?.font!,
          }}
          handleSubmit={updateSite}
        />

        {/* 404 Page Message Form */}
        <Form
          title="404 Page Message"
          description="Message to be displayed on the 404 page."
          helpText="Please use a maximum of 240 characters."
          inputAttrs={{
            name: "message404",
            type: "text",
            defaultValue: data?.message404!,
            placeholder: "Blimey! You've found a page that doesn't exist.",
            maxLength: 240,
          }}
          handleSubmit={updateSite}
        />
      </div>
    </div>
  );
}
