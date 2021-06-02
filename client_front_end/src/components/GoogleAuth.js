import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut } from '../actions';

class GoogleAuth extends React.Component
{
    //initial state for isSignedIn
  state = { isSignedIn: null };
//initialize google auth on component did mount
    componentDidMount(){
        //loading G auth library
        window.gapi.load('client:auth2',()=>{    
            //initialize loaded library   
           window.gapi.client.init({
                clientId: '204483137667-e2h6lkh8d029m3d7h87ttkm4qgoeaf0c.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(()=>{
                //after getting promise auth initialization

                // gets auth instince from gapi and assigns in this.auth  here this is instance/reference of the GoogleAuth class
                this.auth = window.gapi.auth2.getAuthInstance();
                // sends isSignedIn status as parameter  to onSuthChange function
                this.onAuthChange(this.auth.isSignedIn.get());

                //actively listens for any status  change in onAuthChange 
                this.auth.isSignedIn.listen(this.onAuthChange);

                
            })
        });
    }




    onAuthChange = (isSignedIn)=>{
        if(isSignedIn)
        {
            //sends props to signin action type which will setup isSignedIn and userId  (comes from redux state by mapStateToProps function here)
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else
        {
            //calls/invokes signout action type (comes from redux state by mapStateToProps function here )
            this.props.signOut();
        }
    }


    onSignInClick = ()=>{
        //directly signs in using G auth 
        this.auth.signIn();
    }

    onSignOutClick = ()=>{
        //directly signs out using G auth 
        this.auth.signOut();
    }


    renderAuthButton(){
        if (this.props.isSignedIn===null)
        {
            return null;
        }
        else if (this.props.isSignedIn)
        {
            return (
                <div>
               <button 
               onClick={this.onSignOutClick}
               className="ui red google button">
                   <i className="google icon"/>
                   Sign Out
               </button>
               <div>
                   logged in using Google Account
               </div>
               </div>
            )
        }
        else {
            return (
                <div>
                <button
                onClick={this.onSignInClick}
                className="ui red google button">
                   <i className="google icon"/>
                   Sign in with Google
               </button>
               <div>
                   You are not logged in
               </div>
               </div>
              
            )
        }
    }


    render(){
        
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
};



const mapStateToProps = (state)=>{
return {isSignedIn:state.auth.isSignedIn};
}

export default connect(
    mapStateToProps, { signIn, signOut }
     ) (GoogleAuth);