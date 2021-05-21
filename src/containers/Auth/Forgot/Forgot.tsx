import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Logo from '../../../assets/images/Logo-small.png';
import Button from '../../../components/Button'
import { Heading, Paragraph } from '../../../components/Typography';
import Spinner from '../../../components/Spinner';

import {IForgotProps} from '../types'
const Forgot = (props:IForgotProps) => {
    const {forgotPassword} = props
    const [email, setEmail] = useState<string>('')
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    // const history = useHistory()

    const isEmailValid = (mail) => {
        return /^\S+@\S+\.\S+$/.test(mail) === true;
    };

    const validEmail = () => {
        return isEmailValid(email);
    };

    // const handleGoBack = () => {
    //     history.goBack();
    // };
    const handleInputChange = (e)=>{
        setEmail(e.target.value)
    }
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            setError(!error);
            const result = await forgotPassword({email});
            if(result.payload.success) {
                setSuccess(true)
                setLoading(false)
            }
            else{
                setLoading(false)
            }
        }
        catch(e) {
            console.log(e.message);
            setSuccess(false)
        }
    };
    return (
        <div className="forgot">
            <div className="forgot__sidebar"><Link to="/"><img src={Logo} alt="geekcamp-logo"/></Link></div>
            <div className="forgot__form-container">
                {isLoading && !error?<Spinner />:
                    <div className="forgot__form-block">
                    <div className="heading">
                        <Heading className="title-head" value={isSuccess? "Email Sent !" : "Forget Password" }/>
                        {!isSuccess&&
                            <p>Login Your Account <Link to="/login">Click here</Link></p>                            
                        }

                    </div>	
                    <form method="post" onSubmit={(e)=>handleReset(e)}>
                    {
                        isSuccess ?
                        <>
                            <Paragraph className="success-message" value={`We've sent a reset link with instructions to reset your password.  it's valid in the next 10 mins.`} />
                            <Link to='/' className="btn  btn-primary success-btn" type='primary'>Go Home</Link>
                        </>
                        :
                        <>
                             <div className="form-group">
                                <label>Email</label>
                                <input name="email" onChange={handleInputChange} value={email} type="email" className="form-control" placeholder="Enter Your Email address" id="email"/>
                            </div>
                            {
                                validEmail() && (
                                    <>
                                    <br /><br />
                                    <Button value='Send Email' className="btn  btn-primary" type='primary'/> 
                                    </>
                                )
                            }
                        
                        </>
                    }     
                    </form>
            </div>
                

                }
                
            </div>
        </div>
    )
}

export default Forgot
