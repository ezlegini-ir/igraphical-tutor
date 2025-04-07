import Avatar from "@/components/Avatar";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import ViewButton from "@/components/ViewButton";
import { smartFormatDate } from "@/lib/utils";
import { placeHolder } from "@/public";
import { AskTutor, Course, Image as ImageType, User } from "@prisma/client";
import Image from "next/image";

interface QaType extends AskTutor {
  user: User & { image: ImageType | null };
  course: Course & { image: ImageType | null };
}

interface Props {
  qas: QaType[];
  totalTickets: number;
  pageSize: number;
}

const QaList = async ({ qas, totalTickets, pageSize }: Props) => {
  return (
    <>
      <Table
        columns={columns}
        data={qas}
        renderRows={renderRows}
        noDataMessage="There is yet no messages..."
      />

      <Pagination pageSize={pageSize} totalItems={totalTickets} />
    </>
  );
};

const renderRows = (qa: QaType) => {
  return (
    <TableRow key={qa.id} className="odd:bg-slate-50">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar src={qa.user.image?.url} />
          {qa.user.fullName}
        </div>
      </TableCell>

      <TableCell className="hidden xl:table-cell">
        <div className="flex items-center gap-3">
          <Image
            alt=""
            src={qa.course.image?.url || placeHolder}
            width={60}
            height={60}
            className="rounded-sm object-center"
          />
          {qa.course.title}
        </div>
      </TableCell>

      <TableCell dir="rtl" className="text-left hidden lg:table-cell">
        {smartFormatDate(qa.createdAt)}
      </TableCell>
      <TableCell dir="rtl" className="text-left">
        {smartFormatDate(qa.updatedAt)}
      </TableCell>

      <TableCell>
        <Badge
          className="p-1 px-3"
          variant={qa.status === "PENDING" ? "orange" : "green"}
        >
          {qa.status}
        </Badge>
      </TableCell>

      <TableCell>
        <ViewButton href={`/qa/${qa.id}`} />
      </TableCell>
    </TableRow>
  );
};

const columns = [
  { label: "User", className: "" },
  { label: "Course", className: "hidden xl:table-cell" },
  { label: "Created At", className: "hidden lg:table-cell" },
  { label: "Last Message", className: "" },
  { label: "Status", className: "" },
  { label: "View", className: "" },
];

export default QaList;
