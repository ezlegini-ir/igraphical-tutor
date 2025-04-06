import { globalPageSize, pagination } from "@/data/pagination";
import { prisma } from "@igraphical/core";
import SettlementsList from "./SettlementsList";
import { getSessionTutor } from "@/data/admin";
interface Props {
  searchParams: Promise<{ page: string; search: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  const { skip, take } = pagination(page);
  const tutorId = (await getSessionTutor())?.id;

  const settlements = await prisma.settlement.findMany({
    orderBy: { id: "desc" },
    include: {
      tutor: { include: { image: true } },
    },
    where: {
      tutorId,
    },

    skip,
    take,
  });
  const totalSettlements = await prisma.settlement.count({
    where: {
      tutorId,
    },
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
        <h3>{totalSettlements} Settlements</h3>
      </div>

      <SettlementsList
        settlements={settlements}
        totalTutors={totalSettlements}
        pageSize={globalPageSize}
      />
    </div>
  );
};

export default page;
