import { TaskState } from "../types";
import Task from "./Task";

type Props = {
  state: TaskState[];
  deleteTask: (id: number) => void;
};

function TasksContainer({ state, deleteTask }: Props) {
  return (
    <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-auto overflow-y-auto">
      {state.map((task: TaskState) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
}
export default TasksContainer;
