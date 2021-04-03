import { Avatar, Button } from '@material-ui/core';
import React from 'react';
import {} from './Header.css';
import { AuthContext } from '../../App';

function Header() {
    const { state, dispatch } = React.useContext(AuthContext);
    return (
        <div>
            <div className="header">
                <div className="app__header">
                    <div className="img__header__container">
                        <img className="app__header__img"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt=""
                        />
                    </div>
                    <div className="search__bar__div">
                        <input className="search__input" placeholder="Buscar">
                        </input>

                    </div>
                    <div className="action_menu">
                        <Button onClick={() => {
                            dispatch({
                                type: "LOGOUT"
                            });
                        }}>Logout</Button>
                        <Button onClick={() => {
                            dispatch({
                                type: "LOGOUT"
                            })
                        }}>Logout</Button>
                        <Avatar src={state?.user.photoURL} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
