import LockerLabel from "./LockerLabel";
import Header from "../Header";
import Footer from "../Footer";
import Button from "../elements/button/Button";
import AddLockerModal from "./AddLockerModal";
import HomeNav from "../elements/nav/GettingStartedNav";
import { useRef, useEffect, useState } from "react";

export default function LockerList() {
    const [lockers, setLockers] = useState(null);
    const userId = localStorage.getItem('userId');

    // effect that fectches lockers from backend
    useEffect(() => {
        fetch(`http://localhost:8080/${userId}/lockers`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to fetch lockers');
        })
        .then((data) => {
            setLockers(data);
            localStorage.setItem('lockers', JSON.stringify(data));
        }); 

    }, [lockers]);
    // dependency above is used to run the effect when locker is added by add locker modal
    // which then updates the locker data




    return (
        <>
            <HomeNav />
            <main>
                <div className="lockerlist-container">
                    <span className="lockerlist-header">
                        <strong>My Storage Lockers </strong> 
                        <Button>Add +</Button>
                    </span>
                    <ul> 
                        {lockers && lockers.map((locker, idx) => (
                            <li key={idx}>
                                <LockerLabel 
                                    lockerId={locker.id}
                                    lockerName={locker.lockerName} 
                                    lockerAddress={locker.lockerAddress}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    );
}