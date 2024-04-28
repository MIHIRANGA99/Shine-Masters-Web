import CountCard from "@/components/CountCard";
import Status from "@/components/Status";
import STATUS from "@/enums/status";
import { DashboardTableCell } from "@/styles/CustomMUI/custom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const HEADERS = ["Slot", "Number Plate", "Wash Type", "Duration", "Status"];

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      <div className="flex flex-row justify-around space-x-6 h-1/3">
        <CountCard count={3} outOf={12} label="Total Bookings" />
        <CountCard count={2} label="Pending Bookings" />
        <CountCard count={1} label="Missed Bookings" />
        <CountCard count={4} label="Completed Bookings" />
      </div>
      <div className="w-full h-2/3">
        <Table sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              {HEADERS.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{ color: "white", textAlign: "center", fontWeight: 600 }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <DashboardTableCell>Slot 1</DashboardTableCell>
              <DashboardTableCell>CAB - 9367</DashboardTableCell>
              <DashboardTableCell>Wash & Service</DashboardTableCell>
              <DashboardTableCell>30M</DashboardTableCell>
              <DashboardTableCell>
                <Status status={STATUS.ACTIVE} />
              </DashboardTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
