import { ReactNode } from "react";
import Header from "../Header/Header";

function TaskboardSection({ children }: { children: ReactNode }) {
  return (
    <main className="h-full w-full bg-userGray1 p-8">
      <Header />
      <div className="mt-5 text-neutral-300">{children}</div>
    </main>
  );
}

export default TaskboardSection;
