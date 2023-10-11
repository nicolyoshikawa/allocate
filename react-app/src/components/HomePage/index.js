import AllExpenses from "../AllExpenses";
import { useSelector } from "react-redux";
import { useHistory} from "react-router-dom";

export default function Home() {
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    if (!user) {
      history.push("/")
    }

    return user && (
        <div className="middle">
            <AllExpenses/>
        </div>
    )
}
