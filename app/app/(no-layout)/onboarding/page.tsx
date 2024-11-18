import Onboarding from "@/components/page/onboarding/onboarding";
import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
    const session = await getSession();
    if (!session?.user) {
        redirect("/login");
    }
    const data = await db.query.sites.findFirst({
        where: (sites, { eq }) => eq(sites.userId, session?.user.id),
    });

    return <Onboarding />;
}
