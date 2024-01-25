// src/redux/modalSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProjectModalState {
    isProjectModalOpen: boolean;
    projectTitle: string;
    projectDesc: string;
}

const initialState: ProjectModalState = {
    isProjectModalOpen: false,
    projectTitle: "",
    projectDesc: "",
};

const ProjectModalSlice = createSlice({
    name: "ProjectModal",
    initialState,
    reducers: {
        openProjectModal: (state) => {
            state.isProjectModalOpen = true;
        },
        closeProjectModal: (state) => {
            state.isProjectModalOpen = false;
            state.projectTitle = "";
            state.projectDesc = "";
        },
    },
});

export const { openProjectModal, closeProjectModal } = ProjectModalSlice.actions;
export default ProjectModalSlice.reducer;
