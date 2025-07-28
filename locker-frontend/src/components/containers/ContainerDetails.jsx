import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../Footer';
import Container from '../../classes/Container';
import { useEffect, useState, useContext } from "react";
import Item from '../../classes/Item';
import ItemCard from "../containerItems/ItemCard";
import GettingStartedNav from "../elements/nav/GettingStartedNav";
import Breadcrumb from "../elements/breadcrumb/Breadcrumb";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import AddItemForm from "../elements/form/AddItemForm";
import EditContainerForm from "../elements/form/EditContainerForm"
import Grid from '@mui/joy/Grid';

import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';
import { toast } from 'react-toastify'; 



export default function ContainerDetails() {
    const [items, setItems] = useState(null);
    const [openAddItemModal, setOpenAddItemModal] = useState(false);
    const [openEditContainerModal, setOpenEditContainerModal] = useState(false);
    const [containerDetails, setContainerDetails] = useState(null);
    const [isFetching, setIsFetching] = useState(null);
    const { lockerId, lockerName, containerId, containerName } = useParams();
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();

    // variable used to display conditional content
    const containerHasItems = items && items.length > 0;

    function handleSubmission() {
        toast('Container added');

        async function fetchUpdatedItems() {
            setIsFetching(true);
            await handleFetchItems();
            setIsFetching(false);
        }

        fetchUpdatedItems();
    }

    // effect that fetches containers associated with the locker ID
    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            await handleFetchContainerData();
            await handleFetchItems();
            setIsFetching(false);
        };

        fetchData();
    }, []);

    async function handleFetchItems() {
        let items = [];
        let containerData;
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/${containerId}/items`);
            if (response.status === 404) {
                return;
            }
            

            containerData = await response.json();
            containerData.forEach(item => {
                let newItem = new Item(item.itemId, item.name, item.quantity, item.description);
                items.push(newItem);
            });

            setItems(items);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleFetchContainerData() {
        let containerData;
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/containers/${containerId}`);
            
            if (!response.ok) {
                return;
            };
            
            containerData = await response.json();
            let containerObj = new Container(containerData.id, containerData.name, containerData.description);

            setContainerDetails(containerObj);
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleViewItemDetails(itemId, itemName) {
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
                            containersViewed={false}
                            itemsViewed={true}
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
                        {containerDetails && (
                            <div>
                                <h1>Items in {containerDetails.name}</h1>
                            </div>
                        )}
                        <div>
                            <Button
                                variant="outlined"
                                color="neutral"
                                startDecorator={<Add />}
                                size="sm"
                                onClick={() => setOpenAddItemModal(true)}
                            >
                                Add Item
                            </Button>
                            <Modal open={openAddItemModal} onClose={() => setOpenAddItemModal(false)}>
                                <AddItemForm 
                                    userId={userId}
                                    lockerId={lockerId}
                                    containerId={containerId}
                                    onSubmission={{
                                        handleSubmission: () => handleFetchItems(),
                                        closeAddItemModal: () => setOpenAddItemModal(false)
                                    }}
                                />
                            </Modal>
                        </div>
                        <div>
                            <Button
                                variant="outlined"
                                color="neutral"
                                size="sm"
                                onClick={() => setOpenEditContainerModal(true)}
                            >
                                Edit Container
                            </Button>
                            <Modal open={openEditContainerModal} onClose={() => setOpenEditContainerModal(false)}>
                                <EditContainerForm
                                    lockerId={lockerId}
                                    userId={userId}
                                    containerInfo={containerDetails}
                                    onSubmission={{
                                        fetchUpdatedContainerDetails: () => handleFetchContainerData(),
                                        closeModal: () => setOpenEditContainerModal(false)
                                    }}
                                />
                            </Modal>
                        </div>
                    </Stack>
                    {containerDetails && (
                        <div>
                            <p>Description: {containerDetails?.description}</p>
                        </div>
                    )}
                    {!containerHasItems && (
                        <Stack
                            sx={{ alignContent: "center" }}
                        >
                            <div>
                                <h3><em>There are no items to display</em></h3>
                            </div>
                        </Stack>
                    )}
                    {isFetching && (
                        <CircularProgress />
                    )}
                    {containerHasItems && (
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            sx={{ 
                                width: '100%', 
                                justifyContent: 'center',
                            }}
                        >
                            {items.map((item) => (
                                <Grid xs={4} key={item.id}>
                                    <ItemCard
                                        item={item}
                                        onClick={() => handleViewItemDetails(item.id, item.name)}
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