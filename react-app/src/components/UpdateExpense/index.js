import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import AddExpense from ".";

function UpdateExpense(){
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);

	return (
        <>
            { showMenu && (
                <div>
                    <OpenModalButton
                        buttonText="Edit expense"
                        onItemClick={closeMenu}
                        modalComponent={<AddExpense/>}
                    />
                </div>
            )}
        </>
	);
}

export default UpdateExpense;
