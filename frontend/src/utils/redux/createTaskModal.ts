// src/redux/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

export interface CreateTaskModalState {
  isModalOpen: boolean;
}

const initialState: CreateTaskModalState = {
  isModalOpen: false,
};

const createTaskModalSlice = createSlice({
  name: 'createTaskModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = createTaskModalSlice.actions;
export default createTaskModalSlice.reducer;
