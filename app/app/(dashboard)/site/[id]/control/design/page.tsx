import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import db from "@/lib/db";
import { cn } from "@/lib/utils";

export default async function SiteSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
  const data = await db.query.sites.findFirst({
    where: (sites, { eq }) => eq(sites.id, decodeURIComponent(params.id)),
  });

  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">{`Design & Content`}</div>
      <p className="mt-2 text-gray-400">
        Customize the appearance of your site. Upload images, select a font, and add personalized messages to enhance your branding.
      </p>

      <div className="mt-6 flex flex-col space-y-8">
        {/* Logo Form */}
        <Form
          title="Logo And Favicon"
          description="The logo for your site. Accepted formats: .png, .jpg, .jpeg."
          helpText="Max file size 50MB. Recommended size 400x400."
          inputAttrs={{
            name: "logo",
            type: "file",
            defaultValue: data?.logo!,
          }}
          handleSubmit={updateSite}
        />

        {/* Dashboard Design */}
        {/* <form className="rounded-lg border border-gray-300 bg-white dark:border-stone-700 dark:bg-black shadow-md">
          <div className="flex flex-col items-center justify-center space-y-3 border-t border-gray-300 bg-gray-50 p-4 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">You can change design here</p>
            <button className={cn(
              "flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border transition-all focus:outline-none", "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white"
            )}>Change Design</button>
          </div>
        </form> */}

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
