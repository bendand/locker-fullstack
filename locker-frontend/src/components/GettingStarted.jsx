import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useColorScheme } from '@mui/joy/styles';
import RegisterForm from './elements/form/RegisterForm';
import MainNav from './elements/nav/MainNav';
import Footer from '../components/Footer';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import LoginForm from './elements/form/LoginForm'
import { toast } from 'react-toastify';


export default function GettingStarted() {
    // state that communicates with login and register modals to toggle authentication state
    const [authStatus, setAuthStatus] = useState('default');
    // const { mode, systemMode } = useColorScheme();
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');


    // functions that finish register and login procedures respectively
    function handleOnRegister() {
        setAuthStatus('default');
        toast('Registration successful!');
        navigate('/lockerlist');
    }

    function handleOnLogin() {
        setAuthStatus('default');
        toast('Welcome back!');
        navigate('/lockerlist');
    }

    return (
        <>
            <MainNav/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100%',
                minWidth: '100%',
                padding: '20px',
                backgroundColor: 'background.body',
            }}>
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
                            {/* if user has active session the won't be prompted to login again */}
                            {userId === null && (
                                <Button 
                                    variant="outlined" 
                                    color="neutral" 
                                    onClick={() => setAuthStatus('registering')} 
                                    size="md"
                                    >
                                    Get Started
                                </Button>
                            )}
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
                                            handleValidate={handleOnRegister}
                                        />
                                    )}
                                    {authStatus === 'login' && (
                                        <LoginForm
                                            changeAuthStatus={() => setAuthStatus('registering')} 
                                            handleValidate={handleOnLogin}
                                        />
                                    )}
                                </div>
                            </Modal>
                        </div>
                    </div>
                </section>
            </Box>
            <Footer />
        </>
    );
}