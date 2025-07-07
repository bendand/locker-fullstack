import DeleteContainerItemModal from "./DeleteContainerItemModal";
import Button from "../elements/button/Button";
import { useRef } from "react";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; 


export default function ContainerItemLabel({ itemName, itemIdx, onDeleteItem }) {
    const { lockerId, containerName } = useParams();
    const deleteItemModal = useRef();

    function handleStartDeleteItem() {
        deleteItemModal.current.open();
    }

    function cancelDeleteItem() {
        deleteItemModal.current.close();
    }


    function handleDeleteItem() {
        fetch(`https://locker-api-uoib.onrender.com/lockers/${lockerId}`)
        .then(res => {
            return res.json();
        })
        .then((lockerData) => {
            // creates a copy of locker container data to manipulate
            const updatedContainers = [...lockerData.lockerContainers];
            const targetContainer = updatedContainers.find(container => container.containerName === containerName);
            
            // returns a list of items without the name of the target item for deletion
            targetContainer.containerItems = targetContainer.containerItems.filter(function(item) {
                return item !== targetContainer.containerItems[itemIdx];
            });

            // patch method uses copied and manipulated data to update locker containers after deletion
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
            deleteItemModal.current.close();
            toast('Item Deleted');
            onDeleteItem();
        }); 
    }

    return (
        <>
            <div>
                <tr key={itemIdx}>
                    <th>{itemName}</th>
                    <td><Button onClick={handleStartDeleteItem}>Delete</Button></td>
                </tr>
            </div>
            <DeleteContainerItemModal
                ref={deleteItemModal}
                onCancel={cancelDeleteItem}
                onProceed={handleDeleteItem}
            />
        </>
    );
}