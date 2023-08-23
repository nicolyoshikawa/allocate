import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddExpense from "../AddExpense";

function UpdateExpense(){
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
    // const { id } = useParams();
	return (
        <>
            { showMenu && (
                <div>
                    <OpenModalButton
                        buttonText="Edit expense"
                        onItemClick={closeMenu}
                        modalComponent={<AddExpense expense={expense}/>}
                    />
                </div>
            )}
        </>
	);
}

export default UpdateExpense;
