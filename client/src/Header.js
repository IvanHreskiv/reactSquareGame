import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class Header extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
            <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#topFixedNavbar1">
                    <span className="sr-only">Toggle navigation</span><span className="icon-bar"></span>
                    <span className="icon-bar"></span><span className="icon-bar"></span>
                  </button>
                </div>
                <div className="collapse navbar-collapse" id="topFixedNavbar1">
                  <ul className="nav navbar-nav links">
                    <li className="active"><Link to='/'>Home<span className="sr-only">(current)</span></Link></li>
                    <li><Link to='/'>Blog</Link></li>
                    <li><Link to='/'>Services</Link></li>
                    <li><Link to='/'>Tutorials</Link></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right nav-pills">
                    <li><Link to='/'><i className="fa fa-lg fa-facebook"></i></Link></li>
                    <li><Link to='/'><i className="fa fa-lg fa-google-plus"></i></Link></li>
                    <li><Link to='/'><i className="fa fa-lg fa-youtube"></i></Link></li>
                    <li><Link to='/logout'><button type="button" className="btn btn-info" id="logout">Log Out</button></Link></li>
                    <li><Link to='/login'><button type="button" className="btn btn-info" id="login">Log In</button></Link></li>
                  </ul>
                </div>
              </div>
            </nav>
        </div>
      </div>
    );
  }
}


export default Header;
