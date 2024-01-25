import {
    Badge,
    FormControlLabel,
    IconButton,
    InputBase,
    Switch,
    Typography,
    alpha,
    styled,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StyledAvatar from "../../widgets/StyledAvatar";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../../utils/redux/store";
import { useDispatch } from "react-redux";
import { setColorMode, setUser } from "../../utils/redux/users";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {};

function Header({}: Props) {
    //TODO: get redux state with the username
    const colorMode = useAppSelector((state) => state.users.colorMode);

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor:
            colorMode == "dark"
                ? alpha(theme.palette.common.white, 0.15)
                : "#fff",
        "&:hover": {
            backgroundColor:
                colorMode == "dark"
                    ? alpha(theme.palette.common.white, 0.25)
                    : alpha(theme.palette.common.white, 0.65),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    }));

    const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
            border: "1px solid white",
            borderRadius: "10px",
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "20ch",
            },
        },
    }));

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(22px)",
                "& .MuiSwitch-thumb:before": {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        "#fff"
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor:
                theme.palette.mode === "dark" ? "#003892" : "#001e3c",
            width: 32,
            height: 32,
            "&:before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor:
                theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            borderRadius: 20 / 2,
        },
    }));

    const theme = useAppSelector((state) => state.users.colorMode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.users.user);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            padding="22px"
            sx={(theme) => ({
                backgroundColor: theme.palette.secondary.dark,
                borderBottom: `2px solid ${theme.palette.secondary.main}`,
            })}
        >
            <Box display="flex" alignItems="center">
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#fff" }}
                    onClick={() => navigate("/")}
                >
                    TaskMasterPro
                </Typography>
            </Box>
            <Box display="flex" gap="10px" alignItems="center">
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search Tasks/Teams"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
                <MaterialUISwitch
                    sx={{ m: 1 }}
                    checked={theme == "dark"}
                    onClick={() =>
                        dispatch(
                            setColorMode(theme == "dark" ? "light" : "dark")
                        )
                    }
                />
                {user != null ? (
                    <Box display="flex" gap="20px" alignItems="center">
                        <IconButton
                            aria-label="show 4 new mails"
                            sx={{ marginRight: "10px" }}
                        >
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon
                                    sx={{ fontSize: "34px", color: "#fff" }}
                                />
                            </Badge>
                        </IconButton>
                        <StyledAvatar name={user.firstName + " " + user.lastName} />
                        <LogoutIcon sx={{color: "#fff"}} onClick={() => {
                            dispatch(setUser(null));
                            localStorage.removeItem("user");
                            navigate("/login");
                        } }></LogoutIcon>
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
}

export default Header;
