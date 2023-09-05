import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import AddExpense from "../AddExpense";

function CreateExpenseModal({param_id}) {
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
    return (
        <>
            { showMenu && (
                <div className="add-expenses">
                    <OpenModalButton
                        buttonText="Add an expense"
                        onItemClick={closeMenu}
                        modalComponent={<AddExpense param_id={param_id}/>}
                    />
                </div>
            )}
        </>
    )
}

export default CreateExpenseModal;
