import { useState } from 'react';
import RegisterForm from './elements/form/RegisterForm';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';



export default function GettingStarted({ onStartAuthentication }) {
    const [open, setOpen] = useState(false);
    const [authStatus, setAuthStatus] = useState('default');


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
                    <div className="get-started-button-container">
                        <button 
                            className='get-started-button'
                            onClick={onStartAuthentication}
                        >
                            Get Started
                        </button>
                    </div>
                    <div>
                        <Button variant="outlined" color="neutral" onClick={() => setOpen(true)} size="md">
                            Get Started
                        </Button>
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-desc"
                            open={open}
                            onClose={() => setOpen(false)}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <RegisterForm authStatus={authStatus} />
                        </Modal>
                    </div>
                </div>
            </section>
        </main>
    );
}