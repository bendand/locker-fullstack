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
import { SearchOutlined, SearchRounded } from '@mui/icons-material';
import { useState } from 'react';

export default function GettingStartedNav({ user }) {
    // console.log('userId:', user);
    const [searchedItems, setSearchedItems] = useState(['nike shoes', 'lampshade', 'full size bedsheet set']);

    return (
        <header>
        {!user && (
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
        {user && (
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
                <div>
                    <List
                        role="menubar"
                        orientation="horizontal"
                    >
                        <ListItem 
                            role="none"
                            component={RouterLink}
                            to={'/lockerlist'}
                        >
                            <ListItemButton role="menuitem">
                                My Lockers
                            </ListItemButton>
                        </ListItem>
                        <ListDivider />
                        <ListItem 
                            role="none"
                            component={RouterLink}
                            to={'/feedback'}
                        >
                            <ListItemButton role="menuitem">
                                Leave Feedback
                            </ListItemButton>
                        </ListItem>
                        <ListDivider />
                        <ListItem 
                            role="none"
                            component={RouterLink}
                        >
                            <ListItemButton role="menuitem">
                                Find an Item
                                <SearchOutlined />
                            </ListItemButton>
                        </ListItem>

                    </List>
                </div>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Person fontSize='xl3' />
                </Stack>
            </Box>
        )}
        </header>

    );
}