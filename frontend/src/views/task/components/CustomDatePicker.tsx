import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface CustomDatePickerProps {
  formatDate: (newValue: Dayjs | null) => void;
  taskDate?: string;
}

function convertStringToDate(dateString: string | undefined): Dayjs | null {
  if (!dateString) {
      return null; 
  }
  return dayjs(dateString);
}

function CustomDatePicker({formatDate, taskDate}: CustomDatePickerProps) {
  const [dateValue, setDateValue] = useState<Dayjs | null>(convertStringToDate(taskDate))

    useEffect(() => {
      setDateValue(convertStringToDate(taskDate));
    }, [taskDate]);

  function dateValueHandler(newValue: Dayjs | null){
    setDateValue(newValue);
    formatDate(newValue);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label="Set a due date"
        value={dateValue}
        onChange={(newValue) => dateValueHandler(newValue)}
        slots={{
          openPickerIcon: KeyboardArrowDownIcon,
          
        }}
        slotProps={{
          textField: {
            variant: 'outlined',
            size: 'small',
          },
        }}
        sx={{
          width: '170px',
          boderRadius: '15px',
          ':hover': { outline: 'red'}
        }}
        />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;