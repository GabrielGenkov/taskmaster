import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { User } from "../models/User";
import { Task } from "../models/Task";
import { NewTask } from '../models/NewTask'
import { Project } from "../models/Project";
import { createTaskForProject, deleteTaskForProject } from "../axios/apiClient";
import { RootState } from "./store";

export interface ProjectsSliceState {
    selectedProject?: Project;
    projects: Project[];
}

const initialState: ProjectsSliceState = {
    selectedProject: undefined,
    projects: []
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setSelectedProject(state, action: PayloadAction<Project>) {
            state.selectedProject = action.payload;
        },
        setProjects(state, action: PayloadAction<Project[]>) {
            state.projects = action.payload;
        },
        addProject(state, action: PayloadAction<Project>) {
            state.projects = [...state.projects, action.payload];
        },
    },

});

export const createTask = createAsyncThunk(
  'projects/createTask',
  async (taskData: NewTask, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.selectedProject?.id;
    if (!projectId) {
      throw new Error("No project selected");
    }
    const response = createTaskForProject(projectId, taskData);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  'projects/deleteTask',
  async (taskId: number, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.selectedProject?.id;
    if (!projectId) {
      throw new Error("No project selected");
    }
    await deleteTaskForProject(projectId, taskId);
    return taskId;
  }
);

export const { setSelectedProject, setProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
