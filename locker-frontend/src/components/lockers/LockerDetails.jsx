import { useParams, useNavigate, Link } from "react-router";
import Header from "../Header";
import Footer from "../Footer";
import Button from "../elements/button/Button";
import ContainerLabel from "../containers/ContainerLabel";
import DeleteLockerModal from "./DeleteLockerModal";
import AddContainerModal from "../containers/AddContainerModal";
import { useEffect, useState, useRef } from "react";
import { toast } from 'react-toastify';


export default function LockerDetails() {
    const [lockerData, setLockerData] = useState(null);
    let { lockerId } = useParams();
    const deleteLockerModal = useRef();
    const addContainerModal = useRef();
    const navigate = useNavigate();

    // variable used to display conditional content
    const hasContainers = lockerData && lockerData.lockerContainers.length > 0;

    // effect that fetches containers associated with the locker ID
    useEffect(() => {
        fetch(`https://locker-api-uoib.onrender.com/lockers/${lockerId}`)
        .then(res => {
            return res.json();
        })
        .then((data) => {
            setLockerData(data);
        }); 
    }, [lockerData]);
    // above lockerData dependency triggers effect when add container modal updates data

    // functions to control delete modal opening and closing
    function handleStartDeleteLocker() {
        deleteLockerModal.current.open();
    }

    function handleCancelDeleteLocker() {
        deleteLockerModal.current.close();
    }

    // functions to control add container modal opening and closing
    function handleStartAddContainer() {
        addContainerModal.current.open();
    }

    function handleCancelAddContainer() {
        addContainerModal.current.close();
    }

    // simple logic needed to delete locker 
    function handleDeleteLocker() {
        fetch(`https://locker-api-uoib.onrender.com/lockers/${lockerId}`, {
            method: "DELETE",
        })
        .then(res => {
            return res.json();
        })
        .then(updatedLockers => {
            console.log(updatedLockers);
            deleteLockerModal.current.close();
            toast('Locker Deleted');
            navigate('/lockerlist');
        });
    }


    return (
        <>
            <Header />
            <main>
                <div className="locker-details">
                    {lockerData && (
                        <>
                            <div className="locker-details-header">
                                <Link to={'/lockerlist'} className="back-to-label">Back to Locker List</Link>
                                <strong>Containers in {lockerData.lockerName} </strong>
                                <Button onClick={handleStartDeleteLocker}>Delete Locker</Button>
                            </div>
                            <ul className="container-list">
                                {lockerData.lockerContainers.map((container, idx) => (
                                    <li key={idx}>
                                        <ContainerLabel
                                            lockerName={lockerData.lockerName}
                                            containerItems={container.containerItems}
                                            containerName={container.containerName}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {!hasContainers && (
                        <p>There are no containers to display.</p>
                    )}
                    <Button onClick={handleStartAddContainer}>Add Container</Button>
                </div>
            </main>
            <DeleteLockerModal
                ref={deleteLockerModal}
                onCancel={handleCancelDeleteLocker}
                onDelete={handleDeleteLocker}
            />
            <AddContainerModal
                lockerId={lockerId}
                ref={addContainerModal}
                onCancel={handleCancelAddContainer}
                onAdd={setLockerData}
            />
            <Footer />
        </>
    );
}