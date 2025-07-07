import Header from "./Header";
import GettingStarted from "./GettingStarted";
import Footer from "./Footer";
import AuthModal from "./AuthModal";
import { toast } from 'react-toastify';
import { useRef } from "react";
import { useNavigate } from "react-router";


export default function Home() {
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
        toast('Welcome!');
        navigate('/lockerlist');
    }

    return (
        <>
            <Header />
            <GettingStarted
                onStartAuthentication={handleStartAuth}
            />
            <Footer />
            <AuthModal 
                ref={authModal}
                onCancel={handleCancelAuth}
                onAuthenticate={handleAuthenticate}
            />
        </>
    );
}