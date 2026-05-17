import { Stack, Typography, Box } from "@mui/material";
import SignUpForm from "../_components/SignUpForm";

const SignInPage = () => {
    return (
        <Stack
            sx={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ width: "100%", py: 4, px: 10 }}>
                <Box sx={{ mb: 3, textAlign: "left" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Create an Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "medium" }}>
                        Sign up today and unlock a world of possibilities. Your adventure begins here.
                    </Typography>
                </Box>

                <SignUpForm />
            </Box>
        </Stack>
    );
};

export default SignInPage;
