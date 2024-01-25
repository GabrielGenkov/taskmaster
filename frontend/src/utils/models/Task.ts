import { Assignees } from "./Assignees";

export type Task = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    assignees: Assignees[],
    categoryId: number;
}