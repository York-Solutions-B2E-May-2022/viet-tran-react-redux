import {Button, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ON_POST_EDIT, ON_POST_DELETE, ON_COMMENT_DELETE, ON_COMMENT_EDIT} from "../../../modules/reducer";
import {useState} from "react";
import {AddComment} from "../addComment/AddComment";

export function Post({post, _useDispatch = useDispatch, _useSelector= useSelector, _AddComment=AddComment}) {
    const dispatch = _useDispatch();
    const user = _useSelector(state => state.currentUser);
    const [showComments, setComments] = useState(false);
    const comments = _useSelector(state => state.commentList);

    let postModButtons=[]; //stays blank if no logged user
    let childPosts = comments?.filter(x => x.parentID === post?.id).map((x, index) => {
        return <div className={'text-lg-start'} key={index}>
            {x.user} on {x.date.toLocaleString('en-US')} commented:<br/> <p onInput={(e) =>
            dispatch({type: ON_COMMENT_EDIT, creds: {newEdit: e.currentTarget.textContent, id: x.id}})}
            contentEditable={x?.user === user}>{x.comment}</p>
            {x.user === user? <Button onClick={() => dispatch({type: ON_COMMENT_DELETE, post: x})}>Delete</Button> : ''}
        </div>
    });
    let replyForm = '';

    if (user) {
        replyForm = <_AddComment postID={post?.id}/>

        if (post?.user === user)
            postModButtons.push(<Button onClick={() => dispatch({type: ON_POST_DELETE, post: post})}>Delete</Button>);
    }
    postModButtons.push(<Button style={{float: 'right'}}
                                onClick={() => setComments(s => !s)}>{showComments ? 'Hide Comments' : 'Show Comments'}</Button>)

    return <Card className={'mt-2'}>
        <Card.Header as="h5">
            <div>By: {post?.user}</div>
            <div>{post?.date.toLocaleString('en-US')}</div>
        </Card.Header>
        <div><div onInput={(e) => dispatch({type: ON_POST_EDIT, creds: {newEdit: e.currentTarget.textContent, id: post.id}})}
                  contentEditable={post?.user === user} className={'p-2'}>{post?.content}</div>{postModButtons}<br/>{replyForm}</div>
        <Card.Footer>
            {showComments? childPosts: null}
        </Card.Footer>
    </Card>
}