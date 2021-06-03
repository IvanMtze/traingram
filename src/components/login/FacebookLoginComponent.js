import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './FacebookLoginComponent.css';
import { AuthContext } from '../../App';
import { Redirect } from 'react-router-dom';
import { firebaseApp, facebookAuthProvider, db, auth } from '../../firebase';
import { Button } from '@material-ui/core';
import firebase from "firebase"
import {Form, Modal } from 'react-bootstrap';

function FacebookLoginComponent() {

  const { dispatch } = React.useContext(AuthContext);
  const [loggedIn, setloggedIn] = useState(false)
  const [signup, setSignup] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const showSignupDialog = () => {
    setSignup(true);
  }

  const closeSignupDialog = () => {
    setSignup(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signupEmail();
  }

  const HandleLogin = (e) => {
    e.preventDefault();
    emailLogin();
  }

  const socialLogin = async (provider) => {
    provider.addScope('public_profile')
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
          db.collection('users').doc(auth.currentUser.uid.toString()).set({
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            profileImageUrl: auth.currentUser.photoURL,
            userName: auth.currentUser.displayName
          });

          //signup to heroku notification api
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            "name": auth.currentUser.uid,
            "pass": auth.currentUser.uid,
            "pass_confirm": auth.currentUser.uid
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          fetch("https://traingram.herokuapp.com/api/signup", requestOptions)
            .then(response => {
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                "name": auth.currentUser.uid,
                "password": auth.currentUser.uid
              });

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };

              fetch("https://traingram.herokuapp.com/api/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                  dispatch({
                    type: "HEROKU-TOKEN",
                    payload: result.token
                  });
                })
                .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
          setloggedIn(true)
        }
      })
      .catch(error => {
        alert("Intentelo nuevamente");
      });
  }

  const signupEmail = async () => {
    await firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        if (result != null) {
          dispatch({
            type: "LOGIN",
            payload: result
          });
          db.collection('users').doc(auth.currentUser.uid.toString()).set({
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            profileImageUrl: auth.currentUser.photoURL,
            userName: auth.currentUser.displayName
          });

          //signup to heroku notification api
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            "name": auth.currentUser.uid,
            "pass": auth.currentUser.uid,
            "pass_confirm": auth.currentUser.uid
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          fetch("https://traingram.herokuapp.com/api/signup", requestOptions)
            .then(response => {
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                "name": auth.currentUser.uid,
                "password": auth.currentUser.uid
              });

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };

              fetch("https://traingram.herokuapp.com/api/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                  dispatch({
                    type: "HEROKU-TOKEN",
                    payload: result.token
                  });
                })
                .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
          setloggedIn(true)
        }
      })
      .catch(error => {
        alert("Intentelo nuevamente");
      });

  }

  const emailLogin = async () => {
    await firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result != null) {
          dispatch({
            type: "LOGIN",
            payload: result
          });
          db.collection('users').doc(auth.currentUser.uid.toString()).set({
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            profileImageUrl: auth.currentUser.photoURL,
            userName: auth.currentUser.displayName
          });

          //signup to heroku notification api
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            "name": auth.currentUser.uid,
            "pass": auth.currentUser.uid,
            "pass_confirm": auth.currentUser.uid
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          fetch("https://traingram.herokuapp.com/api/signup", requestOptions)
            .then(response => {
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                "name": auth.currentUser.uid,
                "password": auth.currentUser.uid
              });

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };

              fetch("https://traingram.herokuapp.com/api/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                  dispatch({
                    type: "HEROKU-TOKEN",
                    payload: result.token
                  });
                  console.log(result.token);
                })
                .catch(error => {console.log('error', error)});
            })
            .catch(error => {console.log('error', error)});
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
                            <input aria-label="Teléfono, usuario o correo electrónico" value={email} onChange={e => setEmail(e.target.value)} aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="username" type="text" className="input_input_field_a input_input_field_b input_input_field_c" />
                          </label>
                          <div className="div_space_input">
                          </div>
                        </div>
                      </div>
                      <div className="div__container__form_input__outer">
                        <div className="div__container__form_input__inner">
                          <label className="label_input_field">
                            <span className="spam_input_field">Contraseña</span>
                            <input aria-label="Contraseña" value={password} onChange={e => setPassword(e.target.value)} aria-required="true"  autoCapitalize="off" autoCorrect="off" name="password" type="password" className="input_input_field_a input_input_field_b input_input_field_c" />
                          </label>
                          <div className="div_space_input">
                          </div>
                        </div>
                      </div>
                      <div >
                        <button disabled="" type="submit" onClick={e=>HandleLogin(e)}>
                          <div>Iniciar sesión</div>
                        </button>
                      </div>
                      <div >
                        <button disabled="" type="submit" onClick={e=>showSignupDialog()}>
                          <div>Registrarse</div>
                        </button>
                        <Modal show={signup} onHide={closeSignupDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={e=>handleSignup(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword2">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary">
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Signup
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
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
                    <div className="div_final_empty">

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