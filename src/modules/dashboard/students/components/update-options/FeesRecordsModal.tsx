import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/modules/dashboard/components/Loading";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { getFeesRecords } from "../../server/fees.action";

const FessRecordsModal = ({
  children,
  studentId,
}: {
  children: ReactNode;
  studentId: string;
}) => {
  const [search, setSearch] = useState("");
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["student_record"],
    mutationFn: getFeesRecords,
  });

  const filteredRecords =
    data &&
    data.filter(
      (record) =>
        record.month.toLowerCase().includes(search.toLowerCase()) ||
        (record.year && record.year.includes(search))
    );
  return (
    <Dialog>
      <DialogTrigger onClick={() => mutate(studentId)}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl! overflow-x-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {isPending ? (
          <div className="w-full flex items-center justify-center">
            {" "}
            <Loading />
          </div>
        ) : (
          <Card className="p-4">
            <CardContent>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Fees Records</h2>
                <Input
                  placeholder="Search by month, year, or student ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64"
                />
              </div>
              <div className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meal Fees</TableHead>
                      <TableHead>Education Fees</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords?.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.mealFees} taka</TableCell>
                        <TableCell>{record.educationFees} taka</TableCell>
                        <TableCell>{record.month}</TableCell>
                        <TableCell>{record.year || "N/A"}</TableCell>
                        <TableCell>
                          <span className="text-xs text-blue-500">
                            {record.createdAt.toDateString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Trash2 className="size-4 text-red-400" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FessRecordsModal;
