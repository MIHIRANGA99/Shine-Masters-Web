import React from "react";

type Props = {
  count: number;
  label: string;
  outOf?: number;
};

const CountCard = (props: Props) => {
  return (
    <div className="bg-blue-100 shadow-lg p-4 rounded-lg w-full h-full">
      <div className="font-semibold italic">{props.label}</div>
      <div className="justify-center items-center flex text-9xl font-bold text-blue-500 h-full">
        {props.count}
      </div>
    </div>
  );
};

export default CountCard;
