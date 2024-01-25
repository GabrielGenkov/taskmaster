import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { getProjects, getTasksForProject } from "../../utils/axios/apiClient";
import { Project } from "../../utils/models/Project";
import { Task } from "../../utils/models/Task";
import { TaskItem } from "./components/TaskItem";
import { useDispatch } from "react-redux";
import { setProjects, setSelectedProject } from "../../utils/redux/projects";
import { useAppSelector } from "../../utils/redux/store";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../utils/redux/createTaskModal";
import { openTaskModal } from "../../utils/redux/taskModal";
import { openProjectModal } from "../../utils/redux/projectModal";

// Main Page component
const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const projects = useAppSelector((state) => state.projects.projects);
    const [tasks, setTasks] = useState<Task[]>([]);

    const selectedProject = useAppSelector(
        (state) => state.projects.selectedProject
    );
    const colorMode = useAppSelector((state) => state.users.colorMode);
    const navigate = useNavigate();

    useEffect(() => {
        getProjects().then((res) => {
            console.log(res)
            dispatch(setProjects(res));
            if (res.length > 0) {
                dispatch(setSelectedProject(res[0]));
            }
        });
    }, []);

    useEffect(() => {
        if (!selectedProject) {
            return;
        }

        getTasksForProject(selectedProject.id).then((tasks: Task[]) => {
            //sort by due date
            //limit to N number of tasks
            const sortedTasks = tasks
                .sort(
                    (a, b) =>
                        new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                )
                .slice(0, 5);
            setTasks(sortedTasks);
        });
    }, [selectedProject]);

    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            })}
        >
            <Box
                flexGrow={1}
                sx={(theme) => ({
                    borderBottom: `1px solid ${theme.palette.secondary.main}`,
                })}
            >
                <Box display="flex" height="100%" padding="40px 0">
                    <Box width="35%">
                        {/* This will be your projects list */}
                        <Box
                            sx={(theme) => ({
                                height: "100%",
                                padding: "16px",
                                backgroundColor:
                                    theme.palette.background.default,
                            })}
                        >
                            <Typography
                                variant="h5"
                                marginTop="4px"
                                marginBottom="15px"
                            >
                                Your Projects
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap="10px"
                            >
                                {/* Map your projects here */}
                                {projects && projects.map((project) => (
                                    <Paper
                                        key={project.id}
                                        sx={(theme) => ({
                                            padding: "20px",
                                            borderRadius: "10px",
                                            backgroundColor:
                                                selectedProject?.id ===
                                                project.id
                                                    ? theme.palette.primary.main
                                                    : "secondary",
                                            "&:hover": {
                                                border: `1px solid ${theme.palette.primary.contrastText}`,
                                            },
                                        })}
                                        onClick={() =>
                                            dispatch(
                                                setSelectedProject(project)
                                            )
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {project.name}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                            <Button
                                startIcon={
                                    <AddCircleIcon
                                        sx={(theme) => ({
                                            color: theme.palette.primary.main,
                                        })}
                                    />
                                }
                                sx={(theme) => ({
                                    marginTop: "16px",
                                    color: theme.palette.primary.contrastText,
                                })}
                                onClick={() => dispatch(openProjectModal())}
                            >
                                Create New Project
                            </Button>
                            {/* List your projects here */}
                        </Box>
                    </Box>
                    <Box>
                        <Box
                            sx={(theme) => ({
                                height: "100%",
                                padding: "6px",
                                borderRadius: "25px",
                                backgroundColor: theme.palette.secondary.main,
                            })}
                        ></Box>
                    </Box>
                    {tasks.length > 0 ? (
                        <Box flexGrow={1}>
                            <Box sx={{ height: "100%", padding: "16px" }}>
                                <Typography
                                    variant="h5"
                                    sx={(theme) => ({
                                        borderBottom: `3px solid ${theme.palette.secondary.main}`,
                                        borderRadius: "3px",
                                        marginBottom: "15px",
                                    })}
                                >
                                    Your Upcoming Tasks
                                </Typography>
                                {/* <Divider sx={{ margin: "5px 0", height: "10px" }} /> */}
                                {/* Map your tasks here */}
                                {tasks &&
                                    tasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            dueDate={task.dueDate}
                                            description={task.description}
                                            assignees={task.assignees}
                                            onClick={() => {
                                                dispatch(
                                                    openTaskModal({
                                                        taskId: task.id,
                                                        taskTitle: task.title,
                                                        taskDesc:
                                                            task.description,
                                                        taskDueDate:
                                                            task.dueDate,
                                                        taskAssignees:
                                                            task.assignees,
                                                        taskCategoryId:
                                                            task.categoryId,
                                                    })
                                                );
                                            }}
                                        />
                                    ))}

                                <Button
                                    startIcon={
                                        <AddCircleIcon
                                            sx={(theme) => ({
                                                color: theme.palette.primary
                                                    .main,
                                            })}
                                        />
                                    }
                                    sx={(theme) => ({
                                        marginTop: "16px",
                                        color: theme.palette.primary
                                            .contrastText,
                                    })}
                                    onClick={() => dispatch(openModal())}
                                >
                                    Create New Task
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-start"
                            margin="120px 30px"
                        >
                            <Box
                                component="img"
                                src="/imgs/dark-mode-tasksBG-2.svg"
                                alt="no tasks"
                                position="absolute"
                                margin="240px 0px 0px 650px"
                                sx={{
                                    width: "400px",
                                    height: "400px",
                                }}
                            ></Box>
                            <Box
                                component="img"
                                src="/imgs/dark-mode-tasksBG-1.svg"
                                alt="no tasks"
                                position="absolute"
                                margin="-10px 0px 0px 800px"
                                sx={{
                                    width: "350px",
                                    height: "300px",
                                }}
                            ></Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                width="60%"
                            >
                                <Typography
                                    variant="h3"
                                    padding="16px"
                                    fontWeight="bold"
                                    fontFamily="montserrat"
                                >
                                    You have no upcoming tasks for this project!
                                </Typography>
                                <Box width="70%">
                                    <Typography
                                        variant="h6"
                                        padding="16px"
                                        fontFamily="poppins"
                                        lineHeight="28px"
                                    >
                                        Ready to tackle your goals? Let's get
                                        started by creating a new task and
                                        setting the stage for success. Your
                                        project board is a canvas waiting for
                                        your plans to take shape. Dive in and
                                        transform your ideas into action!
                                    </Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    gap="10px"
                                    margin="0px 15px"
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={
                                            <AddCircleIcon
                                                sx={(theme) => ({
                                                    color: "#fff",
                                                })}
                                            />
                                        }
                                        sx={(theme) => ({
                                            marginTop: "16px",
                                            color: "#fff",
                                        })}
                                        onClick={() => dispatch(openModal())}
                                    >
                                        Create
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={(theme) => ({
                                            marginTop: "16px",
                                            borderColor:
                                                theme.palette.primary
                                                    .contrastText,
                                            color: theme.palette.primary
                                                .contrastText,
                                        })}
                                        onClick={() => {
                                            navigate(`/board`);
                                        }}
                                    >
                                        Open project Board
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box
                className="footer"
                display="flex"
                justifyContent="flex-end"
                margin="5px"
            >
                {projects && projects.length > 0 && (
                    <Button
                        endIcon={
                            <ArrowCircleRightIcon
                                sx={(theme) => ({
                                    color: theme.palette.primary.main,
                                })}
                            />
                        }
                        sx={(theme) => ({
                            marginTop: "6px",
                            color: theme.palette.primary.contrastText,
                        })}
                        onClick={() => {
                            navigate(`/board`);
                        }}
                    >
                        Open Project Board
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;
