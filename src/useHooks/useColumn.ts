import { useState } from "react";
import { Column } from "../types";

const useColumns = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  return {
    columns,
    setColumns,
    // Add Column
    addNewColumn: () => {
      const newColumn: Column = {
        id: generateId() as number,
        title: `Column ${columns.length + 1}`,
      };
      setColumns([...columns, newColumn]);
    },
    // Delete Column
    deleteColumn: (id: number) => {
      const filterColumns = columns.filter((column) => {
        console.log(`column id : ${column.id} , id:${id}`);
        return column.id !== id;
      });
      setColumns(filterColumns);
    },
    // Update Column
    updateColumn: (id: number, title: string) => {
      const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
      });
      setColumns(newColumns);
    },
  };
};

export default useColumns;
// Id Column
export const generateId = () => {
  return Math.floor(Math.random() * 10001);
};
