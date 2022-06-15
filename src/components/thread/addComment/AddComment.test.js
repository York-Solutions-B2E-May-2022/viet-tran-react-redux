import {NEW_COMMENT} from "../../../modules/reducer";
import {render, screen} from "@testing-library/react";
import {AddComment} from "./AddComment";
import userEvent from "@testing-library/user-event";

test('should show a input with type textarea with placeholder "Add Comment"', () => {
    const dispatch = jest.fn();
    render(<AddComment _useDispatch={() => dispatch} _useSelector={() => {
    }}/>)

    const input = screen.getByPlaceholderText('Add Comment');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'textarea');
})

test('should show an enabled clear button that clears textarea when clicked and disabled when textarea empty', () => {
    const dispatch = jest.fn()

    render(<AddComment _useDispatch={() => dispatch} _useSelector={() => {}}/>);
    const button = screen.getByText('Clear');
    expect(button).toBeDisabled();
    const postText = screen.getByPlaceholderText('Add Comment');

    userEvent.type(postText, 'some sample text');
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    expect(postText).toHaveTextContent('')
})

test('should show an enabled save button that calls NEW_COMMENT when clicked with correct comment values and disabled when textarea empty', () => {
    const dispatch = jest.fn()
    const _useSelector = (fn) => fn(
        {
            currentUser:'admin'
        })

    render(<AddComment postID={1} _useDispatch={() => dispatch} _useSelector={_useSelector}/>);
    const button = screen.getByText('Reply');
    expect(button).toBeDisabled();
    const postText = screen.getByPlaceholderText('Add Comment');

    userEvent.type(postText, 'some sample text');
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    expect(dispatch).toHaveBeenCalled();

    expect(postText).toHaveTextContent('')
})

// test('should reflect change to comment when typed', () => {
//     const dispatch = jest.fn()
//
//     render(<AddComment _useDispatch={() => dispatch} _useSelector={() => {}}/>);
//
//     const postText = screen.getByPlaceholderText('Add Comment');
//
//     postText.simulate() 'some sample text'
//
//     expect(dispatch.mock.calls[0]).toBe('some sample text');
// })