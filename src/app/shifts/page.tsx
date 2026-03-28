import { getMorningTasks, getNightTasks } from "@/lib/sheets";
import { ShiftsClient } from "@/components/ShiftsClient";

export const revalidate = 300;

export default async function ShiftsPage() {
  const [morningTasks, nightTasks] = await Promise.all([
    getMorningTasks(),
    getNightTasks(),
  ]);

  return <ShiftsClient morningTasks={morningTasks} nightTasks={nightTasks} />;
}
