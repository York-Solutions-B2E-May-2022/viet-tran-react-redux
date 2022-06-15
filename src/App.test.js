import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login component', () => {
  const dispatch = jest.fn();
  const _Login = () => <div>MOCK</div>
  render(<App _Login={_Login} _useDispatch={() => dispatch} _useSelector={() => {}}/>);
  expect(screen.getByText('MOCK')).toBeInTheDocument();
});

test('renders user component', () => {
  const dispatch = jest.fn();
  const _User = () => <div>anadmin</div>
  render(<App _User={_User} _useDispatch={() => dispatch} _useSelector={() => {}}/>);
  expect(screen.getByText('anadmin')).toBeInTheDocument();
});

test('renders threadlist component', () => {
  const dispatch = jest.fn();
  const _ThreadList = () => <div>post</div>
  render(<App _ThreadList={_ThreadList} _useDispatch={() => dispatch} _useSelector={() => {}}/>);
  expect(screen.getByText('post')).toBeInTheDocument();
});

test('renders addpost component', () => {
  const dispatch = jest.fn();
  const _AddPost = () => <div>the ads</div>
  render(<App _AddPost={_AddPost} _useDispatch={() => dispatch} _useSelector={() => {}}/>);
  expect(screen.getByText('the ads')).toBeInTheDocument();
});