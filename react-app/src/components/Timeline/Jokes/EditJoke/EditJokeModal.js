import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import EditJoke from "./index";

function EditJokeModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-comment-button" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditJoke
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default EditJokeModal;
