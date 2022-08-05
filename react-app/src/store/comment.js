export const GET_COMMENTS = '/GET_COMMENTS';
// export const GET_COMMENT = '/GET_COMMENT';
export const ADD_COMMENT = '/ADD_COMMENT';
export const EDIT_COMMENT = '/EDIT_COMMENT';
export const DELETE_COMMENT = '/DELETE_JOKE';

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
    type: GET_COMMENTS,
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
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data));
        return data
    }
}

// Edit A Comment


// Reducer
const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = {}
            const comments = action.comments;
            comments.comment.forEach((comment) => {
                newState[comment.id] = comment;
            })
        case ADD_COMMENT:
            return { ...state, [action.comment.id]: action.comment}
        default:
            return state;
    }
}

export default commentReducer;
