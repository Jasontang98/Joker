import React, { useState } from 'react';
import { createJoke } from '../../../store/joke';
import { useDispatch, useSelector } from "react-redux";
import { RiImage2Line } from 'react-icons/ri';
import './CreateJokes.css'

const CreateJoke = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const reset = () => setContent('');

    const removeImage = () => setImage(null);

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
            removeImage();
        }
    }

    return (
        <div className='AddJokeContainer'>
            <form onSubmit={handleSubmit} className="AddJokeForm">
                <img className="feedProfPic" src={user.prof_pic_url === '' ? 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png' : user.prof_pic_url} alt=''></img>
                <div className="AddJokeTextSubmit">
                    <div className='AddJokeText'>
                        <textarea
                            className='AddJokeInput'
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Make a joke"
                        />
                    </div>
                    <div className='AddJokeImageSubmit'>
                        <div className='AddJokeImage'>
                            <label className='AddJokeImageLabel'><RiImage2Line className="AddJokeImageIcon" />
                            <input
                            className="AddJokeImageInput"
                                name="file"
                                type="file"
                                onChange={updateImage}
                                accept=".jpg, .jpeg, .png, .gif"
                            />
                            {image &&
                            <p className='ImageName'>{image.name}</p>
                            }
                            </label>
                        </div>
                        <div>
                            <span>{content.length}</span>
                            <p>/280</p>
                        </div>
                        <button
                            disabled={(!content && !image) || content.length > 280}
                            type='submit'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateJoke;
