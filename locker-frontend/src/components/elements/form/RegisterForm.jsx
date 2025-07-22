import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { isEmail, isNotEmpty, hasMinLength, isEqualToOtherValue, hasMaxLength } from '../../../util/validation.js';

export default function RegisterForm({ changeAuthStatus, onAuthenticate }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {value: firstNameValue, 
        handleInputChange: handleFirstNameChange, 
        handleInputBlur: handleFirstNameBlur,
        hasError: firstNameHasError
    } = useInput('', (value) => {
        return isNotEmpty(value);
    });

    const {value: lastNameValue, 
        handleInputChange: handleLastNameChange, 
        handleInputBlur: handleLastNameBlur,
        hasError: lastNameHasError
    } = useInput('', (value) => {
        return isNotEmpty(value);
    });

    const {value: emailValue, 
        handleInputChange: handleEmailChange, 
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError
    } = useInput('', (value) => {
        return isEmail(value);
    });

    const {value: password1Value,
        handleInputChange: handlePassword1Change,
        handleInputBlur: handlePassword1Blur,
        hasError: password1HasError
    } = useInput('', (value) => {
        return hasMinLength(value, 8) && hasMaxLength(value, 40);
    });

    const {value: password2Value,
        handleInputChange: handlePassword2Change,
        handleInputBlur: handlePassword2Blur,
        hasError: password2HasError
    } = useInput('', (value) => {
        return isEqualToOtherValue(value, password1Value);
    });


    function handleSubmit() {
        setIsSubmitting(true);
        const allFieldsContainValues = firstNameValue && lastNameValue && emailValue && password1Value && password2Value;
        const anyValuesContainErrors = firstNameHasError || lastNameHasError || emailHasError || password1HasError || password2HasError;

        if (!allFieldsContainValues || anyValuesContainErrors) {
            setIsSubmitting(false);
            return;
        }

        const formData = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: password1Value
        };

        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
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
                <Button onClick={changeAuthStatus}>Log In</Button>
                <Button disabled>Register</Button>
            </ButtonGroup>
            <Stack spacing={1}>
                <Stack 
                    direction="row" 
                    spacing={1}
                    sx={{
                        justifyContent: "center",
                        overflow: "auto",
                    }}
                >
                    <FormControl
                        sx={{
                            width: 145
                        }}
                        name="first"
                        value={firstNameValue}
                        error={firstNameHasError}
                        required 
                    >
                        <FormLabel>First name</FormLabel>
                        <Input
                            onChange={handleFirstNameChange}
                            onBlur={handleFirstNameBlur}
                        />
                        {firstNameHasError && (
                            <FormHelperText>
                                <InfoOutlined />
                                Please enter your first name.
                            </FormHelperText>
                        )}

                    </FormControl>
                    <FormControl
                        sx={{
                            width: 145
                        }}
                        name="last"
                        value={lastNameValue}
                        error={lastNameHasError}
                        required
                    >
                        <FormLabel>Last name</FormLabel>
                        <Input
                            onChange={handleLastNameChange}
                            onBlur={handleLastNameBlur}
                        />
                        {lastNameHasError && (
                            <FormHelperText>
                                <InfoOutlined />
                                Please enter your last name.
                            </FormHelperText>
                        )}
                    </FormControl>
                </Stack>
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
                    name="password1"
                    value={password1Value}
                    error={password1HasError}
                    required
                >
                    <FormLabel>Enter password</FormLabel>
                    <Input
                        type="password"
                        onChange={handlePassword1Change}
                        onBlur={handlePassword1Blur}
                    />
                    {password1HasError && (
                        <FormHelperText>
                            <InfoOutlined />
                            Password must be 8-40 characters.
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl
                    name="password2"
                    value={password2Value}
                    error={password2HasError}
                    required
                >
                    <FormLabel>Confirm password</FormLabel>
                    <Input
                        type="password"
                        onChange={handlePassword2Change}
                        onBlur={handlePassword2Blur}
                    />
                    {password2HasError && (
                        <FormHelperText>
                            <InfoOutlined />
                            Passwords must match.
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