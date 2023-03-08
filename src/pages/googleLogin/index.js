import React, { useCallback, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';

const clientId = "701668178309-ejp6ffkomcc6g6238gjndn1k2jhsr4pg.apps.googleusercontent.com";

const GoogleLoginBtn = ({ onSocial }) => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const onSuccess = (response) => {
        console.log(response);
    };

    const onFailure = (response) => {
        console.log(response);
    };
    
    return (
        <div>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    buttonText="구글로 로그인"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </GoogleOAuthProvider>
        </div>
    )
}

export default GoogleLoginBtn;