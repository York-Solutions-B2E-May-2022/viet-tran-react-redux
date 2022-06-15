import {AddPost} from "./AddPost";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test('should show a input with type textarea with placeholder "Post Here"', () => {
    const dispatch = jest.fn();
    render(<AddPost _useDispatch={() => dispatch} _useSelector={() => {
    }}/>)

    const input = screen.getByPlaceholderText('Post Here');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'textarea');
})

test('should show an enabled cancel button that clears textarea when clicked and disabled when textarea empty', () => {
    const dispatch = jest.fn()

    render(<AddPost _useDispatch={() => dispatch} _useSelector={() => {}}/>);
    const button = screen.getByText('Cancel');
    expect(button).toBeDisabled();
    const postText = screen.getByPlaceholderText('Post Here');

    userEvent.type(postText, 'some sample text');
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    expect(postText).toHaveTextContent('')
})

test('should show an enabled save button that calls NEW_THREAD clicked and disabled when textarea empty', () => {
    const dispatch = jest.fn()
    const _useSelector = (fn) => fn(
        {
            isLoggedIn: true,
            currentUser: 'a'
        })

    // const mockData = {
    //     content: "some sample text",
    //     date: expect.any(String),
    //     deleted: false,
    //     id: expect.any(Number),
    //     parentID: expect.any(Number),
    //     user: 'a',
    // }

    render(<AddPost _useDispatch={() => dispatch} _useSelector={_useSelector}/>);
    const button = screen.getByText('Save');
    expect(button).toBeDisabled();
    const postText = screen.getByPlaceholderText('Post Here');

    userEvent.type(postText, 'some sample text');
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    expect(dispatch).toHaveBeenCalled(); //called with object uuid and date dependencies, not sure how to test

    expect(postText).toHaveTextContent('')
})

test('should show an alert when user not logged in', () => {
    const dispatch = jest.fn()
    const alertMock = jest.spyOn(window,'alert').mockImplementation();

    render(<AddPost _useDispatch={() => dispatch} _useSelector={() => {}}/>);
    const button = screen.getByText('Save');
    expect(button).toBeDisabled();
    const postText = screen.getByPlaceholderText('Post Here');

    userEvent.type(postText, 'some sample text');
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    expect(alertMock).toHaveBeenCalledTimes(1);
})