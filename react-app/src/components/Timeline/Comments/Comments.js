import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getAllComments, deleteAComment } from '../../../store/comment';
import EditCommentModal from '../Comments/EditComment/EditCommentModal';


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
    const [emptyFile, setEmptyFile] = useState('');

    useEffect(() => {
        dispatch(getAllComments(id))
        setIsLoaded(true)
    }, [dispatch, id])

    const updateImage = (e) => {
        const file = e.target.files[0];
        setEmptyFile(file.name)
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
        setContent('')
        setEmptyFile('')
        setImage(null)
    }

    const deleteComment = (e, comment) => {
        e.preventDefault()

        const data = {
            id,
            comment_id: comment.id
        }

        dispatch(deleteAComment(data)).then(() => dispatch(getAllComments(id)))
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
                            placeholder='Post your comment.'
                        />
                        {emptyFile}
                        <input
                            type="file"
                            onChange={updateImage}
                            accept=".jpg, .jpeg, .png, gif"
                        />
                        <button disabled={(!content && !image) || content.length > 280} type='submit'>Submit</button>
                        <div>
                            <span>{content.length}</span>
                            <p>/280</p>
                        </div>
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
                            <div>
                                {comment?.user_id === user?.id ? (
                                    <div>
                                        <div>
                                            <EditCommentModal comment={comment} />
                                        </div>
                                        <div>
                                            <button className="commentDelete" onClick={(e) => { deleteComment(e, comment) }}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )
                                }
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
    )
}

export default Comments;
