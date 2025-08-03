import { useState } from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Modal from '@mui/joy/Modal';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Person from '@mui/icons-material/Person';
import LogoutForm from '../form/LogoutForm';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function UserDrawer() {
    const [open, setOpen] = useState(false);
    // hanldes open/close of logout modal
    const [openLogout, setOpenLogout] = useState(false);
    const navigate = useNavigate();

    function handleViewProfile() {
        navigate("/profile");
    }

    function handleViewLockerMap() {
        navigate("/lockermap");
    }

    // logout function removes userId in session storage, navigates to home, and toasts on successful logout
    function handleLogout() {
        sessionStorage.removeItem("userId");
        navigate("/");
        toast("Logout successful");
    }


    // this component uses a Drawer component from material UI
    return (
        <Box sx={{ display: 'flex' }}>
            <Button
                variant='plain'
                color='neutral'
            >
                <Person 
                    fontSize='xl3' 
                    onClick={() => setOpen(true)}
                />
            </Button>
            <Drawer 
                open={open} 
                onClose={() => setOpen(false)}
                anchor='right'
            >
                <Box
                role="presentation"
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
                >
                <List>
                    <ListItem onClick={() => handleViewProfile()}>
                        <ListItemButton>My Profile</ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => handleViewLockerMap(true)}>
                        <ListItemButton>My LockerMap</ListItemButton>
                    </ListItem>                    
                    <ListItem onClick={() => setOpenLogout(true)}>
                        <ListItemButton>Log out</ListItemButton>
                    </ListItem>
                </List>
                </Box>
            </Drawer>
            <Modal open={openLogout}>
                <LogoutForm
                    onCancel={() => setOpenLogout(false)}
                    onLogout={() => handleLogout()}
                />
            </Modal>
        </Box>
    );
}
