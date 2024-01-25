import React from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Paper,
} from "@mui/material";
import { useAppSelector } from "../../utils/redux/store";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../utils/axios/apiClient";

type Props = {};

function RegisterPage({}: Props) {
    const colorMode = useAppSelector((state) => state.users.colorMode);
    const navigate = useNavigate();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleRegister = () => {
        console.log(email, password, firstName, lastName);
        signUp(email, password, firstName, lastName).then((res) => {
            console.log(res);
            navigate("/login");
        });
    }


    return (
        <Box marginTop="40px">
            <Container maxWidth="md">
                <Paper
                    sx={(theme) => ({
                        backgroundColor: colorMode == 'dark' ? theme.palette.secondary.dark : "white",
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
                                Sign up
                            </Typography>
                        </Box>
                        <Box
                            component="form"
                            noValidate
                            sx={{ mt: 1 }}
                            width="100%"
                        >
                            <Box display="flex" gap="10px">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="fname"
                                    autoFocus
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Box>
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
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: "white" }}
                                onClick={handleRegister}
                            >
                                Continue
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
                                    {"Have an account? "}
                                    <Button onClick={() => {navigate("/login")}} variant="text">
                                        Log In
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

export default RegisterPage;
