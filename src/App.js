import './App.css';
import {Login} from "./components/login/Login";
import {ThreadList} from "./components/thread/threadList/ThreadList";
import {AddPost} from "./components/thread/addPost/AddPost";
import {User} from "./components/user/User";
import {PrivateMessage} from "./components/mail/PrivateMessage";

function App(props) {

  const {
    _Login = Login,
    _AddPost = AddPost,
    _ThreadList = ThreadList,
    _User = User,
    _PrivateMessage = PrivateMessage
  } = props;

  return <div className={'d-flex flex-column'}>
    <header><_Login/></header>
    <main className={'container-fluid flex-fill'}><_AddPost/> <_ThreadList/></main>
    <div className={'float-right'}><_PrivateMessage/></div>
    <footer><_User/></footer>
  </div>
}

export default App;