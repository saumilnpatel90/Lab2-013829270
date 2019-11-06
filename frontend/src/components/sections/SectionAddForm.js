import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import backendURL from '../../urlconfig';

class SectionAddForm extends Component {
     constructor(props){
        super(props);
        this.state = {
            name : "",
            message: ""
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
    }

    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitAdd = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            ownerId: localStorage.getItem('id'),
            name : this.state.name
        }

        const token = localStorage.getItem('token');
        fetch(`${backendURL}/restaurant/addSection`, {
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
            if(res.status === 200){
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage
                    })
                    this.props.onAdd({id: JSON.parse(data).id, name: this.state.name});
                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data).message;
                    this.setState({
                        message: responseMessage
                    })
                })
                
            }
        })
        .catch(err => console.log(err));
    }
    
    render(){
        //if Cookie is not set render Owner Login Page
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/owner/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container">
                    <form onSubmit = {this.submitAdd}>
                    <div className="add-section-form">
                        <div className="main-div">
                            <div className="panel">
                            <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h4>Add Section</h4>
                                <hr/>
                                <div style={{display:'flex'}}>
                                    <input required onChange = {this.nameChangeHandler} 
                                    type="text" className="form-control" name="name" placeholder="Name"/>
                                    <button type="submit" className="btn btn-primary">Add</button>  
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            
        
        )
    }
}

export default SectionAddForm;