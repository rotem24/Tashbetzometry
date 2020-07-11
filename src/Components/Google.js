import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory, withRouter } from 'react-router-dom';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

function Google() {
  //ContextApi
  const { SetUserDetails } = useContext(UserDetailsContext);

  const history = useHistory();

  let local = false;
  let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
  if (local) {
    apiUrl = 'http://localhost:50664/api/';
  }

  const responseGoogle = async (response) => {
    try {
      const res = await fetch(apiUrl + 'User/Login/' + response.profileObj.email + '/', {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
      })
      let result = await res.json();
      console.log("GetGoogleUser:", result);

      if (result.Mail === null) {
        const u = {
          FirstName: response.profileObj.givenName,
          LastName: response.profileObj.familyName,
          Mail: response.profileObj.email,
          Image: response.profileObj.imageUrl,
          Score: 30
        }
        PostGoogleUser(u);
      } else {
        const u = {
          Mail: result.Mail,
          FirstName: result.FirstName,
          LastName: result.LastName,
          Image: result.Image,
          Score: 30
        }
        SetUserDetails(u);
        history.push('/HomePage')
      }
    } catch (error) {
      console.log("ErrorGetGoogleUser", error);
    }
  }

  const PostGoogleUser = async (u) => {
    try {
      await fetch(apiUrl + 'User/', {
        method: 'POST',
        body: JSON.stringify(u),
        headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
      })
      console.log("PostGoogleUserSuccsses");
      SetUserDetails(u);
      history.push('/HomePage')
    } catch (error) {
      console.log("ErrorGooglePOST", error)
    }
  }

  return (
    <div className="Google">

      <GoogleLogin
        clientId="69987519994-mg4emv7ndgcffuncm2vv6a4nphq46los.apps.googleusercontent.com"
        icon="true"
        buttonText=""
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        disabledStyle={{ borderRadius: '50%', flex: 1, flexDirection: 'row', left: 40, bottom: 30 }}
      />
    </div>
  );
}
export default withRouter(Google);