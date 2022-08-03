import React, { useState } from 'react';
import { createJoke } from '../../../store/joke';
import { useDispatch, useSelector } from "react-redux";

const CreateJoke = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            user_id: user.id,
            content,
            image_url: image
        }

        dispatch(createJoke(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="JOKER"
                />
                <input
                    type="file"
                    onChange={updateImage}
                    accept=".jpg, .jpeg, .png"
                />
                <button
                    type='submit'>
                    submit
                </button>
            </form>
        </div>
    )
}

export default CreateJoke;
