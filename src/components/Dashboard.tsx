import { useMemo, useReducer, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Column, TaskState } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const initialState: TaskState[] = [];

// type ActionType = {
//   type: "addTask" | "deleteTask";
//   payload: TaskState | number;
// };

type ActionType =
  | { type: "addTask"; payload: TaskState }
  | { type: "deleteTask"; payload: number };

const reducer = (state: TaskState[], action: ActionType) => {
  switch (action.type) {
    case "addTask":
      return [...state, action.payload];
    case "deleteTask":
      return state.filter((task) => task.id !== action.payload);
    default:
      throw new Error("error on reducer: ");
  }
};

function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Add Column
  const addNewColumn = () => {
    const newColumn: Column = {
      id: generateId() as number,
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  // Delete Column
  const deleteColumn = (id: number) => {
    const filterColumns = columns.filter((column) => {
      console.log(`column id : ${column.id} , id:${id}`);
      return column.id !== id;
    });
    setColumns(filterColumns);
  };

  // Update Column
  const updateColumn = (id: number, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  };

  // Id Column
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  // Tasks
  // Add Task
  const addTask = (payload: TaskState) => {
    dispatch({ type: "addTask", payload });
  };

  //Delete Task
  const deleteTask = (payload: number) => {
    dispatch({ type: "deleteTask", payload });
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        onDragStart={onDragStart}
        onDragOver={onDragEnd}
        sensors={sensors}
      >
        <div className="flex m-auto">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  column={column}
                  deleteColumn={deleteColumn}
                  key={column.id}
                  updateColumn={updateColumn}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  state={state}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                addTask={addTask}
                deleteTask={deleteTask}
                state={state}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <div className="m-auto">
        <button
          className="flex gap-2 items-center py-2 px-12 bg-slate-950 border-2 border-slate-900 rounded-lg cursor-pointer ring-rose-500 hover:border-rose-900"
          onClick={addNewColumn}
        >
          <AiOutlinePlusCircle /> Add Column
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
