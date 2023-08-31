import { DraggableAttributes } from "@dnd-kit/core";
import { Column } from "../types";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  column: Column;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  updateColumn: (id: number, title: string) => void;
  deleteColumn: (id: number) => void;
  editTitle: boolean;
  setEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
};

function ColumnHeader({
  attributes,
  listeners,
  column,
  updateColumn,
  deleteColumn,
  editTitle,
  setEditTitle,
}: Props) {
  return (
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
  );
}
export default ColumnHeader;
