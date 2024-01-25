import { AvatarGroup, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Task } from "../../../utils/models/Task";
import { secondary } from "../../../utils/theme/theme";
import { useAppSelector } from "../../../utils/redux/store";
import ItemDateLabel from "../../../widgets/ItemDateLabel";
import ItemLabel from "../../../widgets/ItemLabel";
import StyledAvatar from "../../../widgets/StyledAvatar";

type Props = {
    task: Task;
    onClick: () => void;
};

function TaskCard({ task, onClick }: Props) {
    const colorMode = useAppSelector((state) => state.users.colorMode);

    return (
      <button onClick={onClick} style={{all: 'unset'}}>
        <Paper sx={{ cursor: 'pointer', padding: "20px", borderRadius: "20px", border: colorMode == 'light' ? "1px solid black" : 'none', 
            '&:hover': {
              border: colorMode === 'light' ? "1px solid #f0f0f0" : '1px solid #98AEEB'
            }}}>
            <Typography
                textOverflow="wrap"
                sx={(theme) => ({
                    color:
                        colorMode == "dark" ? "#fff" : secondary.secondary900,
                })}
            >
                {task.title}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px">
                <ItemDateLabel dueDate={task.dueDate} />
                <AvatarGroup max={3}>
                    {task.assignees.map((assignee) => (
                        <StyledAvatar key={assignee.username} name={assignee.firstName.toUpperCase() + ' ' + assignee.lastName.toUpperCase()} colorful={true} width="30px" height="30px" />
                    ))}
                </AvatarGroup>
            </Box>
        </Paper>
      </button>
    );
}

export default TaskCard;
