import React, { Component } from 'react';
import { Form, Modal, Tabs, Tab, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

import Table2AHP from '../../commons/Table/Table2AHP';

export class FormReviewing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: [
        // { width:"100",dataField:'fcn',title: "Function", row: '0', rowSpan: '1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
        { dataField: 'dt1', title: "Criteria Element", row: '0', rowSpan: '1', headerAlign: 'center', dataAlign: 'left', editable: false },
        { width: "100", dataField: 'sc1', title: "Reviewer A", row: '0', colSpan: '1', headerAlign: 'center', dataAlign: 'center', editable: true },
        { width: "100", dataField: 'sc2', title: "Reviewer B", row: '0', colSpan: '1', headerAlign: 'center', dataAlign: 'center', editable: true },
        { width: "100", dataField: 'sc3', title: "Reviewer C", row: '0', colSpan: '1', headerAlign: 'center', dataAlign: 'center', editable: true },
        { width: "100", dataField: 'scd', title: "Reviewer D", row: '0', colSpan: '1', headerAlign: 'center', dataAlign: 'center', editable: true },
        { width: "100", dataField: 'sce', title: "Reviewer E", row: '0', colSpan: '1', headerAlign: 'center', dataAlign: 'center', editable: true },
        { width: "100", dataField: 'sc4', title: "Average", row: '0', colSpan: '1', headerAlign: 'center', dataAlign: 'center', editable: false },
        { width: "100", dataField: 'scw', title: "Weighing", row: '0', colSpan: '1', headerAlign: 'center', dataAlign: 'center', editable: false },
        { width: "100", dataField: 'sc5', title: "Score", row: '0', rowSpan: '1', headerAlign: 'center', dataAlign: 'center', editable: false }
      ],
      datas: [
        { id: 1, dt1: 'Did innovation offer solution to most actual business issues?', scd: '', sce: '', scw: '25', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'Engineering' },
        { id: 2, dt1: 'Did innovation offer unique solution?', scd: '', sce: '', scw: '25', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'Engineering' },
        { id: 3, dt1: 'Did innovation are replicable and scalable?', scd: '', sce: '', scw: '25', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'Engineering' },
        { id: 4, dt1: 'Did innovation are complex and require thorough and deep analysis?', scd: '', sce: '', scw: '25', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'Operations' },
        { id: 5, dt1: 'Did innovation require large resources (cost, time, manhours)?', scd: '', sce: '', scw: '25', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'Operations' },
        { id: 6, dt1: 'Did implemented innovation require length time (>6 months)?', scd: '', sce: '', scw: '25', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'Operations' },
        { id: 7, dt1: 'Did innovation value is significant and recognizable? ', scd: '', sce: '', scw: '50', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'Safety' },
        { id: 8, dt1: 'Did innovation value relevant to organization objective?', scd: '', sce: '', scw: '50', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'General' },
        { id: 9, dt1: 'Did implementation involve internal Medco resources?', scd: '', sce: '', scw: '20', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'General' },
        { id: 10, dt1: 'Have risks (potential failure and effect) been identified? Risks level?', scd: '', sce: '', scw: '25', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'General' },
        { id: 11, dt1: 'Does mitigation plan available and were there evidences to support?', scd: '', sce: '', scw: '25', sc1: '', sc2: '', sc3: '', sc4: '0', sc5: '0', fcn: 'General' }
      ],
      sp1: 22.9, sp2: 100,

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
      const oldData = this.props.row
      const teamMember = []
      this.state.member_jury.forEach(el => {
        teamMember.push(el.label)
      });
      const dataSubmit = {
        ...oldData,
        venue_jury: this.state.venue_jury,
        start_date_jury: this.state.start_date_jury,
        end_date_jury: this.state.end_date_jury,
        leader_jury: this.state.leader_jury,
        leaderJuryLabel: this.state.leader_jury.label,
        member_jury: this.state.member_jury,
        memberJuryLabel: teamMember.toString().replace(/,/g, ', '),
        gate2: param
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

  handleAction = (row, cellName, cellValue) => {
    // console.log(row, 'rowwww')
    const sc1 = row.sc1.length === 0 ? 0 : row.sc1
    const sc2 = row.sc2.length === 0 ? 0 : row.sc2
    const sc3 = row.sc3.length === 0 ? 0 : row.sc3
    const scd = row.scd.length === 0 ? 0 : row.scd
    const sce = row.sce.length === 0 ? 0 : row.sce
    var sc4 = parseFloat(sc1) + parseFloat(sc2) + parseFloat(sc3) + parseFloat(scd) + parseFloat(sce);
    let newsc4 = (sc4 / 5).toFixed(1);
    row.sc4 = newsc4;
    // console.log(sc1, 'row after')
    this.setState({
      datas: this.state.datas.map(el => (el.id === row.id ? Object.assign({}, el, { row }) : el))
    });
    var sp1 = 0, sp2 = 0
    for (let index = 0; index < this.state.datas.length; index++) {
      sp1 = sp1 + parseFloat(this.state.datas[index].sc4)
    }
    sp1 = sp1.toFixed(1);
    // for (let index = 0; index < this.state.datas.length; index++) {
    const newsc5 = (newsc4 * row.scw).toFixed(0)
    // let arr = this.state.datas[index]
    row.sc5 = newsc5
    this.setState({
      datas: this.state.datas.map(el => (el.id === row.id ? Object.assign({}, el, { row }) : el))
    });
    // newDatas.push(arr)
    // }
    let newDatas = this.state.datas;
    for (let i = 0; i < newDatas.length; i++) {
      sp2 = sp2 + parseFloat(newDatas[i].sc5)
    }
    this.setState({ sp1: sp1, sp2: sp2 })
  }

  render() {
    const footerData = [
      [
        {
          columnIndex: 0,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong> </strong>
            );
          }
        },
        {
          columnIndex: 1,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong> </strong>
            );
          }
        },
        {
          columnIndex: 2,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong> </strong>
            );
          }
        },
        {
          columnIndex: 3,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong> </strong>
            );
          }
        },
        {
          columnIndex: 4,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong> </strong>
            );
          }
        },
        {
          columnIndex: 5,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong>Total</strong>
            );
          }
        },
        {
          columnIndex: 6,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong>{this.state.sp1}</strong>
            );
          }
        },
        {
          columnIndex: 7,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong> </strong>
            );
          }
        },
        {
          columnIndex: 8,
          align: 'center',
          formatter: (tableData) => {
            return (
              <strong>{this.state.sp2}</strong>
            );
          }
        },
      ]
    ];

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

            <Tab eventKey="cluster" title="Clustering">
              <div className="container d-flex p-md-0 mg-t-20 mg-b-10">
                <div className="az-content-body pd-lg-l-10 d-flex flex-column">

                  <div className="az-content-label mg-b-10">Cluster & Criteria</div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Assign Cluster</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.clusterLabel}</span>
                    </div>

                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Criteria</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.criteriaLabel}</span>
                    </div>
                  </div>

                  <div>
                    <hr className="mg-y-30" />
                  </div>

                  <div className="az-content-label mg-b-10">Assign Reviewer</div>

                  <div className="row row-sm">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Assign Team Purpose</span>
                    </div>
                    <div className="col-lg-4">
                      <span>To Review Abstract</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Start Date</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.start_date?.substring(0, 10)}</span>
                    </div>
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">End Date</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.end_date?.substring(0, 10)}</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Venue</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.venue}</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Abstract Title</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.abstract_title}</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Leader</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.leaderLabel}</span>
                    </div>
                  </div>
                  <div className="row row-sm mt-3">
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Assign Team Member</span>
                    </div>
                    <div className="col-lg-4">
                      <span>{this.props.row?.memberLabel}</span>
                    </div>
                  </div>

                </div>{/* az-content-body */}
              </div>{/* container */}
            </Tab>

            <Tab eventKey="clustering" title="Form">
              <div className="az-content-label mg-b-5">Reviewing Score</div>
              <p className="mg-b-20 font-italic">Input Score</p>

              <div className="row row-sm">
                <div className="col-lg-12">
                  <Table2AHP
                    tableHead={this.state.tableHead}
                    datas={this.state.datas}
                    footerData={footerData}
                    action={this.handleAction}
                  />
                </div>
              </div>

              <div>
                <hr className="mg-y-30" />
              </div>

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

export default FormReviewing