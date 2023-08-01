import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

export class Cluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cluster: null,
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.row && prevProps.open !== this.props.open) {
      this.setState({
        cluster: null
      })
    }
  }

  handleChange = (e, name) => {
    const state = this.state
    if ((name === 'cluster') && e === null) {
      this.setState({ [name]: {} })
    } else if (name === 'cluster') {
      this.setState({ [name]: e })
    } else {
      state[e.target.name] = e.target.value
      this.setState(state)
    }
  }

  handleValidation = () => {
    const { cluster } = this.state
    let err = []
    if (cluster === null || cluster === undefined || Object.keys(cluster).length === 0) {
      err = err.concat('Cluster')
    }
    return err
  }

  handleSubmit = (e, param) => {
    const validate = this.handleValidation()

    if (validate.length === 0) {
      let dataSubmit = this.props.row
      dataSubmit.forEach(el => {
        el.cluster = this.state.cluster
        el.clusterLabel = this.state.cluster.label
        el.criteriaLabel = 'Criteria Review'
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
      <Modal show={this.props.open} onHide={this.props.onClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title><div className='div-icon modal-icon'><i className="typcn typcn-pencil"></i></div> Clustering</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="az-content-label mg-b-5">Cluster</div>
          <p className="mg-b-20 font-italic">Select One</p>

          <div className="row row-sm w-100">
            <div className="col-lg-12">
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
          </div>

          <div>
            <hr className="mg-y-30" />
          </div>

          <div className="row row-sm">
            <div className="col-sm-6">
              <Button variant="success btn-block" onClick={(e) => this.handleSubmit(e)}><i className="typcn typcn-tick" style={{ fontSize: '18px' }}></i> Submit</Button>
            </div>
            <div className="col-sm-6">
              <Button variant="danger btn-block" onClick={this.props.onClose}><i className="typcn typcn-times" style={{ fontSize: '18px' }}></i> Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Cluster