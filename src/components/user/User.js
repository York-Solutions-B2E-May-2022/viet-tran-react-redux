import {useSelector} from "react-redux";
import React from "react";

export function User({_useSelector = useSelector}) {
    const users = _useSelector(state => state.userList);

    let usersList = users.map(x => (x.username + ' '));
    return <div className={'border-3 border-danger'}>
        Other like-minded internet trolls: <p className={'text-danger'}>{usersList}</p>
    </div>
}