"use client";

import {
  type ChangeEventHandler,
  type FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Progress } from "@repo/ui/components/progress";
import { Calculation } from "@/components/calculation";
import {
  CALCULATION_OPERATION,
  type CalculationOperation,
} from "@repo/calculations/documents/calculation";

export default function Home() {
  const [isComputing, setIsComputing] = useState(false);
  const [completedCalculations, setCompletedCalculations] = useState<
    Partial<Record<CalculationOperation, number>>
  >({});

  const [numberA, setNumberA] = useState<number>();
  const [hasNumberABeenChanged, setHasNumberABeenChanged] = useState(false);
  const isNumberAValid = useMemo(() => {
    return !hasNumberABeenChanged || typeof numberA === "number";
  }, [hasNumberABeenChanged, numberA]);

  const [numberB, setNumberB] = useState<number>();
  const [hasNumberBBeenChanged, setHasNumberBBeenChanged] = useState(false);
  const isNumberBValid = useMemo(() => {
    return (
      !hasNumberBBeenChanged || (typeof numberB === "number" && numberB !== 0)
    );
  }, [hasNumberBBeenChanged, numberB]);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      if (typeof numberA !== "number" || typeof numberB !== "number") {
        setHasNumberABeenChanged(true);
        setHasNumberBBeenChanged(true);

        return;
      }

      setCompletedCalculations({});
      setIsComputing(true);
    },
    [numberA, numberB, setCompletedCalculations, setIsComputing],
  );

  const handleChangeNumberA = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      event.preventDefault();

      setNumberA(parseFloat(event.target.value));
      setHasNumberABeenChanged(true);
    },
    [setNumberA, setHasNumberABeenChanged],
  );

  const handleChangeNumberB = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      event.preventDefault();

      setNumberB(parseFloat(event.target.value));
      setHasNumberBBeenChanged(true);
    },
    [setNumberB, setHasNumberBBeenChanged],
  );

  const handleCalculationResult = useCallback(
    (operation: CalculationOperation, result: number) => {
      setCompletedCalculations({
        ...completedCalculations,
        [operation]: result,
      });
    },
    [setCompletedCalculations, completedCalculations],
  );

  const completedCalculationsCount = useMemo(
    () =>
      Object.values(completedCalculations).filter(
        (result) => typeof result === "number",
      ).length,
    [completedCalculations],
  );

  useEffect(() => {
    if (
      isComputing &&
      completedCalculationsCount === CALCULATION_OPERATION.length
    ) {
      setIsComputing(false);
    }
  }, [isComputing, setIsComputing, completedCalculationsCount]);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[100vh]">
      <main className="flex flex-col items-center">
        <form className="flex flex-row gap-12" onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="Enter number A"
            onChange={handleChangeNumberA}
            value={numberA?.toString() || ""}
            disabled={isComputing}
            errorMessage={isNumberAValid ? undefined : "Must be a valid number"}
          />
          <Input
            type="number"
            placeholder="Enter number B"
            onChange={handleChangeNumberB}
            value={numberB?.toString() || ""}
            disabled={isComputing}
            errorMessage={isNumberBValid ? undefined : "Must be a valid number"}
          />
          <Button type="submit" disabled={isComputing}>
            Compute
          </Button>
        </form>
        {(isComputing || completedCalculationsCount > 0) && (
          <>
            <div className="flex flex-col items-center min-w-[400px] mt-10">
              <p className="text-center">
                Computing... {completedCalculationsCount} out of{" "}
                {CALCULATION_OPERATION.length} jobs finished
              </p>
              <Progress
                className="mt-2"
                value={
                  (completedCalculationsCount / CALCULATION_OPERATION.length) *
                  100
                }
              />
            </div>
            <div className="flex flex-col min-w-[300px] mt-10 gap-4">
              {CALCULATION_OPERATION.map((operation) => (
                <Calculation
                  key={operation}
                  operation={operation}
                  numberA={isComputing ? numberA : undefined}
                  numberB={isComputing ? numberB : undefined}
                  onResult={handleCalculationResult}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
