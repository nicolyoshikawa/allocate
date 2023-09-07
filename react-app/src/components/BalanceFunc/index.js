function BalanceFunction(balanceArr, sessionUser){
    let balance = 0;
    let user_owes = 0;
    let friend_owes = 0;
    for(let i = 0; i < balanceArr?.length; i++){
        let exp = balanceArr[i];
        const amount_split = Number(exp?.price/2);

        if(exp.paid_by === sessionUser.id){
            user_owes += amount_split
        }
        if(exp.paid_by !== sessionUser.id){
            friend_owes += amount_split
        }
    }

    balance = (user_owes) - (friend_owes);
    return balance;
}
export default BalanceFunction;
