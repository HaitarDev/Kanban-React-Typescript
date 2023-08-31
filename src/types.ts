export type Column = {
  id: number;
  title: string;
};

export type TaskState = {
  id: number;
  columnId: number;
  content: string;
};
