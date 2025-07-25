import { useParams, useNavigate, Link } from "react-router";
import Footer from "../Footer";
import { useEffect, useState, useContext } from "react";
import Container from '../../classes/Container'
import { toast } from 'react-toastify';
import GettingStartedNav from "../elements/nav/GettingStartedNav";
import Breadcrumb from "../elements/breadcrumb/Breadcrumb";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import Grid from '@mui/joy/Grid';

import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';

export default function LockerDetails() {
    const navigate = useNavigate();
    const [containers, setContainers] = useState(null);
    const [lockerName, setLockerName] = useState(null);
    const [isFetching, setIsFetching] = useState(null);
    const { lockerId } = useParams();
    const userId = sessionStorage.getItem('userId');

    console.log('locker id: ' + lockerId);
    console.log('user id: ' + userId);

    // variable used to display conditional content
    const lockerHasContainers = containers && containers.length > 0;

    // effect that fetches containers associated with the locker ID
    useEffect(() => {
        setIsFetching(true);
        handleFetchContainers();
        setIsFetching(false);
    }, []);
    // above lockerData dependency triggers effect when add container modal updates data

    async function handleFetchContainers() {
        let containers = [];
        let lockerData;
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/containers`);
            
            if (response.status === 404 || response.status === 400) {
                return;
            }
            
            lockerData = await response.json();
            lockerData.containers.forEach(container => {
                let newContainer = new Container(container.id, container.name, container.description);
                console.log('here is a container JS object thats being pushed to containers: ', newContainer);
                containers.push(newContainer);
            });

            setContainers(containers);
            console.log('locker data: ', lockerData);
            // setLockerName(lockerData)
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleViewContainerrDetails(containerId) {
        console.log(containerId);
        navigate(`/lockerlist/${lockerId}/${containerId}`);
    }


    return (
        <>
            <GettingStartedNav />
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
                        {lockerName && (
                            <div>
                                <h1>Containers in {lockerName}</h1>
                            </div>
                        )}
                        <div>
                            <Button
                                variant="outlined"
                                color="neutral"
                                startDecorator={<Add />}
                                size="sm"
                                onClick={() => setOpen(true)}
                            >
                                Add Container
                            </Button>
                            <Modal open={open} onClose={() => setOpen(false)}>
                                <AddContainerForm 
                                    onSubmission={{
                                        fetchUpdatedContainers: () => handleFetchContainers(),
                                        setOpen: () => setOpen(false)
                                    }}
                                    userId={userId}
                                />
                            </Modal>
                        </div>
                    </Stack>
                    {!lockerHasContainers && (
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
                    {lockerHasContainers && (
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            sx={{ 
                                width: '100%', 
                                justifyContent: 'center',
                            }}
                        >
                            {containers.map((container, index) => (
                                <Grid xs={4} key={container.id}>
                                    <ContainerCard
                                        locker={container}
                                        onClick={() => handleViewLockerDetails(container.id)}
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