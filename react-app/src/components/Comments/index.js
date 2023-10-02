import CommentsTile from "../CommentsTile";
import AddComment from "../AddComment";

export default function Comments({expense}) {
    const comments_arr = expense.comments;

    return (
        <div className="comments-container">
            <div className="comment"><i className="fa-solid fa-comment" style={{ color: "#808080" }}></i>NOTES AND COMMENTS</div>
            {comments_arr?.map(el => (<CommentsTile key={el.id} comments={el} expense={expense}/>))}
            <div className="comment">
                <AddComment expense={expense}/>
            </div>
        </div>
    )
}
