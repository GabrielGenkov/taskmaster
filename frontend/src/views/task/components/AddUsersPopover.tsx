import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import StyledAvatar from '../../../widgets/StyledAvatar';
import { Popover,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  ListItemText,
  ListItemButton
} from '@mui/material'
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from 'react';
import { Project } from '../../../utils/models/Project';
import { ProjectMember } from '../../../utils/models/ProjectMember';
import { getProjectMembers } from '../../../utils/axios/apiClient';

interface Props{
  selectedProject: Project | undefined;
  assignMember: (member: ProjectMember) => void;
  marginLeft? : string | number;
}

const AddUsersPopover: React.FC<Props> = ({selectedProject, assignMember, marginLeft}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Get project members to display in the list for picking a member
  useEffect(() => {
    if (!selectedProject) {
      return;
  }
    getProjectMembers(selectedProject.id).then((projectMembers: ProjectMember[]) => {
      setProjectMembers(projectMembers);
    })
  }, [selectedProject])

  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);

  return (
    <>
          <IconButton 
            onClick={handleClick}
            sx={{
              ml: marginLeft ? marginLeft : 'auto',
              color: theme.palette.text.secondary,
            }}>
            <ControlPointOutlinedIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <List disablePadding>
            {projectMembers.map((member, index) => (
              <React.Fragment key={member.username + index}>
                <ListItem disablePadding>
                <ListItemButton onClick={() => assignMember(member)} sx={{paddingInline: 1}}>
                  <ListItemAvatar  sx={{ minWidth: '46px' }}>
                    <StyledAvatar name={member.firstName + ' ' + member.lastName} width='36px' colorful/>
                  </ListItemAvatar>
                  <ListItemText primary={member.firstName + ' ' + member.lastName} />
                </ListItemButton>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Popover>
    </>
  );
}

export default AddUsersPopover;