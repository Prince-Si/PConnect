import { getSession } from '../../SessionManager';
import HandleLogOut from '../login-registration-forms/logoutButton';



function AdminHome(){
    const session = getSession();

    if (!session) {
      return <h1>log in first</h1>
    }
    if (session.data.usertype!=='admin'){
        return <h1>You are not allowed here</h1>
    }
    return(
        <>
            <h1>This is admin home</h1>
            <h2>Welcome, {session.data.username}!</h2>
            <p>Your role: {session.data.usertype}</p>
            <p>email: {session.data.email}</p>
            < HandleLogOut />
        </>
    )
}

export default AdminHome;