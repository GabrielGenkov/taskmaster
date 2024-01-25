import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { useTheme } from '@mui/material/styles';
import { Tooltip } from '@mui/material';

interface addLabelButtonProps {
  marginLeft?: string | number
}

const AddLabelButton: React.FC<addLabelButtonProps> = ({marginLeft}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const theme = useTheme();

  const handleIconClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setShowTooltip(true);
  };

  const handleSubmit = () => {
    // TO DO - Add submission logic here
    console.log('Submitted value:', value);
    setIsEditing(false); 
    setShowTooltip(false);
  };

  const handleBlur = () => {
    setValue('');
    setIsEditing(false);
    setShowTooltip(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  if (isEditing) {
    return (
      <Tooltip 
        title="Press Enter to submit" 
        open={showTooltip} 
        disableFocusListener
      >
        <TextField
          size='small'
          autoFocus
          placeholder='Add label'
          sx={{ width: 100, ml: 'auto' }}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </Tooltip>
    );
  }

  return (
    <IconButton 
      sx={{
        ml: marginLeft ? marginLeft : 'auto',
        color: theme.palette.text.secondary,
      }}
      onClick={handleIconClick}
    >
      <ControlPointOutlinedIcon />
    </IconButton>
  );
};

export default AddLabelButton;