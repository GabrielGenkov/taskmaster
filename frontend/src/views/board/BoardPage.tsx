import React, { useEffect } from "react";
import { useAppSelector } from "../../utils/redux/store";
import { AvatarGroup, Box, Button, TextField, Typography } from "@mui/material";
import {
    createCategory,
    getProjectCategories,
    getProjectMembers,
    getTasksForProject,
} from "../../utils/axios/apiClient";
import { Task } from "../../utils/models/Task";
import TaskCard from "./components/TaskCard";
import { ProjectCategory } from "../../utils/models/ProjectCategory";
import StyledAvatar from "../../widgets/StyledAvatar";
import { ProjectMember } from "../../utils/models/ProjectMember";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { secondary } from "../../utils/theme/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Navigate, useNavigate } from "react-router-dom";
import CategoryMenu from "./components/CategoryMenu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { openModal } from "../../utils/redux/createTaskModal";
import { openTaskModal } from "../../utils/redux/taskModal";
import { useDispatch } from "react-redux";


type Props = {};

function BoardPage({}: Props) {
    const dispatch = useDispatch();
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [categories, setCategories] = React.useState<ProjectCategory[]>([]);
    const [members, setMembers] = React.useState<ProjectMember[]>([]);
    const [newCategoryName, setNewCategoryName] = React.useState(""); 
    const selectedProject = useAppSelector(
        (state) => state.projects.selectedProject
    );
    useEffect(() => {
        if (!selectedProject) return;

        getTasksForProject(selectedProject.id).then((res) => {
            setTasks(res);
        });

        // get categories for project
        getProjectCategories(selectedProject.id).then((res) => {
            setCategories(res);
        });

        getProjectMembers(selectedProject.id).then((res) => {
            setMembers(res);
        });
    }, []);

    const colorMode = useAppSelector((state) => state.users.colorMode);

    const addCategoryButtonRef = React.useRef<HTMLDivElement>(null);
    const addCategoryInputRef = React.useRef<HTMLDivElement>(null);

    const addCategoryShowInput = () => {
        addCategoryButtonRef.current?.style.setProperty("display", "none");
        addCategoryInputRef.current?.style.setProperty("display", "flex");
    };

    const cancelCategoryInput = () => {
        addCategoryButtonRef.current?.style.setProperty("display", "flex");
        addCategoryInputRef.current?.style.setProperty("display", "none");
    };

    const addCategory = () => {
        //TODO: send request for creating category, check the response (get the id), then add the category
        console.log("add category");
        createCategory(selectedProject!.id, newCategoryName).then((res: any) => {
            const newCategory: ProjectCategory = {
                id: res.content,
                name: newCategoryName,
            }
            setCategories([
                ...categories,
                newCategory
            ]);
            cancelCategoryInput();
        });
        
    };


    return (
        <Box
            flexGrow={1}
            sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
            })}
        >
            <Box
                sx={(theme) => ({
                    padding: "20px",
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.primary.contrastText,
                    display: "flex",
                    justifyContent: "space-between",
                })}
            >
                <Typography
                    variant="h4"
                    margin="0 20px"
                    fontWeight="bold"
                    sx={(theme) => ({
                        color:
                            colorMode == "dark"
                                ? "#fff"
                                : secondary.secondary900,
                    })}
                >
                    {selectedProject?.name}
                </Typography>
                <Box display="flex" gap="10px">
                    <Box display="flex" gap="5px">
                        <AvatarGroup max={4}>
                            {members.map((member, index) => (
                                <StyledAvatar
                                    key={index}
                                    name={member.firstName + member.lastName}
                                    colorful={true}
                                />
                            ))}
                        </AvatarGroup>
                        <AddCircleOutlineOutlinedIcon
                            sx={(theme) => ({
                                alignSelf: "center",
                                fontSize: "36px",
                                color:
                                    colorMode == "dark"
                                        ? "#fff"
                                        : secondary.secondary900,
                            })}
                        />
                    </Box>
                    <InfoOutlinedIcon
                        sx={{
                            alignSelf: "center",
                            fontSize: "36px",
                            color:
                                colorMode == "dark"
                                    ? "#fff"
                                    : secondary.secondary900,
                        }}
                    />
                    <MoreHorizIcon
                        sx={{
                            alignSelf: "center",
                            fontSize: "36px",
                            color:
                                colorMode == "dark"
                                    ? "#fff"
                                    : secondary.secondary900,
                        }}
                    />
                </Box>
            </Box>
            <Box
                display="flex"
                gap="27px"
                margin="40px"
                alignItems="flex-start"
                overflow="auto"
                flexGrow={1}
            >
                {categories.map((category) => (
                    <Box
                        key={category.id}
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                        border="1px solid white"
                        padding="15px"
                        borderRadius="30px"
                        width="300px"
                        minWidth="300px"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-end"
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {category.name}
                            </Typography>
                            {/* <MoreHorizIcon
                                sx={{ alignSelf: "flex-end", fontSize: "36px" }}
                            /> */}
                            <CategoryMenu />
                        </Box>
                        <Box display="flex" gap="10px" flexDirection="column">
                            {tasks
                                .filter(
                                    (task) => task.categoryId === category.id
                                )
                                .map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onClick={() => {
                                          dispatch(openTaskModal({
                                          taskId: task.id,
                                          taskTitle: task.title,
                                          taskDesc: task.description,
                                          taskDueDate: task.dueDate,
                                          taskAssignees: task.assignees,
                                          taskCategoryId: task.categoryId
                                        }
                                        ))}}
                                    ></TaskCard>
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
                                color: theme.palette.primary.contrastText,
                                alignSelf: "flex-start",
                            })}
                            onClick={() => dispatch(openModal())}>
                            Add a card
                        </Button>
                    </Box>
                ))}
                <Box
                    border="1px solid white"
                    padding="5px"
                    borderRadius="30px"
                    ref={addCategoryButtonRef}
                >
                    <Button
                        startIcon={
                            <AddCircleIcon
                                sx={(theme) => ({
                                    color: theme.palette.primary.main,
                                })}
                            />
                        }
                        sx={(theme) => ({
                            color: theme.palette.primary.contrastText,
                        })}
                        onClick={addCategoryShowInput}
                    >
                        Add another category
                    </Button>
                </Box>
                <Box
                    ref={addCategoryInputRef}
                    display="none"
                    flexDirection="column"
                    justifyContent="flex-start"
                    gap="10px"
                >
                    <TextField
                        label="Enter category title"
                        variant="outlined"
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <Box display="flex" gap="10px">
                        <Button
                            variant="contained"
                            sx={(theme) => ({
                                color: theme.palette.primary.contrastText,
                            })}
                            onClick={addCategory}
                        >
                            Add category
                        </Button>
                        <Button
                            variant="outlined"
                            sx={(theme) => ({
                                color: theme.palette.primary.contrastText,
                            })}
                            onClick={cancelCategoryInput}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default BoardPage;
