import {screen, render} from "@testing-library/react";
import {User} from "./User";

test(
    "should render username for each item in state.userList",
    () => {
        const _useSelector = (fn) => fn({userList: [{username: 'cc', password:'a'}]}) //, {username:'adminB', password: 'b'}
        render(<User _useSelector={_useSelector}/>)
        expect(screen.getByText('cc')).toBeInTheDocument();
    }
)