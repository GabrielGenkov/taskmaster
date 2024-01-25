import { Assignees } from "./Assignees";
export type Comment = {
  id: number;
  content: string;
  commentOwner: Assignees;
}