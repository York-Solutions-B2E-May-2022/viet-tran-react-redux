import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NEW_COMMENT} from "../../../modules/reducer";
import {v4 as uuidv4} from "uuid";

export function AddComment({postID, _useDispatch=useDispatch, _useSelector= useSelector}) {
    const author = _useSelector(state => state.currentUser);
    const dispatch = _useDispatch();

    const newComment = {
        parentID: postID,
        id: uuidv4(),
        user: author,
        comment: '',
        date: new Date()
    }

    const [post, setFormState] = useState(newComment);

    function onCommentChange(event) {
        setFormState({
            ...post,
            comment: event.target.value
        })
    }

    function addComment(e) {
        e.preventDefault();
            dispatch({type: NEW_COMMENT, post});
            setFormState(newComment);
    }

    function initForm() {
        setFormState(newComment);
    }

    return <div><form>
        <input onChange={onCommentChange} value={post.comment} type={'textarea'} placeholder={"Add Comment"}/>
        <button disabled={!post.comment} onClick={initForm}>Clear</button>
        <button disabled={!post.comment} onClick={addComment}>Reply</button>
    </form>
    </div>
}