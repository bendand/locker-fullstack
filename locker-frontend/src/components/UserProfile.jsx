import MainNav from "./elements/nav/MainNav";
import Sheet from '@mui/joy/Sheet';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import User from "../classes/User";
import CircularProgress from '@mui/joy/CircularProgress';
import { useState, useEffect } from "react";

export default function UserProfile() {
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        async function fetchUserData() {
            setIsFetching(true);
            await handleFetchUserData();
            setIsFetching(false);
        };

        fetchUserData();
    }, []);

    async function handleFetchUserData() {
        let userData;
        let response;

        try {
            response = await fetch(`http://localhost:8080/users/${userId}`);

            if (response.status === 404) {
                setErrorMessage(response.message);
            }

            userData = await response.json();
            console.log('user data to json: ');
            console.log(userData);
            let user = new User(userData.id, userData.firstName, userData.lastName, userData.email, userData.initials);
            console.log('this is our user object: ');
            console.log(user);
            setUser(user);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <>
            <MainNav />
            <main>
                {errorMessage && (
                    <p>{errorMessage}</p>
                )}
                {/* {isFetching && (
                    <CircularProgress />
                )} */}
                <Sheet 
                    variant="outlined"
                    sx={{ 
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: '75%',
                        width: '50%',
                    }}
                >
                {isFetching && (
                    <CircularProgress />
                )}
                    {user && (
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
                            <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                    loading="lazy"
                                    alt=""
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
                                            Articles
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'lg' }}>34</Typography>
                                    </div>
                                    <div>
                                        <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                            Followers
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'lg' }}>980</Typography>
                                    </div>
                                    <div>
                                        <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                            Rating
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'lg' }}>8.9</Typography>
                                    </div>
                                </Sheet>
                                <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                                    <Button variant="outlined" color="neutral">
                                        Chat
                                    </Button>
                                    <Button variant="solid" color="primary">
                                        Follow
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    )}
                </Sheet>
            </main>
        </>
    );
}