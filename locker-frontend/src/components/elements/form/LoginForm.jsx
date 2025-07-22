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


export default function LoginForm({ changeAuthStatus }) {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    });

    // function that sets new values when inputs are changed
    function handleInputChange(event) {
        const { name, value } = event.target;
        
        setInputValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // uses form data to validate password against credentials stored in json file
    function handleSubmit(formData) {
        const username = formData.get("username");
        const password = Number(formData.get("password"));

        if (!invalidPassword) {
            fetch('https://locker-api-uoib.onrender.com/credentials')
            .then(res => {
                return res.json();
            })
            .then(credentials => {
                if (credentials.username !== username || credentials.password !== password) {

                    setInvalidCredentials(true);
                    return
                }

                onAuthenticate();
            })
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
                <Button disabled>Log In</Button>
                <Button onClick={changeAuthStatus}>Register</Button>
            </ButtonGroup>
            <Stack spacing={1}>
                <FormControl
                    onChange={(e) => handleInputChange(e)}
                    name="email"
                    type="email"
                    value={inputValues.email}
                    required
                >
                    <FormLabel>Email</FormLabel>
                    <Input/>
                </FormControl>
                <FormControl
                    onChange={(e) => handleInputChange(e)}
                    name="password"
                    type="password"
                    value={inputValues.password}
                    required
                >
                    <FormLabel>Password</FormLabel>
                    <Input/>
                    <FormHelperText>Password should be at least 8 characters.</FormHelperText>
                </FormControl>
                <Button 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </Button> 
            </Stack>
        </Sheet>  
    );
}