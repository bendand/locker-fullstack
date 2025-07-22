import { useState } from 'react';
import RegisterForm from './elements/form/RegisterForm';
import Toast from './elements/toast/Toast';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import LoginForm from './elements/form/LoginForm'


export default function GettingStarted() {
    const [authStatus, setAuthStatus] = useState('default');
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    function handleOnRegister() {
        setAuthStatus('default');
        setIsRegistered(true);
        setTimeout(() => {
            setIsRegistered(false);
        }, 6000);
    }

    function handleOnLogin() {
        setAuthStatus('default');
        setIsLoggedIn(true);
        setTimeout(() => {
            setIsLoggedIn(false);
        }, 6000);
    }

    return (
        <main>
            <section className="homepage-content">
                <div className="left-homepage">
                    <img 
                        className="homepage-image" 
                        src="george-pagan-iii.jpg" 
                        alt="rows and columns of geometric shapes" 
                    />
                </div>
                <div className="right-homepage">
                    <h3>Outsource your organizational overhead</h3>
                    <p>
                        Locker is your bookkeeper for everything storage-related 
                    </p>
                    <div>
                        <Button 
                            variant="outlined" 
                            color="neutral" 
                            onClick={() => setAuthStatus('registering')} 
                            size="md"
                            >
                            Get Started
                        </Button>
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-desc"
                            open={authStatus !== 'default'}
                            onClose={() => setAuthStatus('default')}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <div>
                                {authStatus === 'registering' && (
                                    <RegisterForm 
                                        changeAuthStatus={() => setAuthStatus('login')} 
                                        onAuthenticate={() => handleOnRegister()}
                                    />
                                )}
                                {authStatus === 'login' && (
                                    <LoginForm
                                        changeAuthStatus={() => setAuthStatus('registering')} 
                                        onAuthenticate={() => handleOnLogin()}
                                    />
                                )}
                            </div>
                        </Modal>
                    </div>
                </div>
                <div>
                    {isRegistered && (
                        <Toast message="Sucessfully registered"/>
                    )}
                    {isLoggedIn && (
                        <Toast message="Sucessfully logged in"/>
                    )}  
                </div>
            </section>
        </main>
    );
}