import React, { useState } from 'react';
import SidebarAddJoke from './SidebarAddJoke';
import { Modal } from '../../../context/Modal';
import './SidebarJokeModal.css';

const SidebarJokeModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Joke</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SidebarAddJoke setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default SidebarJokeModal
