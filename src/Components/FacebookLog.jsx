import React, { useContext } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';


function FacebookLog() {
    //ContextApi
    const { SetUserDetails } = useContext(UserDetailsContext);

    const history = useHistory()


    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    const ResponseFacebook = async (response) => {
        try {
            const res = await fetch(apiUrl + 'User/Login/' + response.email + '/', {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
            })
            let result = await res.json();
            console.log("GetFacebookUserSuccsses", result);

            if (result.Password === null) {
                let fullName = response.name.split(' ')
                const u = {
                    Mail: response.email,
                    FirstName: fullName[0],
                    LastName: fullName[1],
                    Image: response.picture.data.url,
                    Score: 30
                }
                PostFacebookUser(u);
            } else {
                const u = {
                    Mail: result.Mail,
                    FirstName: result.FirstName,
                    LastName: result.LastName,
                    Image: result.Image,
                    Score: result.Score
                }
                SetUserDetails(u);
                history.push('/HomePage');
            }
        } catch (error) {
            console.log("ErrorGetFacebookUser", error);
        }
    }

    const PostFacebookUser = async (u) => {
        try {
            await fetch(apiUrl + 'User/', {
                method: 'POST',
                body: JSON.stringify(u),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                })
            })
            console.log('PostFacebookUserSuccsses');
            SetUserDetails(u);
            history.push('/HomePage');
        } catch (error) {
            console.log("ErrorPostFacebookUser", error);
        }
    }

    return (
        <div>
            <FacebookLogin
                appId="222723045705805"
                fields="name,email,picture"
                callback={ResponseFacebook}
                icon=" fa fa-facebook fa-fw"
                textButton=""
                typeButton="icon"
                buttonStyle={{ borderRadius: '50%', padding: 5, flex: 1, flexDirection: 'row', }}
            />
        </div>
    )
}
export default withRouter(FacebookLog);
