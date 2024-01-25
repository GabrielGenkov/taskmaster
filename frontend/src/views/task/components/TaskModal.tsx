import { useEffect, useRef, useState } from 'react';
import {
  Link,
  Grid,
  Stack,
  FormControl,
  RadioGroup,
  Radio,
  Box,
  FormControlLabel,
  useTheme,
  Typography,
  styled,
  TextField,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import StyledModal from './StyledModal';
import CustomDatePicker from './CustomDatePicker';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CommentsSection from './CommentsSection';
import ItemLabel from '../../../widgets/ItemLabel';
import AddUsersPopover from './AddUsersPopover';
import AddLabelButton from './AddLabelButton';
import { useDispatch } from 'react-redux';
import TaskAssignees from './TaskAssignees';
import dayjs, { Dayjs } from 'dayjs';
import PrimaryButton from './PrimaryButton';
import { ProjectMember } from '../../../utils/models/ProjectMember';
import { useAppDispatch, useAppSelector } from '../../../utils/redux/store';
import { closeTaskModal, editTask } from '../../../utils/redux/taskModal';
import { Assignees } from '../../../utils/models/Assignees';
import { ProjectCategory } from '../../../utils/models/ProjectCategory';
import { getProjectCategories } from '../../../utils/axios/apiClient';
import { NewTask } from '../../../utils/models/NewTask';
import { deleteTask } from '../../../utils/redux/projects';
import { secondary } from '../../../utils/theme/theme';

const StyledSubHeading = styled(Typography)(({theme}) => ({
  variant: 'h4',
  fontSize: 18,
  color: theme.palette.text.secondary,
}))

const TaskModal = () => {
  const dispatch = useAppDispatch();
  //task state
  const { isTaskModalOpen, taskId, taskTitle, taskDesc, taskDueDate, taskAssignees, taskCategoryId } = useAppSelector((state) => state.taskModal);
  // closing the modal
  function HandleCloseModal(){
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignees([]);
    setCategoryId(null);
    setCategoryName('');
    dispatch(closeTaskModal())
  }

  // Get selected project
  const selectedProject = useAppSelector(
    (state) => state.projects.selectedProject
  );

  // local states
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDesc);
  const [dueDate, setDueDate] = useState(taskDueDate); 
  const [assignees, setAssignees] = useState<Assignees[]>(taskAssignees); 
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([])
  const [categoryId, setCategoryId] = useState<number | null>(taskCategoryId); 
  const [categoryName, setCategoryName] = useState<string | null>(null)

  useEffect(() => {
    setTitle(taskTitle);
    setDescription(taskDesc);
    setDueDate(taskDueDate);
    setAssignees(taskAssignees);
    setCategoryId(taskCategoryId);
    setDescIsEdited(false)
  }, [taskTitle, taskDesc, taskDueDate, taskAssignees, taskCategoryId]);
  //Assignees logic
  function handleSetAssignees(member: ProjectMember) {
    const newAssignee = {
      username: member.username,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email
    };
  
    setAssignees(prevAssignees => {
      if (prevAssignees.some(assignee => assignee.username === newAssignee.username)) {
        return prevAssignees;
      }
      return [...prevAssignees, newAssignee];
    });
  }

  //Project categories
  useEffect(() => {
    if (!selectedProject) {
      return;
  }
    getProjectCategories(selectedProject.id).then((projectCategories: ProjectCategory[]) => {
      setProjectCategories(projectCategories);
    })
  }, [selectedProject, taskId])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleEditCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseCategoryMenu = () => {
    setAnchorEl(null);
  }

  const handleCategoryMenuClick = (categoryId: number) => {
    setCategoryId(categoryId)
    handleCloseCategoryMenu();
  }

  // Setting the category name to display it in the modal
  useEffect(() => {
    const foundCategory = projectCategories.find((category) => category.id === categoryId);
    setCategoryName(foundCategory ? foundCategory.name : '');
  },[projectCategories, categoryId])

  // date picker logic
  function handleDateChange(newDate: Dayjs | null) {
    const formattedDate = newDate ? dayjs(newDate).format('YYYY-MM-DD') : '';
    setDueDate(formattedDate);
  }

  //Description logic
  const [descIsEdited, setDescIsEdited] = useState(false);
  const descriptionFieldRef = useRef<HTMLInputElement>(null);
  function editTaskDescription(){
    setDescIsEdited((prev) => !prev)
  }
  useEffect(() => {
    if (descIsEdited && descriptionFieldRef.current) {
      descriptionFieldRef.current.focus(); 
    }
  }, [descIsEdited]);

  //Editing the title
  const [editTitle, setEditTitle] = useState(false);
  function handleEditTitle() {
    setEditTitle((prev) => !prev);
  }

  // Check for the theme
  const theme = useTheme();
  const mode = theme.palette.mode;

  //Put Request
  const handleEditTask = () => {
    const assigneesUsernames = assignees.map((assignee) => assignee.username);
    const newTask: NewTask = {
      title: title,
      description: description,
      dueDate: dueDate, 
      assignees: assigneesUsernames,
      categoryId: categoryId,
    };

    dispatch(editTask(newTask)); 
    HandleCloseModal(); 
  };

  const handleDeleteTask = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
      HandleCloseModal(); 
    }
  }

  return(
    <StyledModal open={isTaskModalOpen} onClose={HandleCloseModal} onClick={handleEditTitle} title={editTitle ? '' : title} titleFontSize={24} minWidth={630}>
      {editTitle ? 
      <TextField autoFocus sx={{mb: 1}} variant="standard" value={title} onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => {
        if(e.key === 'Enter'){
          handleEditTitle();
        }
      }}/>
      : ''}
      <Box sx={{fontSize: '14px', color: theme.palette.text.secondary, mb: 1 }}>
        {'In List: '}
        <Button onClick={handleEditCategory} variant='text' color='inherit' sx={{fontSize: '0.8em', ":hover": {color: '#14919B', fontWeight: 'bold',}}}>
          { categoryName }
        </Button>
        <Menu
          id="category-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseCategoryMenu}
        >
          {projectCategories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => handleCategoryMenuClick(category.id)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Stack gap={0.5} mt={2}>
        <StyledSubHeading>Description</StyledSubHeading>
        <Stack direction={'row'} gap={1}>
          <TextField multiline
              placeholder="Add task description..."
              variant="outlined" 
              fullWidth
              inputRef={descriptionFieldRef}
              disabled={!descIsEdited}
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                backgroundColor: mode === 'dark' ? secondary.secondary700 : '#FAFAFA',
                borderRadius: '5px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '5px',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#98AEEB', 
                  },
                },
              }}
            />
          <Button variant="text" onClick={editTaskDescription}>
            {descIsEdited ? 'Save' : 'Edit'}
          </Button>
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1, mb:(3) }} >
        <Grid container spacing={2} mt={1} mb={2}>
          <Grid item xs={12} sm={6}>
            <Stack direction={'column'} gap={0.5}>
              <Stack direction="row" spacing={1}>
                <PersonAddAltOutlinedIcon sx={{color: theme.palette.text.secondary}}/>
                <StyledSubHeading>Members</StyledSubHeading>
              </Stack>
              <Stack  direction="row" alignItems={'center'}>
              <TaskAssignees assignees={assignees}/>
              <AddUsersPopover marginLeft='10px' selectedProject={selectedProject} assignMember={handleSetAssignees}/>
              </Stack>

            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Box sx={{display: 'flex', gap: 0.5, flexDirection: 'column'}}>
              <Stack direction="row" spacing={1}>
                <LabelOutlinedIcon sx={{color: theme.palette.text.secondary}}/>
                <StyledSubHeading>Labels</StyledSubHeading>
              </Stack>
              <Stack  direction="row" alignItems={'center'}>
                <Stack direction="row" alignItems={'center'} spacing={1} flexWrap={'wrap'} useFlexGap>
                  <ItemLabel label='Front-end' />
                  <ItemLabel label='Back-end' />
                </Stack>
                <AddLabelButton marginLeft='10px'/>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Box sx={{display: 'flex', gap: 0.5, flexDirection: 'column'}}>
              <Stack direction="row" spacing={1} mb={1}>
                <CalendarMonthOutlinedIcon sx={{color: theme.palette.text.secondary}}/>
                <StyledSubHeading>Due Date</StyledSubHeading>
              </Stack>
              <CustomDatePicker taskDate={dueDate} formatDate={handleDateChange}/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Box sx={{display: 'flex', gap: 0.5, flexDirection: 'column'}}>
              <Stack direction="row" spacing={1}>
                <NotificationsOutlinedIcon sx={{color: theme.palette.text.secondary}}/>
                <StyledSubHeading>Notifications</StyledSubHeading>
              </Stack>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="notifications"
                  name="notifications"
                >
                  <FormControlLabel style={{color: theme.palette.text.secondary}} value="enabled" control={<Radio />} label="Enabled"/>
                  <FormControlLabel style={{color: theme.palette.text.secondary}} value="disabled" control={<Radio />} label="Disabled" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Stack direction={'row'} gap={1}>
          <PrimaryButton onClick={handleEditTask} text={'Edit task'}/>
          <Button onClick={handleDeleteTask} variant="outlined" color="error" sx={{mt: (theme) => theme.spacing(3), width: '20%'}}>
            Archive
          </Button>
        </Stack>
      </Box>
      {selectedProject && <CommentsSection selectedProject={selectedProject} taskId={taskId} />}
    </StyledModal>
  )
}

export default TaskModal