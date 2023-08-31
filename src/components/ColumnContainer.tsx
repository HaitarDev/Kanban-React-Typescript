import { useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, TaskState } from "../types";
import Task from "./Task";

interface Props {
  column: Column;
  state: TaskState[];
  deleteColumn: (id: number) => void;
  updateColumn: (id: number, title: string) => void;
  addTask: (payload: TaskState) => void;
  deleteTask: (id: number) => void;
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  addTask,
  deleteTask,
  state,
}: Props) {
  const [editTitle, setEditTitle] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editTitle,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-40 border-2 border-rose-500  bg-slate-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );

  // Handling
  const handleAddTask = () => {
    const newTask: TaskState = {
      columnId: column.id,
      id: state.length + 1,
      content: `Content ${state.length + 1}`,
    };
    console.log(newTask);
    addTask(newTask);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        className="bg-slate-900
      h-[60px]
      cursor-grab
      rounded-md rounded-b-none p-3 font-bold
      flex items-center justify-between
      "
        {...attributes}
        {...listeners}
        onClick={() => setEditTitle(true)}
      >
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center bg-slate-800 px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editTitle && column.title}
          {editTitle && (
            <input
              className="bg-slate-950 focus:border focus:border-rose-500 rounded-sm outline-none px-2 w-4/5"
              defaultValue={column.title}
              autoFocus
              onBlur={() => setEditTitle(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditTitle(false);
              }}
              onChange={(e) => updateColumn(column.id, e.target.value)}
            />
          )}
        </div>

        <button
          className="cursor-pointer text-gray-500 hover:text-white text-2xl"
          onClick={() => deleteColumn(column.id)}
        >
          <AiOutlineDelete />
        </button>
      </div>
      {/* Content */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-auto overflow-y-auto">
        {state.map((task: TaskState) => (
          <Task key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>

      {/* Add Task */}
      <button
        className="flex items-center gap-2  hover:bg-slate-900 p-4 hover:text-rose-500 active:bg-black transition-all duration-150 rounded-md "
        onClick={handleAddTask}
      >
        <AiOutlinePlusCircle /> Add Task
      </button>
    </div>
  );
}
export default ColumnContainer;
