import React, { createContext, useState } from 'react';


export const UserDetailsContext = createContext();

const UserDetailsContextProvider = (props) => {
    const [UserDetails, SetUserDetails] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <UserDetailsContext.Provider value={{ UserDetails, SetUserDetails }}>
            {props.children}
        </UserDetailsContext.Provider>
    );
}
export default UserDetailsContextProvider;