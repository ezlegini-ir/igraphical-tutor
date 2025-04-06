import { getSessionTutor } from "@/data/admin";
import { prisma } from "@igraphical/core";
import { format, startOfMonth, subMonths } from "date-fns";
import { redirect } from "next/navigation";
import { AreaChart } from "./components/AreaChart";
import StatCards from "./components/StatCards";

const page = async () => {
  const sessionTutor = await getSessionTutor();
  const tutorId = sessionTutor?.id;
  if (!tutorId) redirect("/login");

  const tutor = await prisma.tutor.findUnique({
    where: { id: tutorId },
    select: { profit: true },
  });
  if (!tutor) redirect("/login");

  // Total students enrolled in any of the tutor's courses
  const totalStudents = await prisma.user.count({
    where: {
      enrollment: {
        some: {
          course: { tutorId },
        },
      },
    },
  });

  // Enrollments this month (for Stat Cards)
  const enrollmentsThisMonth = await prisma.enrollment.findMany({
    where: {
      enrolledAt: {
        gte: startOfMonth(new Date()),
      },
      course: {
        tutorId,
      },
    },
    select: { price: true },
  });

  const totalRevenue = enrollmentsThisMonth.reduce(
    (sum, e) => sum + e.price,
    0
  );
  const profitFactor = tutor.profit / 100;
  const profit = totalRevenue * profitFactor;

  // Fetch chart data --------------------------------
  const threeMonthsAgo = subMonths(new Date(), 3);
  const rawChartData = await prisma.enrollment.groupBy({
    by: ["enrolledAt"],
    where: {
      enrolledAt: {
        gte: threeMonthsAgo,
      },
      course: {
        tutorId,
      },
    },
    _sum: { price: true },
  });

  const chartData = rawChartData
    .map((entry) => ({
      date: format(new Date(entry.enrolledAt), "yyyy-MM-dd"),
      revenue: entry._sum.price || 0,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const aggregatedData = Object.values(
    chartData.reduce((acc, { date, revenue }) => {
      const tutorRevenue = revenue * profitFactor;

      if (!acc[date]) {
        acc[date] = { date, revenue: tutorRevenue };
      } else {
        acc[date].revenue += tutorRevenue;
      }
      return acc;
    }, {} as Record<string, { date: string; revenue: number }>)
  );

  return (
    <div className="space-y-5">
      <StatCards
        enrollmentsThisMonth={enrollmentsThisMonth}
        profit={profit}
        profitFactor={profitFactor}
        totalStudents={totalStudents}
      />

      <AreaChart chartData={aggregatedData} />
    </div>
  );
};

export default page;
