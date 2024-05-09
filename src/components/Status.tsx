"use client";
import STATUS, { TStatus } from "@/enums/status";
import { StatusTypo } from "@/styles/CustomMUI/custom";
import { Box } from "@mui/material";
import React from "react";

type Props = {
  status: TStatus;
};

const Status = (props: Props) => {
  const { status } = props;

  switch (status) {
    case STATUS.pending:
      return (
        <Box width={1} display="flex" justifyContent="center">
          <StatusTypo className="animate-pulse relative text-gray-500 flex justify-center items-center bg-white rounded-lg p-1 w-1/2">
            <span className="animate-ping absolute top-2.5 left-1 inline-flex h-3 w-3 rounded-full bg-gray-500 opacity-100"></span>
            <span className="absolute top-2.5 left-1 inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
            Pending
          </StatusTypo>
        </Box>
      );
    case STATUS.active:
      return (
        <Box width={1} display="flex" justifyContent="center">
          <StatusTypo className="animate-pulse relative text-primary flex justify-center items-center bg-white rounded-lg p-1 w-1/2">
            <span className="animate-ping absolute top-2.5 left-4 inline-flex h-3 w-3 rounded-full bg-primary opacity-100"></span>
            <span className="absolute top-2.5 left-4 inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            Active
          </StatusTypo>
        </Box>
      );
    case STATUS.completed:
      return (
        <StatusTypo className="animate-pulse relative text-emerald-500 flex justify-center items-center bg-white rounded-lg p-1 w-1/2">
          <span className="animate-ping absolute top-2.5 left-4 inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-100"></span>
          <span className="absolute top-2.5 left-4 inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          Completed
        </StatusTypo>
      );
    case STATUS.error:
      return (
        <StatusTypo className="animate-pulse relative text-red-800 flex justify-center items-center bg-white rounded-lg p-1 w-1/2">
          <span className="animate-ping absolute top-2.5 left-4 inline-flex h-3 w-3 rounded-full bg-red-500 opacity-100"></span>
          <span className="absolute top-2.5 left-4 inline-flex rounded-full h-3 w-3 bg-red-800"></span>
          Error
        </StatusTypo>
      );
    case STATUS.missed:
      return (
        <StatusTypo className="animate-pulse relative text-red-500 flex justify-center items-center bg-white rounded-lg p-1 w-1/2">
          <span className="animate-ping absolute top-2.5 left-4 inline-flex h-3 w-3 rounded-full bg-red-400 opacity-100"></span>
          <span className="absolute top-2.5 left-4 inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          Missed
        </StatusTypo>
      );
    default:
      return (
        <StatusTypo className="animate-pulse text-gray-500">Unknown</StatusTypo>
      );
  }
};

export default Status;
