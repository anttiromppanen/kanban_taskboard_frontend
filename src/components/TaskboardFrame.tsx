import { ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";
import TaskboardSection from "./TaskboardSection/TaskboardSection";

function TaskboardFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <TaskboardSection>{children}</TaskboardSection>
    </div>
  );
}

export default TaskboardFrame;
