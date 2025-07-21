import { forwardRef, useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Button from './elements/button/Button';
import AuthForm from './elements/form/LoginForm';
// import Button from '@mui/joy/Button';
// import Modal from '@mui/joy/Modal';
// import ModalClose from '@mui/joy/ModalClose';
// import Typography from '@mui/joy/Typography';
// import Sheet from '@mui/joy/Sheet';


const AuthModal = forwardRef(function AuthModal({ 
    onCancel, 
    onAuthenticate }, 
    ref) {

    const dialog = useRef();

    // hook that exposes methods used to control modal
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        };
    });


    return createPortal(
        <dialog ref={dialog}>
            <div>
                <Button 
                    onClick={onCancel}
                >
                    X
                </Button>
                <AuthForm
                    onAuthenticate={onAuthenticate}
                />
            </div>
          </dialog>,
        document.getElementById('modal-root')
    );
});

export default AuthModal