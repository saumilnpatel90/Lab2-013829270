import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import backendURL from '../urlconfig';

//create the Owner Signup Component
class OwnerSignup extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            fname : "",
            lname : "",
            email : "",
            password: "",
            restName: "",
            restZip: "",
            message: "",
            phone: "",
            success: false
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
        this.createStorage = this.createStorage.bind(this);
    }

    //Call the Did Mount to set the auth Flag to false
    componentDidMount(){
        this.setState({
            success : false
        })
    }

    //Name and email change handlers to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    //submit Login handler to send a request to the node backend
    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            fname: this.state.fname,
            lname: this.state.lname,
            email : this.state.email,
            password : this.state.password,
            restName: this.state.restName,
            restZip: this.state.restZip,
            phone: this.state.phone
        }

        const token = localStorage.getItem('token');
        fetch(`${backendURL}/owner/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res);
            if(res.status === 200){
                res.text().then(data => { 
                    console.log(data);
                    
                    
                    this.createStorage({id:JSON.parse(data).id,restName: this.state.restName,restZip: this.state.restZip},
                        message => {
                        console.log(message);
                        }
                    )
                    this.setState({
                        success : true
                    });
                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data);
                    this.setState({
                        success : false,
                        message: responseMessage.message
                    });
                });
                
            }
        })
        .catch(err => console.log(err));
    }

    createStorage = ({id, restName, restZip}, successcb) => {
        localStorage.setItem("ownerId",id);
        localStorage.setItem("restaurantName", restName);
        localStorage.setItem("restaurantZip", restZip);
        successcb("Local Storage created");
    }

    render(){
        //if Cookie is set render Owner Home Page
        let redirectVar = null;
        if(this.state.success){
            redirectVar = <Redirect to= "/owner/addRestaurant"/>
        }
        return(
            <div>
                {redirectVar}

                <Navbar/>
                
                {/* <div className="container">
                    <form onSubmit = {this.submitSignup}>
                    <div className="signup-form">
                        <div className="main-div">
                            <div className="panel">
                            <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h2>Owner Signup</h2>
                                <p>Create your account</p>
                            </div>
                            
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="text" className="form-control" name="fname" placeholder="First Name"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="text" className="form-control" name="lname" placeholder="Last Name"/>
                            </div>
                            <div className="form-group">
                                <input  required onChange = {this.changeHandler} type="email" className="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="number" min="1" step="1" className="form-control" name="phone" placeholder="Phone"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="text" className="form-control" name="restName" placeholder="Restaurant Name"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.changeHandler} type="number" min="1" step="1" className="form-control" name="restZip" placeholder="Restaurant Zip"/>
                            </div>
                            <button type = "submit" className="btn btn-primary">Create Account</button>                 
                        </div>
                        <p>Have Account? <Link to="/owner/login" >Login</Link></p>
                    </div>
                    </form>
                </div> */}

                <div class="container">
                    <div>
                        <h3 style={{color:"#FF0000"}}>NEW OWNER SIGN-UP</h3>
                    </div>
                    <form method="POST" class="form-horizontal">
                        <div class="form-group">
                            <label for="fname" class="control-label col-sm-3">Enter First Name: </label>
                            <div class="col-sm-3">
                                <input type="text" name="fname" placeholder="Enter your first name" class="form-control" onChange={this.changeHandler} pattern="[A-Za-z ]{2+}" minLength="2" title="Owner name should contain at least 2 alphabets." required></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="lname" class="control-label col-sm-3">Enter Last Name: </label>
                            <div class="col-sm-3">
                                <input type="text" name="lname" placeholder="Enter your last name" class="form-control" onChange={this.changeHandler} pattern="[A-Za-z ]{2+}" minLength="2" title="Owner name should contain at least 2 alphabets." required></input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="control-label col-sm-3">Enter Your Email: </label>
                            <div class="col-sm-3">
                                <input type="email" name="email" placeholder="Enter your email" class="form-control" onChange={this.changeHandler} required></input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="control-label col-sm-3">Enter Your Password: </label>
                            <div class="col-sm-3">
                                <input type="password" name="password" placeholder="Enter your password" class="form-control" onChange={this.changeHandler} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters." required></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="phone" class="control-label col-sm-3">Enter Your Phone: </label>
                            <div class="col-sm-3">
                                <input onChange = {this.changeHandler} type="text" className="form-control" name="phone" placeholder="Enter your phone"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="restName" class="control-label col-sm-3">Enter Restaurant Name: </label>
                            <div class="col-sm-3">
                                <input type="text" name="restName" placeholder="Enter restaurant name" class="form-control" onChange={this.changeHandler} pattern="[A-Za-z ]{1+}" minLength="2" title="Owner name should contain at least 1 alphabets." required></input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="restZip" class="control-label col-sm-3">Enter Restaurant Zip Code: </label>
                            <div class="col-sm-3">
                                <input type="text" name="restZip" placeholder="Enter restaurant zipcode" class="form-control" onChange={this.changeHandler} pattern="[0-9]{5}" minLength="2" title="Must contain 5 digits." required></input>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-10">
                                <button type="submit" class="btn btn-default" onClick={this.submitSignup}>Sign Up</button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <p>Already have an Account? <Link to="/owner/login" >Click here</Link></p>
                        <h2 style={{color: "red", fontSize:"24px"}}>{this.state.message}</h2>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default OwnerSignup;