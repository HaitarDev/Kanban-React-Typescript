import { useMemo, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Column } from "../types";
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
import useColumn from "../useHooks/useColumn";

function Dashboard() {
  const { columns, setColumns, addNewColumn, deleteColumn, updateColumn } =
    useColumn();
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

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

  return (
    <div className="m-auto flex items-center gap-6 min-h-screen w-full  overflow-x-auto overflow-y-hidden px-[40px]">
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
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <div className="">
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
