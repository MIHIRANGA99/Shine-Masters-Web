"use client";
import STATUS from "@/enums/status";
import { StatusTypo } from "@/styles/CustomMUI/custom";
import React from "react";

type Props = {
  status: STATUS;
};

const Status = (props: Props) => {
  const { status } = props;

  switch (status) {
    case STATUS.PENDING:
      return (
        <StatusTypo className="animate-pulse text-gray-500">
          <span className="relative inline-flex rounded-full h-3 w-3 animate-ping bg-gray-500 mx-2"></span>
          Pending
        </StatusTypo>
      );
    case STATUS.ACTIVE:
      return (
        <StatusTypo className="animate-pulse text-primary">
          <span className="relative inline-flex rounded-full h-3 w-3 animate-ping bg-primary mx-2"></span>
          Active
        </StatusTypo>
      );
    case STATUS.COMPLETED:
      return (
        <StatusTypo className="animate-pulse text-emerald-500">
          <span className="relative inline-flex rounded-full h-3 w-3 animate-ping bg-emerald-500 mx-2"></span>
          Completed
        </StatusTypo>
      );
    case STATUS.ERROR:
      return (
        <StatusTypo className="animate-pulse text-red-800">
          <span className="relative inline-flex rounded-full h-3 w-3 animate-ping bg-red-800 mx-2"></span>
          Error
        </StatusTypo>
      );
    default:
      return (
        <StatusTypo className="animate-pulse text-gray-500">Unknown</StatusTypo>
      );
  }
};

export default Status;
