import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import Logo from '../../../assets/images/Logo-small.png';
import Google from '../../../assets/images/icon-google.png';
import Button from '../../../components/Button'
const Login = (props) => {
    const [user, setUser] = useState({ email:'', password:''})
    const [remember, setRemember] = useState(false)
    const history = useHistory()
    //TODO: handle all validation:- invalid email format, loader while loading
    
    const handleInputChange = (e)=>{
        setUser({
          ...user,
          [e.target.name]: e.target.value
        });
    }
    const  handleRemember = (e) => {
        if(e.target.name === 'remember') setRemember(!remember)
    }
    const onLoginSubmit = e => {
        e.preventDefault();
        // props.isLoggedIn && toast.error("Your are already loged in..")
        const response = props.login(user)
        if(typeof response !== "undefined"){
            toast.success("Succesfully Logged In")
            history.replace('/') 
        }
    }
    const handleLoginWithGoogle =(e)=>{
        e.preventDefault();
        const response =props.loginWithGoogle()
        console.log('login with google.tsx', response);
        
    }

    return (
        <div className="login">
            <div className="login__sidebar"><Link to="/"><img src={Logo} alt="geekcamp-logo"/></Link></div>
            <div className="login__form-container">
                <div className="login__form-block">
                    <div className="heading">
					    <h2 className="title-head">Login in </h2>
					    <p>Don't have an Account? <Link to="/register">Register here</Link></p>
				    </div>	
                    <form onSubmit={onLoginSubmit} method="post">
                        <div className="form-group ">
                            <label htmlFor="email">email</label>
                            <input name="email" onChange={handleInputChange} value={user.email} type="email" className="form-control" placeholder="youremail@gmail.com" id="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input name="password" onChange={handleInputChange} value={user.password} type="password" className="form-control" placeholder="Your Password" id="password"/>
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
                            <Link to="#" className="btn btn-block auth-btn fb"> <span></span> Login  with facebook</Link>
                            <input type="button" value="Login with Google" onClick={handleLoginWithGoogle} className="btn btn-block auth-btn gl"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
