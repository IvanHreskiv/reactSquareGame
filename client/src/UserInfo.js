import React, { Component } from 'react'
import 'bootstrap-social';
import 'font-awesome/css/font-awesome.min.css';

class UserInfo extends React {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6">

            <div className="card hovercard">
              <div className="cardheader">

              </div>
              <div className="avatar">
                <img alt="" src="http://lorempixel.com/100/100/people/9/">
              </div>
              <div className="info">
                <div className="title">
                  <a target="_blank" href="http://scripteden.com/">Script Eden</a>
                </div>
                <div className="desc">Passionate designer</div>
                <div className="desc">Curious developer</div>
                <div className="desc">Tech geek</div>
              </div>
              <div className="bottom">
                <a className="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac">
                  <i className="fa fa-twitter"></i>
                </a>
                <a className="btn btn-danger btn-sm" rel="publisher"
                   href="https://plus.google.com/+ahmshahnuralam">
                  <i className="fa fa-google-plus"></i>
                </a>
                <a className="btn btn-primary btn-sm" rel="publisher"
                   href="https://plus.google.com/shahnuralam">
                  <i className="fa fa-facebook"></i>
                </a>
                <a className="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam">
                  <i className="fa fa-behance"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default UserInfo;
