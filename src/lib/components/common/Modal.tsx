import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

interface ModalProps {
    onClose?: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    const [isModalVisible, setIsModalVisible] = useState(true);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose && onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const closeModal = () => {
        setIsModalVisible(false);
        onClose && onClose();
    };

    return (
        <div className={`modal__wrapper ${isModalVisible ? 'modal__open' : ''}`}>
            <div className="modal__backdrop" onClick={closeModal}></div>
            <div className="modal__content">
                {children}
                <button className="modal__close" onClick={closeModal}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export const showModal = ({ children, onClose }: ModalProps) => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        throw new Error('Modal root element not found');
    }

    const container = document.createElement('div');
    modalRoot.appendChild(container);

    const close = () => {
        modalRoot.removeChild(container);
        onClose && onClose();
    };

    const modal = (
        <Modal onClose={close}>
            <div>{children}</div>
        </Modal>
    );

    console.log('hello');

    const root = createRoot(container);
    root.render(modal);
};

export default showModal;
