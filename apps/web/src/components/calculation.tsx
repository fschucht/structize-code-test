import { forwardRef } from "react";
import { skipToken } from "@tanstack/react-query";
import { cn } from "@repo/ui/lib/utils.ts";
import type { CalculationOperation } from "@repo/calculations/documents/calculation.ts";
import { trpc } from "@/trpc/client";

export interface CalculationProps {
  className?: string;
  operation: CalculationOperation;
  numberA?: number;
  numberB?: number;
  result?: number;
  onResult?: (operation: CalculationOperation, result: number) => void;
}

const SYMBOL_BY_OPERATION: Record<CalculationOperation, string> = {
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
};

const Calculation = forwardRef<HTMLInputElement, CalculationProps>(
  ({ className, operation, numberA, numberB, onResult }, ref) => {
    const calculation = trpc.createCalculation.useSubscription(
      typeof numberA === "number" && typeof numberB === "number"
        ? { operation, numberA, numberB }
        : skipToken,
      {
        onData: (data) => {
          if (onResult && typeof data?.result === "number") {
            onResult(operation, data.result);
          }
        },
      },
    );

    return (
      <div
        ref={ref}
        className={cn("flex flex-row items-center gap-2", className)}
      >
        <div className="flex flex-row items-center justify-between shrink-0 w-[35px]">
          <div>A</div>
          <div>{SYMBOL_BY_OPERATION[operation]}</div>
          <div>B</div>
        </div>
        <div>=</div>
        <div>
          {typeof calculation.data?.result === "number"
            ? calculation.data.result
            : "Computing..."}
        </div>
      </div>
    );
  },
);
Calculation.displayName = "Calculation";

export { Calculation };
