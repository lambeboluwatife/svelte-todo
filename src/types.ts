export type Filter = "all" | "todo" | "completed";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};
