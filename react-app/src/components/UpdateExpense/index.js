import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditExpense from "../EditExpense";

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
                        modalComponent={<EditExpense expense={expense}/>}
                    />
                    <OpenModalButton
                            buttonText="Settle up"
                            onItemClick={closeMenu}
                            modalComponent={<SettleUp param_id={param_id}/>}
                    />
                </div>
            )}
        </>
	);
}

export default UpdateExpense;
