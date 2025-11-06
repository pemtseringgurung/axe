import Image from "next/image";
import BudgetInputBox from "@/components/budget_inputbox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BudgetInputBox />
    </main>
  );
}
