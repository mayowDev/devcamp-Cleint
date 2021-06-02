import React, {lazy, Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
/** Shared components */
import HomePage from "../Home"
import NotFound from "../../views/404/NoFound";
import ProtectedRoute from '../../components/Common/protectedRoute'
import Header from '../../components/Header'

/** Auth components */
import Login from '../Auth/Login';
import SignUp from '../Auth/Signup';
import Verify from '../Auth/Verify';
import ForgotPassword from '../Auth/Forgot';
import ResetPage from '../Auth/Reset'
import ProfilePage from '../Auth/Profile'
/** Course components */
import Courses from "../Courses";

const RenderRoutes = ({isLoggedIn}) => {  
    return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/courses" component={Courses.Courses}/>
                <Route exact path="/courses/new" component={Courses.AddCourse}/>
                <Route exact path="/courses/edit/:id" component={Courses.EditCourse}/>
                <Route exact path="/courses/:id" component={Courses.CourseDetails}/>
                <Route exact path="/reset"  component={ResetPage}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={SignUp.Signup}/>
                <Route exact path="/resend-email" component={SignUp.Resend}/>
                <Route exact path="/verify" component={Verify}/>
                <Route exact path="/forgot-password" component={ForgotPassword}/>
                <Redirect exact from="/signup" to="/register"/>
                <Redirect exact from="/signin" to="/login"/>
                <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn}  component={ProfilePage}/>
               <Route component={NotFound}/>
            </Switch>
     )
};

const Global = ({isLoggedIn, getUserData, userProfile}) => { 
    // console.log('global.tsx isLoggedIn', isLoggedIn,);
    useEffect(() => {
        if(isLoggedIn){
            getUserData();       
        }    
    }, []);

    useEffect(() => {
        if(userProfile && userProfile.id){
            // console.log('userProfile.name',userProfile.name);   
        }
    }, [userProfile.id]); 

    return (
        <BrowserRouter>
            <Header/>
            <RenderRoutes isLoggedIn={isLoggedIn}/>
        </BrowserRouter>
    )
};

export default Global;