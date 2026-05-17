import { Stack, Typography, Box } from "@mui/material";
import SignInForm from "../_components/SignInForm";

const SignUpPage = () => {
    return (
        <Stack
            sx={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ width: 400, p: 4 }}>
                <Box sx={{ mb: 3, textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "medium" }}>
                        Happy to see you back! Login to continue
                    </Typography>
                </Box>

               <SignInForm />
            </Box>
        </Stack>
    );
};

export default SignUpPage;
