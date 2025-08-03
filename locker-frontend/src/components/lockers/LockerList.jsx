import LockerCard from "./LockerCard";
import Footer from "../Footer";
import Locker from '../../classes/Locker'
import Breadcrumb from '../elements/breadcrumb/Breadcrumb';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MainNav from "../elements/nav/MainNav";
import AddLockerForm from "../elements/form/AddLockerForm";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import Grid from '@mui/joy/Grid';
import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';

export default function LockerList() {
    const [lockers, setLockers] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // handles add locker form open/close state
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId");

    // variable used to display conditional content
    const userHasLockers = lockers && lockers.length > 0;

    // effect to fetch lockers associated with a user
    useEffect(() => {
        setIsFetching(true);
        handleFetchLockers();
    }, []);

    async function handleFetchLockers() {
        let lockers = [];
        let response;
        let lockerData;

        try {
            response = await fetch(`http://localhost:8080/${userId}/lockers`);
            
            // if there are no lockers, return immediately and no content message will be shown
            if (response.status === 204) {
                return;
            }
            
            lockerData = await response.json();
            // data normalization
            lockerData.forEach(locker => {
                let newLocker = new Locker(locker.id, locker.name, locker.address, locker.details);
                lockers.push(newLocker);
            });

            setLockers(lockers);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsFetching(false);
        }
    }

    // redirects user to target locker on card click
    function handleViewLockerDetails(lockerId, lockerName) {
        navigate(`/lockerlist/${lockerId}/${lockerName}`);
    }

    return (
        <>
            <MainNav/>
            <main>
                <Box
                    sx={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Breadcrumb 
                        lockersViewed={true}
                        containersViewed={false}
                        itemsViewed={false}
                    />
                    {errorMessage && (
                        <div>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: "center",
                            alignContent: "center"
                        }}
                    >
                        <div>
                            <h1>My Lockers</h1>
                        </div>
                        <div>
                            <Button
                                variant="outlined"
                                color="neutral"
                                startDecorator={<Add />}
                                size="sm"
                                onClick={() => setOpen(true)}
                            >
                                Add locker
                            </Button>
                            <Modal open={open} onClose={() => setOpen(false)}>
                                <AddLockerForm 
                                    onSubmission={{
                                        fetchUpdatedLockers: () => handleFetchLockers(),
                                        closeModal: () => setOpen(false)
                                    }}
                                    userId={userId}
                                />
                            </Modal>
                        </div>
                    </Stack>
                    {!isFetching && !userHasLockers && (
                        <Stack
                            sx={{ alignContent: "center" }}
                        >
                            <div>
                                <h3><em>There are no lockers to display</em></h3>
                            </div>
                        </Stack>
                    )}
                    {isFetching && (
                        <CircularProgress />
                    )}
                    {userHasLockers && (
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
                            sx={{ 
                                width: "100%", 
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {lockers.map((locker, index) => (
                                <Grid 
                                    xs={4} 
                                    key={locker.id}
                                    display="flex"
                                >
                                    <LockerCard 
                                        locker={locker}
                                        onClick={() => handleViewLockerDetails(locker.id, locker.name)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </main>
            <Footer />
        </>
    );
}