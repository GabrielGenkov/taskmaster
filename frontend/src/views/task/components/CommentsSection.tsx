import { useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    TextField,
    Button,
    Stack,
    Box,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material";
import StyledAvatar from "../../../widgets/StyledAvatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Project } from "../../../utils/models/Project";
import { NewComment } from "../../../utils/models/NewComment";
import { secondary } from "../../../utils/theme/theme";
import {
    createComment,
    deleteComment,
    editComment,
    getCommentsForTask,
} from "../../../utils/axios/apiClient";
import { Comment } from "../../../utils/models/Comment";

interface commentSectionProps {
    selectedProject: Project;
    taskId: number;
}

const CommentsSection: React.FC<commentSectionProps> = ({
    selectedProject,
    taskId,
}) => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    //Comments local state
    const [comments, setComments] = useState<Comment[]>([]);

    // Getting the comments
    useEffect(() => {
        if (!selectedProject && taskId) {
            return;
        }
        getCommentsForTask(selectedProject.id, taskId).then(
            (comments: Comment[]) => {
                setComments(comments);
            }
        );
    }, [selectedProject, taskId]);

    const [buttonExpanded, setButtonExpanded] = useState(false);
    function handleExpandButton() {
        setButtonExpanded((prevState) => !prevState);
    }

    //Creating a comment
    const handleCreateComment = async () => {
        const commentContent: NewComment = {
            content: newCommentText,
        };

        await createComment(selectedProject.id, taskId, commentContent);
        setNewCommentText("");
        setIsTyping(false);
    };
    const [newCommentText, setNewCommentText] = useState<string>("");
    const [isTyping, setIsTyping] = useState(false);

    const handleCancelTyping = () => {
        setNewCommentText("");
        setIsTyping(false);
    };

    // Comments options logic
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenuCommentId, setOpenMenuCommentId] = useState<number | null>(
        null
    );
    const openCommentOptions = Boolean(anchorEl);

    const handleCommentOptionsClick =
        (commentId: number) => (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
            setOpenMenuCommentId(commentId);
        };
    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenuCommentId(null);
    };

    //Comment editing
    const [editingCommentId, setEditingCommentId] = useState<number | null>(
        null
    );
    const [editCommentValue, setEditCommentValue] = useState<string>("");
    const editInputRef = useRef<HTMLInputElement>(null);

    function handleStartEditingComment(
        commentId: number,
        commentContent: string
    ) {
        setEditingCommentId(commentId);
        setEditCommentValue(commentContent);
        handleClose();
    }
    useEffect(() => {
        if (editInputRef && editInputRef.current) {
            editInputRef.current?.focus();
        }
    }, [editingCommentId]);

    const handleEditComment = async (commentId: number) => {
        const commentContent: NewComment = {
            content: editCommentValue,
        };
        await editComment(
            selectedProject.id,
            taskId,
            commentId,
            commentContent
        );
        setEditingCommentId(null);
    };

    const handleDeleteComment = async (commentId: number) => {
        await deleteComment(selectedProject.id, taskId, commentId);
    };

    return (
        <Card
            sx={{
                bgcolor:
                    mode === "dark"
                        ? secondary.secondary900
                        : secondary.secondary50,
            }}
        >
            <CardContent>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        multiline
                        color="secondary"
                        placeholder="Add a comment..."
                        variant="outlined"
                        value={newCommentText}
                        onChange={(e) => {
                            if (e.target.value !== "") {
                                setIsTyping(true);
                            } else {
                                setIsTyping(false);
                            }
                            setNewCommentText(e.target.value);
                        }}
                        sx={{
                            width: "100%",
                            backgroundColor:
                                mode === "dark"
                                    ? secondary.secondary700
                                    : "#FAFAFA",
                            borderRadius: "5px",
                            mb: 1,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "5px",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#98AEEB",
                                },
                            },
                        }}
                    />
                    <Stack
                        direction={"row"}
                        gap={1}
                        sx={{ display: isTyping ? "flex" : "none" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleCreateComment}
                        >
                            Save
                        </Button>
                        <Button
                            variant="text"
                            color="error"
                            onClick={handleCancelTyping}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
                {comments.map((comment) => (
                    <CardHeader
                        key={comment.id}
                        avatar={
                            <StyledAvatar
                                name={
                                    comment.commentOwner.firstName +
                                    " " +
                                    comment.commentOwner.lastName
                                }
                                colorful
                            ></StyledAvatar>
                        }
                        action={
                            <Box>
                                <IconButton
                                    aria-label="more"
                                    id={`options-button-${comment.id}`}
                                    aria-controls={
                                        openCommentOptions
                                            ? "options-menu"
                                            : undefined
                                    }
                                    aria-expanded={
                                        openCommentOptions ? "true" : undefined
                                    }
                                    aria-haspopup="true"
                                    onClick={handleCommentOptionsClick(
                                        comment.id
                                    )}
                                    sx={{ ml: "5px" }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="options-menu"
                                    elevation={2}
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={openMenuCommentId === comment.id}
                                    onClose={handleClose}
                                >
                                    <MenuItem
                                        onClick={() =>
                                            handleStartEditingComment(
                                                comment.id,
                                                comment.content
                                            )
                                        }
                                    >
                                        Edit
                                    </MenuItem>
                                    <MenuItem
                                        style={{ color: "red" }}
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                    >
                                        Delete
                                    </MenuItem>
                                </Menu>
                            </Box>
                        }
                        title={
                            comment.commentOwner.firstName +
                            " " +
                            comment.commentOwner.lastName
                        }
                        titleTypographyProps={{
                            color: (theme) => theme.palette.text.secondary,
                        }}
                        subheader={
                            comment.id === editingCommentId ? (
                                <TextField
                                    inputRef={
                                        comment.id === editingCommentId
                                            ? editInputRef
                                            : null
                                    }
                                    value={editCommentValue}
                                    onChange={(e) =>
                                        setEditCommentValue(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleEditComment(comment.id);
                                        }
                                    }}
                                    fullWidth
                                    autoFocus
                                    variant="standard"
                                />
                            ) : (
                                comment.content
                            )
                        }
                        subheaderTypographyProps={{
                            color: (theme) => theme.palette.text.primary,
                        }}
                        sx={{ alignItems: "flex-start" }}
                    />
                ))}
            </CardContent>
            <Stack alignItems={"center"} mb={1}>
                <Button
                    endIcon={
                        !buttonExpanded ? (
                            <ExpandMoreIcon />
                        ) : (
                            <ExpandLessIcon />
                        )
                    }
                    onClick={handleExpandButton}
                >
                    {!buttonExpanded ? "Expand more" : "Expand less"}
                </Button>
            </Stack>
        </Card>
    );
};

export default CommentsSection;
