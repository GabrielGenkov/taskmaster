import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../utils/redux/store";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../utils/axios/apiClient";
import { User } from "../../utils/models/User";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/redux/users";

type Props = {};

function LogInPage({}: Props) {
    const colorMode = useAppSelector((state) => state.users.colorMode);
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();

    const handleLogin = () => {
        console.log("login");
        signIn(email, password).then((res: any) => {
            console.log(res);
            let content = res.content;
            const user: User = {
                firstName: content.firstName,
                lastName: content.lastName,
                email: content.email,
                accessToken: content.accessToken,
                username: content.username,
                roles: content.roles,
            };
            dispatch(setUser(user));
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/home");
        });
    };

    return (
        <Box marginTop="40px">
            <Container maxWidth="md">
                <Paper
                    sx={(theme) => ({
                        backgroundColor:
                            colorMode == "dark"
                                ? theme.palette.secondary.dark
                                : "white",
                        borderRadius: "20px",
                    })}
                >
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "40px",
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignContent="left"
                            alignItems="left"
                            width="100%"
                        >
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                        </Box>
                        <Box
                            component="form"
                            noValidate
                            sx={{ mt: 1 }}
                            width="100%"
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                alignContent="left"
                                alignItems="left"
                                width="100%"
                            >
                                <Button href="#" variant="text">
                                    Forgotten credentials?
                                </Button>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: "white" }}
                                onClick={handleLogin}
                            >
                                Log in
                            </Button>
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                alignContent="left"
                                alignItems="left"
                                width="100%"
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    align="center"
                                >
                                    {"No account?"}
                                    <Button
                                        variant="text"
                                        onClick={() => {
                                            navigate("/register");
                                        }}
                                    >
                                        Register
                                    </Button>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default LogInPage;
