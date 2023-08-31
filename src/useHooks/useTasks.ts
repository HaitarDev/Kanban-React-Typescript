import { useReducer } from "react";
import { TaskState } from "../types";

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
      throw new Error(`error on reducer}`);
  }
};

const useTasks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    addTask: (payload: TaskState) => {
      dispatch({ type: "addTask", payload });
    },
    deleteTask: (payload: number) => {
      dispatch({ type: "deleteTask", payload });
    },
  };
};

export default useTasks;
