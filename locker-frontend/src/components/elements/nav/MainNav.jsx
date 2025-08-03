import Button from '@mui/joy/Button';
import { Router, Link as RouterLink } from 'react-router';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import About from '../../About'; 
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import { ListDivider, ListItem, ListItemButton } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import Autocomplete from '@mui/joy/Autocomplete';
import Person from '@mui/icons-material/Person';
import Search from '@mui/icons-material/Person';
import Modal from '@mui/joy/Modal';
import { SearchOutlined, SearchRounded } from '@mui/icons-material';
import UserDrawer from "../nav/UserDrawer";
import { useState } from 'react';
import SearchItemForm from '../form/SearchItemForm';


export default function MainNav() {
    const userId = sessionStorage.getItem("userId");
    const [openSearch, setOpenSearch] = useState(false);
    const [isSearchingItems, setIsSearchingItems] = useState(false);

    return (
        <header>
        {!userId && (
            <Stack
                direction="row"
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    p: 2,
                }}>
                <div>
                    <Link 
                        to={'/'}
                        component={RouterLink}
                        level='title-lg'
                        underline='none'
                        color='black'
                    >
                        <h4>Locker</h4>
                    </Link>
                </div>
                <List
                    role="menubar"
                    orientation="horizontal"
                >
                    <ListItem
                        role="none"
                        component={RouterLink}
                        to={'/about'}
                    >
                        <ListItemButton role='menuitem'>
                            About
                        </ListItemButton>
                    </ListItem>
                </List>
            </Stack>
        )}
        {userId && (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 1300,
                    margin: '0 auto',
                    p: 2,
                }}
            >
                <div>
                    <Link 
                        to={'/'}
                        component={RouterLink}
                        level='title-lg'
                        underline='none'
                        color='black'
                    >
                        <h4>Locker</h4>
                    </Link>
                </div>
                <Stack
                    direction="row"
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <List
                        role="menubar"
                        orientation="horizontal"

                        spacing={1}
                    >
                        <ListItem 
                            role="none"
                            component={RouterLink}
                            to={'/lockerlist'}
                            padding={1}

                        >
                            <ListItemButton role="menuitem">
                                My Lockers
                            </ListItemButton>
                        </ListItem>
                        <ListItem 
                            role="none"
                            component={RouterLink}
                            to={'/feedback'}
                            padding={1}

                        >
                            <ListItemButton role="menuitem">
                                Leave Feedback
                            </ListItemButton>
                        </ListItem>
                        <ListItem 
                            role="none"
                            component={RouterLink}
                            padding={1}
                        >
                            <ListItemButton role="menuitem" onClick={() => setOpenSearch(true)}>
                                Find Item
                                <SearchOutlined />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <UserDrawer />
                </Stack>
            </Box>
        )}
        <Modal 
            open={openSearch} 
            onClose={() => setOpenSearch(false)}
        >
            <SearchItemForm
                onSubmission={{
                    closeModal: () => setOpenSearch(false)
                }}
            />
        </Modal>
        </header>

    );
}