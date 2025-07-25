import LockerCard from "./LockerCard";
import Footer from "../Footer";
import BreadCrumb from '../elements/breadcrumb/Breadcrumb';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from '../../App';
import GettingStartedNav from "../elements/nav/GettingStartedNav";
import AddLockerForm from "../elements/form/AddLockerForm";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';

export default function LockerList() {
    const [lockers, setLockers] = useState([]);
    const [noLockersFound, setNoLockersFound] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [open, setOpen] = useState(false);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    
    // effect that calls function that fetches locker from backend and checks for valid user credential
    useEffect(() => {
        if (userId === null) {
            navigate('/');
        }

        handleFetchLockers();
    }, [lockers, userId]);
    // dependency above is used to run the effect when locker is added by add locker modal
    // which then updates the locker data

    async function handleFetchLockers() {
        setIsFetching(true);

        let lockers = [];
        let response;
        let data;

        try {
            response = await fetch(`http://localhost:8080/${userId}/lockers`);
            
            if (response.status === 404 || response.status === 400) {
                setNoLockersFound(true);
                return;
            }
            
            lockerData = await response.json();
            lockerData.forEach(locker => {
                let newLocker = new Locker(locker.id, locker.name, locker.details);
                lockers.push(newLocker);
            });
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsFetching(false);
        }        
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
                        // justifyContent: 'center',
                        alignItems: 'center',
                        border: '2px solid grey',
                        gap: 2
                    }}
                >
                    <div>
                        <BreadCrumb />
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
                                    onSubmission={setLockers}
                                />
                            </Modal>
                        </div>
                    </Stack>
                    {noLockersFound && (
                        <Stack
                            sx={{ alignContent: "center" }}
                        >
                            <div>
                                <h3><em>There are no lockers to display</em></h3>
                            </div>
                        </Stack>
                    )}
                </Box>
            </main>
            <Footer />
        </>
    );
}