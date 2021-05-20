import { Avatar, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications';
import { } from './Header.css';
import { AuthContext } from '../../App';
import { useHistory } from 'react-router';

function Header() {
    const { state, dispatch } = React.useContext(AuthContext);
    const history = useHistory();

    const [items, setItems] = useState([]);

    function setNotificationsAsRead() {
        if(items?.length<=0){return;}
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", state?.mongodbtoken);
        console.log(state)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://traingram.herokuapp.com/api/notifications/readAll", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        setItems([]);
    }


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", state?.mongodbtoken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://traingram.herokuapp.com/api/notifications/unread", requestOptions)
            .then(response => 
                response.json()
            )
            .then(result => {console.log(result.notifications);setItems(result.notifications)})
            .catch(error => console.log('error', error));
    }, [state])

    return (
        <div>
            <div className="header">
                <div className="app__header">
                    <div className="img__header__container">
                        <img className="app__header__img"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt=""
                            onClick={() => { history.push('/') }}
                        />
                    </div>
                    <div className="search__bar__div">
                        <input className="search__input" placeholder="Buscar">
                        </input>
                    </div>
                    <div className="action_menu">
                        <IconButton onClick={() => { setNotificationsAsRead() }}>
                            <Badge badgeContent={items?.length} color="primary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

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
                        <Avatar src={state?.user?.user?.photoURL + '?width=300&height=300'} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
