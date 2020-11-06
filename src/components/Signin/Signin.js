import React from 'react';
import './SignIn.css'

class Signin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}
	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token)
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
		     .then(data => { //data contains the id and token from backend
		        if(data.userId && data.success === 'true'){
		          this.saveAuthTokenInSession(data.token)
		          fetch(`http://localhost:3000/profile/${data.userId}`,{
			        method: 'get',
			        headers: {
			          'Content-Type': 'application/json', 
			          'Authorization': data.token
			        }            
			        })
			          .then(response=> response.json())
			          .then(user => {
			            if(user && user.email){
			              this.props.loadUser(user)
			              this.props.onRouteChange('home')
			            }
			          })
						.catch(console.log)
		        }
		        else{
		        	alert("Incorrect Email or Password")
		        }
		      })
	}

	render() {
		return (
			<article className="wid ba br3 mv4 mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	onChange={this.onEmailChange} 
				        	className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        onChange={this.onPasswordChange} 
					        className="hover-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
					      onClick= {this.onSubmitSignIn}
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Sign in" 
					    />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>	
		);
}
}


 export default Signin;
