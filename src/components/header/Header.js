import { Button } from '@material-ui/core'
import React from 'react'
import { } from './Header.css'
import { AuthContext } from '../../App';



function Header() {
    const { dispatch } = React.useContext(AuthContext);
    return (
        <div>
            <div className="app__header">
                <img className="app__header__img"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />

                <Button onClick={() => {
                    dispatch({
                        type: "LOGOUT"
                    })

                }}>Logout</Button>

            </div>
        </div>
    );
}
export default Header;
