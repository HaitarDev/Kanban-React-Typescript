import { AiOutlineDelete } from "react-icons/ai";
import { TaskState } from "../types";
import { useState } from "react";

type Prorps = {
  task: TaskState;
  deleteTask: (id: number) => void;
};

function Task({ task, deleteTask }: Prorps) {
  const [activeDelete, onActiveDelete] = useState<boolean>(false);

  return (
    <div
      className="bg-slate-900 h-[100px] p-2.5 min-h-[100px] items-center flex text-left rounded-xl border border-slate-700 transition-all duration-150 hover:border-rose-500 cursor-grab justify-between "
      onMouseEnter={() => onActiveDelete(true)}
      onMouseLeave={() => onActiveDelete(false)}
    >
      <div>{task.content}</div>
      {activeDelete && (
        <button
          className=" text-slate-400 text-lg hover:text-slate-100 transition-all duration-100"
          onClick={() => deleteTask(task.id)}
        >
          <AiOutlineDelete />
        </button>
      )}
    </div>
  );
}
export default Task;
