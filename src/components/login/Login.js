import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_USER, ON_LOGIN, ON_LOGOUT} from "../../modules/reducer";
import {useState} from "react";

export function Login({_useDispatch = useDispatch, _useSelector= useSelector, _isLogged=false}) {
    const dispatch = _useDispatch();

    //Bindings
    const isLogged = _useSelector(state => state.isLoggedIn);
    const user = _useSelector(state => state.currentUser);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginError = _useSelector(state => state.loginError);
    //const _isLogged = props;

    function onUsernameChange(e) {
        setUsername(e.target.value)
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleLogout(e) {
        e.preventDefault();
        setUsername('');
        setPassword('');

        dispatch({type: ON_LOGOUT});
    }

    if (!isLogged && !_isLogged) {
        return <div className= {'justify-content-lg-center'}>
            <label>Username:<input onChange={onUsernameChange} value={username} type={'text'} placeholder={"Gimme yur name"}/></label>
            <label>Password:<input onChange={onPasswordChange} value={password} type={'password'}
                                   placeholder={"needs capital, lower, symbol, number, first-born, last 4 ssn, etc"}/></label>
            <Button size='sm' disabled={!username || !password}
                    onClick={() => dispatch({
                        type: CREATE_USER, creds: {
                            username,
                            password
                        }
                    })}>
                Create User
            </Button>
            <Button size='sm' disabled={!username || !password}
                    onClick={() => dispatch({
                        type: ON_LOGIN, creds: {
                            username,
                            password
                        }
                    })}>
                Login
            </Button>
            <br/>
            <span className='text-danger'>{loginError}</span>
        </div>
    } else {
        return <div className={'justify-content-lg-center'}>
            Welcome {user}
            <Button size='sm'
                    onClick={handleLogout}>
                Logout
            </Button>
        </div>
    }
}