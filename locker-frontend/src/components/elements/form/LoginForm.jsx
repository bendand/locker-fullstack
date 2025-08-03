import { useState } from "react";
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import { InfoOutlined } from '@mui/icons-material';
import { useInput } from '../../../hooks/useInput';
import { isEmail, hasMinLength, hasMaxLength } from '../../../util/validation.js';

export default function LoginForm({ changeAuthStatus, handleValidate }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    // all similar looking constants here contain destructured values from my custom hook defined in hooks directory
    // functions passed to this custom hook come from validation.js, and validate input according to needs of the input
    const {value: emailValue, 
        handleInputChange: handleEmailChange, 
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError
    } = useInput('', (value) => {
        return isEmail(value);
    });

    const {value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasError
    } = useInput('', (value) => {
        return hasMinLength(value, 8) && hasMaxLength(value, 40);
    });

    // submits login credentials
    async function handleSubmitLogin() {
        setIsSubmitting(true);

        // checks if any values have errors, theres probably a way to do this more elegantly in my custom hook
        // but I ran out of time hooking up validation
        const anyValuesContainErrors = emailHasError || passwordHasError;
        if (anyValuesContainErrors) {
            setIsSubmitting(false);
            return;
        }

        let response;
        let userData;

        const formData = {
            email: emailValue,
            password: passwordValue
        };

        try {
            response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                if (response.status === 401) {
                    setErrorMessage("Invalid credentials")
                } else {
                    setErrorMessage("Bad request, try again later");
                }
                setIsSubmitting(false);
                return;
            }

            userData = await response.json();
            // puts userId in session storage, handles validation
            sessionStorage.setItem("userId", userData.id);
            handleValidate();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Sheet
            variant="outlined"
            sx={{ maxWidth: 350, borderRadius: 'md', p: 3, boxShadow: 'lg', justifyContent: 'center' }}
        >
        <ModalClose variant="plain" sx={{ m: 1 }} />
            <ButtonGroup 
                buttonFlex={1}
                aria-label="flex button group"
                sx={{
                    p: 2,
                    width: 400,
                    maxWidth: '100%',
                    overflow: 'auto',
                    justifyContent: 'center'
                }}
            >
                <Button disabled>Log In</Button>
                {/* button responsible for toggling auth status */}
                <Button onClick={changeAuthStatus}>Register</Button>
            </ButtonGroup>
            {errorMessage && (
                <FormHelperText sx={{ color: 'red', textAlign: 'center' }}>
                    {errorMessage}
                </FormHelperText>
            )}  
            <Stack spacing={1}>
                <FormControl
                    name="email"
                    value={emailValue}
                    error={emailHasError}
                >
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        required

                    />
                    {emailHasError && (
                        <FormHelperText>
                            <InfoOutlined />
                            Please enter a valid email address.
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl
                    name="password"
                    type="password"
                    value={passwordValue}
                    error={passwordHasError}
                >
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        required
                    />
                    {passwordHasError && (
                        <FormHelperText>
                            <InfoOutlined />
                            Password must be 8-40 characters.
                        </FormHelperText>
                    )}
                </FormControl>
                <Button 
                    type="submit"
                    onClick={handleSubmitLogin}
                    loading={isSubmitting}
                >
                    Submit
                </Button> 
            </Stack>
        </Sheet>  
    );
}