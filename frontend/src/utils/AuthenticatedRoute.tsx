import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "./redux/store";
import { Box } from "@mui/material";

interface AuthenticatedRouteProps {
    children: React.ReactNode;
}

function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
    const location = useLocation();
    // Replace 'isLoggedIn' with the actual variable you have in your Redux store
    const user = useAppSelector((state) => state.users.user);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Box sx={{
            margin: "3px 0px",
            height: "85%",
            display: "flex",
            flexGrow: 1,
            width: "100vw",
            flexDirection: "column",
        }}>
            {children}
        </Box>
    );
}

export default AuthenticatedRoute;
