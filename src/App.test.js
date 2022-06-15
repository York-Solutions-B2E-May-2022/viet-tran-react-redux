import { render, screen } from '@testing-library/react';
import App from './App';
import {AddPost} from "./components/thread/addPost/AddPost";

test('renders login component', () => {
  const _Login = () => <div>MOCK</div>
  render(<App _Login={_Login}/>);
  expect(screen.getByText('MOCK')).toBeInTheDocument();
});

test('renders user component', () => {
  const _User = () => <div>anadmin</div>
  render(<App _User={_User}/>);
  expect(screen.getByText('anadmin')).toBeInTheDocument();
});

test('renders threadlist component', () => {
  const _ThreadList = () => <div>post</div>
  render(<App _ThreadList={_ThreadList}/>);
  expect(screen.getByText('post')).toBeInTheDocument();
});

test('renders addpost component', () => {
  const _AddPost = () => <div>the ads</div>
  render(<App _AddPost={_AddPost}/>);
  expect(screen.getByText('the ads')).toBeInTheDocument();
});