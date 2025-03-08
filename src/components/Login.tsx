import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Container, Box, Typography } from "@mui/material";

const Login: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/store");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Welcome to the App
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sign in with Google to continue
        </Typography>
        <Button variant="contained" color="primary" onClick={login}>
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
