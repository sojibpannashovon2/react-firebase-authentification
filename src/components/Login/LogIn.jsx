import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth"
import app from '../../firebase/firebase.init';
const LogIn = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [user, setUser] = useState(null)


    const handleGoogleSignedIn = () => {
        // console.log("Google Mama Call you !!!");
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const googleUser = result.user;
                console.log(googleUser);
                setUser(googleUser);
            }
            )
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })

    }

    const handleGithubSignedIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const githubUser = result.user
                console.log(githubUser);
                setUser(githubUser)
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    }
    const signOutMe = () => {
        const auth = getAuth();
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null)
            })
            .catch(error => {
                console.log("error", error.message);
            })
    }
    return (
        <div>
            <h1>This is log in</h1>
            {
                user ?
                    <button onClick={signOutMe} style={{ border: "2px solid blue ", padding: "10px" }}>Sign_out</button> :
                    <div>
                        <button onClick={handleGoogleSignedIn} style={{ border: "2px solid blue ", padding: "10px" }}>Google-sign</button>
                        <button onClick={handleGithubSignedIn} style={{ border: "2px solid blue ", padding: "10px" }}>Github-sign</button>
                    </div>

            }
            {
                user && <div>

                    {user?.displayName}
                    <br />
                    {user?.email}
                    <br />
                    <img src={user?.photoURL} alt="not exist" />
                </div>
            }
        </div>
    );
};

export default LogIn;