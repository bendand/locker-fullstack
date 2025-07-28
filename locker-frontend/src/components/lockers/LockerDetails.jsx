import { useParams, useNavigate, Link } from "react-router";
import { useLocation } from 'react-router-dom';
import Footer from "../Footer";
import { useEffect, useState, useContext } from "react";
import Container from '../../classes/Container'
import Locker from "../../classes/Locker";
import ContainerCard from "../containers/ContainerCard";
import { toast } from 'react-toastify';
import GettingStartedNav from "../elements/nav/GettingStartedNav";
import Breadcrumb from "../elements/breadcrumb/Breadcrumb";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import AddContainerForm from "../elements/form/AddContainerForm";
import EditLockerForm from "../elements/form/EditLockerForm";
import Grid from '@mui/joy/Grid';

import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';

export default function LockerDetails() {
    const navigate = useNavigate();
    const { lockerId, lockerName } = useParams();
    const [containers, setContainers] = useState(null);
    const [lockerDetails, setLockerDetails] = useState(null);
    const [openEditLockerModal, setOpenEditLockerModal] = useState(false);
    const [openAddContainerModal, setOpenAddContainerModal] = useState(false);
    const [isFetching, setIsFetching] = useState(null);
    const userId = sessionStorage.getItem('userId');

    // variable used to display conditional content
    const lockerHasContainers = containers && containers.length > 0;

    function handleSubmission() {
        toast('Container added');

        async function fetchUpdatedContainers() {
            setIsFetching(true);
            await handleFetchContainers();
            setIsFetching(false);
        }

        fetchUpdatedContainers();
    }

    // effect that fetches containers associated with the locker ID
    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            await handleFetchLockerData();
            await handleFetchContainers();
            setIsFetching(false);
        };

        fetchData();
    }, []);


    async function handleFetchLockerData() {
        let lockerData;
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/lockers/${lockerId}`);
            
            if (response.status === 404) {
                return;
            }
            
            lockerData = await response.json();
            let lockerObj = new Locker(lockerData.id, lockerData.name, lockerData.address, lockerData.details);
            setLockerDetails(lockerObj);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleFetchContainers() {
        let containers = [];
        let lockerData;
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/containers`);
            
            if (response.status === 204) {
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
                        {lockerDetails && (
                            <div>
                                <h1>Containers in {lockerDetails.name}</h1>
                            </div>
                        )}
                        <div>
                            <Button
                                variant="outlined"
                                color="neutral"
                                startDecorator={<Add />}
                                size="sm"
                                onClick={() => setOpenAddContainerModal(true)}
                            >
                                Add Container
                            </Button>
                            <Modal open={openAddContainerModal} onClose={() => setOpenAddContainerModal(false)}>
                                <AddContainerForm 
                                    userId={userId}
                                    lockerId={lockerId}
                                    onSubmission={{
                                        handleSubmission: () => handleSubmission(),
                                        setOpenAddContainerModal: () => setOpenAddContainerModal(false)
                                    }}
                                />
                            </Modal>
                        </div>
                        <div>
                            <Button
                                variant="outlined"
                                color="neutral"
                                size="sm"
                                onClick={() => setOpenEditLockerModal(true)}
                            >
                                Edit Locker
                            </Button>
                            <Modal open={openEditLockerModal} onClose={() => setOpenEditLockerModal(false)}>
                                <EditLockerForm 
                                    userId={userId}
                                    lockerInfo={lockerDetails}
                                    onSubmission={{
                                        fetchUpdatedLockerDetails: () => handleFetchLockerData(),
                                        closeModal: () => setOpenEditLockerModal(false)
                                    }}
                                />
                            </Modal>
                        </div>
                    </Stack>
                    {!lockerHasContainers && (
                        <Stack
                            sx={{ alignContent: "center" }}
                        >
                            {/* in the future I want this displayed by mousing over locker name */}
                            <div>
                                {lockerDetails && (
                                    <p>Details: {lockerDetails?.details}</p>
                                )}
                            </div>
                            <div>
                                <h3><em>There are no containers to display</em></h3>
                            </div>
                        </Stack>
                    )}
                    {isFetching && (
                        <CircularProgress />
                    )}
                    {lockerHasContainers && (
                        <Stack>
                            <div>
                                {/* in the future I want this displayed by mousing over locker name */}
                                {lockerDetails && (
                                    <p>Details: {lockerDetails?.details}</p>
                                )}
                            </div>
                            <br></br>
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
                        </Stack>
                    )}
                </Box>
            </main>
            <Footer />
        </>
    );
}