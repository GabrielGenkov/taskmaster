export type NewTask = {
  title: string;
  description: string;
  dueDate: string;
  assignees: string[]; 
  categoryId: number | null; 
};