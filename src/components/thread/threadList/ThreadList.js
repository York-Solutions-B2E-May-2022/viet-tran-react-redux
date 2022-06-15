import {Post} from "../post/Post";
import {useSelector} from "react-redux";

export function ThreadList({_useSelector= useSelector, _Post= Post}) {

    const list = _useSelector(state => state.threadList)

    function sortThreadList(a, b) { //by most recent
        if (a?.date > b?.date) return -1;
        if (a?.date < b?.date) return 1;
        return 0;
    }
    return <div>
        <h1>Threads</h1>
        <div>
        {
            list?.sort(sortThreadList)?.map((x, index) => {
                    return <div key={index}>
                        <_Post post={x}/>
                    </div>
                })
        }
    </div>
    </div>
}