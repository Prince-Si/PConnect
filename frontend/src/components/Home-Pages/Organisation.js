import { getSession } from '../../SessionManager';
import HandleLogOut from '../login-registration-forms/logoutButton';

function OrganisationHome(){

    const session = getSession();

    if (!session) {
      return <h1>log in first</h1>
    }


    return(
        <>
            <h1>This is ORGANISATION home</h1>
            <h2>Welcome, {session.data.username}!</h2>
            <p>Your role: {session.data.usertype}</p>
            <p>email: {session.data.email}</p>
            < HandleLogOut />
        </>
    )
}

export default OrganisationHome;