import {render, screen} from "@testing-library/react";
import {Login} from "./Login";
import userEvent from '@testing-library/user-event';
import {CREATE_USER, ON_LOGIN, ON_LOGOUT} from "../../modules/reducer";

const placeholderPass = 'needs capital, lower, symbol, number, first-born, last 4 ssn, etc';
const placeholderUser = 'Gimme yur name';

test('should show a input with type text and placeholder in placeholderUser ', () => {
    const dispatch = jest.fn()

    render(<Login _useDispatch={() => dispatch} _useSelector={() => {}}/>);
    const input = screen.getByPlaceholderText(placeholderUser);
    expect(input.tagName).toBe('INPUT');
})

test('should show a input with type text and placeholder in placeholderPass ', () => {
    const dispatch = jest.fn()

    render(<Login _useDispatch={() => dispatch} _useSelector={() => {
    }}/>);
    const input = screen.getByPlaceholderText(placeholderPass);
    expect(input.tagName).toBe('INPUT');
})

test('should show a create user button that dispatches create_user event when clicked', () => {
    const dispatch = jest.fn()

    render(<Login _useDispatch={() => dispatch} _useSelector={() => {
    }}/>);
    const button = screen.getByText('Create User');
    expect(button.tagName).toBe('BUTTON');
    const username = screen.getByPlaceholderText(placeholderUser);
    const password = screen.getByPlaceholderText(placeholderPass);

    userEvent.type(username, 'admin')
    userEvent.type(password, 'pass')
    userEvent.click(button);

    expect(dispatch).toHaveBeenCalledWith(
        {type: CREATE_USER, creds: {username: 'admin', password: 'pass'}}
    )
})

test('should show a login button that dispatches ON_LOGIN event when clicked', () => {
    const dispatch = jest.fn()

    render(<Login _useDispatch={() => dispatch} _useSelector={() => {
    }}/>);
    const button = screen.getByText('Login');
    expect(button.tagName).toBe('BUTTON');
    const username = screen.getByPlaceholderText(placeholderUser);
    const password = screen.getByPlaceholderText(placeholderPass);

    userEvent.type(username, 'admin')
    userEvent.type(password, 'pass')
    userEvent.click(button);

    expect(dispatch).toHaveBeenCalledWith(
        {type: ON_LOGIN, creds: {username: 'admin', password: 'pass'}}
    )
})

test('login button should be disabled until both username and password has content', () => {
    const dispatch = jest.fn()

    render(<Login _useDispatch={() => dispatch} _useSelector={() => {
    }}/>);

    const button = screen.getByText('Login');
    expect(button.tagName).toBe('BUTTON');

    const username = screen.getByPlaceholderText(placeholderUser);
    const password = screen.getByPlaceholderText(placeholderPass);

    expect(button).toBeDisabled();
    userEvent.type(username, 'admin');
    expect(button).toBeDisabled();
    userEvent.type(password, 'pass');
    expect(button).not.toBeDisabled();
})

test('create user button should be disabled until both username and password has content', () => {
    const dispatch = jest.fn()

    render(<Login _useDispatch={() => dispatch} _useSelector={() => {
    }}/>);

    const button = screen.getByText('Create User');
    expect(button.tagName).toBe('BUTTON');

    const username = screen.getByPlaceholderText(placeholderUser);
    const password = screen.getByPlaceholderText(placeholderPass);

    expect(button).toBeDisabled();
    userEvent.type(username, 'admin');
    expect(button).toBeDisabled();
    userEvent.type(password, 'pass');
    expect(button).not.toBeDisabled();
})

test('should show a logout button that dispatches ON_LOGOUT event when clicked', () => {
    const dispatch = jest.fn()
    render(<Login _useDispatch={() => dispatch} _useSelector={() => {
    }} _isLogged={true}/>);

    const expectButton = screen.getByText('Logout');
    expect(expectButton.tagName).toBe('BUTTON');
    userEvent.click(expectButton);
    expect(dispatch).toHaveBeenCalledWith(
        {type: ON_LOGOUT}
    )
})