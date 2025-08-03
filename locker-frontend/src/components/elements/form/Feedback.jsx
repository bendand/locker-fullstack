import MainNav from "../nav/MainNav";
import { useState } from "react";
import { Textarea } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";

export default function Feedback() {
    const [inputValues, setInputValues] = useState({
        name: '',
        contact: '',
        message: ''
    });

    function handleInputChange(event) {
        const { name, value } = event.target;

        if (name === 'message' && value.length > 300) return;
        
        setInputValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // I'm not sure I want to send user feedback anywhere at this point in development,
    // so I'm just returning this here and the form submission mimics a real submission
    function handleSubmitFeedback() {
        return;
    }

    return (
        <>
            <MainNav  />
            <main>
                <form>
                    <Stack
                        direction='column'
                        sx={{
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}
                    >
                        <FormControl 
                            sx={{
                                padding: 1
                            }}
                        >
                            <FormLabel>Enter your name</FormLabel>
                            <Input
                                name='name'
                                value={inputValues.name}
                                onChange={handleInputChange}
                                required
                            />
                        </FormControl>    
                        <FormControl
                            sx={{
                                padding: 1
                            }}
                        >
                            <FormLabel>Your email</FormLabel>
                            <Input
                                name='contact'
                                value={inputValues.contact}
                                onChange={handleInputChange}
                                required
                            />
                        </FormControl>                                                      
                        <FormControl
                            sx={{
                                padding: 1,
                            }}
                        >                
                            <FormLabel>
                                In &lt;= 300 characters, make a suggestion we can use to improve your experience with Locker.</FormLabel>
                            <Textarea
                                placeholder="Write your comment here"
                                minRows={4}
                                maxRows={4}
                                name='message'
                                value={inputValues.message}
                                onChange={handleInputChange}
                                required
                            />
                        </FormControl>
                        <Button
                            onClick={() => handleSubmitFeedback()}
                            sx={{
                                width: '30%',
                                alignSelf: 'center',
                                padding: 2
                            }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </main>
        </>
    );
}