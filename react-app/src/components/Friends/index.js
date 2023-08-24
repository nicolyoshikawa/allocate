// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import * as friendActions from "../../store/friends";
// import FriendDetail from '../FriendDetail';

// function ViewFriends(){
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [isLoaded, setIsLoaded] = useState(false);

//     const sessionUser = useSelector(state => state.session.user);
//     const friendsListArr = useSelector(state => state.friends.friends);
//     const acceptedFriendsArr = friendsListArr.filter(el=> el.friend.status === "friends");
//     const sortedFriends = acceptedFriendsArr.sort((a,b) => (a.id) - (b.id))

//     if (!sessionUser) {
//         history.push("/")
//     }

//     // useEffect(()=> {
//     //     if(sessionUser){
//     //         dispatch(friendActions.getUserFriends())
//     //         .then(()=>setIsLoaded(true))
//     //     }
//     // },[dispatch, sessionUser]);
// 	return (
//         <>
//             {isLoaded && sessionUser && (
//                 <>
//                     <div className="middle">
//                         <div className='expense-bar-container'>
//                             <h2 className='expense-bar'>Friends</h2>
//                         </div>
//                         <div>
//                             {sortedFriends.map(el => (<FriendDetail key={el.id} friend={el} clickable={false}/>))}
//                         </div>
//                     </div>
//                 </>
//             )}
//         </>
// 	);
// }

// export default ViewFriends;
