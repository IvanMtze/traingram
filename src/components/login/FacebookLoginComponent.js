import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './FacebookLoginComponent.css';
import { AuthContext } from '../../App';
import { Redirect } from 'react-router-dom';
import { firebaseApp, facebookAuthProvider, db, auth } from '../../firebase';
import { Button } from '@material-ui/core';
import firebase from "firebase"

function FacebookLoginComponent() {

  const { dispatch } = React.useContext(AuthContext);
  const [loggedIn, setloggedIn] = useState(false)

  const socialLogin = async (provider) => {
    provider.addScope('public_profile')
    provider.addScope('user_friends')
    provider.addScope('user_photos')
    provider.addScope('email')
    await firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        if (result != null) {
          dispatch({
            type: "LOGIN",
            payload: result
          }); 
          db.collection('users').doc(auth.currentUser.uid).set({
            lastUpdate:firebase.firestore.FieldValue.serverTimestamp(),
            profileImageUrl:auth.currentUser.photoURL,
            userName:auth.currentUser.displayName
         });
          setloggedIn(true)
        }
      })
      .catch(error => {
        alert("Intentelo nuevamente");
      });
  }


  return (
    <div>
      {!loggedIn ?
        (
          <section className="div__outer div__outer__b">
            <div></div>
            <main className="main__a  main__b">
              <article className="article">

                <div className="div_outer_article div_outer_article_b">
                  <div className="div__container__ss__img">
                    <img className="img__ss  img__ss__b" src="https://www.instagram.com/static/images/homepage/screenshot1-2x.jpg/9144d6673849.jpg" alt="" />
                  </div>
                </div>
                <div className="div__article__a">
                  <div className="div__article__b">
                    <img className="img_logo__a" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""></img>
                    <div className="div__container__form">
                      <div className="div__container__form_input__outer">
                        <div className="div__container__form_input__inner">
                          <label className="label_input_field ">
                            <span className="spam_input_field">Teléfono, usuario o correo electrónico</span>
                            <input aria-label="Teléfono, usuario o correo electrónico" aria-required="true" autocapitalize="off" autocorrect="off" maxlength="75" name="username" type="text" className="input_input_field_a input_input_field_b input_input_field_c" value="" />
                          </label>
                          <div className="div_space_input">
                          </div>
                        </div>
                      </div>
                      <div className="div__container__form_input__outer">
                        <div className="div__container__form_input__inner">
                          <label className="label_input_field">
                            <span className="spam_input_field">Contraseña</span>
                            <input aria-label="Contraseña" aria-required="true" autocapitalize="off" autocorrect="off" name="password" type="password" class="input_input_field_a input_input_field_b input_input_field_c" value="" />
                          </label>
                          <div className="div_space_input">
                          </div>
                        </div>
                      </div>
                      <div >
                        <button disabled="" type="submit">
                          <div>Iniciar sesión</div>
                        </button>
                      </div>
                      <div className="div__other__login__option__outer ">
                        <div className=" div__other__login__option">
                        </div>
                        <div className="div__o">o</div>
                        <div className=" div__other__login__option">
                        </div>
                      </div>
                      <div className="">
                        <Card>
                          <Card.Header>

                            <Button
                              type="primary"
                              className="login-form-button"
                              style={{ marginRight: 10 }}
                              onClick={() => socialLogin(facebookAuthProvider)}>
                              Facebook
                                </Button>
                          </Card.Header>


                        </Card>

                      </div>
                    </div>
                    <div claclassNamess="div_final_empty">

                    </div>
                  </div>
                </div>

              </article>
            </main>

          </section>
        ) : (
          <Redirect to="" />
        )

      }
    </div>
  );
}

export default FacebookLoginComponent;