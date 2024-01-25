import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import usersSlice, { UsersSliceState } from "./users";
import projectsSlice, { ProjectsSliceState } from "./projects";
import createTaskModalSlice, {CreateTaskModalState} from "./createTaskModal"
import TaskModalSlice, {TaskModalState} from "./taskModal"
import ProjectModalSlice, { ProjectModalState } from "./projectModal";

type StoreState = {
    users: UsersSliceState;
    projects: ProjectsSliceState;
    createTaskModal: CreateTaskModalState;
    taskModal: TaskModalState;
    projectModal: ProjectModalState
};

// save to localStorage
const saveToLocalStorage = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

// load from localStorage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
    reducer: {
        users: usersSlice,
        projects: projectsSlice,
        createTaskModal: createTaskModalSlice,
        taskModal: TaskModalSlice,
        projectModal: ProjectModalSlice,
    },
    preloadedState: persistedState
});

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export type AppDispatch = typeof store.dispatch;

// Export a typed useAppDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

