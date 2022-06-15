import {Post} from "../post/Post";
import {useDispatch, useSelector} from "react-redux";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ON_POST_DELETE} from "../../../modules/reducer";

test(
    "should render a post with an user, date, and content",
    () => {
        const dispatch = jest.fn();
        const _useSelector = (fn) => fn(
            {
                commentList:[
                    {id:1, parentID:1, comment:'comment1', date: '02/02/22', user:'admin'},
                    {id:2, parentID:2, comment:'comment2', date: '02/22/22', user:'admin'},
                    {id:3, parentID:2, comment:'comment3', date: '02/22/22', user:'user2'},
                    {id:4, parentID:1, comment:'comment4', date: '02/22/22', user:'user3'}
                ],
                currentUser: 'admin'
            }
        )
        const testPost = {id: 1, content:'some sample text', date: '02/02/22', user: 'admin'};

        const mock = ({ testProp }) => <div>A mock with '{testProp}' passed!</div>;

        render(<Post post={testPost}_useDispatch={() => dispatch} _useSelector={_useSelector} _AddComment={mock}/>)

        expect(screen.getAllByText('By: admin').length).toBe(1);
        expect(screen.getAllByText('02/02/22').length).toBe(1);
        expect(screen.getAllByText('some sample text').length).toBe(1);
    }
)

test(
    "should render a delete, show comments buttons if user created thread",
    () => {
        const dispatch = jest.fn();
        const _useSelector = (fn) => fn(
            {
                currentUser: 'admin'
            }
        )
        const testPost = {id: 1, content:'some sample text', date: '02/02/22', user: 'admin'};

        const mock = ({ testProp }) => <div>A mock with '{testProp}' passed!</div>;

        render(<Post post={testPost}_useDispatch={() => dispatch} _useSelector={_useSelector} _AddComment={mock}/>)

        expect(screen.getAllByRole('button').length).toBe(2);
    }
)

test(
    "should not render an edit, delete reply button but still render a show comments button",
    () => {
        const dispatch = jest.fn();

        const testPost = {id: 1, content:'some sample text', date: '02/02/22', user: 'admin'};

        render(<Post post={testPost}_useDispatch={() => dispatch} _useSelector={()=>{}}/>)

        expect(screen.getAllByRole('button').length).toBe(1);
        expect(screen.getByText('Show Comments').tagName).toBe('BUTTON');
    }
)

test(
    "should render comments when clicked and change button text to 'Hide Comments'",
    () => {
        const dispatch = jest.fn();
        const _useSelector = (fn) => fn(
            {
                commentList:[
                    {id:1, parentID:1, comment:'comment1', date: '02/02/22', user:'admin'},
                    {id:2, parentID:2, comment:'comment2', date: '02/22/22', user:'admin'},
                    {id:3, parentID:2, comment:'comment3', date: '02/22/22', user:'user2'},
                    {id:4, parentID:1, comment:'comment1', date: '02/22/22', user:'user3'}
                ],
                currentUser: 'admin'
            }
        )
        const testPost = {id: 1, content:'some sample text', date: '02/02/22', user: 'admin'};

        const mock = ({ testProp }) => <div>MOCK</div>;

        render(<Post post={testPost}_useDispatch={() => dispatch} _useSelector={_useSelector} _AddComment={mock}/>)

        let btn = screen.getByText('Show Comments');
        expect(btn.tagName).toBe('BUTTON');
        userEvent.click(btn);
        expect(screen.getByText('Hide Comments').tagName).toBe('BUTTON');
    }
)

test(
    "should delete calls ON_POST_DELETE with post prop",
    () => {
        const dispatch = jest.fn();
        const _useSelector = (fn) => fn(
            {
                currentUser: 'admin'
            }
        )
        const post = {id: 1, content:'some sample text', date: '02/02/22', user: 'admin'};

        const mock = ({ testProp }) => <div>A mock with '{testProp}' passed!</div>;

        render(<Post post={post}_useDispatch={() => dispatch} _useSelector={_useSelector} _AddComment={mock}/>)

        const btn = screen.getByText('Delete');
        userEvent.click(btn);

        expect(dispatch).toHaveBeenCalledWith({type: ON_POST_DELETE, post})
    }
)

test(
    "should be able to type into post",
    () => {
        const dispatch = jest.fn();
        const _useSelector = (fn) => fn(
            {
                currentUser: 'admin'
            }
        )
        const post = {id: 1, content:'some sample text', date: '02/02/22', user: 'admin'};

        const mock = ({ testProp }) => <div>A mock with '{testProp}' passed!</div>;

        render(<Post post={post}_useDispatch={() => dispatch} _useSelector={_useSelector} _AddComment={mock}/>)

        const edit = screen.getByText('some sample text');
        userEvent.click(edit);
        userEvent.type(edit,' edited');

        expect(screen.getAllByText('some sample text edited').length).toBe(1);
    }
)

test(
    "should render comments when clicked and able to edit comments",
    () => {
        const dispatch = jest.fn();
        const _useSelector = (fn) => fn(
            {
                commentList:[
                    {id:1, parentID:1, comment:'comment1', date: '02/02/22', user:'admin'},
                    {id:2, parentID:2, comment:'comment2', date: '02/22/22', user:'admin'},
                    {id:3, parentID:2, comment:'comment3', date: '02/22/22', user:'user2'},
                    {id:4, parentID:1, comment:'comment4', date: '02/22/22', user:'user3'}
                ],
                currentUser: 'admin'
            }
        )
        const testPost = {id: 1, content:'some sample text', date: '02/02/22', user: 'admin'};

        const mock = ({ testProp }) => <div>MOCK</div>;

        render(<Post post={testPost}_useDispatch={() => dispatch} _useSelector={_useSelector} _AddComment={mock}/>)

        let btn = screen.getByText('Show Comments');
        expect(btn.tagName).toBe('BUTTON');
        userEvent.click(btn);
        const edit = screen.getByText('comment1');
        userEvent.click(edit);
        userEvent.type(edit,' edited');

        expect(screen.getAllByText('comment1 edited').length).toBe(1);
    }
)