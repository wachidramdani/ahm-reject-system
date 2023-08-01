import React, { Component } from 'react';
import { Form, Modal, Tabs, Tab, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

export class FormSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cluster: null,
      criteria: null,
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
        cluster: this.props.row.cluster ? this.props.row.cluster : null,
        criteria: this.props.row.criteria ? this.props.row.criteria : null,
        leader: this.props.row.leader ? this.props.row.leader : null,
        member: this.props.row.member ? this.props.row.member : null,
        venue: this.props.row.venue ? this.props.row.venue : '',
        start_date: this.props.row.start_date ? new Date(this.props.row.start_date) : new Date(),
        end_date: this.props.row.end_date ? new Date(this.props.row.end_date) : new Date(),
        flag: false
      })
    }
  }

  handleChange = (e, name) => {
    const state = this.state
    if ((name === 'cluster' || name === 'criteria' || name === 'leader' || name === 'member') && e === null) {
      this.setState({ [name]: {} })
    } else if (name === 'cluster' || name === 'criteria' || name === 'leader' || name === 'member') {
      this.setState({ [name]: e })
    } else {
      state[e.target.name] = e.target.value
      this.setState(state)
    }
  }

  handleValidation = () => {
    const { cluster, criteria, venue, start_date, end_date, leader, member } = this.state
    let err = []
    if (cluster === null || cluster === undefined || Object.keys(cluster).length === 0) {
      err = err.concat('Cluster')
    }
    if (criteria === null || criteria === undefined || Object.keys(criteria).length === 0) {
      err = err.concat('Criteria')
    }
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

  handleSubmit = (e, param) => {
    const validate = this.handleValidation()

    if (validate.length === 0) {
      const oldData = this.props.row
      const teamMember = []
      this.state.member.forEach(el => {
        teamMember.push(el.label)
      });
      const dataSubmit = {
        ...oldData,
        cluster: this.state.cluster,
        clusterLabel: this.state.cluster.label,
        criteria: this.state.criteria,
        criteriaLabel: this.state.criteria.label,
        venue: this.state.venue,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        leader: this.state.leader,
        leaderLabel: this.state.leader.label,
        member: this.state.member,
        memberLabel: teamMember.toString().replace(/,/g, ', '),
        gate1: param
      }
      Swal.fire({
        title: 'Success',
        icon: 'warning',
        text: 'Submit data success'
      }).then(() => {
        this.props.onSubmit(dataSubmit)
        this.props.onClose()
      })
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
          <Modal.Title><div className='div-icon'><i className="typcn typcn-pencil"></i></div> Clustering</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="clustering" transition={false} id="noanim-tab-example">
            <Tab eventKey="home" title="Paper/Idea">
              <div className="container d-flex p-md-0 mg-t-20 mg-b-10">
                <div className="az-content-body pd-lg-l-10 d-flex flex-column">

                  <div className="az-content-label mg-b-10">Personal Data</div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Full Name</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.fullName}</span>
                    </div>

                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Employee ID</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.employeeId}</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Function</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.job}</span>
                    </div>

                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Discipline</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.discipline}</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Innovation Purpose</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.purpose}</span>
                    </div>
                  </div>

                  <div>
                    <hr className="mg-y-30" />
                  </div>

                  <div className="az-content-label mg-b-10">Abstraction</div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Title</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.abstract_title}</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Description</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.abstract_desc}</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Abstract</span>
                    </div>
                    <div className="col-lg-4">
                      <div
                        dangerouslySetInnerHTML={{ __html: this.props.row?.abstract_content }}
                      />
                    </div>
                  </div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Attachment</span><br />
                    </div>
                    <div className="col-lg-4" style={{ marginTop: '-15px', fontSize: '28px' }}>
                      <span><i className="typcn typcn-download"> </i></span>
                    </div>
                  </div>

                  <div>
                    <hr className="mg-y-30" />
                  </div>

                  <div className="az-content-label mg-b-10">Impact Value</div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">ROI</span>
                    </div>
                    <div className="col-lg-4" style={{ marginTop: '-15px' }}>
                      <span>
                        {this.props.row?.roi_value} <i className="typcn typcn-download" style={{ fontSize: '28px' }}> </i>
                      </span>
                    </div>
                  </div>

                  <div className="row row-sm mg-t-10">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">HSE</span>
                    </div>
                    <div className="col-lg-4" style={{ marginTop: '-15px' }}>
                      <span>
                        {this.props.row?.hse_value} <i className="typcn typcn-download" style={{ fontSize: '28px' }}> </i>
                      </span>
                    </div>
                  </div>

                  <div className="row row-sm mg-t-10">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Cost Saving</span>
                    </div>
                    <div className="col-lg-4" style={{ marginTop: '-15px' }}>
                      <span>
                        {this.props.row?.cost_saving_value} <i className="typcn typcn-download" style={{ fontSize: '28px' }}> </i>
                      </span>
                    </div>
                  </div>

                  <div>
                    <hr className="mg-y-30" />
                  </div>

                  <div className="az-content-label mg-b-10">Application Boundary</div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Asset Hierarchy Level</span>
                    </div>
                    <div className="col-lg-4">
                      <span>
                        {this.props.row?.hierarchy_level}
                      </span>
                    </div>
                  </div>

                  <div>
                    <hr className="mg-y-30" />
                  </div>

                  <div className="az-content-label mg-b-10">Change Level</div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Level</span>
                    </div>
                    <div className="col-lg-4">
                      <span>
                        {this.props.row?.change_level}
                      </span>
                    </div>
                  </div>

                  <div>
                    <hr className="mg-y-30" />
                  </div>

                  <div className="az-content-label mg-b-10">Risk & Mitigation Plan</div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Description</span>
                    </div>
                    <div className="col-lg-4">
                      <span>
                        {this.props.row?.description}
                      </span>
                    </div>
                  </div>

                </div>{/* az-content-body */}
              </div>{/* container */}
            </Tab>

            <Tab eventKey="clustering" title="Form">
              <div className="az-content-label mg-b-5">Cluster & Criteria</div>
              <p className="mg-b-20 font-italic">Select One</p>

              <div className="row row-sm">
                <div className="col-lg-6">
                  <span className="font-weight-bold font-italic">Assign Cluster</span>
                  <Select className="w-100" name='cluster' value={this.state.cluster} onChange={(e) => this.handleChange(e, 'cluster')}
                    isClearable={true}
                    options={[
                      { value: 'Cluster A', label: 'Cluster A' },
                      { value: 'Cluster B', label: 'Cluster B' },
                      { value: 'Cluster C', label: 'Cluster C' },
                      { value: 'Cluster D', label: 'Cluster D' },
                      { value: 'Cluster E', label: 'Cluster E' }
                    ]}
                  />
                </div>

                <div className="col-lg-6">
                  <span className="font-weight-bold font-italic">Assign Criteria</span>
                  <Select className="w-100" name='criteria' value={this.state.criteria} onChange={(e) => this.handleChange(e, 'criteria')}
                    isClearable={true}
                    options={[
                      { value: 'Criteria A', label: 'Criteria A' },
                      { value: 'Criteria B', label: 'Criteria B' },
                      { value: 'Criteria C', label: 'Criteria C' },
                      { value: 'Criteria D', label: 'Criteria D' },
                      { value: 'Criteria E', label: 'Criteria E' }
                    ]}
                  />
                </div>
              </div>

              <div>
                <hr className="mg-y-30" />
              </div>

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
                  <Button variant="success btn-block" onClick={(e) => this.handleSubmit(e, 'Passed')}><i className="typcn typcn-tick" style={{ fontSize: '18px' }}></i> Pass</Button>
                </div>
                <div className="col-sm-6 col-md-2">
                  <Button variant="danger btn-block" onClick={(e) => this.handleSubmit(e, 'Retained')}><i className="typcn typcn-times" style={{ fontSize: '18px' }}></i> Retained</Button>
                </div>
              </div>

            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    )
  }
}

export default FormSubmission