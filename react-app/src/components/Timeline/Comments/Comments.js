import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getAllComments } from '../../../store/comment';


const Comments = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams();

    const user = useSelector(state => state.session.user)
    const oneJoke = useSelector((state) => state.jokes[id]);
    const commentsObject = useSelector((state) => state.comments);
    const comments = Object.values(commentsObject)

    const [isLoaded, setIsLoaded] = useState(false);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(getAllComments(id))
        setIsLoaded(true)
    }, [dispatch, id])

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            user_id: user.id,
            joke_id: oneJoke.id,
            content,
            image_url: image
        }

        await dispatch(createComment(data))
        setContent()
    }


    return (
        isLoaded && (
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Post a comment.'
                        />
                        <input
                            type="file"
                            onChange={updateImage}
                            accept=".jpg, .jpeg, .png"
                        />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div>
                    {comments.map(comment => (
                        <div key={comment.id}>
                            <p>{comment.content}</p>
                            {comment.image_url &&
                                <img
                                    src={comment?.image_url}
                                    alt="joke"
                                    className='singleimage'
                                />
                            }
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}

export default Comments;
