import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import dataUser from '../commons/jsonFile/user.json';
import submissionData from '../commons/jsonFile/submissionData.json';
import symptoms from '../commons/jsonFile/symptom.json';
import partNumber from '../commons/jsonFile/partsNumber.json';
import rejectCard from '../commons/jsonFile/rejectCard.json';
import inspection from '../commons/jsonFile/inspection.json';

export class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        username: "",
        password: "",
        remember_me: false
      },
      user: dataUser
    }
  }

  componentDidMount = () => {
    const isLogin = localStorage.getItem('isLogin')
    // console.log(isLogin, 'isLogin')
    if (isLogin === 'true') {
      this.props.history.push('/')
    }
  }

  handleChange(e, field) {
    let fields = this.state.fields;
    const errors = this.state.errors;
    switch (field) {
      case 'remember_me':
        fields[field] = e.target.checked;
        break;
      case 'username':
        fields[field] = e.target.value;
        this.setState({ errors: errors });
        break;
      case 'password':
        fields[field] = e.target.value;
        this.setState({ errors: errors });
        break;
      default:
        fields[field] = e.target.value;
        break;
    }
    this.setState({ fields });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //username
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = true;
    }

    //Password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = true;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleLogin = () => {
    if (this.handleValidation()) {
      const username = this.state.fields.username
      const password = this.state.fields.password
      if (username && password) {
        var x = 0
        var dataUser = {}
        this.state.user.forEach(el => {
          if (username === el.user && password === el.password) {
            dataUser = {
              level: el.level,
              job: el.job,
              dept: el.dept,
              name: el.name,
              id: el.employeeID
            }
            x++;
          }
        });
        if (x > 0) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Login Success.',
            showConfirmButton: false,
            timer: 1500
          })
            .then(() => {
              localStorage.setItem('isLogin', true);
              localStorage.setItem('dataUser', JSON.stringify(dataUser));
              const cekExisting = localStorage.getItem('dataSubmission');
              if(cekExisting === null){
                const convertJson = JSON.stringify(submissionData);
                localStorage.setItem('dataSubmission', convertJson);
              }              
              const cekSymptoms = localStorage.getItem('dataSymptoms');
              if(cekSymptoms === null){
                const convertJson = JSON.stringify(symptoms);
                localStorage.setItem('dataSymptoms', convertJson);
              }              
              const cekPartNumber = localStorage.getItem('dataPartNumber');
              if(cekPartNumber === null){
                const convertJson = JSON.stringify(partNumber);
                localStorage.setItem('dataPartNumber', convertJson);
              }   
              const cekRejectCard = localStorage.getItem('dataRc');
              if(cekRejectCard === null){
                const convertJson = JSON.stringify(rejectCard);
                localStorage.setItem('dataRc', convertJson);
              }    
              const cekInspection = localStorage.getItem('dataInspection');
              if(cekInspection === null){
                const convertJson = JSON.stringify(inspection);
                localStorage.setItem('dataInspection', convertJson);
              }                 
              this.props.history.push("/")
            })
        } else {
          Swal.fire({
            title: 'Warning',
            icon: 'warning',
            text: 'Username & password are incorrect',
          });

        }
      } else {
        Swal.fire({
          title: 'Warning',
          icon: 'warning',
          text: 'Username & password are incorrect',
        });
      }
    } else {
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'Username & password are incorrect',
      });
    }
  }

  render() {
    return (
      <div className='bg-signin'>
        <div className="az-signin-wrapper">
          <div className="az-card-signin">
            {/* <img
              src={require("../../assets/images/logo-5-sm.png")}
              alt=""
              className='img-logo'
            ></img>
            <h1 className="az-logo-text">
              Center of Excellence
            </h1> */}
            <div className="az-signin-header">
              <h2 style={{color: '#e4051c'}}>Welcome</h2>
              <h4>Please sign in to continue</h4>

              <form action="#/">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" placeholder="Enter your username" name="username" value={this.state.fields["username"]} onChange={(e) => this.handleChange(e, 'username')} />
                </div>{/* form-group */}
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Enter your password" name="password" value={this.state.fields["password"]} onChange={(e) => this.handleChange(e, 'password')} />
                </div>{/* form-group */}
                <Link to="#/" onClick={this.handleLogin} className="btn btn-az-primary btn-block" style={{backgroundColor: '#e4051c'}}>Sign In</Link>
              </form>
            </div>{/* az-signin-header */}
            <div className="az-signin-footer">
              <p><a href="#/">Forgot password?</a></p>
            </div>{/* az-signin-footer */}
          </div>{/* az-card-signin */}
        </div>{/* az-signin-wrapper */}
      </div>
    )
  }
}

export default Signin
