import Header from "./Header";
import GettingStarted from "./GettingStarted";
import Footer from "./Footer";
import AuthModal from "./AuthModal";
import { toast } from 'react-toastify';
import { useRef } from "react";
import { useNavigate } from "react-router";
import HomeNav from "./elements/nav/GettingStartedNav";
import AuthenticatedNav from "./elements/nav/AuthenticatedNav";


export default function UserHome() {
    const authModal = useRef();
    const navigate = useNavigate();

    function handleStartAuth() {
        authModal.current.open();
    }

    function handleCancelAuth() {
        authModal.current.close();
    }

    function handleAuthenticate() {
        authModal.current.close();
        navigate('/lockerlist');
        toast('Welcome!');
    }

    return (
        <>
            <HomeNav />
            <GettingStarted
                onStartAuthentication={handleStartAuth}
            />
            <Footer />
        </>
    );
}