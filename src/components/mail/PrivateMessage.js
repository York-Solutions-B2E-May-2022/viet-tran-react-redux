import {Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {SEND_PM} from "../../modules/reducer";
import {useState} from "react";

export function PrivateMessage({_useDispatch = useDispatch, _useSelector= useSelector}) {
    const dispatch = _useDispatch();
    const users = _useSelector(state => state.userList);
    const messageList = _useSelector(state => state.messageList);
    const fromUser = _useSelector(state => state.currentUser);

    const [toUser, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onMessageChange=(e) => {
        setMessage(e.target.value)
    }
    const handleChange = (e) => {
        setUser(e.target.value)
    }

    function handleOnClick(e) {
        e.preventDefault();
        let date = new Date;
        dispatch({
            type: SEND_PM, creds: {
                toUser,
                message,
                fromUser,
                date
            }})
        setMessage('');
    }

    return <>
        <div>
            <h1>INBOX</h1>
            {messageList?.filter(x => x.toUser === fromUser).map((x, idx) => {
                return <div>
                    <Card>
                        <Card.Header as="h5">
                            <div>Mail From: {x.fromUser}</div>
                            <div>on {x.date.toLocaleString('en-US')}</div>
                        </Card.Header>
                        <div className={'p-2'}>{x.message}</div>
                    </Card>
                </div>
            })}
        </div>
        <div>
            <form className="message-form flex-container">
            <div className={'flex left'}>Send To:
                <select onChange={(e) => handleChange(e)}>
                    <option key={"don't choose this"} value={''}>Mail To:</option>
                    {users?.map(x =>
                        <option key={x.index} value={x.username}>{x.username}</option>
                    )}
                </select>
            </div>
                <div className={'flex left'}><textarea placeholder="Message here" onChange={onMessageChange} value={message} rows="4">

                </textarea></div>
                <div className={'flex right'}><button disabled={!toUser && !message }onClick={handleOnClick}>Send Message</button></div>
            </form>
        </div>
        </>
}