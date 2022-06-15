import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {NEW_THREAD} from "../../../modules/reducer";

export function AddPost({_useDispatch=useDispatch, _useSelector= useSelector}) {
    const author = _useSelector(state => state.currentUser);
    const isLogged = _useSelector(state => state.isLoggedIn)
    const dispatch = _useDispatch();

    const newPost = {
        id: uuidv4(),
        user: '',
        content: '',
        date: new Date()
    }

    const [post, setFormState] = useState(newPost);

    function onContentChange(event) {
        setFormState({
            ...post,
            content: event.target.value
        })
    }

    function addPost(e) {
        e.preventDefault();
        if (isLogged) {
            post.user = author;
            dispatch({type: NEW_THREAD, post});
            setFormState(newPost);
        }
        else alert("Hi friend, it looks like you don't have an account yet, how about " +
            "creating one before you start your trolling adventure.")
    }

    function initForm() {
        setFormState(newPost);
    }

    return <form>
        <input onChange={onContentChange} value={post.content} type={'textarea'} placeholder={"Post Here"}/>
            <button disabled={!post.content} onClick={initForm}>Cancel</button>
            <button disabled={!post.content} onClick={addPost}>Save</button>
    </form>
}