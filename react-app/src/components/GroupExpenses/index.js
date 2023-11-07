import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseTile from '../ExpenseTile';
import * as groupActions from "../../store/groups";
import * as balanceActions from "../../store/balance";
import CreateExpenseModal from '../CreateExpenseModal';
import Balance from "../Balance";
import checkmark from "../../assets/checkmark-circle.png"

function GroupExpenses(){
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { id } = useParams();
    const param_id = Number(id);
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const allGroups = useSelector(state => Object.values(state.groups));
    const balance_state = useSelector(state => state.balances);
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
    const filteredExps = exp_arr?.filter(el => el.settle_status === "unsettled")

    useEffect(()=> {
        if(sessionUser){
            dispatch(groupActions.getGroups())
            .then(()=>setIsLoaded(true))
            if(Object.keys(balance_state).length === 0){
                dispatch(balanceActions.loadAllUserExpenseBalance());
            }
        }
    },[dispatch, sessionUser]);

	return (
        <>
            { sessionUser && isLoaded && (
                <>
                    {group_name ? (
                        <>
                            <div className="middle">
                                <div className='expense-bar-container'>
                                    <h2 className='expense-bar'>{group_name}</h2>
                                    <div className='expense-bar'><CreateExpenseModal group_object={filteredGroups[0]}/></div>
                                </div>
                                {filteredExps?.map(el => (<ExpenseTile key={el.id} expense={el} clickable={true} sessionUser={sessionUser} displayGroup={false}/>))}
                                {filteredExps?.length === 0 ? (
                                    <>
                                        <div className='allSettledUp'>
                                            <img src={checkmark} alt="all_settled_img" />
                                        </div>
                                        <div className="settled-tab">You are all settled up in this group.</div>
                                    </>
                                ):(
                                    <></>
                                )}
                            </div>
                            <Balance/>
                        </>
                    ):(
                        <>
                            <div className="middle">
                                <div className='expense-bar-container'>
                                    <h1>Group Not Found</h1>
                                </div>
                            </div>
                            <Balance/>
                        </>
                    )}
                </>
            )}
        </>
	);
}

export default GroupExpenses;
