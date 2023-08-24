import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as friendActions from "../../store/friends";

function InviteFriend(){

	return (
        <>
            <div className='side-bar-table'>Invite Friend</div>
            <div>add friend</div>
        </>
	);
}

export default InviteFriend;
