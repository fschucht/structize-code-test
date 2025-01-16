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
import { trpc } from "@/trpc/client";
import { skipToken } from "@tanstack/react-query";

export default function Home() {
  const [isComputing, setIsComputing] = useState(false);

  const [numberA, setNumberA] = useState<number>();
  const [hasNumberABeenChanged, setHasNumberABeenChanged] = useState(false);
  const isNumberAValid = useMemo(() => {
    return !hasNumberABeenChanged || typeof numberA === "number";
  }, [hasNumberABeenChanged, numberA]);

  const [numberB, setNumberB] = useState<number>();
  const [hasNumberBBeenChanged, setHasNumberBBeenChanged] = useState(false);
  const isNumberBValid = useMemo(() => {
    return !hasNumberBBeenChanged || typeof numberB === "number";
  }, [hasNumberBBeenChanged, numberB]);

  const addCalculation = trpc.createCalculation.useSubscription(
    isComputing && typeof numberA === "number" && typeof numberB === "number"
      ? {
          operation: "add",
          numberA: numberA,
          numberB: numberB,
        }
      : skipToken,
  );
  const subtractCalculation = trpc.createCalculation.useSubscription(
    isComputing && typeof numberA === "number" && typeof numberB === "number"
      ? {
          operation: "subtract",
          numberA: numberA,
          numberB: numberB,
        }
      : skipToken,
  );
  const multiplyCalculation = trpc.createCalculation.useSubscription(
    isComputing && typeof numberA === "number" && typeof numberB === "number"
      ? {
          operation: "multiply",
          numberA: numberA,
          numberB: numberB,
        }
      : skipToken,
  );
  const divideCalculation = trpc.createCalculation.useSubscription(
    isComputing && typeof numberA === "number" && typeof numberB === "number"
      ? {
          operation: "divide",
          numberA: numberA,
          numberB: numberB,
        }
      : skipToken,
  );

  const completedCalculationsCount = useMemo(() => {
    return [
      addCalculation,
      subtractCalculation,
      multiplyCalculation,
      divideCalculation,
    ].filter((progress) => progress.data?.result !== undefined).length;
  }, [
    addCalculation,
    subtractCalculation,
    multiplyCalculation,
    divideCalculation,
  ]);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      if (typeof numberA !== "number" || typeof numberB !== "number") {
        setHasNumberABeenChanged(true);
        setHasNumberBBeenChanged(true);

        return;
      }

      setIsComputing(true);
    },
    [numberA, numberB, setIsComputing],
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

  useEffect(() => {
    if (isComputing && completedCalculationsCount === 4) {
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
            errorMessage={isNumberAValid ? undefined : "Must be a number"}
          />
          <Input
            type="number"
            placeholder="Enter number B"
            onChange={handleChangeNumberB}
            value={numberB?.toString() || ""}
            errorMessage={isNumberBValid ? undefined : "Must be a number"}
          />
          <Button type="submit" disabled={isComputing}>
            Compute
          </Button>
        </form>
        {(isComputing || completedCalculationsCount > 0) && (
          <>
            <div className="flex flex-col items-center min-w-[400px] mt-10">
              <p className="text-center">
                Computing... {completedCalculationsCount} out of 4 jobs finished
              </p>
              <Progress
                className="mt-2"
                value={(completedCalculationsCount / 4) * 100}
              />
            </div>
            <div className="flex flex-col min-w-[300px] mt-10 gap-4">
              <Calculation operator="+" result={addCalculation?.data?.result} />
              <Calculation
                operator="-"
                result={subtractCalculation?.data?.result}
              />
              <Calculation
                operator="*"
                result={multiplyCalculation?.data?.result}
              />
              <Calculation
                operator="/"
                result={divideCalculation?.data?.result}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
