import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseTile from '../ExpenseTile';
import * as groupActions from "../../store/groups";
import CreateExpenseModal from '../CreateExpenseModal';
import checkmark from "../../assets/checkmark-circle.png"

function GroupExpenses(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const param_id = Number(id);
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const allGroups = useSelector(state => Object.values(state.groups));
    const filteredGroups = allGroups.filter(el => el.id === param_id)
    if (!sessionUser) {
        history.push("/")
    }

    let group_name;
    let exp_arr;
    for(let i = 0; i < allGroups.length; i++){
        if(allGroups[i].id === param_id){
            group_name = allGroups[i].name;
            exp_arr = allGroups[i].expenses
        }
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(groupActions.getGroups())
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, sessionUser]);

	return (
        <>
            { sessionUser && (
                <div className="middle">
                        <div>
                            <div className='expense-bar-container'>
                                <h2 className='expense-bar'>{group_name}</h2>
                                <div className='expense-bar'><CreateExpenseModal/></div>
                            </div>
                            {exp_arr?.map(el => (<ExpenseTile key={el.id} expense={el} clickable={true} sessionUser={sessionUser} displayGroup={false}/>))}
                            {exp_arr?.length === 0 ? (
                                <>
                                    <div className='allSettledUp'>
                                        <img src={checkmark} alt="all_settled_img" />
                                    </div>
                                    <div className="settled-tab">You are all settled up in this group.</div>
                                </>
                            ):(
                                <div></div>
                            )}
                        </div>
                </div>
            )}
        </>
	);
}

export default GroupExpenses;
