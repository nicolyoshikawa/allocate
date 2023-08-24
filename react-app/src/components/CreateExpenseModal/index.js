import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import AddExpense from "../AddExpense";

function CreateExpenseModal() {
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
    return (
        <>
            { showMenu && (
                <div>
                    <OpenModalButton
                        buttonText="Add an expense"
                        onItemClick={closeMenu}
                        modalComponent={<AddExpense/>}
                    />
                </div>
            )}
        </>
    )
}

export default CreateExpenseModal;
