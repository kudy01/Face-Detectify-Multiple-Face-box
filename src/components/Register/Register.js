import React from 'react';
import '../Signin/SignIn.css'

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token)
	}
	onSubmitSignIn = () => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {
	          'Content-Type': 'application/json', 
	          'Authorization': window.sessionStorage.getItem('token')
	        },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(response => response.json())
			.then(data => { //data contains the id and token from backend
				console.log(data)
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
		        	alert("Incorrect form of submission")
		        }
		      })
	}

	render(){
		return (
		<article className="wid ba br3 mv4 mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input 
			        	onChange={this.onNameChange}
			        	className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="text" 
			        	name="name"  
			        	id="name" />
			      </div>
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
				      onClick={this.onSubmitSignIn}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Register" 
				    />
			    </div>
			  </div>
			</main>
		</article>	
		);
	}
}



 export default Register;
