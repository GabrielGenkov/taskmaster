import React, { useEffect } from "react";
import "./App.css";
import Header from "./layout/header/Header";
import { lightTheme, darkTheme } from "./utils/theme/theme";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useAppSelector } from "./utils/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./utils/redux/users";
import NewTaskModal from "./views/task/components/NewTaskModal";
import TaskModal from "./views/task/components/TaskModal";
import ProjectModal from "./utils/redux/projectModal";
import CreateProjectModal from "./views/home/components/CreateProjectModal";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const currentUser = useAppSelector((state) => state.users.user);

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if (localUser && !currentUser) {
            dispatch(setUser(JSON.parse(localUser)));
        }
    }, []);

    //check use preferences for theme and inject
    const colorMode = useAppSelector((state) => state.users.colorMode);
    const theme = colorMode === "light" ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
                <CssBaseline />

                <Box
                    display="flex"
                    flexDirection="column"
                    maxHeight="100vh"
                    height="100vh"
                    width="100vw"
                >
                    <Box height="10%" maxHeight="10%">
                        <Header></Header>
                    </Box>
                    {location.pathname === "/" ? (
                        <Navigate to="/home" replace={true} />
                    ) : (
                        <Box
                            sx={{
                                height: "85%",
                                display: "flex",
                                flexGrow: 1,
                                width: "100vw",
                                flexDirection: "column",
                            }}
                        >
                            <Outlet></Outlet>
                        </Box>
                    )}
                    <NewTaskModal />
                    <TaskModal />
                    <CreateProjectModal />
                </Box>
            </StyledEngineProvider>
        </ThemeProvider>
    );
}

export default App;
