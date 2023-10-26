import OpenModalButton from "../OpenModalButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteExpense from "../DeleteExpense";
import EditExpense from "../EditExpense";

const ManageExpenses = ({expense}) => {
    const [showMenu, setShowMenu] = useState(true);
    const user = useSelector(state => state.session.user);
    const closeMenu = () => setShowMenu(false);

    let ownExpense = false;
    if(user?.id === expense?.paid_by){
        ownExpense = true;
    }

    return (
        <>
        {showMenu && ownExpense && (
            <>
                <div className="expense-edit">
                    <div className="expense-edit-button">
                        <OpenModalButton
                            buttonText="Edit expense"
                            onItemClick={closeMenu}
                            modalComponent={<EditExpense expense={expense}/>}
                        />
                    </div>
                    <div className="expense-edit-button">
                        <OpenModalButton
                            buttonText="Delete"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteExpense expense={expense}/>}
                        />
                    </div>
                </div>
            </>
        )}
    </>
    )
}

export default ManageExpenses;
