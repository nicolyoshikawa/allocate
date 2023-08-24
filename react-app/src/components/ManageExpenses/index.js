import OpenModalButton from "../OpenModalButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteExpense from "../DeleteExpense";
import AddExpense from "../AddExpense";

const ManageExpenses = ({expense}) => {
    const [showMenu, setShowMenu] = useState(true);
    const user = useSelector(state => state.session.user);
    const closeMenu = () => setShowMenu(false);

    let ownReview = false;
    if(user?.id === expense?.paid_by){
        ownReview = true;
    }

    return (
        <>
        {showMenu && ownReview && (
            <>
                <div className="review-edit">
                    <div className="review-edit-button">
                        <OpenModalButton
                            buttonText="Edit expense"
                            onItemClick={closeMenu}
                            modalComponent={<AddExpense expense={expense}/>}
                        />
                    </div>
                    <div className="review-edit-button">
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
