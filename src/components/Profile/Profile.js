import React from 'react';
import './Profile.css';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: this.props.user.name,
			age: this.props.user.age,
			occupation: this.props.user.occupation
		}
	}

	onFormChange = (event) => {
		switch(event.target.name){
			case 'user-name':
				this.setState({name: event.target.value})
				break;
			case 'user-age':
				this.setState({age: event.target.value})
				break;	
			case 'user-occupation':
				this.setState({occupation: event.target.value})
				break;	
			default:
				return;

		}
	}

	onProfileUpdate = (data) => {
		fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
			method: "post",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({formInput: data})
			
		})
		.then(response=> {
			this.props.toggleModal();
			this.props.loadUser({...this.props.user, ...data});
		})
		.catch(err=> console.log(err))


	}

	render() {
		const { user } = this.props
		const { name, age, occupation } = this.state
	return (
		<div className="profile-modal">
			<article className=" ba br3 mv4 mw6 shadow-5 center bg-white">
			<main className="pa4 black-80 w-80">
				<img
			      src="http://tachyons.io/img/logo.jpg"
			      className="h3 w3 dib" alt="avatar" 
			    />
			    <h1>{this.state.name}</h1>
			    <h4>Images Submitted: {user.entries}</h4>
			    <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
			    <hr />
			    	<label className="mt2 fw6" htmlFor="user-name">Name</label>
			        <input 
			        	placeholder={user.name}
			        	className="pa2 ba w-100" 
			        	type="text" 
			        	name="user-name"  
			        	id="name" 
			        	onChange={this.onFormChange}
			        />
			        <label className="mt2 fw6" htmlFor="user-age">Age</label>
			        <input 
			        	placeholder={user.age}
			        	className="pa2 ba w-100" 
			        	type="text" 
			        	name="user-age"  
			        	id="age" 
			        	onChange={this.onFormChange}
			        />
			        <label className="mt2 fw6" htmlFor="user-occupation">Occupation</label>
			        <input 
			        	placeholder={user.occupation}
			        	className="pa2 ba w-100" 
			        	type="text" 
			        	name="user-occupation"  
			        	id="occupation" 
			        	onChange={this.onFormChange}
			        />
			        <div className="mt4" style={{display:'flex', justifyContent: 'space-evenly'}} >
			        	<button 
			        		onClick={() => this.onProfileUpdate({name: name, age: age, occupation: occupation})}
			        		className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20" >
			        		Save
			        	</button>
			        	<button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" onClick={this.props.toggleModal}>
			        		Cancel
			        	</button>
			        </div>	
			</main>
				<div className="modal-close" onClick={this.props.toggleModal}>
				&times;
				</div>
		</article>	
		</div>
	)
}
} 



export default Profile;