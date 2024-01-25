// src/redux/modalSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Assignees } from '../models/Assignees';
import { NewTask } from '../models/NewTask';
import { RootState } from './store';
import { editTaskForProject } from '../axios/apiClient';

export interface TaskModalState {
  isTaskModalOpen: boolean;
  taskId: number;
  taskTitle: string;
  taskDesc: string;
  taskDueDate: string;
  taskAssignees: Assignees[];
  taskCategoryId: number | null;
}

const initialState: TaskModalState = {
  isTaskModalOpen: false,
  taskId: 0,
  taskTitle: '',
  taskDesc: '',
  taskDueDate: '',
  taskAssignees: [],
  taskCategoryId: null
};

const TaskModalSlice = createSlice({
  name: 'TaskModal',
  initialState,
  reducers: {
    openTaskModal: (state, action) => {
      state.isTaskModalOpen = true;
      state.taskId = action.payload.taskId
      state.taskTitle = action.payload.taskTitle;
      state.taskDesc = action.payload.taskDesc;
      state.taskDueDate = action.payload.taskDueDate;
      state.taskAssignees = action.payload.taskAssignees;
      state.taskCategoryId = action.payload.taskCategoryId;
    },
    closeTaskModal: (state) => {
      state.isTaskModalOpen = false;
      state.taskTitle = '';
      state.taskDesc = '';
      state.taskDueDate = '';
      state.taskAssignees = [];
      state.taskCategoryId = null;
    },
  },
});

export const editTask = createAsyncThunk(
  'projects/editTask',
  async (taskData: NewTask, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.selectedProject?.id;
    if (!projectId) {
      throw new Error("No project selected");
    }
    const response = editTaskForProject(projectId, taskData, state.taskModal.taskId);
    return response;
  }
);

export const { openTaskModal, closeTaskModal } = TaskModalSlice.actions;
export default TaskModalSlice.reducer;