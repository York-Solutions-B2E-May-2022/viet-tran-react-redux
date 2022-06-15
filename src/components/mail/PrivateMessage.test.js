import {PrivateMessage} from "./PrivateMessage";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {SEND_PM} from "../../modules/reducer";

test('should render a select/dropdown with correct number of options', () => {
    const dispatch = jest.fn()
    const _useSelector = (fn) => {
        return fn(
            {
                userList: [
                        {username: "username"},
                        {username: 'hi'}
                    ]
            })
    }

    render(<PrivateMessage _useDispatch={() => dispatch} _useSelector={_useSelector}/>);
    expect(screen.getAllByRole('option').length).toBe(3); //empty select + 2 from mock
})

test('should render a commentbox input', () => {
    const dispatch = jest.fn()

    render(<PrivateMessage _useDispatch={() => dispatch} _useSelector={()=>{}}/>);
    expect(screen.getByPlaceholderText('Message here').tagName).toBe('TEXTAREA');
})

test('should dispatch SEND_PM with correct creds', () => {
    const dispatch = jest.fn()
    const _useSelector = (fn) => {
        return fn(
            {
                currentUser: 'a',
                userList: [
                    {username: "a"},
                    {username: 'admin'}
                ]
            })
    }
    render(<PrivateMessage _useDispatch={() => dispatch} _useSelector={_useSelector}/>);

    userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'admin' } )
    )

    const pm = screen.getByPlaceholderText('Message here');
    userEvent.type(pm, 'some text');
    const btn = screen.getByText('Send Message');
    expect(btn.tagName).toBe('BUTTON');
    userEvent.click(btn);

    expect(dispatch).toHaveBeenCalledWith(
        {type: SEND_PM, creds: {toUser: 'admin',
                message: 'some text',
                fromUser: 'a',
                date: new Date()}}
    )
})

test("should render 'MOCKMESSAGE' and filter by logged in user", () => {
    const dispatch = jest.fn()
    const _useSelector = (fn) => {
        return fn(
            {
                currentUser: 'admin',
                messageList: [
                    {toUser: "username", message:'MOCKMESSAGE', date: Date.now()},{toUser: "admin", message:'MOCKMESSAGE',date: Date.now()},
                    {toUser: "admin", message:'MOCKMESSAGE', date: Date.now()},{toUser: "username", message:'MOCKMESSAGE', date: Date.now()},
                    {toUser: "username", message:'MOCKMESSAGE', date: Date.now()},{toUser: "username", message:'MOCKMESSAGE', date: Date.now()}
                ]
            })
    }

    render(<PrivateMessage _useDispatch={() => dispatch} _useSelector={_useSelector}/>);
    expect(screen.getAllByText('MOCKMESSAGE').length).toBe(2);
})