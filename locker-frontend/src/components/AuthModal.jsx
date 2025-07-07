import { forwardRef, useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Button from './elements/button/Button';
import AuthForm from './elements/form/AuthForm';


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
        <dialog ref={dialog} className='modal'>
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