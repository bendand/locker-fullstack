import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../Footer';
import { useEffect, useState, useContext } from "react";
import Item from '../../classes/Item'
import ContainerCard from "../containers/ContainerCard";
import GettingStartedNav from "../elements/nav/GettingStartedNav";
import Breadcrumb from "../elements/breadcrumb/Breadcrumb";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import AddItemForm from "../elements/form/AddItemForm";
import Grid from '@mui/joy/Grid';

import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';
import { toast } from 'react-toastify'; 



export default function ContainerDetails() {
    const [items, setItems] = useState(null);
    const [open, setOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(null);
    const { lockerId, lockerName, containerId, containerName } = useParams();
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();

    // variable used to display conditional content
    const containerHasItems = items && items.length > 0;

    useEffect(() => {
        setIsFetching(true);
        handleFetchItems();
        setIsFetching(false);
    }, []);

    function handleSubmission() {
        toast('Item added');
        setIsFetching(true);
        handleFetchItems();
        setIsFetching(false);
    }

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
                let newItem = new Item(item.id, item.name, item.quantity, item.description);
                items.push(newItem);
            });

            setItems(items);
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleViewItemDetails(itemId, itemName) {
        console.log('item id: ' + itemId);
        console.log('item name: ' + itemName);
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
                        <div>
                            <h1>Items in {containerName}</h1>
                        </div>
                        <div>
                            <Button
                                variant="outlined"
                                color="neutral"
                                startDecorator={<Add />}
                                size="sm"
                                onClick={() => setOpen(true)}
                            >
                                Add Item
                            </Button>
                            <Modal open={open} onClose={() => setOpen(false)}>
                                <AddItemForm 
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
                            {items.map((item, index) => (
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