import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        let navLogin = null;
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/buyer/login" style={{fontWeight:"bold", fontSize:"20px"}}><i>Are you a buyer?</i></Link></li>
                    <li><Link to="/owner/login" style={{fontWeight:"bold", fontSize:"20px"}}><i>Are you an owner?</i></Link></li>
                </ul>
            )

        let redirectVar = null;
        //if(cookie.load('cookie')){
            //redirectVar = <Redirect to="/home"/>
        //}
        return(
            <div>
                {redirectVar}
                <nav class="navbar" style={{backgroundColor:"#F5F5F5"}}>
                    <div class="container-fluid" style={{backgroundColor:"#F5F5F5"}}>
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/" style={{fontWeight:"bold", fontSize:"32px", color:"RED"}}>GrubHub</a>
                        </div>
                        <div>
                            {navLogin}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;