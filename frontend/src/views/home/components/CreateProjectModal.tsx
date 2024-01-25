import {
    Autocomplete,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import StyledModal from "../../task/components/StyledModal";
import PrimaryButton from "../../task/components/PrimaryButton";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ItemLabel from "../../../widgets/ItemLabel";
import TaskAssignees from "../../task/components/TaskAssignees";
import AddUsersPopover from "../../task/components/AddUsersPopover";
import StyledDivider from "../../task/components/StyledDivider";
import { secondary } from "../../../utils/theme/theme";
import { useAppSelector } from "../../../utils/redux/store";
import projectsSlice, { addProject } from "../../../utils/redux/projects";
import {
    ProjectModalState,
    closeProjectModal,
} from "../../../utils/redux/projectModal";
import { useDispatch } from "react-redux";
import { createProject } from "../../../utils/axios/apiClient";
import { Project } from "../../../utils/models/Project";

type Props = {};

function CreateProjectModal({}: Props) {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const mode = useAppSelector((state) => state.users.colorMode);
    const theme = useTheme();
    const isProjectModalOpen = useAppSelector(
        (state) => state.projectModal.isProjectModalOpen
    );
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeProjectModal());
    };
    const [memberEmails, setMemberEmails] = useState<string[]>([]);

    const handleCreateProject = () => {
        createProject(title, description, memberEmails).then((res: any) => {
            const project: Project = {
                id: res.content,
                name: title,
                desc: description,
            };
            dispatch(addProject(project));
            handleCloseModal();
        });
    };

    return (
        <StyledModal
            open={isProjectModalOpen}
            onClose={handleCloseModal}
            title="Create new Project"
            titleFontSize={32}
        >
            <TextField
                multiline
                required
                color="secondary"
                placeholder="Create Project"
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
                placeholder="Add project description..."
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

            <StyledDivider />
            <Stack direction={"row"} gap={1.5} alignItems="center">
                <PersonAddAltOutlinedIcon
                    sx={{ color: theme.palette.text.secondary }}
                />
                <TextField
                    multiline
                    required
                    color="secondary"
                    placeholder="Project member emails, separated by comma"
                    variant="outlined"
                    value={memberEmails.join(",")}
                    onChange={(e) => setMemberEmails(e.target.value.split(","))}
                    sx={{
                        width: "100%",
                        backgroundColor:
                            mode === "dark"
                                ? secondary.secondary700
                                : "#FAFAFA",
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
            </Stack>
            <StyledDivider />
            <PrimaryButton
                onClick={handleCreateProject}
                text={"Create Project"}
            />
        </StyledModal>
    );
}

export default CreateProjectModal;
