import React, { useState } from 'react';
import { createJoke } from '../../../store/joke';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const CreateJoke = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        history.push('/jokes')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a joke."
                />
                <input
                    type="file"
                    onChange={updateImage}
                    accept=".jpg, .jpeg, .png, .gif"
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
