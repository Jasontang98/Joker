export const GET_COMMENTS = '/GET_COMMENTS';
export const ADD_COMMENT = '/ADD_COMMENT';
export const EDIT_COMMENT = '/EDIT_COMMENT';
export const DELETE_COMMENT = '/DELETE_COMMENT';

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

// Get All Comments
export const getAllComments = (joke_id) => async (dispatch) => {
    const response = await fetch(`/api/jokes/${joke_id}/comments`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data));
        return data;
    }
}

// Post A Comment
export const createComment = (comment) => async (dispatch) => {
    const { user_id, joke_id, content, image_url } = comment;

    const form = new FormData();

    form.append("user_id", user_id);
    form.append("joke_id", joke_id);
    form.append("content", content);
    form.append("image_url", image_url);

    const response = await fetch(`/api/jokes/${joke_id}`, {
        method: 'POST',
        body: form
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data));
        return data
    }
}

// Edit A Comment
export const editAComment = (comment) => async (dispatch) => {
    const { comment_id, content, joke_id } = comment;

    const form = new FormData();

    form.append("comment_id", comment_id)
    form.append("joke_id", joke_id);
    form.append("content", content);

    const response = await fetch(`/api/jokes/${joke_id}/comments/${comment_id}`,
        {
            method: "PUT",
            body: form,
        });

    if (response.ok) {
        const data = await response.json();
        dispatch(editComment(data));
        return data;
    }
}

// Delete A Comment
export const deleteAComment = (comment) => async (dispatch) => {
    const { id, comment_id } = comment;

    const response = await fetch(
        `/api/jokes/${id}/comments/${comment_id}`,
        {
            method: "DELETE",
        }
    );
    if (response.ok) {
        dispatch(deleteComment(comment_id));
    }
};

// Reducer
const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = {}
            const comments = action.comments;
            comments.comments.forEach((comment) => {
                newState[comment.id] = comment;
            })
            return newState;
        case ADD_COMMENT:
            return { ...state, [action.comment.id]: action.comment };
        case EDIT_COMMENT:
            return { ...state, [action.comment.id]: action.comment };
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.comment];
            return newState
        default:
            return state;
    }
}

export default commentReducer;
