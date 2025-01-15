import { Job } from "bullmq";

export type ComputeCalculationJob = Job<
  { calculationId: string },
  void,
  "compute"
>;
