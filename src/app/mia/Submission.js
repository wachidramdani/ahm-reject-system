import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import Select from 'react-select';
import Swal from 'sweetalert2';

export class Submission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      contentState: '',
      personalData: {},
      fullName: '',
      employeeId: 0,
      job: '',
      discipline: '',
      purpose: {},
      abstract_title: '',
      abstract_desc: '',
      abstract_content: '',
      file_abstract: '',
      novelty_type: '',
      novelty_new_file: '',
      novelty_exist_file: '',
      roi_value: 0,
      roi_file: '',
      hse_value: 0,
      hse_file: '',
      cost_saving_value: 0,
      cost_saving_file: '',
      hierarchy_level: 0,
      change_level: 0,
      description: ''
    }
  }
  componentDidMount() {
    bsCustomFileInput.init()
    const dataUser = JSON.parse(localStorage.getItem('dataUser'))
    this.setState({ fullName: dataUser?.name, employeeId: dataUser?.id, job: dataUser?.job, discipline: dataUser?.dept })
  }

  onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const contentStateToRaw = convertToRaw(contentState)
    // console.log('content state', draftToHtml(contentStateToRaw));

    this.setState({ editorState, contentState: contentStateToRaw, abstract_content: draftToHtml(contentStateToRaw) })
  }

  handleChange = (e, name) => {
    const state = this.state
    if (name === 'abstract_content') {
      this.setState({ abstract_content: e.target.value })
    } else if (name === 'purpose' && e === null) {
      this.setState({ purpose: {} })
    } else if (name === 'purpose') {
      this.setState({ purpose: e })
    } else {
      state[e.target.name] = e.target.value
      this.setState(state)
    }
  }

  handleValidation = () => {
    const { purpose, abstract_title, abstract_desc, abstract_content, novelty_type, roi_value, hierarchy_level, change_level, description } = this.state
    let err = []
    if (Object.keys(purpose).length === 0 || purpose === undefined) {
      err = err.concat('Purpose')
    }
    if (abstract_title.length === 0) {
      err = err.concat('Abstract Title')
    }
    if (abstract_desc.length === 0) {
      err = err.concat('Abstract Description')
    }
    if (abstract_content.length === 0) {
      err = err.concat('Abstract Content')
    }
    if (novelty_type === 0) {
      err = err.concat('Novelty')
    }
    if (roi_value === 0) {
      err = err.concat('ROI')
    }
    if (hierarchy_level === 0) {
      err = err.concat('Asset Hierarchy Level')
    }
    if (change_level === 0) {
      err = err.concat('Change Level')
    }
    if (description.length === 0) {
      err = err.concat('Risk Description')
    }
    return err
  }

  handleSubmit = () => {
    const validate = this.handleValidation()

    if (validate.length === 0) {
      const dtime = new Date().getTime()
      const dataSubmit = {
        id: this.state.employeeId + dtime,
        fullName: this.state.fullName,
        employeeId: this.state.employeeId,
        job: this.state.job,
        discipline: this.state.discipline,
        purpose: this.state.purpose?.value,
        abstract_title: this.state.abstract_title,
        abstract_desc: this.state.abstract_desc,
        abstract_content: this.state.abstract_content,
        novelty_type: this.state.novelty_type,
        roi_value: this.state.roi_value,
        hse_value: this.state.hse_value,
        cost_saving_value: this.state.cost_saving_value,
        hierarchy_level: this.state.hierarchy_level,
        change_level: this.state.change_level,
        description: this.state.description,
        status: "clustering"
      }
      const cekExisting = localStorage.getItem('dataSubmission')
      let arrSubmission = []
      if (cekExisting !== null) {
        arrSubmission = JSON.parse(cekExisting)
      }
      arrSubmission.push(dataSubmit)
      const convertJson = JSON.stringify(arrSubmission)
      localStorage.setItem('dataSubmission', convertJson)
      Swal.fire({
        title: 'Success',
        icon: 'warning',
        text: 'Submit data success'
      }).then(() => {
        this.props.history.push('/mia/clustering')
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
      <div>
        <div className="container d-flex p-md-0">
          <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <div className="az-content-breadcrumb">
              <span>MIA</span>
              <span>Submission</span>
            </div>
            <h2 className="az-content-title">Submission</h2>

            <div className="az-content-label mg-b-5">Fill Your Personal Data</div>
            <p className="mg-b-20 font-italic">All fields are required</p>

            <form className="needs-validation was-validated">
              <div className="row row-sm">
                <div className="col-lg-6">
                  <span className="font-weight-bold font-italic">Full Name</span>
                  <Form.Control type="text" name='fullName' value={this.state.fullName} onChange={(e) => this.handleChange(e, 'fullName')} placeholder="Full Name" disabled />
                </div>
                <div className="col-lg-6">
                  <span className="font-weight-bold font-italic">Employee ID</span>
                  <Form.Control type="text" name='employeeId' value={this.state.employeeId} onChange={(e) => this.handleChange(e, 'employeeId')} placeholder="Employee ID" disabled />
                </div>
              </div>
              <div className="row row-sm mt-3">
                <div className="col-lg-6">
                  <span className="font-weight-bold font-italic">Function</span>
                  <Form.Control type="text" name='job' value={this.state.job} onChange={(e) => this.handleChange(e, 'job')} placeholder="Function" disabled />
                </div>
                <div className="col-lg-6">
                  <span className="font-weight-bold font-italic">Discipline</span>
                  <Form.Control type="text" name='discipline' value={this.state.discipline} onChange={(e) => this.handleChange(e, 'discipline')} placeholder="Discipline" disabled />
                </div>
              </div>
              <div className="row row-sm mt-3">
                <div className="col-lg-6">
                  <span className="font-weight-bold font-italic">Innovation Purpose</span>
                  <Select className="w-100" name='purpose' value={this.state.purpose} onChange={(e) => this.handleChange(e, 'purpose')}
                    isClearable={true}
                    options={[
                      { value: 'Increase Production', label: 'Increase Production' },
                      { value: 'Reduce Cost', label: 'Reduce Cost' },
                      { value: 'Increase Efficiency', label: 'Increase Efficiency' },
                      { value: 'Environmental Sustainability', label: 'Environmental Sustainability' },
                      { value: 'Reduced Risk', label: 'Reduced Risk' }
                    ]}
                  />
                </div>
              </div>

              <hr className="mg-y-30" />

              <div className="az-content-label mg-b-5">Enter Your Abstraction</div>
              <p className="mg-b-20 font-italic">All fields are required</p>

              <div className="row row-sm">
                <div className="col-lg-12">
                  <span className="font-weight-bold font-italic">Title</span>
                  <Form.Control type="text" name='abstract_title' value={this.state.abstract_title} onChange={(e) => this.handleChange(e, 'abstract_title')} placeholder="Title" required />
                </div>
              </div>
              <div className="row row-sm mt-3">
                <div className="col-lg-12">
                  <span className="font-weight-bold font-italic">Description</span>
                  <Form.Control type="text" name='abstract_desc' value={this.state.abstract_desc} onChange={(e) => this.handleChange(e, 'abstract_desc')} placeholder="Description" required />
                </div>
              </div>
              <div className="row row-sm mt-3">
                <div className="col-lg-12">
                  <span className="font-weight-bold font-italic">Abstract</span>
                  <Editor
                    // name = "abstract_content"
                    // value={this.state.abstract_content}
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    editorStyle={{ border: "1px solid #cdcdcd", height: "270px" }}
                  // onChange={(e) => this.handleChange(e, 'abstract_content')}
                  />
                </div>
              </div>
            </form>
            <div className="row row-sm mt-3">
              <div className="col-lg-12">
                <span className="font-weight-bold font-italic">Upload Attachment</span><br />
                <div className="custom-file w-25">
                  <Form.Control type="file" className="custom-file-input" />
                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
              </div>
            </div>

            <div>
              <hr className="mg-y-30" />
            </div>

            <div className="az-content-label mg-b-5">Novelty</div>
            <p className="mg-b-20 font-italic">Select One</p>

            <div className="row row-sm">
              <div className="col-lg-12">
                <span className="font-weight-bold font-italic">Type</span>
                <div>
                  <div className='mt-1'>
                    <Form.Check
                      type={'radio'}
                      id={`New`}
                      value={'New'}
                      label={'New'}
                      className={'rdiobox'}
                      name="novelty_type"
                      checked={this.state.novelty_type === "New"}
                      onChange={(e) => this.handleChange(e, 'nvRadio')}
                    />
                    <span className='font-italic'>Relative no evidence or never be found anywhere in Medco Organization ideas, process, system, part, equipment or devices at any kind or form of modification, installation or usage partly or entirely whether small or big magnitude in Medco Organization</span><br />
                    <div className="mg-t-10 mg-b-10">
                      <Form.Control type="text" name='novelty_new_description' value={this.state.novelty_new_description} onChange={(e) => this.handleChange(e, 'novelty_new_description')} placeholder="Input Description" disabled={this.state.novelty_type === 'New' ? "" : "disabled"} />
                    </div>
                    <div className="custom-file w-25">
                      <Form.Control type="file" className="custom-file-input" disabled={this.state.novelty_type === 'New' ? "" : "disabled"} />
                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`Exist`}
                      value={'Improve Existing'}
                      label={'Improve Existing'}
                      className={'rdiobox'}
                      name="novelty_type"
                      checked={this.state.novelty_type === "Improve Existing"}
                      onChange={(e) => this.handleChange(e, 'nvRadio')}
                    />
                    <span className='font-italic'>Ideas, process, system, part, equipment or devices at any kind or form of modification, installation or usage partly or entirely whether small or big magnitude but there is at least one evidence that it has connection, interference or interface to the existing entity (could be systems, process, etc in Medco Organization</span><br />
                    <div className="mg-t-10 mg-b-10">
                      <Form.Control type="text" name='novelty_existing_description' value={this.state.novelty_existing_description} onChange={(e) => this.handleChange(e, 'novelty_existing_description')} placeholder="Input Description" disabled={this.state.novelty_type === 'Improve Existing' ? "" : "disabled"} />
                    </div>
                    <div className="custom-file w-25">
                      <Form.Control type="file" className="custom-file-input" disabled={this.state.novelty_type === 'Improve Existing' ? "" : "disabled"} />
                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <hr className="mg-y-30" />
            </div>

            <div className="az-content-label mg-b-5">Impact Value</div>
            <p className="mg-b-20 font-italic">Select One</p>

            <div className="row row-sm">
              <div className="col-lg-4">
                <span className="font-weight-bold font-italic">ROI</span>
                <div>
                  <div className='mt-1'>
                    <Form.Check
                      type={'radio'}
                      id={'roi4'}
                      value={'Very High | >20%'}
                      label={'Very High | >20%'}
                      className={'rdiobox'}
                      name="roi_value"
                      onChange={(e) => this.handleChange(e, 'roi_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={'roi3'}
                      value={'High | 15-20%'}
                      label={'High | 15-20%'}
                      className={'rdiobox'}
                      name="roi_value"
                      onChange={(e) => this.handleChange(e, 'roi_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={'roi2'}
                      value={'Medium | 10-15%'}
                      label={'Medium | 10-15%'}
                      className={'rdiobox'}
                      name="roi_value"
                      onChange={(e) => this.handleChange(e, 'roi_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={'roi1'}
                      value={'Moderate | <10%'}
                      label={'Moderate | <10%'}
                      className={'rdiobox'}
                      name="roi_value"
                      onChange={(e) => this.handleChange(e, 'roi_value')}
                    />
                  </div>
                  <div className="mg-t-10 mg-b-10">
                      <Form.Control type="text" name='roi_description' value={this.state.roi_description} onChange={(e) => this.handleChange(e, 'roi_description')} placeholder="Input Description" />
                  </div>
                  <div className="custom-file mt-2">
                    <Form.Control type="file" className="custom-file-input" />
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <span className="font-weight-bold font-italic">HSE</span>
                <div>
                  <div className='mt-1'>
                    <Form.Check
                      type={'radio'}
                      id={'hse4'}
                      value={'Remove Hazard'}
                      label={'Remove Hazard'}
                      className={'rdiobox'}
                      name="hse_value"
                      onChange={(e) => this.handleChange(e, 'hse_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={'hse3'}
                      value={'Minimize Hazard'}
                      label={'Minimize Hazard'}
                      className={'rdiobox'}
                      name="hse_value"
                      onChange={(e) => this.handleChange(e, 'hse_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={'hse2'}
                      value={'Contain Hazard'}
                      label={'Contain Hazard'}
                      className={'rdiobox'}
                      name="hse_value"
                      onChange={(e) => this.handleChange(e, 'hse_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={'hse1'}
                      value={'Protect Hazard'}
                      label={'Protect Hazard'}
                      className={'rdiobox'}
                      name="hse_value"
                      onChange={(e) => this.handleChange(e, 'hse_value')}
                    />
                  </div>
                  <div className="mg-t-10 mg-b-10">
                      <Form.Control type="text" name='hse_description' value={this.state.hse_description} onChange={(e) => this.handleChange(e, 'hse_description')} placeholder="Input Description" />
                  </div>
                  <div className="custom-file mt-2">
                    <Form.Control type="file" className="custom-file-input" />
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <span className="font-weight-bold font-italic">Cost Saving</span>
                <div>
                  <div className='mt-1'>
                    <Form.Check
                      type={'radio'}
                      id={`cs5`}
                      value={'Extremely High Impact | > 1 MM USD'}
                      label={'Extremely High Impact | > 1 MM USD'}
                      className={'rdiobox'}
                      name="cost_saving_value"
                      onChange={(e) => this.handleChange(e, 'cost_saving_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`cs4`}
                      value={'Very High Impact | 500 - 1 MM USD'}
                      label={'Very High Impact | 500 - 1 MM USD'}
                      className={'rdiobox'}
                      name="cost_saving_value"
                      onChange={(e) => this.handleChange(e, 'cost_saving_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`cs3`}
                      value={'Moderate High Impact | 100 - 500 K USD'}
                      label={'Moderate High Impact | 100 - 500 K USD'}
                      className={'rdiobox'}
                      name="cost_saving_value"
                      onChange={(e) => this.handleChange(e, 'cost_saving_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`cs2`}
                      value={'Moderate Impact | 50 K - 100 K USD'}
                      label={'Moderate Impact | 50 K - 100 K USD'}
                      className={'rdiobox'}
                      name="cost_saving_value"
                      onChange={(e) => this.handleChange(e, 'cost_saving_value')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`cs1`}
                      value={'Low Impact | < 50 K USD'}
                      label={'Low Impact | < 50 K USD'}
                      className={'rdiobox'}
                      name="cost_saving_value"
                      onChange={(e) => this.handleChange(e, 'cost_saving_value')}
                    />
                  </div>
                  <div className="mg-t-10 mg-b-10">
                      <Form.Control type="text" name='cost_saving_description' value={this.state.cost_saving_description} onChange={(e) => this.handleChange(e, 'cost_saving_description')} placeholder="Input Description" />
                  </div>
                  <div className="custom-file mt-2">
                    <Form.Control type="file" className="custom-file-input" />
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <hr className="mg-y-30" />
            </div>

            <div className="az-content-label mg-b-5">Application Boundary</div>
            <p className="mg-b-20 font-italic">Select One</p>

            <div className="row row-sm">
              <div className="col-lg-12">
                <span className="font-weight-bold font-italic">Asset Hierarchy Level</span>
                <div>
                  <div className='mt-1'>
                    <Form.Check
                      type={'radio'}
                      id={`asset1`}
                      value={'Facility | Train A'}
                      label={'Facility | Train A'}
                      className={'rdiobox'}
                      name="hierarchy_level"
                      onChange={(e) => this.handleChange(e, 'hierarchy_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`asset2`}
                      value={'System | Compressor Train A'}
                      label={'System | Compressor Train A'}
                      className={'rdiobox'}
                      name="hierarchy_level"
                      onChange={(e) => this.handleChange(e, 'hierarchy_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`asset3`}
                      value={'Sub System | Compressor'}
                      label={'Sub System | Compressor'}
                      className={'rdiobox'}
                      name="hierarchy_level"
                      onChange={(e) => this.handleChange(e, 'hierarchy_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`asset4`}
                      value={'Equipment | Turbo Compressor Package Train A'}
                      label={'Equipment | Turbo Compressor Package Train A'}
                      className={'rdiobox'}
                      name="hierarchy_level"
                      onChange={(e) => this.handleChange(e, 'hierarchy_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`asset5`}
                      value={'Sub Equipment | Train A LP Compressor'}
                      label={'Sub Equipment | Train A LP Compressor'}
                      className={'rdiobox'}
                      name="hierarchy_level"
                      onChange={(e) => this.handleChange(e, 'hierarchy_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`asset6`}
                      value={'Component | Flow Glass - From NDE Journal Bearing C-2720 TO Gas Turbinelube Oil Train A'}
                      label={'Component | Flow Glass - From NDE Journal Bearing C-2720 TO Gas Turbinelube Oil Train A'}
                      className={'rdiobox'}
                      name="hierarchy_level"
                      onChange={(e) => this.handleChange(e, 'hierarchy_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`asset7`}
                      value={'Part | Proximity Probe - NDE Bearing Vibration (X) LP Compressor Train A'}
                      label={'Part | Proximity Probe - NDE Bearing Vibration (X) LP Compressor Train A'}
                      className={'rdiobox'}
                      name="hierarchy_level"
                      onChange={(e) => this.handleChange(e, 'hierarchy_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`asset8`}
                      value={'Other | Logistic'}
                      label={'Other | Logistic'}
                      className={'rdiobox'}
                      name="hierarchy_level"
                      onChange={(e) => this.handleChange(e, 'hierarchy_level')}
                    />
                  </div>
                  <div className="mg-t-10 mg-b-10">
                      <Form.Control type="text" name='application_boundary_description' value={this.state.application_boundary_description} onChange={(e) => this.handleChange(e, 'application_boundary_description')} placeholder="Input Description" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <hr className="mg-y-30" />
            </div>

            <div className="az-content-label mg-b-5">Change Level</div>
            <p className="mg-b-20 font-italic">Select One</p>

            <div className="row row-sm">
              <div className="col-lg-12">
                <span className="font-weight-bold font-italic">Level</span>
                <div>
                  <div className='mt-1'>
                    <Form.Check
                      type={'radio'}
                      id={`level1`}
                      value={'Low | Applied Change to Existing Procewss or Introduce New Change - less than or at least 2 Steps/Processes'}
                      label={'Low | Applied Change to Existing Procewss or Introduce New Change - less than or at least 2 Steps/Processes'}
                      className={'rdiobox'}
                      name="change_level"
                      onChange={(e) => this.handleChange(e, 'change_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`level2`}
                      value={'Medium | Applied Change to Existing Procewss or Introduce New Change - less than or at least 5 Steps/Processes'}
                      label={'Medium | Applied Change to Existing Procewss or Introduce New Change - less than or at least 5 Steps/Processes'}
                      className={'rdiobox'}
                      name="change_level"
                      onChange={(e) => this.handleChange(e, 'change_level')}
                    />
                  </div>
                  <div className='mt-2'>
                    <Form.Check
                      type={'radio'}
                      id={`level3`}
                      value={'High/Radical | Applied Change to Existing Procewss or Introduce New Change - more than Steps/Process'}
                      label={'High/Radical | Applied Change to Existing Procewss or Introduce New Change - more than Steps/Process'}
                      className={'rdiobox'}
                      name="change_level"
                      onChange={(e) => this.handleChange(e, 'change_level')}
                    />
                  </div>
                  <div className="mg-t-10 mg-b-10">
                      <Form.Control type="text" name='change_level_description' value={this.state.change_level_description} onChange={(e) => this.handleChange(e, 'change_level_description')} placeholder="Input Description" />
                    </div>
                </div>
              </div>
            </div>

            <div>
              <hr className="mg-y-30" />
            </div>

            <div className="az-content-label mg-b-5">Risk & Mitigation Plan</div>
            <p className="mg-b-20 font-italic">Description is required</p>

            <form className="needs-validation was-validated">
              <div className="row row-sm">
                <div className="col-lg-12">
                  <span className="font-weight-bold font-italic">Description</span>
                  <Form.Control as="textarea" rows="3" name="description" placeholder="Input description" onChange={(e) => this.handleChange(e, 'description')} required />
                </div>
              </div>
            </form>
            <div className="custom-file mg-t-10 w-25">
              <Form.Control type="file" className="custom-file-input" />
              <label className="custom-file-label" htmlFor="customFile">Choose file</label>
            </div>

            <div>
              <hr className="mg-y-30" />
            </div>

            <div className="row row-sm">
              <div className="col-sm-6 col-md-12 mg-sm-t-0">
                <Button variant="az-secondary btn-block" onClick={this.handleSubmit}><i className="typcn typcn-location-arrow" style={{ fontSize: '18px' }}></i> Submit</Button>
              </div>
              <div className="row row-xs wd-xl-80p">
                <div className="col-sm-6 col-md-2 mg-t-10"><Button variant="success btn-block"><i className="typcn typcn-printer" style={{ fontSize: '18px' }}></i> Save</Button></div>
                <div className="col-sm-6 col-md-2 mg-t-10"><Button variant="warning btn-block"><i className="typcn typcn-pencil" style={{ fontSize: '18px' }}></i> Edit</Button></div>
                <div className="col-sm-6 col-md-2 mg-t-10"><Button variant="danger btn-block"><i className="typcn typcn-times" style={{ fontSize: '18px' }}></i> Cancel</Button></div>
                <div className="col-sm-6 col-md-2 mg-t-10"><Button variant="light btn-block"><i className="typcn typcn-download" style={{ fontSize: '18px' }}></i> Download</Button></div>
              </div>
            </div>{/* row */}

          </div>{/* az-content-body */}
        </div>{/* container */}
      </div >
    )
  }
}

export default Submission