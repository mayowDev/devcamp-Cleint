import React, {useEffect, useState, Fragment} from 'react';
import {Link,NavLink, useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {H1, H3, P2, P1, Title} from '../../../components/Typography'
// import Input from '../../../components/Input'
import Button from '../../../components/Button'

import Spinner from '../../../components/Spinner'
import defaultUserImage from "../../../assets/images/defaults/avatar.jpeg"


const Profile = (props) => {    
    const {isLoading, getUserData, updateProfileImage, updatePassword, updateProfileData, isProfileUpdated, isLoggedIn, userProfile, logout, deleteAccount} = props;
    // console.log('this logs on each key, so use memo ' + userProfile)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passErr, setPassErr] = useState('password should be 8 characters long with 1 special charecter, one uppercase and one lowercase letter');            
    const [deleteEmail,setDeleteEmail] = useState('');
    const [errorMsg,setErrMsg] = useState('');
    const [photoChanged,setPhotoChanged] = useState(false)
    const [photoFile, setPhotoFile] = useState('')
    const [photo, setPhoto] = useState('')

    // const [activeTab, setActiveTab] = useState('details');
    const history = useHistory()
    useEffect(() => {
        getUserData();       
    }, []);

    useEffect(() => {
        if(userProfile && userProfile.id){
            const {  name, email } = userProfile;
            setName(name);
            setEmail(email)        }
    }, [userProfile.id]); 

    const isPasswordValid = (pass:string) => {
        return pass.length > 7 && /^(?=.*\d)(?=.*[!@$*()]).{8,}$/i.test(pass)
    };

    const oldPasswordValid = () => {
        return isPasswordValid(oldPassword);
    };
    const newPasswordValid = () => {
        return isPasswordValid(password);
    };
    const confirmPasswordValid = () => {
        return isPasswordValid(confirmPassword);
    };

    const allPasswordsValid = () => {
        if(oldPasswordValid() && newPasswordValid() && confirmPasswordValid() && password === confirmPassword){
            return  true
        }else{
            return false;
        }
    }
    const handleUpdatePassword = async () => {
        const passwords = {oldPassword, password, confirmPassword} 
        await updatePassword(passwords);
        toast.dark("Password Updated Successfully")
    };
    const handlePasswordChangeDiscard = () => {
        setOldPassword("");
        setConfirmPassword("");
        setPassword("");
    };

    const handleEmailChange = (value) => {
        setEmail(value)
    };
    const handleNameChange = (value) => {
        setName(value)
    }
    const handleUpdateUserDetails = async (e) => {
        e.preventDefault()
        const userUserDetails = {name, email}
        await updateProfileData(userUserDetails); 
        toast.dark('Details updated successfully')
    }
    const isEmailValid = (mail) => {
        return /^\S+@\S+\.\S+$/.test(mail) === true;
    };
    const validEmail = () => {
        return isEmailValid(deleteEmail);
    };
    const handleDeleteAccount = async ()=>{
        await deleteAccount(deleteEmail);
        await logout();
        toast.info('Account Deleted Successfully')
        history.push('/')
    }
    const handlePhotoChange = async (e) => {
        if (e.target.files.length > 0) {
            console.log('e.target.files', e.target.files);
            
            const selectedFile = e.target.files[0];
            const dot = selectedFile.name.lastIndexOf('.');
            const extension = selectedFile.name.substr(dot, selectedFile.name.length).toLowerCase();            
            if (extension === '.jpeg' || extension === '.jpg' || extension === '.png' || extension === '.gif') {
                setPhotoChanged(true);
                setPhotoFile(selectedFile);
                const url = await URL.createObjectURL(selectedFile);
                // console.log('photoUrl', url);
                setPhoto(url);
                setErrMsg('');
            } else {
                setErrMsg('Only file with the extension of jpeg, jpg, png and gif are allowed!');
                // setTimeout(() => {
                //     setErrMsg('');
                // }, 2000)
            }
        }
    };
    console.log('photoFile', photoFile);
    
    const handleUpdateProfileImage = async ()=>{
        const response = await updateProfileImage(photoFile)
        console.log('saved profile image', response);
    }
    

    return (
        <>
        <div className="background-hero">
            <h1>Profile</h1>
        </div>
        {
            isLoading?<Spinner/>:
            <div className='profile'>
            <div className="profile__sidebar">
                <div className="user-info">
                    <div className={`image-wrapper`}>
                          <label>
                            <input className="hide-photo-input" type='file' onChange={handlePhotoChange}/>
                              {
                                  photo
                                      ? <>
                                          <img className="user-profile-photo" src={photo} alt={'change photo'}/>
                                          <P2 className='photo-title' value='Change photo'/>
                                      </>
                                      : <>
                                          <svg
                                              xmlns='http://www.w3.org/2000/svg' width='120' height='120'
                                              viewBox='0 0 120 120' fill='none'
                                          >
                                              <circle
                                                  cx='60' cy='60' r='58.5' fill='white' stroke='#939393'
                                                  strokeWidth='3' strokeDasharray='5 5'
                                              />
                                              <path
                                                  d='M62.8445 49.1819H59.6754V58.9946H50.0918V62.0873H59.6754V71.9382H62.8445V62.0873H72.4282V58.9946H62.8445V49.1819Z'
                                                  fill='#7D7D7D'
                                              />
                                          </svg>
                                          <P2 className='photo-title' value='Add a photo'/>
                                      </>
                              }
                          </label>
                        </div>
                    <Button value="Save photo" onClick={handleUpdateProfileImage}/>
                    {/* <h4>{userProfile.email}</h4> */}
                </div>
                <ul className="nav-links">
                    <NavLink to="/courses">Courses</NavLink>
                    <NavLink to="/payments">Payment Methods</NavLink>
                    <NavLink to="#">Change Password</NavLink>

                    <NavLink to="#">Delete Account</NavLink>
                </ul>
            </div>

			<div className="profile__edit-details">				
                <form className="details-form">
                        <h4> Edit Profile Details</h4>
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <div className="input-container">
                                <input autoComplete="off" name="name"  id="name" value={name} onChange={(e) => handleNameChange(e.target.value)} className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <div className="input-container">
                                <input autoComplete="off" name="email" id="email" value={email} onChange={(e) => handleEmailChange(e.target.value)} className="form-control" type="email" />
                            </div>
                        </div>
                        <div className="cta-btn-section">
                            <button onClick={handleUpdateUserDetails} type="submit" className="btn">Save changes</button>
                            <button type="reset" className="btn">Cancel</button>
                        </div>
                </form>
                <form className="password-form">
                        <h4> Change Password</h4>
                        <div className="form-group">
                            <label className="form-label">Current Password</label>
                            <div className="input-container">
                                <input autoComplete="off" name="oldPassword" onChange={e=>setOldPassword(e.currentTarget.value)} className="form-control" type="password" value={oldPassword}/>
                            </div>
                            {!oldPasswordValid()&& oldPassword.length > 0&&<span className="password-error">{'Password should be 8 characters long '}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <div className="input-container">
                                <input autoComplete="off" name="password" onChange={(e)=> setPassword(e.currentTarget.value)}  className="form-control" type="password" value={password}/>
                            </div>   
                            {!newPasswordValid()&& password.length > 0&&<span className="password-error">{passErr}</span>}     
                        </div>
                        <div className="form-group">
                            <label className="form-label">Re-Type Password</label>
                            <div className="input-container">
                                <input autoComplete="off" name="confirmPassword" onChange={e=>setConfirmPassword(e.currentTarget.value)} className="form-control" type="password" value={confirmPassword}/>
                            </div>  
                            {confirmPassword.length>0 && password !== confirmPassword &&
                                <span className="password-error">{'confirmPassword should match the new password'}</span>
                            }       
                        </div>
                        {allPasswordsValid()&&
                            <div className="cta-btn-section">
                                <button onClick={handleUpdatePassword} type="submit" className="btn">Update Password</button>
                                <button onClick={handlePasswordChangeDiscard} type="reset" className="btn">Discard Changes</button>
                            </div>
                        }
                </form>
                <div className="danger-area">
                    <h4 className="social__section">Delete Account</h4>
                    <p>Once you delete your account, there is no going back. Please be certain.</p>
                    <div className="form-group">
                            <label className="form-label">Email</label>
                            <div className="input-container">
                                <input autoComplete="off" name="deleteEmail" id="deleteEmail" 
                                value={deleteEmail} 
                                onChange={(e) => setDeleteEmail(e.target.value)} className="form-control" type="email"  
                                placeholder="Enter your email to delete this account"/>
                            </div>
                    </div>
                    {validEmail() &&
                        <div onClick={handleDeleteAccount} className="delete-btn-container">
                            <Button value="Delete Your Account"/>
                        </div>
                    }
                </div>
			</div>
        </div>
        }
    </>
    )
}

export default Profile
