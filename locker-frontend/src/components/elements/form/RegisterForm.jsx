import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

export default function RegisterForm({ authStatus }) {
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
                <Button>Log In</Button>
                <Button >Register</Button>
            </ButtonGroup>
            <Stack spacing={1}>
                <Stack 
                    direction="row" 
                    spacing={1}
                    useFlexGap
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: 'wrap'
                    }}
                >
                    <FormControl>
                        <FormLabel>First name:</FormLabel>
                        <Input/>
                    </FormControl>
                        <FormControl>
                        <FormLabel>Last name:</FormLabel>
                        <Input/>
                    </FormControl>
                </Stack>
                <FormControl>
                    <FormLabel>Email:</FormLabel>
                    <Input placeholder="Placeholder" />
                </FormControl>
                <FormControl>
                    <FormLabel>Set password:</FormLabel>
                    <Input/>
                    <FormHelperText>Password should be at least 8 characters.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Re-enter password:</FormLabel>
                    <Input placeholder="Placeholder" />
                    <FormHelperText>Passwords must match.</FormHelperText>
                </FormControl>
                <Button type="submit">Submit</Button> 
            </Stack>
        </Sheet>      
    );
}