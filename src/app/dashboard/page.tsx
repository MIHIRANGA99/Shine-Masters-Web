import CountCard from "@/components/CountCard";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

type Props = {};

const Page = (props: Props) => {

  const HEADERS = ['Slot', 'Number Plate', 'Wash Type', 'Duration', 'Status']
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex flex-row justify-around space-x-6 h-1/3">
        <CountCard count={3} outOf={12} label="Total Bookings" />
        <CountCard count={2} label="Pending Bookings" />
        <CountCard count={1} label="Missed Bookings" />
        <CountCard count={4} label="Completed Bookings" />
      </div>
      <div className="w-full h-2/3">
        <Table>
          <TableHead>
            <TableRow>
              {HEADERS.map((header) => <TableCell>Slot</TableCell>)}
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell>Slot 1</TableCell>
                <TableCell>CAB - 9367</TableCell>
                <TableCell>Wash & Service</TableCell>
                <TableCell>30M</TableCell>
                <TableCell>Pending</TableCell>
              </TableRow>
            </TableBody>
          </TableHead>
        </Table>
      </div>
    </div>
  );
};

export default Page;
