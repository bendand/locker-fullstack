import { useParams, useNavigate } from "react-router";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import Container from '../../classes/Container'
import Locker from "../../classes/Locker";
import ContainerCard from "../containers/ContainerCard";
import MainNav from "../elements/nav/MainNav";
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
    const [errorMessage, setErrorMessage] = useState('')
    // handles opening/closing of both modals
    const [openEditLockerModal, setOpenEditLockerModal] = useState(false);
    const [openAddContainerModal, setOpenAddContainerModal] = useState(false);
    const [isFetching, setIsFetching] = useState(null);
    const userId = sessionStorage.getItem('userId');

    // variable used to display conditional content
    const lockerHasContainers = containers && containers.length > 0;

    // function that fetches updated container list after a container is added
    function handleContainerSubmission() {
        async function fetchUpdatedContainers() {
            setIsFetching(true);
            await handleFetchContainers();
            setIsFetching(false);
        }

        fetchUpdatedContainers();
    }

    // effect that triggers functions that get locker data and containers
    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            await handleFetchLockerData();
            await handleFetchContainers();
            setIsFetching(false);
        };

        fetchData();
    }, []);


    // function whose results are used to populate locker details with information related to locker
    async function handleFetchLockerData() {
        let lockerData;
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/lockers/${lockerId}`);
            
            if (response.status === 404) {
                return;
            }
            
            lockerData = await response.json();
            // normalization
            let lockerObj = new Locker(lockerData.id, lockerData.name, lockerData.address, lockerData.details);
            setLockerDetails(lockerObj);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    // fetches containers associated with the locker ID
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
                // normalization
                let newContainer = new Container(container.id, container.name, container.description);
                containers.push(newContainer);
            });

            setContainers(containers);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    // redirects to container clicker
    function handleViewContainerDetails(containerId, containerName) {
        navigate(`/lockerlist/${lockerId}/${lockerName}/${containerId}/${containerName}`);
    }

    // function that handles click on breadcrumb link that redirects to lockerlist
    function handleViewLockers() {
        navigate('/lockerlist');
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
                        width: '80%',
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
                            onClickLockers={() => handleViewLockers()}
                        />
                    </div>
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
                                        handleSubmission: () => handleContainerSubmission(),
                                        closeAddContainerModal: () => setOpenAddContainerModal(false)
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
                    {lockerDetails && (
                        <div>
                            <p>Details: {lockerDetails?.details}</p>
                        </div>
                    )}
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
                            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
                            sx={{ 
                                width: "100%", 
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {containers.map((container, index) => (
                                <Grid 
                                    xs={4} 
                                    key={container.id}
                                    display="flex"
                                >
                                    <ContainerCard
                                        container={container}
                                        onClick={() => handleViewContainerDetails(container.id, container.name)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
            <Footer />
        </>
    );
}