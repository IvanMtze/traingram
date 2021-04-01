import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import './FacebookLoginComponent.css';
import { AuthContext } from '../../App';
import { Redirect } from 'react-router-dom';


function FacebookLoginComponent() {

  const [loggedIn, setloggedIn] = useState(false)
  const { dispatch } = React.useContext(AuthContext);
  const responseFacebook = (response) => {
    console.log(response);
    if (response != null && response.accessToken) {

      dispatch({
        type: "LOGIN",
        payload: response
      });
      setloggedIn(true)
      console.log("loggedIn")
    } else {
      dispatch({
        type: "LOGIN",
        payload: null
      });
    }
  }
  return (
    <div>
      {!loggedIn ? (<div class="container">
        <Card style={{ width: '600px' }}>
          <Card.Header>
            {!dispatch.isAuthenticated &&
              <FacebookLogin
                appId="3304645669636264"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook" />
            }
          </Card.Header>

        </Card>
      </div>) : (<Redirect to="/" />)

      }
    </div>
  );
}

export default FacebookLoginComponent;