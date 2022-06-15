export const ON_LOGIN = 'reducer/ON_LOGIN';
export const CREATE_USER = 'reducer/CREATE_USER';
export const ON_LOGOUT = 'reducer/ON_LOGOUT';
export const ON_POST_EDIT = 'reducer/ON_POST_EDIT';
export const ON_POST_DELETE = 'reducer/ON_POST_DELETE';
export const NEW_COMMENT = 'reducer/ON_POST_REPLY';
export const NEW_THREAD = 'reducer/NEW_THREAD';
export const SEND_PM = 'reducer/SEND_PM';
export const ON_COMMENT_DELETE = 'reducer/ON_COMMENT_DELETE';
export const ON_COMMENT_EDIT = 'reducer/ON_COMMENT_EDIT';

const initState = {
    isLoggedIn: false,
    userList: [{username: 'admin', password: 'pass'}, {username: 'a', password: 'a'}],
    currentUser: '',
    currentPassword: '',
    commentList: [{id:1, parentID:1, comment:'a', date: '02/22/22', user:'admin'},
        {id: 2, parentID:1, comment:'comment2', date: '02/22/22', user:'user2'},
        {id:3, parentID:2, comment:'comment3', date: '02/22/22', user:'user2'},
        {id: 4, parentID:1, comment:'comment4', date: '02/22/22', user:'user3'}],
    threadList: [{id: 1, content:'a', date: '02/22/22', user: 'admin'},
        {id: 2, content:'b', date: '02/22/22', user: 'admin'},
        {id: 3, content:'c', date: '02/22/22', user: 'admin'}],
    messageList: [],
    loginError: ''
}

export function reducer(state = initState, action) {
    function validateUser(isNew) { //isNew === true when CREATE_USER is dispatched
        if (!isNew)
            return state.userList.findIndex(x => x?.username === action.creds.username
                && x?.password === action?.creds.password) !== -1
        return state.userList.findIndex(x => x?.username === action?.creds.username) === -1

        //add return if user does not exist option to create instead?
    }

    switch (action?.type) {
        case CREATE_USER:
            if (validateUser(true)) {
                return {
                    ...state,
                    isLoggedIn: true,
                    userList: [
                        ...state.userList,
                        {username: action.creds.username,
                            password: action.creds.password}
                    ],
                    currentUser: action.creds.username,
                    currentPassword: action.creds.password
                }
            }
            else return {
                ...state,
                loginError: 'Someone had the same bright idea for a name as you!'
            }
        case ON_LOGIN:
            if (validateUser(false)) {
                return {
                    ...state,
                    isLoggedIn: true,
                    currentUser: action.creds.username
                }
            }
            else return {
                ...state,
                loginError: "You're username and/or password is incorrect but I can but won't tell you which one it is."
            }
        case ON_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: '',
                currentPassword: '',
                loginError: ''
            }
        case ON_POST_EDIT:
            return {
                ...state,
                threadList: state.threadList.map((post) => {
                    if (action.creds.id === post.id) {
                        post.content = action.creds.newEdit
                    }

                    return post;
                })
            }
        case ON_COMMENT_EDIT:
            return {
                ...state,
                commentList: state.commentList.map((x) => {
                    if (action.creds.id === x.id) {
                        x.comment = action.creds.newEdit
                    }

                    return x
                })
            }
        case ON_POST_DELETE:
            return {
                ...state,
                threadList: state.threadList.filter(x=>x.id !== action.post.id),
                commentList: state.commentList.filter(x=>x.parentID !== action.post.id)
            }
        case NEW_THREAD:
            return {
                ...state,
                threadList: [
                    ...state.threadList,
                    action.post
                ]
            }
        case NEW_COMMENT:
            return {
                ...state,
                commentList: [
                    ...state.commentList,
                    action.post
                ]
            }
        case SEND_PM:
            return {
                ...state,
                messageList: [
                    ...state.messageList,
                    {toUser: action.creds.toUser,
                    message: action.creds.message,
                    fromUser: action.creds.fromUser,
                    date: action.creds.date}
                ]
            }
        case ON_COMMENT_DELETE:
            return {
                ...state,
                commentList: state.commentList.filter(x=>x.id !== action.post.id)
            }
        default:
            return {
                ...state
            }
    }
}