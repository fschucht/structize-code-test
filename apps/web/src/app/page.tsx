import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Progress } from "@repo/ui/components/progress";
import { Computation } from "@/components/computation";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[100vh]">
      <main className="flex flex-col items-center">
        <form className="flex flex-row items-center gap-12">
          <Input type="number" placeholder="Enter number A" />
          <Input type="number" placeholder="Enter number B" />
          <Button type="submit">Compute</Button>
        </form>
        <div className="flex flex-col items-center min-w-[400px] mt-10">
          <p className="text-center">Computing... 2 out of 4 jobs finished</p>
          <Progress className="mt-2" value={50} />
        </div>
        <div className="flex flex-col min-w-[300px] mt-10 gap-4">
          <Computation operator="+" />
          <Computation operator="-" />
          <Computation operator="*" />
          <Computation operator="/" />
        </div>
      </main>
    </div>
  );
}
