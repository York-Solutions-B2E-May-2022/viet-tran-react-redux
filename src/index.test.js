import {render, screen} from "@testing-library/react";

test('Should render App', () => {
    const _App = () => <div>cookies</div>
    render(<_App _useDispatch={() => {}} _useSelector={() => {}} />);
    expect(screen.getByText('cookies')).toBeInTheDocument();
});