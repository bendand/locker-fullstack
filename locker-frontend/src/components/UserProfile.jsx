import MainNav from "./elements/nav/MainNav";
import Sheet from '@mui/joy/Sheet';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Avatar from 'boring-avatars';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import User from "../classes/User";
import Footer from "../../src/components/Footer";
import CircularProgress from '@mui/joy/CircularProgress';
import { useState, useEffect } from "react";

export default function UserProfile() {
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const [numLockers, setNumLockers] = useState(null);
    const [numItems, setNumItems] = useState(null);
    const userId = sessionStorage.getItem('userId');

    // effect manages our fetching state, aysnc calls to fetch data fn
    useEffect(() => {
        async function fetchUserData() {
            setIsFetching(true);
            await handleFetchUserData();
            setIsFetching(false);
        };

        fetchUserData();
    }, []);

    // function fetches data about user, including number of lockers and items associated with user
    async function handleFetchUserData() {
        let data;
        let response;

        try {
            response = await fetch(`http://localhost:8080/users/${userId}`);

            if (response.status === 404) {
                setErrorMessage(response.message);
            }

            data = await response.json();
            // straightforwardly assigns item and locker numbers for ease of use in our JSX
            // there's certainly a more elegant way of doing this
            setNumItems(data.totalItems);
            setNumLockers(data.numUserLockers);

            let userData = data.userData;
            // normalizes our user data
            let user = new User(userData.id, userData.firstName, userData.lastName, userData.email, userData.initials);
            setUser(user);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <>
            <MainNav />
            <Box
                sx={{
                    backgroundColor: 'background.body',
                    minHeight: '100vh',
                    minWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}            
            >
                <Box 
                    sx={{ 
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '75%',
                        width: '60%',
                    }}
                >
                {errorMessage && (
                    <p>{errorMessage}</p>
                )}
                {isFetching && (
                    <CircularProgress />
                )}
                {/* this produces a user profile card when a user is loaded from the server */}
                {user && (
                    <>
                        <h1><em>Admin users</em></h1>
                        <br />
                        <Card
                            orientation="horizontal"
                            sx={{
                                width: '100%',
                                flexWrap: 'wrap',
                                [`& > *`]: {
                                    '--stack-point': '500px',
                                    minWidth:
                                    'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
                                },
                                // make the card resizable for demo
                                overflow: 'auto',
                                resize: 'horizontal',
                            }}
                        >
                            <AspectRatio flex maxHeight={100} sx={{ minWidth: 100 }}>
                                <Avatar
                                    name={user.firstName + user.lastName}
                                />
                            </AspectRatio>
                            <CardContent>
                                <Typography sx={{ fontSize: 'xl', fontWeight: 'lg' }}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                                <Sheet
                                    sx={{
                                        bgcolor: 'background.level1',
                                        borderRadius: 'sm',
                                        p: 1.5,
                                        my: 1.5,
                                        display: 'flex',
                                        gap: 2,
                                        '& > div': { flex: 1 },
                                    }}
                                >
                                    <div>
                                        <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                            Lockers
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'lg' }}>{numLockers ? numLockers : 'No lockers yet'}</Typography>
                                    </div>
                                    <div>
                                        <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                            Items
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'lg' }}>{numItems ? numItems : 'No items yet'}</Typography>
                                    </div>
                                </Sheet>
                            </CardContent>
                        </Card>
                        <br />
                        <h1><em>Read-only users soon</em></h1>
                    </>
                )}
                </Box>
            </Box>
            <Footer />
        </>
    );
}