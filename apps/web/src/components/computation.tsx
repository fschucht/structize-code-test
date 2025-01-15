import * as React from "react";
import { cn } from "@repo/ui/lib/utils";

export interface ComputationProps {
  className?: string;
  operator: "+" | "-" | "*" | "/";
  result?: number;
}

const Computation = React.forwardRef<HTMLInputElement, ComputationProps>(
  ({ className, operator, result }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-row items-center gap-2", className)}
      >
        <div className="flex flex-row items-center justify-between shrink-0 w-[35px]">
          <div>A</div>
          <div>{operator}</div>
          <div>B</div>
        </div>
        <div>=</div>
        <div>{result || "Computing..."}</div>
      </div>
    );
  },
);
Computation.displayName = "Computation";

export { Computation };
