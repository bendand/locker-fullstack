import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import ContainerItemLabel from '../containerItems/ContainerItemLabel';
import AddContainerItemModal from '../containerItems/AddContainerItemModal';
import DeleteContainerModal from './DeleteContainerModal';


import Header from "../Header";
import Footer from '../Footer';
import Button from '../elements/button/Button';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify'; 



export default function ContainerDetails() {
    const { lockerId, containerName } = useParams();
    const location = useLocation();
    const data = location.state.data;
    const lockerName = data.lockerName;
    const containerItems = data.containerItems;
    const addItemModal = useRef();
    const deleteContainerModal = useRef();
    const navigate = useNavigate();
    const [items, setItems] = useState(containerItems);

    // variable used to display conditional content
    const hasItems = items.length > 0;

    // controls open and close of add item modal
    function handleStartAddItem() {
        addItemModal.current.open();
    }

    function cancelAddItem() {
        addItemModal.current.close();
    }

    // controls open and close of delete container modal
    function handleStartDeleteContainer() {
        deleteContainerModal.current.open();
    }

    function cancelDeleteContainer() {
        deleteContainerModal.current.close();
    }


    // called to retrieve new data after container item has been added
    function handleUpdateItems() {
        fetch(`https://locker-api-uoib.onrender.com/lockers/${lockerId}`)
        .then(res => {
            return res.json();
        })
        .then((lockerData) => {
            // find method used to find container to update
            const updatedItems = lockerData.lockerContainers.find(container => container.containerName === containerName).containerItems;
            setItems(updatedItems);
        }); 
    }

    function handleDeleteContainer() {
        fetch(`https://locker-api-uoib.onrender.com/lockers/${lockerId}`)
        .then(res => {
            return res.json();
        })
        .then((lockerData) => {
            // deletes container by removing each instance of container name
            // definitely not ideal, but I'll get back this problem on future iterations
            const updatedContainers = lockerData.lockerContainers.filter(container => container.containerName !== containerName);
            
            // patch method to update containers, didn't find a way to make a delete method work here given 
            // json data structure limitations
            return fetch(`https://locker-api-uoib.onrender.com/lockers/${lockerId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ lockerContainers: updatedContainers })
            });
        })
        .then(res => {
            return res.json();
        })
        .then(updatedContainers => {
            deleteContainerModal.current.close();
            toast('Container Deleted');
            navigate(`/lockerlist/${lockerId}`);
        });
    }

    
    return (
        <>
            <Header />
            <main>
                <div className='container-details'>
                    <div className='container-details-header'>
                        <Link to={`/lockerlist/${lockerId}`} className="back-to-label">Back to Locker Containers</Link>
                        <strong>Items in <em>{containerName}</em> in {lockerName} </strong>
                        <Button onClick={handleStartDeleteContainer}>Delete Container</Button>
                    </div>
                    <table className='container-item-table'>
                        {items.map((item, idx) => (
                            <ContainerItemLabel
                                key={idx}
                                itemName={item}
                                itemIdx={idx}
                                onDeleteItem={handleUpdateItems}
                            />
                        ))}
                    </table>
                    {!hasItems && (
                        <p>There are no items to display.</p>
                    )}
                    <div>
                        <Button onClick={handleStartAddItem}>Add Item</Button>
                    </div>
                </div>
            </main>
            <AddContainerItemModal 
                ref={addItemModal}
                onCancel={cancelAddItem}
                onAdd={handleUpdateItems}
                lockerId={lockerId}
                containerName={containerName}
            />
            <DeleteContainerModal 
                ref={deleteContainerModal}
                onCancel={cancelDeleteContainer}
                onDelete={handleDeleteContainer}
            />
            <Footer />
        </>
    );
}