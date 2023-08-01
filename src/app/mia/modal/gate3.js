import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

export class Gate3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableButton: true,
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.row && prevProps.open !== this.props.open) {
      this.setState({
        disableButton: this.props.row ? false : true
      })
    }
  }

  handleSubmit = (e, param) => {
      let dataSubmit = this.props.row
      dataSubmit.forEach(el => {
        el.gate3 = param
      })
      // console.log(dataSubmit, 'data submit')
      Swal.fire({
        title: 'Warning',
        text: "Are you sure you want to process this data?",
        icon: 'warning',
        cancelButtonText: 'Cancel!',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Success',
            icon: 'warning',
            text: 'Submit data success'
          }).then(() => {
            this.props.onSubmit(dataSubmit)
            this.props.onClose()
          })
        }
      });
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title><div className='div-icon modal-icon'><i className="typcn typcn-pencil"></i></div> Gate 3</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="az-content-label mg-b-5">Choose Gate Status</div>
          {/* <p className="mg-b-20 font-italic">Retained will be removed from list</p> */}

          <div className="row row-sm mg-t-10 w-100">
            <div className="col-sm-6">
              <Button disabled={this.state.disableButton} variant="success btn-block" onClick={(e) => this.handleSubmit(e, 'Passed')}><i className="typcn typcn-tick" style={{ fontSize: '18px' }}></i> Passed</Button>
            </div>
            <div className="col-sm-6">
              <Button disabled={this.state.disableButton} variant="danger btn-block" onClick={(e) => this.handleSubmit(e, 'Retained')}><i className="typcn typcn-times" style={{ fontSize: '18px' }}></i> Retained</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Gate3