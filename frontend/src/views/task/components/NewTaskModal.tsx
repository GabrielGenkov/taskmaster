import { useEffect, useState } from "react";
import {
    TextField,
    Divider,
    Typography,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    AvatarGroup,
} from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ListIcon from "@mui/icons-material/List";
import CustomDatePicker from "./CustomDatePicker";
import PrimaryButton from "./PrimaryButton";
import StyledModal from "./StyledModal";
import ItemLabel from "../../../widgets/ItemLabel";
import { styled, useTheme } from "@mui/material/styles";
import AddLabelButton from "./AddLabelButton";
import AddUsersPopover from "./AddUsersPopover";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../utils/redux/store";
import { ProjectMember } from "../../../utils/models/ProjectMember";
import { closeModal } from "../../../utils/redux/createTaskModal";
import { secondary } from "../../../utils/theme/theme";
import { NewTask } from "../../../utils/models/NewTask";
import { createTask } from "../../../utils/redux/projects";
import TaskAssignees from "./TaskAssignees";
import { Assignees } from "../../../utils/models/Assignees";
import { getProjectCategories } from "../../../utils/axios/apiClient";
import { ProjectCategory } from "../../../utils/models/ProjectCategory";
import StyledDivider from "./StyledDivider";

function NewTaskModal() {
    const dispatch = useAppDispatch();
    const isNewTaskModalOpen = useAppSelector(
        (state) => state.createTaskModal.isModalOpen
    );
    const selectedProject = useAppSelector(
        (state) => state.projects.selectedProject
    );

    function handleSetAssignees(member: ProjectMember) {
        const newAssignee = {
            username: member.username,
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
        };

        setAssignees((prevAssignees) => {
            if (
                prevAssignees.some(
                    (assignee) => assignee.username === newAssignee.username
                )
            ) {
                return prevAssignees;
            }
            return [...prevAssignees, newAssignee];
        });
    }

    function handleDateChange(newDate: Dayjs | null) {
        const formattedDate = newDate
            ? dayjs(newDate).format("YYYY-MM-DD")
            : "";
        setDueDate(formattedDate);
    }

    function handleCloseModal() {
        setTitle("");
        setDescription("");
        setDueDate("");
        setAssignees([]);
        setCategoryId(null);
        dispatch(closeModal());
    }
    // Check for the theme
    const theme = useTheme();
    const mode = theme.palette.mode;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [assignees, setAssignees] = useState<Assignees[]>([]);
    const [projectCategories, setProjectCategories] = useState<
        ProjectCategory[]
    >([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);

    useEffect(() => {
        if (!selectedProject) {
            return;
        }
        getProjectCategories(selectedProject.id).then(
            (projectCategories: ProjectCategory[]) => {
                setProjectCategories(projectCategories);
            }
        );
    }, []);

    const handleAddTask = () => {
        if (!validateForm()) {
            alert("Please fill in all required fields."); // You can replace this with a more sophisticated feedback mechanism
            return;
        }
        const assigneesUsernames = assignees.map(
            (assignee) => assignee.username
        );
        const newTask: NewTask = {
            title: title,
            description: description,
            dueDate: dueDate,
            assignees: assigneesUsernames,
            categoryId: categoryId,
        };

        dispatch(createTask(newTask));
        handleCloseModal();
    };

    const validateForm = () => {
        return (
            title.trim() !== "" &&
            description.trim() !== "" &&
            dueDate !== "" &&
            assignees.length !== 0 &&
            categoryId !== null
        );
    };

    return (
        <StyledModal
            open={isNewTaskModalOpen}
            onClose={handleCloseModal}
            title="Create new task"
            titleFontSize={32}
        >
            <TextField
                multiline
                required
                color="secondary"
                placeholder="Create task"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                    width: "100%",
                    backgroundColor:
                        mode === "dark" ? secondary.secondary700 : "#FAFAFA",
                    borderRadius: "5px",
                    mt: 1,
                    mb: 1,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "5px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#98AEEB",
                        },
                    },
                }}
            />
            <TextField
                multiline
                color="secondary"
                rows={4}
                placeholder="Add task description..."
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                    width: "100%",
                    backgroundColor:
                        mode === "dark" ? secondary.secondary700 : "#FAFAFA",
                    borderRadius: "5px",
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "5px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#98AEEB",
                        },
                    },
                }}
            />
            <Stack direction={"row"} gap={1.5} alignItems="center">
                {" "}
                {/* not functional */}
                <LabelOutlinedIcon
                    sx={{ color: theme.palette.text.secondary }}
                />
                <Stack direction={"row"} gap={1}>
                    <ItemLabel label="Front-end" />
                    <ItemLabel label="Design" />
                </Stack>
                <AddLabelButton />
            </Stack>
            <StyledDivider />
            <Stack direction={"row"} gap={1.5} alignItems="center">
                <PersonAddAltOutlinedIcon
                    sx={{ color: theme.palette.text.secondary }}
                />
                <TaskAssignees assignees={assignees} />
                <AddUsersPopover
                    selectedProject={selectedProject}
                    assignMember={handleSetAssignees}
                />
            </Stack>
            <StyledDivider />
            <Stack
                direction={{ sm: "row", xs: "column" }}
                gap={{ sm: 1.5, xs: 2 }}
                alignItems={{ sm: "flex-end", xs: "flex-start" }}
                mt={2}
                justifyContent={"space-between"}
            >
                <Stack direction="row" spacing={1} alignItems={"center"}>
                    <CalendarMonthOutlinedIcon
                        sx={{ color: theme.palette.text.secondary }}
                    />
                    <CustomDatePicker formatDate={handleDateChange} />
                </Stack>
                <Stack direction="row" spacing={1} alignItems={"center"}>
                    <ListIcon sx={{ color: theme.palette.text.secondary }} />
                    <FormControl
                        sx={{ minWidth: 120 }}
                        variant="outlined"
                        size="small"
                    >
                        <InputLabel>Category</InputLabel>
                        <Select
                            id="demo-simple-select"
                            label="Add to list"
                            required
                            value={categoryId === null ? "" : categoryId}
                            onChange={(event) => {
                                const value =
                                    event.target.value === ""
                                        ? null
                                        : Number(event.target.value);
                                setCategoryId(value);
                            }}
                        >
                            <MenuItem value="">None</MenuItem>
                            {projectCategories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
            <PrimaryButton onClick={handleAddTask} text={"Add task"} />
        </StyledModal>
    );
}

export default NewTaskModal;
