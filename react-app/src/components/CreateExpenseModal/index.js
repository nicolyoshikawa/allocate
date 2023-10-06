import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import AddExpense from "../AddExpense";
import SettleUp from "../SettleUp";

function CreateExpenseModal({param_id, group_object}) {
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
    return (
        <>
            { showMenu && (
                <>
                    <div className="add-expenses">
                        <OpenModalButton
                            buttonText="Add an expense"
                            onItemClick={closeMenu}
                            modalComponent={<AddExpense param_id={param_id} group_object={group_object}/>}
                        />
                    </div>
                    {param_id && (
                        <div className="settle-up">
                            <OpenModalButton
                                buttonText="Settle up"
                                onItemClick={closeMenu}
                                modalComponent={<SettleUp param_id={param_id}/>}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default CreateExpenseModal;
