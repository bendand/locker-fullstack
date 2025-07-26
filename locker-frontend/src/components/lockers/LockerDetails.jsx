import { useParams, useNavigate, Link } from "react-router";
import { useLocation } from 'react-router-dom';
import Footer from "../Footer";
import { useEffect, useState, useContext } from "react";
import Container from '../../classes/Container'
import ContainerCard from "../containers/ContainerCard";
import { toast } from 'react-toastify';
import GettingStartedNav from "../elements/nav/GettingStartedNav";
import Breadcrumb from "../elements/breadcrumb/Breadcrumb";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import AddContainerForm from "../elements/form/AddContainerForm";
import Grid from '@mui/joy/Grid';

import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';

export default function LockerDetails() {
    const navigate = useNavigate();
    const { lockerId, lockerName } = useParams();

    const [containers, setContainers] = useState(null);
    const [open, setOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(null);

    const userId = sessionStorage.getItem('userId');

    // variable used to display conditional content
    const lockerHasContainers = containers && containers.length > 0;

    function handleSubmission() {
        toast('Container added');
        setIsFetching(true);
        handleFetchContainers();
        setIsFetching(false);
    }

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
            
            if (response.status === 400) {
                return;
            }
            
            lockerData = await response.json();
            lockerData.forEach(container => {
                let newContainer = new Container(container.id, container.name, container.description);
                containers.push(newContainer);
            });

            setContainers(containers);
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleViewContainerDetails(containerId, containerName) {
        navigate(`/lockerlist/${lockerId}/${lockerName}/${containerId}/${containerName}`);
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
                            lockersViewed={false}
                            containersViewed={true}
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
                            <h1>Containers in {lockerName}</h1>
                        </div>
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
                                    userId={userId}
                                    lockerId={lockerId}
                                    onSubmission={{
                                        handleSubmission: () => handleSubmission(),
                                        setOpen: () => setOpen(false)
                                    }}
                                />
                            </Modal>
                        </div>
                    </Stack>
                    {!lockerHasContainers && (
                        <Stack
                            sx={{ alignContent: "center" }}
                        >
                            <div>
                                <h3><em>There are no containers to display</em></h3>
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
                                        locker
                                        container={container}
                                        onClick={() => handleViewContainerDetails(container.id, container.name)}
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