import MainNav from "../nav/MainNav";
import { Sheet } from "@mui/joy";
import DialogTitle from '@mui/joy/DialogTitle';
import { useState } from "react";
import { Textarea } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";

export default function Feedback() {
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    function handleSubmitFeedback() {
        return
    }

    return (
        <>
            <MainNav  />
            <main>
                <Card variant="outlined" color="neutral"
                    sx={{
                        height: '75%',
                        width: '40%',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div>
                        <h1>We'd love your feedback!</h1>
                    </div>
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
                                <FormLabel>How can we contact you?</FormLabel>
                                <Input
                                    placeholder="Your email here"
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
                                    In 300 characters, make a suggestion we can use to improve your experience with Locker.</FormLabel>
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
                                loading={isSubmitting}
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
                    
                </Card>
            </main>
        </>
    );
}