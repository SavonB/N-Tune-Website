import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

export default class Facebook extends Component {
    state={
        isloggedin:false,
        userID: ' ',
        name:'',
        email: '',
        picture: '',


    }

    responseFacebook=response=>{
        console.log(response);
        this.setState({
            isLoggedin: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
        

        });


    };

    componentClicked=()=> console.log("clicked");

    
    render() {
        let fbContent;
        if(this.state.isloggedin){
            fbContent = (
                <div style={{
                    width: "400px", 
                    margin:"auto", 
                    background: "blue", 
                    padding:"20px"
                    }}> 
                    <h1>Hi {this.state.name}</h1>
                    </div>
                    

               
            );

        }else{
            fbContent= (
            <FacebookLogin
                appId="422848558900471"
                autoLoad={true}
                fields="name, email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);

        }
        return (
            <div>
                {fbContent}
            </div>
        )
    }
} 
