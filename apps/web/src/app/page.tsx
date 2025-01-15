"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Progress } from "@repo/ui/components/progress";
import { Calculation } from "@/components/calculation";
import { trpc } from "@/trpc/client";

export default function Home() {
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

  const { mutate: createCalculation } = trpc.createCalculation.useMutation();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      if (typeof numberA !== "number" || typeof numberB !== "number") {
        setHasNumberABeenChanged(true);
        setHasNumberBBeenChanged(true);

        return;
      }

      createCalculation({
        operation: "add",
        numberA: numberA,
        numberB: numberB,
      });
    },
    [numberA, numberB, createCalculation],
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
          <Button type="submit">Compute</Button>
        </form>
        <div className="flex flex-col items-center min-w-[400px] mt-10">
          <p className="text-center">Computing... 2 out of 4 jobs finished</p>
          <Progress className="mt-2" value={50} />
        </div>
        <div className="flex flex-col min-w-[300px] mt-10 gap-4">
          <Calculation operator="+" />
          <Calculation operator="-" />
          <Calculation operator="*" />
          <Calculation operator="/" />
        </div>
      </main>
    </div>
  );
}
