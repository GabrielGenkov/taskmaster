import { Project } from "../models/Project";
import axiosInstance from "./axiosConfig";
import { Task } from "../models/Task";
import { ProjectCategory } from "../models/ProjectCategory";
import { ProjectMember } from "../models/ProjectMember";
import { NewTask } from "../models/NewTask";
import { Comment } from "../models/Comment";
import { NewComment } from "../models/NewComment";

const getAccessToken = (): string | null => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
        return null;
    }
    return JSON.parse(userStr).accessToken;
};

export const getProjects = async (): Promise<Project[]> => {
    try {
        const { data } = await axiosInstance.get("/api/v1/projects");
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getTasksForProject = async (
    projectId: number
): Promise<Task[]> => {
    try {
        const { data } = await axiosInstance.get(
            `/api/v1/projects/${projectId}/tasks`
        );
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createTaskForProject = async (
    projectId: number,
    task: NewTask
): Promise<Task> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token available");
    }

    const { data } = await axiosInstance.post(
        `/api/v1/projects/${projectId}/tasks`,
        task,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

export const editTaskForProject = async (
    projectId: number,
    task: NewTask,
    taskId: number
): Promise<Task> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token available");
    }

    const { data } = await axiosInstance.put(
        `/api/v1/projects/${projectId}/tasks/${taskId}`,
        task,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

export const deleteTaskForProject = async (
    projectId: number,
    taskId: number
): Promise<void> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token available");
    }

    await axiosInstance.delete(
        `/api/v1/projects/${projectId}/tasks/${taskId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const getCommentsForTask = async (
    projectId: number,
    taskId: number
): Promise<Comment[]> => {
    try {
        const { data } = await axiosInstance.get(
            `/api/v1/projects/${projectId}/tasks/${taskId}/comments`
        );
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createCategory = async (
    projectId: number,
    name: string
): Promise<string> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token available");
    }
    try {
        const { data } = await axiosInstance.post(
            `/api/v1/projects/${projectId}/categories/`,
            { name },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
        return "";
    }
};

export const createComment = async (
    projectId: number,
    taskId: number,
    commentText: NewComment
): Promise<string> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token available");
    }
    try {
        const { data } = await axiosInstance.post(
            `/api/v1/projects/${projectId}/tasks/${taskId}/comments`,
            commentText,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
        return "";
    }
};

export const editComment = async (
    projectId: number,
    taskId: number,
    commentId: number,
    commentText: NewComment
): Promise<string> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token available");
    }
    try {
        const { data } = await axiosInstance.put(
            `/api/v1/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
            commentText,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
        return "";
    }
};

export const deleteComment = async (
    projectId: number,
    taskId: number,
    commentId: number
): Promise<void> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token available");
    }

    try {
        await axiosInstance.delete(
            `/api/v1/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

export const getProjectCategories = async (
    projectId: number
): Promise<ProjectCategory[]> => {
    try {
        const { data } = await axiosInstance.get(
            `/api/v1/projects/${projectId}/categories`
        );
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProjectMembers = async (
    projectId: number
): Promise<ProjectMember[]> => {
    try {
        const { data } = await axiosInstance.get(
            `/api/v1/projects/${projectId}/members`
        );
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const signIn = async (
    email: string,
    password: string
): Promise<Object | null> => {
    try {
        const { data } = await axiosInstance.post("/api/v1/auth/sign-in", {
            usernameOrEmail: email,
            password,
        });
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
): Promise<boolean> => {
    try {
        const { data } = await axiosInstance.post("/api/v1/auth/sign-up", {
            email,
            password,
            firstName,
            lastName,
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const createProject = async (
    title: string,
    description: string,
    memberEmails: string[]
): Promise<Object|null> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("No access token available");
    }

    try {
        const { data } = await axiosInstance.post(
            "/api/v1/projects",
            { name: title, desc: description },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log(memberEmails)
        memberEmails.filter(s => s.trim() !== "").forEach(async (email) => {
            await axiosInstance.post(
                `/api/v1/projects/${data.content}/members`,
                {
                    email,
                    role: "DEVELOPER",
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        });
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
