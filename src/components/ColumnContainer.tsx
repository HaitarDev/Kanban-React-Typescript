import { AiOutlinePlusCircle } from "react-icons/ai";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, TaskState } from "../types";

import TasksContainer from "./TasksContainer";
import ColumnHeader from "./ColumnHeader";
import { useState } from "react";
import useTasks from "../useHooks/useTasks";

interface Props {
  column: Column;

  deleteColumn: (id: number) => void;
  updateColumn: (id: number, title: string) => void;
}

function ColumnContainer({ column, deleteColumn, updateColumn }: Props) {
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const { state, addTask, deleteTask } = useTasks();

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
      <ColumnHeader
        attributes={attributes}
        listeners={listeners}
        column={column}
        updateColumn={updateColumn}
        deleteColumn={deleteColumn}
        setEditTitle={setEditTitle}
        editTitle={editTitle}
      />
      {/* Content */}
      <TasksContainer state={state} deleteTask={deleteTask} />

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
