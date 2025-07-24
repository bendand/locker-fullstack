import LockerLabel from "./LockerCard";
import Header from "../Header";
import Footer from "../Footer";
import BreadCrumb from '../elements/breadcrumb/Breadcrumb'
import Button from "../elements/button/Button";
import AddLockerModal from "./AddLockerModal";
import HomeNav from "../elements/nav/GettingStartedNav";
import { useRef, useEffect, useState, useContext } from "react";
import { AuthContext } from '../../App';
import GettingStarted from "../GettingStarted";
import GettingStartedNav from "../elements/nav/GettingStartedNav";

export default function LockerList() {
    const [lockers, setLockers] = useState(null);
    const { userId, setUserId } = useContext(AuthContext);
    

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
            sessionStorage.setItem('lockers', JSON.stringify(data));
        }); 

    }, [lockers]);
    // dependency above is used to run the effect when locker is added by add locker modal
    // which then updates the locker data




    return (
        <>
            <GettingStartedNav user={userId} />
            <main>
                <BreadCrumb />
            </main>
            <Footer />
        </>
    );
}