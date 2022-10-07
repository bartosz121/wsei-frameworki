import React from "react";

type Props = {
  icon: React.ReactNode;
  onClick?: () => void;
  text?: string;
};

const ActionBtn = ({ icon, onClick: onClick_, text }: Props) => {
  return (
    <div
      onClick={onClick_ && onClick_}
      className="flex items-center justify-between text-slate-500"
    >
      <div className="flex space-x-4 md:space-x-8">
        <div className="flex cursor-pointer items-center transition hover:text-slate-600">
          {icon}
          {text && <span className="mx-1">{text}</span>}
        </div>
      </div>
    </div>
  );
};

export default ActionBtn;
