import { Avatar, Button } from '@material-ui/core';
import React from 'react';
import { } from './Header.css';
import { AuthContext } from '../../App';
import { useHistory } from 'react-router';

function Header() {
    const { state, dispatch } = React.useContext(AuthContext);
    const history = useHistory();

    return (
        <div>
            <div className="header">
                <div className="app__header">
                    <div className="img__header__container">
                        <img className="app__header__img"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt=""
                            onClick={()=>{history.push('/')}}
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
                            history.push('/profile');
                        }}>Mi perfil</Button>
                        <Button onClick={() => {
                            history.push('/upload');
                        }}>Nuevo</Button>
                        <Avatar src={state?.user?.user?.photoURL+'?width=300&height=300'} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
