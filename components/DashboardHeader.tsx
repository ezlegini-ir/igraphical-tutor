import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getSessionTutor } from "@/data/admin";
import { prisma } from "@igraphical/core";
import { Home, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import AdminUserBar from "./TutorBar";

const DashboardHeader = async () => {
  const sessionUser = await getSessionTutor();

  const pendingAskTutorsCount = await prisma.askTutor.count({
    where: { status: "PENDING", tutorId: sessionUser?.id },
  });

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <SidebarTrigger className="h-6 w-6" />
      </div>

      <div className="flex items-center gap-5 lg:gap-6 text-gray-500/75">
        <div>
          <Link href={"/qa?status=PENDING"} className="relative">
            <MessageCircleQuestion size={22} />
            {pendingAskTutorsCount > 0 && (
              <Badge
                variant={"red"}
                className="p-0 w-4 h-4 absolute -top-[7px] -right-[7px]"
              >
                {pendingAskTutorsCount}
              </Badge>
            )}
          </Link>
        </div>

        <div>
          <Link
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_MAIN_URL}`}
            className="relative"
          >
            <Home size={22} />
          </Link>
        </div>

        <AdminUserBar tutor={sessionUser} />
      </div>
    </div>
  );
};

export default DashboardHeader;
