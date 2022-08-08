import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createJoke } from "../../../store/joke";
import './SidebarAddJoke.css';

const SidebarAddJoke = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const reset = () => setContent('');

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

        const joke = await dispatch(createJoke(data))

        if (joke) {
            reset();
            setShowModal(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <img className="feedProfPic" src={user.prof_pic_url === '' ? 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png' : user.prof_pic_url} alt=''></img>
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
                <div>
                    <span>{content.length}</span>
                    <p>/280</p>
                </div>
                <button
                    disabled={(!content && !image) || content.length > 280}
                    type='submit'>
                    Joke
                </button>
            </form>
        </div>
    )
}

export default SidebarAddJoke;
