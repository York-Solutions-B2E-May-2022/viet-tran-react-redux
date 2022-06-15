import {screen, render} from "@testing-library/react";
import {ThreadList} from "./ThreadList";

test(
    "should render a thread post for each item in threadlist[]",
    () => {
        const _useSelector = (fn) => fn(
            {   threadList:
                [
                    {id: '1',
                    user: 'a',
                    content: 'aa',
                    parentID: '1',
                    date: new Date()}
                ]
            }
        )

        const _Post = () => {
            return <div>MOCK</div>
        }

        render(<ThreadList _useSelector={_useSelector} _Post={_Post}/>)

        const threadComps = screen.getAllByText('MOCK')
        expect(threadComps.length).toBe(1) //not sure how to access state.threadList
    }
)

test('should pass correct post prop, onEdit, and onDelete to each thread comp', () => {
    const _useSelector = (fn) => fn({threadList: [1]})
    const _list = [1];

    let postProp;
    const _Post = ({post}) => {
        postProp = post;
        return <div>MOCK</div>
    }

    render(<ThreadList list={_list} _useSelector={_useSelector} _Post={_Post}/>)
    expect(postProp).toBe(_list[0])
})
