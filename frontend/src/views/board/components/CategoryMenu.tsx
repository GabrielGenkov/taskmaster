import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { Box, styled } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAppSelector } from "../../../utils/redux/store";
import { secondary } from "../../../utils/theme/theme";
import { useRef, useState } from "react";

export default function MenuIntroduction() {
    const [anchorEl, setAnchorEl] = useState(null);
    const colorMode = useAppSelector((state) => state.users.colorMode);

    const handleIconClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRenameClick = () => {
        console.log("Rename");
    }

    const handleDeleteClick = () => {
        console.log("Delete");
    }

    const createHandleMenuClick = (menuItem: string) => {
        return () => {
            console.log(`Clicked on ${menuItem}`);
            switch (menuItem) {
                case "rename":
                    handleRenameClick();
                    break;
                case "delete":
                    handleDeleteClick();
                    break;
            }
            handleMenuClose(); // Close the menu after click
        };
    };

    return (
        <Dropdown>
            <MenuButton>
                <MoreHorizIcon
                    onClick={handleIconClick}
                    sx={{
                        alignSelf: "center",
                        fontSize: "36px",
                        color:
                            colorMode === "dark"
                                ? "#fff"
                                : secondary.secondary900,
                    }}
                />
            </MenuButton>
            <Menu slots={{ listbox: Listbox }}>
                <MenuItem onClick={createHandleMenuClick("rename")} >
                    Rename
                </MenuItem>
                <MenuItem onClick={createHandleMenuClick("delete")} sx={{color: "red"}}>
                    Remove
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}

const Listbox = styled("ul")(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 1px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${grey[700]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  z-index: 1;
  `
);

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[50]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  cursor: pointer;
  border: none;
  background: ${
      theme.palette.mode === "dark" ? theme.palette.secondary.dark : "#fff"
  };
  `
);

const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#99CCF3",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E6",
    700: "#0059B3",
    800: "#004C99",
    900: "#003A75",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};
