import React, { Component } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

export class FormSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venue: '',
      start_date: new Date(),
      end_date: new Date(),
      leader: null,
      member: null
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.row && prevProps.open !== this.props.open) {
      this.setState({
        leader: null,
        member: null,
        venue: '',
        start_date: new Date(),
        end_date: new Date()
      })
    }
  }

  handleChange = (e, name) => {
    const state = this.state
    if ((name === 'leader' || name === 'member') && e === null) {
      this.setState({ [name]: {} })
    } else if (name === 'leader' || name === 'member') {
      this.setState({ [name]: e })
    } else {
      state[e.target.name] = e.target.value
      this.setState(state)
    }
  }

  handleValidation = () => {
    const { venue, start_date, end_date, leader, member } = this.state
    let err = []
    if (leader === null || leader === undefined || Object.keys(leader).length === 0) {
      err = err.concat('Leader')
    }
    if (member === null || member === undefined || Object.keys(member).length === 0) {
      err = err.concat('Member')
    }
    if (venue.length === 0) {
      err = err.concat('Venue')
    }
    if (start_date === null || start_date.length === 0) {
      err = err.concat('Start Date')
    }
    if (end_date === null || end_date.length === 0) {
      err = err.concat('End Date')
    }
    return err
  }

  handleSubmit = () => {
    const validate = this.handleValidation()

    if (validate.length === 0) {
      const teamMember = []
      this.state.member.forEach(el => {
        teamMember.push(el.label)
      });
      let dataSubmit = this.props.row
      dataSubmit.forEach(el => {
        el.venue = this.state.venue
        el.start_date = this.state.start_date
        el.end_date = this.state.end_date
        el.leader = this.state.leader
        el.leaderLabel = this.state.leader.label
        el.member = this.state.member
        el.memberLabel = teamMember.toString().replace(/,/g, ', ')
      })
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
    } else {
      const labelValidate = validate.toString()
      const addSpace = labelValidate.replace(/,/g, ', ')
      const msgValidate = addSpace + ' : ...must be filled'
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: msgValidate
      });
    }
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.onClose} dialogClassName="custom-modal" >
        <Modal.Header closeButton>
          <Modal.Title><div className='div-icon'><i className="typcn typcn-pencil"></i></div> Assign Reviewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="az-content-label mg-b-5">Assign Reviewer</div>
          <p className="mg-b-20 font-italic">All fields are required</p>

          <div className="row row-sm">
            <div className="col-lg-2">
              <span className="font-weight-bold font-italic">Assign Team Purpose</span>
            </div>
            <div className="col-lg-10">
              <span>To Review Abstract</span>
            </div>

            <div className="col-lg-2 mg-t-15">
              <span className="font-weight-bold font-italic">Start Date</span>
              <div className="w-100">
                <DatePicker selected={this.state.start_date} name="start_date" onChange={(date) => this.setState({ start_date: date })} className="form-control" style={{ 'z-index': 3 }} />
              </div>
            </div>

            <div className="col-lg-2 mg-t-15">
              <span className="font-weight-bold font-italic">End Date</span>
              <div className="w-100">
                <DatePicker selected={this.state.end_date} name="end_date" onChange={(date) => this.setState({ end_date: date })} className="form-control" style={{ 'z-index': 3 }} />
              </div>
            </div>

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Venue</span>
              <Form.Control type="text" name='venue' value={this.state.venue} onChange={(e) => this.handleChange(e, 'venue')} placeholder="Input Venue" />
            </div>

            <div className="col-lg-2 mg-t-15">
              <span className="font-weight-bold font-italic">Abstract Title</span>
            </div>
            <div className="col-lg-10 mg-t-15">
              <span>{this.props.row?.abstract_title}</span>
            </div>

            <div className="col-lg-6 mg-t-15">
              <span className="font-weight-bold font-italic">Assign Leader</span>
              <Select menuPlacement="top" className="w-100" name='leader' value={this.state.leader} onChange={(e) => this.handleChange(e, 'leader')}
                isClearable={true}
                options={[
                  { value: 'Agus', label: 'Agus' },
                  { value: 'Satria', label: 'Satria' },
                  { value: 'Budi', label: 'Budi' },
                  { value: 'Deral', label: 'Deral' },
                  { value: 'Dara', label: 'Dara' },
                  { value: 'Elfano', label: 'Elfano' },
                  { value: 'Arka', label: 'Arka' },
                  { value: 'Dimas', label: 'Dimas' }
                ]}
              />
            </div>

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Assign Team Member</span>
              <Select isMulti menuPlacement="top" className="w-100" name='member' value={this.state.member} onChange={(e) => this.handleChange(e, 'member')}
                isClearable={true}
                options={[
                  { value: 'Galih', label: 'Galih' },
                  { value: 'Ratna', label: 'Ratna' },
                  { value: 'Dedi', label: 'Dedi' },
                  { value: 'Dina', label: 'Dina' },
                  { value: 'Tora', label: 'Tora' },
                  { value: 'Beni', label: 'Beni' },
                  { value: 'Andi', label: 'Andi' },
                  { value: 'Bagas', label: 'Bagas' }
                ]}
              />
            </div>
          </div>

          <div>
            <hr className="mg-y-30" />
          </div>

          <div className="row row-sm">
            <div className="col-sm-6 col-md-2">
              <Button variant="success btn-block" onClick={this.handleSubmit}><i className="typcn typcn-tick" style={{ fontSize: '18px' }}></i> Submit</Button>
            </div>
            <div className="col-sm-6 col-md-2">
              <Button variant="danger btn-block" onClick={this.props.onClose}><i className="typcn typcn-times" style={{ fontSize: '18px' }}></i> Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default FormSubmission