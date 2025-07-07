import { forwardRef, useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Button from '../elements/button/Button';

const DeleteContainerModal = forwardRef(function DeleteContainerModal({
    onCancel,
    onDelete },
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
                <Button onClick={onCancel}>X</Button>
            </div>
            <div className='delete-label'>
                Are you sure you want to delete container?
            </div>
            <div>
                <Button onClick={onDelete}>Delete</Button>
            </div>
        </dialog>,
        document.getElementById('modal-root')
    );
});


export default DeleteContainerModal