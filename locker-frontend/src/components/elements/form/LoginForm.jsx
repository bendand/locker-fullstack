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
import { useInput } from '../../../hooks/useInput';
import { isEmail, hasMinLength, hasMaxLength } from '../../../util/validation.js';


export default function LoginForm({ changeAuthStatus, onAuthenticate }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    function handleSubmit() {
        setIsSubmitting(true);
        const allFieldsContainValues = emailValue && passwordValue;
        const anyValuesContainErrors = emailHasError || passwordHasError;

        if (!allFieldsContainValues || anyValuesContainErrors) {
            setIsSubmitting(false);
            return;
        }

        const formData = {
            email: emailValue,
            password: passwordValue
        };

        console.log('Submitting login form with data:', formData);

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            setIsSubmitting(false);
            console.log('Login successful:', res);
            return res.json();
        })
        .then(res => {
            if (res.error) {
                console.error('Error:', res.error);
                // handle different error cases here
                setIsSubmitting(false);
                // if user already exists with the email, show a messsage, 
                // if any other error, show 'something went wrong'

                return;
            }
            setIsSubmitting(false);
            console.log('Registration successful:', res);
            changeAuthStatus();
            onAuthenticate();

        })
    }

    return (
        <Sheet
            variant="outlined"
            sx={{ maxWidth: 350, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
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
                <Button onClick={changeAuthStatus}>Register</Button>
            </ButtonGroup>
            <Stack spacing={1}>
                <FormControl
                    name="email"
                    value={emailValue}
                    error={emailHasError}
                    required
                >
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
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
                    required
                >
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
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
                    onClick={handleSubmit}
                    loading={isSubmitting}
                >
                    Submit
                </Button> 
            </Stack>
        </Sheet>  
    );
}