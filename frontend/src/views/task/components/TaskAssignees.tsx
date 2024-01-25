import { AvatarGroup, Stack, Typography } from "@mui/material";
import StyledAvatar from "../../../widgets/StyledAvatar";
import { Assignees } from "../../../utils/models/Assignees";

interface TaskAssigneesProps {
  assignees: Assignees[]; 
}

export default function TaskAssignees({assignees}: TaskAssigneesProps){
  if (assignees.length === 1) {
    const singleAssigneeName = assignees[0].firstName + " " + assignees[0].lastName;
    return (
      <Stack direction="row" gap={0.5} alignItems="center">
        <StyledAvatar name={singleAssigneeName} colorful />
        <Typography variant="body1" fontSize={14}>{singleAssigneeName}</Typography>
      </Stack>
    );
  }
  return (
    <AvatarGroup max={5}>
      {assignees.map((assignee) => (
        <StyledAvatar key={assignee.username}
          name={assignee.firstName + ' ' + assignee.lastName} 
          colorful />
      ))}
    </AvatarGroup>
  );
}