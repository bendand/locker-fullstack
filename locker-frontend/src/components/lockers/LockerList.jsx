import LockerCard from "./LockerCard";
import Footer from "../Footer";
import Locker from '../../classes/Locker'
import Breadcrumb from '../elements/breadcrumb/Breadcrumb';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from '../../App';
import GettingStartedNav from "../elements/nav/GettingStartedNav";
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
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId");
    const userHasLockers = lockers && lockers.length > 0;
    
    // effect that calls function that fetches locker from backend and checks for valid user credential
    useEffect(() => {
        setIsFetching(true);
        handleFetchLockers();
        setIsFetching(false);
    }, []);
    // dependency above is used to run the effect when locker is added by add locker modal
    // which then updates the locker data


    async function handleFetchLockers() {
        let lockers = [];
        let response;
        let lockerData;

        try {
            response = await fetch(`http://localhost:8080/${userId}/lockers`);
            
            if (response.status === 404 || response.status === 400) {
                return;
            }
            
            lockerData = await response.json();
            lockerData.forEach(locker => {
                let newLocker = new Locker(locker.id, locker.name, locker.address, locker.details);
                // console.log('here is a locker JS object thats being pushed to lockers: ', newLocker);
                lockers.push(newLocker);
            });

            setLockers(lockers);
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleViewLockerDetails(lockerId, lockerName) {
        navigate(`/lockerlist/${lockerId}/${lockerName}`);
    }

    return (
        <>
            <GettingStartedNav/>
            <main>
                <Box
                    sx={{
                        width: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <div>
                        <Breadcrumb 
                            lockersViewed={true}
                            containersViewed={false}
                            itemsViewed={false}
                        />
                    </div>
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
                                        setOpen: () => setOpen(false)
                                    }}
                                    userId={userId}
                                />
                            </Modal>
                        </div>
                    </Stack>
                    {!userHasLockers && (
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
                            sx={{ 
                                width: '100%', 
                                justifyContent: 'center',
                            }}
                        >
                            {lockers.map((locker, index) => (
                                <Grid xs={4} key={locker.id}>
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