import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  titleFontSize: number;
  minWidth?: number
  onClick?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, title, titleFontSize, minWidth, onClick, children }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Dialog
      scroll='body'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: {sm: minWidth ? minWidth : 430, xs: 300},
          border: 1,
          borderColor: '#98AEEB',
          borderRadius: '15px',
          overflow: 'hidden',
        },
        elevation: 2
      }}
    >
      <DialogContent
        sx={{
          padding: theme.spacing(3, 4),
          backgroundColor: theme.palette.background.default,
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 24,
            top: 16,
            color: theme.palette.text.primary,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle onClick={onClick} sx={{ p: 0, maxWidth: '90%', cursor: 'pointer', fontWeight: 'bold', fontSize: titleFontSize }}>
          {title}
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};
//n200 n600

export default CustomModal;