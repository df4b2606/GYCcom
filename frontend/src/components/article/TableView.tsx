import React from "react";

interface TableViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function TableView({ children, className }: TableViewProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table
        className={`min-w-full border border-gray-700 rounded-lg ${
          className || ""
        }`}
      >
        {children}
      </table>
    </div>
  );
}
