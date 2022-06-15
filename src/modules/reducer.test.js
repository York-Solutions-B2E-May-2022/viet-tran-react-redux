import {
    CREATE_USER,
    NEW_COMMENT,
    NEW_THREAD,
    ON_COMMENT_DELETE, ON_COMMENT_EDIT,
    ON_LOGIN,
    ON_LOGOUT,
    ON_POST_DELETE, ON_POST_EDIT,
    reducer,
    SEND_PM
} from "./reducer";

test('should start with correct init state', () => {
    expect(reducer(undefined, {})).toEqual({
                isLoggedIn: false,
                userList: [{username: 'admin', password: 'pass'}, {username: 'a', password: 'a'}],
                currentUser: '',
                currentPassword: '',
                commentList: [{parentID:1, comment:'a', date: '02/22/22', user:'admin'},
                {parentID:1, comment:'comment2', date: '02/22/22', user:'user2'}, {parentID:2, comment:'comment3', date: '02/22/22', user:'user2'},
                {parentID:1, comment:'comment4', date: '02/22/22', user:'user3'}],
                threadList: [{id: 1, content:'a', date: '02/22/22', user: 'admin'}, {id: 2, content:'b', date: '02/22/22', user: 'admin'}],
                messageList: [],
                loginError: ''});
})

test('should call CREATE_USER and succeed with only changes to loggedin state, userList, currentUser, and currentPassword', () => {
    const initState = reducer();
    const state = reducer(initState, {type: CREATE_USER, creds: {username: 'admin1', password: 'pass'}})
    expect(state).toStrictEqual({
        ...initState,
        isLoggedIn: true,
        userList: [
            ...initState.userList,
            {
                username: 'admin1', password: 'pass'
            }
        ],
        currentUser: 'admin1',
        currentPassword: 'pass'
    })
})

test('should call CREATE_USER and fail with changes to loginerror', () => {
    const initState = reducer();
    const state = reducer(initState, {type: CREATE_USER, creds: {username: 'admin', password: 'a'}})
    expect(state).toStrictEqual({
        ...initState,
        loginError: 'Someone had the same bright idea for a name as you!'
    })
})

test('should call ON_LOGIN and fail with changes to loginerror', () => {
    const initState = reducer();
    const state = reducer(initState, {type: ON_LOGIN, creds: {username: 'admin', password: 'a'}})
    expect(state).toStrictEqual({
        ...initState,
        loginError: "You're username and/or password is incorrect but I can but won't tell you which one it is."
    })
})

test('should call ON_LOGIN and succeed with changes to currentUser and isLoggedIn', () => {
    const initState = reducer();
    const state = reducer(initState, {type: ON_LOGIN, creds: {username: 'admin', password: 'pass'}})
    expect(state).toStrictEqual({
        ...initState,
        isLoggedIn: true,
        currentUser: 'admin'
    })
})

test('should call CREATE_USER, add to userList then calls on ON_LOGOUT with only change to userList', () => {
    const initState = reducer();
    const state = reducer(initState, {type: CREATE_USER, creds: {username: 'admin1', password: 'pass'}})
    const newState = reducer(state, {type: ON_LOGOUT})
    expect(newState).toStrictEqual({
        ...initState,
        userList: [
            ...initState.userList,
            {
                username: 'admin1',
                password: 'pass'
            }
        ]
    })
})

test('should call ON_POST_DELETE, filter the postid from threadList, and child comments', () => {
    const initState = reducer();
    const post = {id: 2, content:'b', date: '02/22/22', user: 'admin'}
    const state = reducer(initState, {type: ON_POST_DELETE, post})
    expect(state).toStrictEqual({
        ...initState,
        threadList: [
            {id: 1, content:'a', date: '02/22/22', user: 'admin'},
            {id: 3, content:'c', date: '02/22/22', user: 'admin'} //removed id2
        ],
        commentList: [
            {parentID:1, comment:'a', date: '02/22/22', user:'admin'},
            {parentID:1, comment:'comment2', date: '02/22/22', user:'user2'},
            {parentID:1, comment:'comment4', date: '02/22/22', user:'user3'}
        ]

    })
})

test('should call ON_COMMENT_DELETE, filter the the post from commentList', () => {
    const initState = reducer();
    const post =  {id:3, parentID:2, comment:'comment3', date: '02/22/22', user:'user2'}
    const state = reducer(initState, {type: ON_COMMENT_DELETE, post})
    expect(state).toStrictEqual({
        ...initState,
        commentList: [
            {id:1, parentID:1, comment:'a', date: '02/22/22', user:'admin'},
            {id: 2, parentID:1, comment:'comment2', date: '02/22/22', user:'user2'},
            {id: 4, parentID:1, comment:'comment4', date: '02/22/22', user:'user3'}
        ]
    })
})

test('should call NEW_THREAD, add to threadList', () => {
    const initState = reducer();
    const post = {id: 2, content:'b', date: '02/22/22', user: 'admin'}
    const state = reducer(initState, {type: NEW_THREAD, post})
    expect(state).toStrictEqual({
        ...initState,
        threadList: [
            ...initState.threadList,
            post
        ]
    })
})

test('should call NEW_COMMENT, add to commentList', () => {
    const initState = reducer();
    const post = {parentID: 2, message:'b', date: '02/22/22', user: 'admin'}
    const state = reducer(initState, {type: NEW_COMMENT, post})
    expect(state).toStrictEqual({
        ...initState,
        commentList: [
            ...initState.commentList,
            post
        ]
    })
})

test('should call SEND_PM, add to messageList', () => {
    const initState = reducer();
    const creds = {toUser: 'admin', message:'sample', date: '02/22/22', fromUser: 'admin'}
    const state = reducer(initState, {type: SEND_PM, creds})
    expect(state).toStrictEqual({
        ...initState,
        messageList: [
            ...initState.messageList,
            creds
        ]
    })
})

test('should call ON_POST_EDIT, EDITS a post', () => {
    const initState = reducer();
    const creds = {newEdit: 'new Edit', id: 1}
    const state = reducer(initState, {type: ON_POST_EDIT, creds})
    expect(state).toStrictEqual({
        ...initState,
        threadList: [
            {id: 1, content:'new Edit', date: '02/22/22', user: 'admin'}, //changed from a
            {id: 2, content:'b', date: '02/22/22', user: 'admin'},
            {id: 3, content:'c', date: '02/22/22', user: 'admin'}
        ]
    })
})

test('should call ON_COMMENT_EDIT, EDITS a comment', () => {
    const initState = reducer();
    const creds = {newEdit: 'new Edit', id: 1}
    const state = reducer(initState, {type: ON_COMMENT_EDIT, creds})
    expect(state).toStrictEqual({
        ...initState,
        commentList: [
            {id:1, parentID:1, comment:'new Edit', date: '02/22/22', user:'admin'}, //changed
            {id:2, parentID:1, comment:'comment2', date: '02/22/22', user:'user2'},
            {id:3, parentID:2, comment:'comment3', date: '02/22/22', user:'user2'},
            {id:4, parentID:1, comment:'comment4', date: '02/22/22', user:'user3'}
        ]
    })
})