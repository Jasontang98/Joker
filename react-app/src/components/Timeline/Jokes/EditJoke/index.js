import React from 'react';
import "./EditJoke.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJoke } from "../../../../store/joke"
import { useParams } from 'react-router-dom';

const EditJoke = ({ setShowModal }) => {
    const dipatch = useDispatch();
    const { id } = useParams();

    const oneJoke = useSelector((state) => state.jokes[id]);

    const [content, setContent] = useState(oneJoke.content)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id,
            content
        }

        await dipatch(updateJoke(data));
        setShowModal(false)
    }

    const cancelButton = async (e) => {
        setShowModal(false);
      };

  return (
    <div>
        <h1>Edit Joke</h1>
        <form onSubmit={handleSubmit}>
            <textarea
            placeholder="Joke"
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

export default EditJoke;
