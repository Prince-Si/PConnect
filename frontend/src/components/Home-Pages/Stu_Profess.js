import { getSession } from '../../SessionManager';
import HandleLogOut from '../login-registration-forms/logoutButton';
import { Link } from 'react-router-dom';
import styles from '../../static/navbar1.module.css';
import RandomProfile from '../Profiles/RandomProfiles';
import SearchProfiles from './SearchProfiles';
import StuStyles from '../../static/Stu_Profess.module.css';


function Stu_Profess(){
    const session = getSession();

    if (!session) {
      // Redirect to the login page or handle unauthorized access
      return <h1>log in first</h1>
    }
    return(
        <>
             <nav className={styles.nav1}>
      <ul className={styles.ul1}>
        <li className={styles.li1}>
          <Link className={styles.a1} to="/Stu_ProfessHome">Home</Link>
        </li>
        <li  className={styles.li1}>
          <Link className={styles.a1} to="/about">About</Link>
        </li>
        <li  className={styles.li1}>
          <Link className={styles.a1} to="/Stu_ProfessHome/StuProfessProfile">Profile</Link>
        </li>
        <li>
        <HandleLogOut />
        </li>
        
      </ul>
     
    </nav>
          <div className={StuStyles.flexcontainer}>
            <div className={StuStyles.first}>
            <h1>This is STU_PROFESSIONALS home</h1>
            <h2>Welcome, {session.data.username}!</h2>
            <p>Your role: {session.data.usertype}</p>
            <p>email: {session.data.email}</p>
            <RandomProfile/>
            </div>
            
            
            <div className={StuStyles.second}>
              <h1>Search......</h1>
            <SearchProfiles />
            <br></br>
            <br></br>
            <RandomProfile/>
            </div>
          </div>

            
        </>
    )
}

export default Stu_Profess;