import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    IconButton,
    ThemeProvider,
    createTheme,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./auth.css";
import axios from "axios";

// Define the custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#74B83E", // Primary color
        },
        secondary: {
            main: "#52BD39", // Secondary color
        },
        background: {
            default: "#F5FBF4", // Background color
        },
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 500, // Increased from 400
    margin: "auto",
    textAlign: "center",
    borderRadius: '16px',
    border: '3px solid #000',
    boxShadow: '8px 8px 0px #000000',
}));

const StyledForm = styled("form")(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(2),
    '& .MuiTextField-root': {
        marginBottom: theme.spacing(3), // Increased spacing between fields
    },
    '& .MuiInputLabel-root': {
        fontSize: '1rem',
        fontWeight: 500,
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '&:hover fieldset': {
            borderColor: '#74B83E',
        },
    },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
    padding: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '4px 4px 0px #000000',
    border: '2px solid #000',
    '&:hover': {
        transform: 'translate(-2px, -2px)',
        boxShadow: '6px 6px 0px #000000',
    },
}));

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // General error message
    const [nameError, setNameError] = useState(""); // Email-specific error
    const [emailError, setEmailError] = useState(""); // Email-specific error
    const [passwordError, setPasswordError] = useState(""); // Password-specific error
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [incomeGroup, setIncomeGroup] = useState("");
    const [interests, setInterests] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setNameError("");
        setError("");
        setEmailError("");
        setPasswordError("");

        // Add validation for required fields
        if (!name || !email || !password || !age || !gender || !incomeGroup) {
            if (!name) setNameError("Name is required");
            if (!email) setEmailError("Email is required");
            if (!password) setPasswordError("Password is required");
            if (!age) setError("Age is required");
            if (!gender) setError("Gender is required");
            if (!incomeGroup) setError("Income Group is required");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/signup`,
                {
                    name,
                    email,
                    password,
                    age: parseInt(age),
                    gender,
                    incomeGroup,
                    interests: interests.length > 0 ? interests : ['education'] // Provide default interest if none selected
                }
            );
            console.log("Signup success:", response.data.success);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    const handleGoogleSignUp = async () => {
        // Handle Google sign-up logic here
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="min-h-[calc(100svh-5rem)] flex">
                {/* Left Column - Motivational Content */}
                <div className="hidden lg:flex lg:w-1/2 bg-violet-200 p-12 flex-col justify-center border-r-4 border-black">
                    <div className="neu-card bg-white p-8 max-w-xl">
                        <h1 className="text-4xl font-bold mb-6">
                            Unlock Access to
                            <br />
                            <span className="highlight-text">Life-Changing Schemes</span>
                        </h1>
                        <div className="space-y-6">
                            <div className="neu-card p-4 bg-violet-100">
                                <h3 className="text-xl font-bold mb-2">🎯 Our Mission</h3>
                                <p>Connecting every Indian citizen with the right government schemes and opportunities.</p>
                            </div>
                            <div className="neu-card p-4 bg-violet-100">
                                <h3 className="text-xl font-bold mb-2">💡 Why Join?</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Personalized scheme recommendations</li>
                                    <li>Stay updated with new schemes</li>
                                    <li>Easy application process</li>
                                    <li>Track your applications</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Signup Form */}
                <div className="w-full lg:w-1/2 flex justify-center items-center p-8 bg-violet-50">
                    <Container component="main" maxWidth="sm">
                        <StyledPaper elevation={0}>
                            <div className="flex items-center justify-between w-full mb-8">
                                <IconButton
                                    onClick={() => navigate("/")}
                                    className="neu-button"
                                    sx={{ 
                                        backgroundColor: 'white',
                                        border: '2px solid black',
                                        boxShadow: '3px 3px 0px #000000',
                                        '&:hover': {
                                            backgroundColor: '#f3f4f6',
                                            transform: 'translate(-2px, -2px)',
                                            boxShadow: '5px 5px 0px #000000',
                                        }
                                    }}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <Typography variant="h4" sx={{ 
                                    fontWeight: "bold",
                                    color: '#1a1a1a'
                                }}>
                                    Create Account
                                </Typography>
                                <div className="w-[40px]"></div>
                            </div>

                            <Typography variant="subtitle1" sx={{ 
                                mb: 4,
                                color: '#666',
                                fontSize: '1.1rem'
                            }}>
                                Join us to discover schemes tailored for you
                            </Typography>

                            {/* Existing form fields with updated styling */}
                            <StyledForm noValidate onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={isSubmitted && !!nameError}
                                    helperText={isSubmitted && nameError}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={isSubmitted && !!emailError}
                                    helperText={isSubmitted && emailError}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={isSubmitted && !!passwordError}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    error={isSubmitted && !!passwordError}
                                    helperText={isSubmitted && passwordError}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="number"
                                    name="age"
                                    label="Age"
                                    inputProps={{ min: 0, max: 120 }}
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    helperText="Enter your age in years"
                                />
                                <TextField
                                    select
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="gender"
                                    label="Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value="">Select Gender</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                                <TextField
                                    select
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="incomeGroup"
                                    label="Income Group"
                                    value={incomeGroup}
                                    onChange={(e) => setIncomeGroup(e.target.value)}
                                >
                                    <MenuItem value="">Select Income Group</MenuItem>
                                    <MenuItem value="EWS">EWS</MenuItem>
                                    <MenuItem value="General">General</MenuItem>
                                    <MenuItem value="OBC">OBC</MenuItem>
                                    <MenuItem value="SC">SC</MenuItem>
                                    <MenuItem value="ST">ST</MenuItem>
                                </TextField>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Interests</InputLabel>
                                    <Select
                                        multiple
                                        value={interests}
                                        onChange={(e) => setInterests(e.target.value)}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        <MenuItem value="">Select Interests</MenuItem>
                                        <MenuItem value="education">Education</MenuItem>
                                        <MenuItem value="health">Health</MenuItem>
                                        <MenuItem value="agriculture">Agriculture</MenuItem>
                                        <MenuItem value="financial">Financial</MenuItem>
                                    </Select>
                                </FormControl>
                                {error && (
                                    <Typography
                                        color="error"
                                        variant="body1"
                                        align="center"
                                        sx={{ 
                                            mb: 2,
                                            padding: '10px',
                                            backgroundColor: '#fee2e2',
                                            borderRadius: '8px'
                                        }}>
                                        {error}
                                    </Typography>
                                )}
                                <SubmitButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary">
                                    Create Account
                                </SubmitButton>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleGoogleSignUp}
                                    sx={{ 
                                        mt: 2,
                                        mb: 3,
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '2px solid #000',
                                        boxShadow: '4px 4px 0px #000000',
                                        '&:hover': {
                                            transform: 'translate(-2px, -2px)',
                                            boxShadow: '6px 6px 0px #000000',
                                        }
                                    }}>
                                    Sign Up with Google
                                </Button>
                                <Box mt={2}>
                                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="font-bold text-[#74B83E] hover:text-[#52BD39] underline">
                                            Sign In
                                        </Link>
                                    </Typography>
                                </Box>
                            </StyledForm>
                        </StyledPaper>
                    </Container>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Signup;
