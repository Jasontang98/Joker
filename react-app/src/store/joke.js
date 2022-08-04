export const GET_JOKES = '/GET_JOKES';
export const GET_JOKE = '/GET_JOKE';
export const ADD_JOKE = '/ADD_JOKE';
export const EDIT_JOKE = '/EDIT_JOKE';
export const DELETE_JOKE = '/DELETE_JOKE';

const getJokes = (jokes) => ({
    type: GET_JOKES,
    jokes
})

const getJoke = (joke) => ({
    type: GET_JOKE,
    joke
})

const addJoke = (joke) => ({
    type: ADD_JOKE,
    joke
})

const editJoke = (joke) => ({
    type: EDIT_JOKE,
    joke
})

const deleteJoke = (joke) => ({
    type: DELETE_JOKE,
    joke
})

// Get All Jokes
export const getAllJokes = () => async (dispatch) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    const response = await fetch(`/api/jokes`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getJokes(data));
        return data;
    }
}

// Get One Joke
export const getSingleJoke = (id) => async (dispatch) => {
    const response = await fetch(`/api/jokes/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getJoke(data));
        return data
    }
}

// Post A Joke
export const createJoke = (joke) => async(dispatch) => {
    const {user_id, content, image_url} = joke;
    const form = new FormData();

    form.append("user_id", user_id);
    form.append("content", content);
    form.append("image_url", image_url);

    const response = await fetch('/api/jokes/post', {
        method: "POST",
        body: form
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addJoke(data));
        return data
    }
}

export const updateJoke = (joke) => async(dispatch) => {
    const { id, content } = joke;

    const form = new FormData();

    form.append("id", id);
    form.append("content", content);

    const response = await fetch(`/api/jokes/edit/${id}`, {
        method: "PUT",
        body: form
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(editJoke(data));
        return data
    }
}

export const removeJoke = (joke) => async(dispatch) => {
    const response = await fetch(`/api/jokes/delete/${joke.id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteJoke(data))
    }
}

// Reducer
const initialState = {};

const jokeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_JOKES:
            const jokes = action.jokes;
            newState = { ...state }
            jokes.joke.forEach((joke) => {
                newState[joke.id] = joke;
            })
            return newState;
        case GET_JOKE:
            return { ...state, [action.joke.id]: action.joke}
        case ADD_JOKE:
            return { ...state, [action.joke.id]: action.joke}
        case EDIT_JOKE:
            return { ...state, [action.joke.id]: { ...action.joke } };
        case DELETE_JOKE:
            newState = { ...state }
            delete newState[action.joke.id];
            return newState
        default:
            return state;
    }
}

export default jokeReducer;
