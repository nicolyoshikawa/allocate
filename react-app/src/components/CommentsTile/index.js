import OpenModalButton from "../OpenModalButton";
import { useState } from "react";
import { useSelector } from 'react-redux';
import DeleteComment from "../DeleteComment";
import EditComment from "../EditComment";

export default function CommentsTile({comments, expense}) {
    const {created_at, expense_id, id, message, user_id } = comments;
    const user = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
    // Change date format
    const created = new Date(created_at)
    const dateFormat = created.toLocaleDateString()

    const date_values = dateFormat ? dateFormat?.split("/") : "";
    const month = dateFormat ? date_values[0] : "";
    const day = dateFormat ? date_values[1] : "";
    const year = dateFormat ? date_values[2] : "";
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString('default', { month: 'short' });

    let comment_owner;
    if(expense.expense_group_users[0].id === user_id){
        comment_owner = expense.expense_group_users[0].username
    } else {
        comment_owner = expense.expense_group_users[1].username
    }

    return (
        <div className="comment-tile">
            <div className="comment-container">
                <div className="comment-left">
                    <div className="comment-name">
                        <div className="comment-name">{comment_owner}</div>
                        <div className="month">{monthName}{" "}{day}</div>
                    </div>
                    <div className="comment-message">{message}</div>
                </div>
                {(user.id === comments.user_id) ? (
                    <div className="comment-right">
                        <div className="comment-box">
                            <OpenModalButton
                                buttonText="X"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteComment comments={comments} expense={expense}/>}
                            />
                        </div>
                        <div className="comment-box">
                            <OpenModalButton
                                buttonText="Edit"
                                onItemClick={closeMenu}
                                modalComponent={<EditComment comments={comments} expense={expense}/>}
                            />
                        </div>
                    </div>
                    ) : (
                        <div></div>
                    )}
            </div>
        </div>
    )
}
