import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import EditComment from "./index";

function EditCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-comment-button" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment
            comment={comment}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
