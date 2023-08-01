import React, { Component } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

export class FormReviewing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venue_jury: '',
      start_date_jury: new Date(),
      end_date_jury: new Date(),
      leader_jury: null,
      member_jury: null
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.row && prevProps.open !== this.props.open) {
      this.setState({
        leader_jury: this.props.row.leader_jury ? this.props.row.leader_jury : null,
        member_jury: this.props.row.member_jury ? this.props.row.member_jury : null,
        venue_jury: this.props.row.venue_jury ? this.props.row.venue_jury : '',
        start_date_jury: this.props.row.start_date_jury ? new Date(this.props.row.start_date_jury) : new Date(),
        end_date_jury: this.props.row.end_date_jury ? new Date(this.props.row.end_date_jury) : new Date(),
        flag: false
      })
    }
  }

  handleChange = (e, name) => {
    const state = this.state
    if ((name === 'leader_jury' || name === 'member_jury') && e === null) {
      this.setState({ [name]: {} })
    } else if (name === 'leader_jury' || name === 'member_jury') {
      this.setState({ [name]: e })
    } else {
      state[e.target.name] = e.target.value
      this.setState(state)
    }
  }

  handleValidation = () => {
    const { venue_jury, start_date_jury, end_date_jury, leader_jury, member_jury } = this.state
    let err = []
    if (leader_jury === null || leader_jury === undefined || Object.keys(leader_jury).length === 0) {
      err = err.concat('Leader')
    }
    if (member_jury === null || member_jury === undefined || Object.keys(member_jury).length === 0) {
      err = err.concat('Member')
    }
    if (venue_jury.length === 0) {
      err = err.concat('Venue')
    }
    if (start_date_jury === null || start_date_jury.length === 0) {
      err = err.concat('Start Date')
    }
    if (end_date_jury === null || end_date_jury.length === 0) {
      err = err.concat('End Date')
    }
    return err
  }

  handleSubmit = (e, param) => {
    const validate = this.handleValidation()

    if (validate.length === 0) {
      const teamMember = []
      this.state.member_jury.forEach(el => {
        teamMember.push(el.label)
      });
      let dataSubmit = this.props.row
      dataSubmit.forEach(el => {
        el.venue_jury= this.state.venue_jury
        el.start_date_jury= this.state.start_date_jury
        el.end_date_jury= this.state.end_date_jury
        el.leader_jury= this.state.leader_jury
        el.leaderJuryLabel= this.state.leader_jury.label
        el.member_jury= this.state.member_jury
        el.memberJuryLabel= teamMember.toString().replace(/,/g, ', ')
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
          <Modal.Title><div className='div-icon'><i className="typcn typcn-pencil"></i></div> Assign Jury</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="az-content-label mg-b-5">Assign Jury</div>
          <p className="mg-b-20 font-italic">All fields are required</p>

          <div className="row row-sm">
            <div className="col-lg-2">
              <span className="font-weight-bold font-italic">Assign Team Purpose</span>
            </div>
            <div className="col-lg-10">
              <span>Judging Innovation</span>
            </div>

            <div className="col-lg-2 mg-t-15">
              <span className="font-weight-bold font-italic">Start Date</span>
              <div className="w-100">
                <DatePicker selected={this.state.start_date_jury} name="start_date_jury" onChange={(date) => this.setState({ start_date_jury: date })} className="form-control" style={{ 'z-index': 3 }} />
              </div>
            </div>

            <div className="col-lg-2 mg-t-15">
              <span className="font-weight-bold font-italic">End Date</span>
              <div className="w-100">
                <DatePicker selected={this.state.end_date_jury} name="end_date_jury" onChange={(date) => this.setState({ end_date_jury: date })} className="form-control" style={{ 'z-index': 3 }} />
              </div>
            </div>

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Venue</span>
              <Form.Control type="text" name='venue_jury' value={this.state.venue_jury} onChange={(e) => this.handleChange(e, 'venue_jury')} placeholder="Input Venue" />
            </div>

            <div className="col-lg-2 mg-t-15">
              <span className="font-weight-bold font-italic">Abstract Title</span>
            </div>
            <div className="col-lg-10 mg-t-15">
              <span>{this.props.row?.abstract_title}</span>
            </div>

            <div className="col-lg-6 mg-t-15">
              <span className="font-weight-bold font-italic">Assign Jury Leader</span>
              <Select menuPlacement="top" className="w-100" name='leader_jury' value={this.state.leader_jury} onChange={(e) => this.handleChange(e, 'leader_jury')}
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
              <span className="font-weight-bold font-italic">Assign Jury Team Member</span>
              <Select isMulti menuPlacement="top" className="w-100" name='member_jury' value={this.state.member_jury} onChange={(e) => this.handleChange(e, 'member_jury')}
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
              <Button variant="success btn-block" onClick={(e) => this.handleSubmit(e, 'Passed')}><i className="typcn typcn-tick" style={{ fontSize: '18px' }}></i> Submit</Button>
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

export default FormReviewing