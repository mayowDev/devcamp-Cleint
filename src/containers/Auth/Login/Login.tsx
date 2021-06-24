import React, {useState} from 'react'
import {Redirect, Link, useHistory} from 'react-router-dom';
import generator from "generate-password";
import Sidebar from '../../../components/Sidebar'

const Login = (props) => {
    const {location:{state}, isLoggedIn, loginWithGoogle, loginWithFacebook, login} = props
    const [user, setUser] = useState({ email:'', password:''})
    const [remember, setRemember] = useState(false)
    const [visible, setVisible] = useState(false);
    const [randomPassword, setRandomPassword] = useState('')
    const [isRandomPasswordRequested,setIsRandomPasswordRequested] = useState(false)
    const history = useHistory()
    const handleInputChange = (e)=>{
        setUser({
          ...user,
          [e.target.name]: e.target.value
        });
    }
    const handleSuggestRandomPassword = (e)=>{
        e.preventDefault();
        let password = generator.generate({
            length: 10,
            numbers: true,
            lowercase:true,
            uppercase:true,
            symbols:true,
        })
        // setRandomPassword(password)
        setUser({...user,password})
        setVisible(true)
    }

    const  handleRemember = (e) => {
        if(e.target.name === 'remember') setRemember(!remember)
    }
    const onLoginSubmit = e => {
        e.preventDefault();
        try {
            login(user)  
        } catch (error) {
            console.log(error);
        }    
    }
    const handleLoginWithGoogle =(e)=>{
        try {
            e.preventDefault();
            loginWithGoogle();
            // localStorage.setItem(LOCAL_STORAGE_KEYS.LOGIN_STATE, 'true');
            // window.location.href = '/'
        } catch (error) {
            console.log(error);
        }
    }
    if(isLoggedIn) return <Redirect to={"/"} />//state?state.from.pathname:
    return (
        <div className="login">
            {/* <Sidebar/> */}
            <div className="login__form-container">
                <div className="login__form-block">
                    <div className="heading">
					    <h2 className="title-head">Login in </h2>
					    <p>Don't have an Account? <Link to="/register">Register here</Link></p>
				    </div>	
                    <form onSubmit={onLoginSubmit} method="post">
                        <div className="form-group ">
                            <label htmlFor="email">email</label>
                            <input  name="email" onChange={handleInputChange} value={user.email} type="email" className="form-control" placeholder="youremail@gmail.com" id="email"/>
                        </div>
                        <div className="hide-show ">
                            <div className="checkbox-group">
                                <label htmlFor="password">Password</label>
                                <span onClick={()=>setVisible(!visible)} className="caption">{visible?'Hide':'Show'}</span>
                            </div>
                            <div onMouseLeave={()=>setIsRandomPasswordRequested(false)} className="password-group">
                                <input autoComplete="none" name="password" onClick={()=>setIsRandomPasswordRequested(true)}   onFocus={()=>setIsRandomPasswordRequested(!isRandomPasswordRequested)} onChange={handleInputChange} value={user.password} type={visible?"text":"password"} className="form-control" placeholder="Your Password" id="password"/>
                                {isRandomPasswordRequested&&
                                    <div className="random-password">
                                        <button type="button" onClick={handleSuggestRandomPassword}>suggest random password</button>
                                    </div>
                                }
                                
                            </div>
                        </div>
                        
                        <div className="forgot-remember">
                            <label className="control "><span className="caption">Remember me</span>
                                <input name="remember" type="checkbox" onChange={handleRemember} checked={remember}/>
                                <div className="control__indicator"></div>
                             </label>
                            <span ><Link to="/forgot-password" className="forgot-pass">Forgot Password?</Link></span> 
                        </div>

                        <input type="submit"  value="Log in" className="btn btn-block btn-primary"/>

                        <span className="seprater">OR</span>    
                        <div className="icons">
                            <input type="button" value="Login with facebook" onClick={()=>console.log("handleLoginWithFacebook")} className="btn btn-block auth-btn fb"/>
                            <input type="button" value="Login with Google" onClick={handleLoginWithGoogle} className="btn btn-block auth-btn gl"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
