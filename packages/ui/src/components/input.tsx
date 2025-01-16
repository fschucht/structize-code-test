import * as React from "react";
import { cn } from "../lib/utils.ts";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    return (
      <div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            errorMessage && "border-red-500",
            className,
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <div className="pt-1 pl-3 text-sm text-red-500">{errorMessage}</div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
