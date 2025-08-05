import Footer from '../Footer';
import Container from '../../classes/Container';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import Item from '../../classes/Item';
import ItemCard from "../items/ItemCard";
import MainNav from "../elements/nav/MainNav";
import Breadcrumb from "../elements/breadcrumb/Breadcrumb";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import AddItemForm from "../elements/form/AddItemForm";
import EditItemForm from "../elements/form/EditItemForm";
import EditContainerForm from "../elements/form/EditContainerForm"
import Grid from '@mui/joy/Grid';
import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';

export default function ContainerDetails() {
    const [items, setItems] = useState(null);
    const [openAddItemModal, setOpenAddItemModal] = useState(false);
    const [openEditItem, setOpenEditItem] = useState(false);
    const [itemEditing, setItemEditing] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [openEditContainerModal, setOpenEditContainerModal] = useState(false);
    const [containerDetails, setContainerDetails] = useState(null);
    const [isFetching, setIsFetching] = useState(null);
    const { lockerId, lockerName, containerId } = useParams();
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();

    // variable used to display conditional content
    const containerHasItems = items && items.length > 0;

    // effect that triggers functions that get container data and items associated with the container ID
    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            await handleFetchContainerData();
            await handleFetchItems();
            setIsFetching(false);
        };

        fetchData();
    }, []);

    // fetches container's items
    async function handleFetchItems() {
        let items = [];
        let containerData;
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/${containerId}/items`);
            if (response.status === 204) {
                setItems([]);
                return;
            }

            containerData = await response.json();
            containerData.forEach(item => {
                let newItem = new Item(item.id, item.name, item.quantity, item.description);
                items.push(newItem);
            });
            setItems(items);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    // fetches container data for dynamic display in component
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
            setErrorMessage(error.message);
        }
    }

    // function that's triggered on click of an item 
    async function handleViewItemDetails(itemId) {
        let response;
        let itemData;
        
        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/${containerId}/items/${itemId}`);
            
            if (!response.ok) {
                setErrorMessage("Action failed");
                return;
            };
            
            itemData = await response.json();
            let itemObj = new Item(itemId, itemData.name, itemData.quantity, itemData.description);

            setItemEditing(itemObj);
            setOpenEditItem(true);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    // function that handles click on breadcrumb link that redirects to lockerlist
    function handleViewLockers() {
        navigate('/lockerlist');
    }
    
    return (
        <>
            <MainNav />
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
                    <div>
                        <Breadcrumb 
                            lockersViewed={false}
                            containersViewed={false}
                            itemsViewed={true}
                            onClickLockers={() => handleViewLockers()}                            
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
                                <h1>Items in {containerDetails.name} in locker: {lockerName}</h1>
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
                                    lockerName={lockerName}
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
                    {errorMessage && (
                        <div>
                            <p>{errorMessage}</p>
                        </div>
                    )}
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
                        <>
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
                                {items.map((item) => (
                                    <Grid xs={4} key={item.id} display="flex">
                                        <ItemCard
                                            item={item}
                                            userId={userId}
                                            lockerId={lockerId}
                                            containerId={containerId}
                                            onClick={() => handleViewItemDetails(item.id)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <Modal open={openEditItem} onClose={() => setOpenEditItem(false)}>
                                <EditItemForm 
                                    item={itemEditing}
                                    userId={userId}
                                    lockerId={lockerId}
                                    containerId={containerId}
                                    onSubmit={{
                                        fetchUpdatedItems: () => handleFetchItems(),
                                        closeModal: () => setOpenEditItem(false)
                                    }}
                                    onDelete={{
                                        fetchUpdatedItems: () => handleFetchItems(),
                                        closeModal: () => setOpenEditItem(false)
                                    }}
                                />
                            </Modal>
                        </>
                    )}
                </Box>
            </main>
            <Footer />
        </>
    );
}