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
import { isEmail, isNotEmpty, hasMinLength, isEqualToOtherValue, hasMaxLength } from '../../../util/validation.js';

export default function RegisterForm({ changeAuthStatus, handleValidate }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // all similar looking constants here contain destructured values from my custom hook defined in hooks directory
    // functions passed to this custom hook come from validation.js, and validate input according to needs of the input
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
        return isEmail(value) && isNotEmpty(value);
    });

    const {value: password1Value,
        handleInputChange: handlePassword1Change,
        handleInputBlur: handlePassword1Blur,
        hasError: password1HasError
    } = useInput('', (value) => {
        return hasMinLength(value, 8) && hasMaxLength(value, 40) && isNotEmpty(value);
    });

    const {value: password2Value,
        handleInputChange: handlePassword2Change,
        handleInputBlur: handlePassword2Blur,
        hasError: password2HasError
    } = useInput('', (value) => {
        return isEqualToOtherValue(value, password1Value) && isNotEmpty(value);
    });


    // handle register function
    async function handleSubmitRegister(event) {
        event.preventDefault();
        setIsSubmitting(true);

        // checks for errors in any values
        const anyValuesContainErrors = firstNameHasError || lastNameHasError || emailHasError || password1HasError || password2HasError;

        if (anyValuesContainErrors) {
            setIsSubmitting(false);
            return;
        }

        let response;
        let userData;

        const formData = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: password1Value
        };

        try {
            response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData)
            })

            // error handling for error type defined in endpoint
            if (!response.ok) {
                if (response.status === 409) {
                    setErrorMessage("User already exists with the email " + formData.email);
                } else {
                    setErrorMessage("Bad request, try again later");
                }
                setIsSubmitting(false);
                return;
            }

            userData = await response.json();
            // stores userId in session to mimic some level of session token auth and then calls submission handler
            // defined in GettingStarted.jsx
            sessionStorage.setItem("userId", userData.id);
            handleValidate();
        } catch (error) {
            // will catch other types of errors not defined in endpoint
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
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
                {/* button responsible for toggling auth status */}
                <Button onClick={changeAuthStatus}>Log In</Button>
                <Button disabled>Register</Button>
            </ButtonGroup>
            {errorMessage && (
                <FormHelperText sx={{ color: 'red', textAlign: 'center' }}>
                    {errorMessage}
                </FormHelperText>
            )}
            <form onSubmit={handleSubmitRegister}>
                <Stack spacing={1}>
                    <Stack 
                        direction="row" 
                        spacing={1}
                        sx={{
                            justifyContent: "center",
                            overflow: "auto",
                        }}
                    >
                
                        {/* basic form control pattern here, label, input, form helper text in case of errors */}
                        
                        <FormControl
                            sx={{
                                width: 145
                            }}
                            name="first"
                            value={firstNameValue}
                            error={firstNameHasError}
                        >
                            <FormLabel>First name</FormLabel>
                            <Input
                                onChange={handleFirstNameChange}
                                onBlur={handleFirstNameBlur}
                                required 
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
                        >
                            <FormLabel>Last name</FormLabel>
                            <Input
                                onChange={handleLastNameChange}
                                onBlur={handleLastNameBlur}
                                required 
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
                        name="password1"
                        value={password1Value}
                        error={password1HasError}
                    >
                        <FormLabel>Enter password</FormLabel>
                        <Input
                            type="password"
                            onChange={handlePassword1Change}
                            onBlur={handlePassword1Blur}
                            required
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
                    >
                        <FormLabel>Confirm password</FormLabel>
                        <Input
                            type="password"
                            onChange={handlePassword2Change}
                            onBlur={handlePassword2Blur}
                            required
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
                        loading={isSubmitting}
                    >
                        Submit
                    </Button> 
                </Stack>
            </form>
        </Sheet>      
    );
}