import React from 'react';
import "./EditComment.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { editAComment } from "../../../../store/comment"

const EditComment = ({ setShowModal, comment }) => {
    const dipatch = useDispatch();
    const { id } = useParams();

    const [content, setContent] = useState(comment.content)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            joke_id: id,
            comment_id: comment.id,
            content
        }

        await dipatch(editAComment(data));
        setShowModal(false)
    }

    const cancelButton = async (e) => {
        setShowModal(false);
      };

  return (
    <div>
        <h1>Edit Comment</h1>
        <form onSubmit={handleSubmit}>
            <textarea
            placeholder="Edit Comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">
                Submit
            </button>
            <div>
                <button onClick={cancelButton}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
  )
}

export default EditComment;
