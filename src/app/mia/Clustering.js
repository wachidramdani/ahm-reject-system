import React, { Component } from 'react';
import Select from 'react-select';
import Table2EditSelect from '../commons/Table/Table2EditSelect';
import { Button } from 'react-bootstrap';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Swal from 'sweetalert2';

import ModalPreviewSubmission from './modal/previewSubmission';
import ModalGate from './modal/gate1';
import ModalCluster from './modal/cluster';
import ModalFormSubmission from './modal/formSubmission';

export class Clustering extends Component {
  constructor(props) {
    super(props);

    this.state = {
      novelty: null,
      roi: null,
      hse: null,
      costSaving: null,
      applicationBoundary: null,
      changeLevel: null,
      cluster: null,
      optNovelty: [
        { value: '1', label: 'New' },
        { value: '2', label: 'Improve Existing' }
      ],

      optROI: [
        { value: '1', label: 'Very High | >20%' },
        { value: '2', label: 'High | 15-20%' },
        { value: '3', label: 'Medium | 10-15%' },
        { value: '4', label: 'Moderate | <10%' }
      ],

      optHSE: [
        { value: '1', label: 'Remove Hazard' },
        { value: '2', label: 'Minimize Hazard' },
        { value: '3', label: 'Contain Hazard' },
        { value: '4', label: 'Protect Hazard' }
      ],

      optCostSaving: [
        { value: '1', label: 'Extremely High Impact | > 1 MM USD' },
        { value: '2', label: 'Very High Impact | 500 - 1 MM USD' },
        { value: '3', label: 'Moderate High Impact | 100 - 500 K USD' },
        { value: '4', label: 'Moderate Impact | 50 K - 100 K USD' },
        { value: '5', label: 'Low Impact | < 50 K USD' }
      ],

      optApplicationBoundary: [
        { value: '1', label: 'Facility | Train A' },
        { value: '2', label: 'System | Compressor Train A' },
        { value: '3', label: 'Sub System | Compressor' },
        { value: '4', label: 'Equipment | Turbo Compressor Package Train A' },
        { value: '5', label: 'Sub Equipment | Train A LP Compressor' },
        { value: '6', label: 'Component | Flow Glass - From NDE Journal Bearing C-2720 TO Gas Turbinelube Oil Train A' },
        { value: '7', label: 'Part | Proximity Probe - NDE Bearing Vibration (X) LP Compressor Train A' },
        { value: '8', label: 'Other | Logistic' }
      ],

      optChangeLevel: [
        { value: '1', label: 'Low | Applied Change to Existing Procewss or Introduce New Change - less than or at least 2 Steps/Processes' },
        { value: '2', label: 'Medium | Applied Change to Existing Procewss or Introduce New Change - less than or at least 5 Steps/Processes' },
        { value: '3', label: 'High/Radical | Applied Change to Existing Procewss or Introduce New Change - more than Steps/Process' }
      ],

      optCluster: [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' }
      ],

      currentPage: 1,
      sizePerPage: 2,
      datas: [],
      defaultDatas: [],
      selectedRows: [],
      openModalPreview: false,
      openModalForm: false,
      openModalGate: false,
      openModalCluster: false,
      rowClickButton: null
    }
  }

  componentDidMount = () => {
    const cekExisting = localStorage.getItem('dataSubmission')
    let arrSubmission = []
    if (cekExisting !== null) {
      arrSubmission = JSON.parse(cekExisting)
    }
    const filterArr = arrSubmission.filter(el => el.status === 'clustering')
    this.setState({ datas: filterArr, defaultDatas: arrSubmission })
  }

  handlePageChange = (page, sizePerPage) => {
    this.setState({ currentPage: page, sizePerPage: sizePerPage })
  }

  handleSelectRow = (cat, row, isSelect) => {
    if (isSelect === true && cat === 'single') {
      this.setState({ selectedRows: [...this.state.selectedRows, row] });
    } else if (isSelect === true && cat === 'all') {
      this.setState({ selectedRows: row });
    } else if (cat === 'single') {
      var array = this.state.selectedRows;
      var index = array.findIndex(el => el.id === row.id);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ selectedRows: array });
      }
    } else {
      this.setState({ selectedRows: [] });
    }
  }

  handleChange = (e, name) => {
    if (e === null) {
      this.setState({ [name]: null })
    } else {
      this.setState({ [name]: e })
    }
  }

  handleSearch = () => {
    const { novelty, roi, hse, costSaving, applicationBoundary, changeLevel, cluster } = this.state
    console.log(novelty, 'novelty')
    console.log(roi, 'roi')
    console.log(hse, 'hse')
    console.log(costSaving, 'costSaving')
    console.log(applicationBoundary, 'applicationBoundary')
    console.log(changeLevel, 'changeLevel')
    console.log(cluster, 'cluster')
  }

  handleCloseModalPreview = () => {
    this.setState({ openModalPreview: false, rowClickButton: null })
  }

  openPreview = (e, row) => {
    e.stopPropagation()
    this.setState({ openModalPreview: true, rowClickButton: row })
  }

  handleCloseModalForm = () => {
    this.setState({ openModalForm: false, rowClickButton: null })
  }

  openForm = (e, row) => {
    e.stopPropagation()
    if(this.state.selectedRows.length > 0){
      this.setState({ openModalForm: true, rowClickButton: row })
    }else{
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'No data selected'
      })
    }
  }

  handleCloseModalGate = () => {
    this.setState({ openModalGate: false, rowClickButton: null })
  }

  openGate = (e, row) => {
    e.stopPropagation()
    if(this.state.selectedRows.length > 0){
      this.setState({ openModalGate: true, rowClickButton: row })
    }else{
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'No data selected'
      })
    }
  }

  handleCloseModalCluster = () => {
    this.setState({ openModalCluster: false, rowClickButton: null })
  }

  openCluster = (e, row) => {
    e.stopPropagation()
    if(this.state.selectedRows.length > 0){
      this.setState({ openModalCluster: true, rowClickButton: row })
    }else{
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'No data selected'
      })
    }
  }

  handleProses = () => {
    const { selectedRows, defaultDatas } = this.state
    selectedRows.forEach(el => {
      el.status = 'reviewing'
    })
    let newArr = [...defaultDatas]
    newArr.forEach(el => {
      el = selectedRows.find(item => item.id === el.id)
    })
    if (selectedRows.length > 0) {
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
          localStorage.setItem('dataSubmission', JSON.stringify(newArr))
          Swal.fire({
            title: 'Success',
            icon: 'warning',
            text: 'Process data success'
          }).then(() => {
            this.props.history.push('/mia/reviewing')
          })
        }
      });
    }
  }

  handleSubmitForm = (dataSubmit) => {
    let newDatas = []
    this.state.datas.forEach(currentItem => {
      let x = currentItem
      dataSubmit.forEach(el => {
        x = currentItem.id === el.id ? el : currentItem
      })
      newDatas.push(x)
    })
    let newAllDatas = []
    this.state.defaultDatas.forEach(currentItem => {
      let x = currentItem
      dataSubmit.forEach(el => {
        currentItem = currentItem.id === el.id ? el : currentItem
      })
      newAllDatas.push(x)
    })
    this.setState({ datas: newDatas }, () => {
      localStorage.setItem('dataSubmission', JSON.stringify(newAllDatas))
    })
  }

  render() {
    const columns = [
      {
        dataField: '#',
        text: '#',
        headerAlign: 'center',
        align: 'center',
        formatter: (cell, row, rowIndex) => {
          let rowNumber = (this.state.currentPage - 1) * this.state.sizePerPage + (rowIndex + 1);
          return <span>{rowNumber}</span>;
        },
        headerStyle: (colum, colIndex) => {
          return { width: '40px' };
        },
      },
      {
        dataField: 'fullName',
        text: 'Full Name',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '120px' };
        },
      },
      {
        dataField: 'abstract_title',
        text: 'Title',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '180px' };
        },
      },
      {
        dataField: 'clusterLabel',
        text: 'Cluster',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        }
      },
      {
        dataField: 'criteriaLabel',
        text: 'Criteria',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        }
      },
      {
        dataField: 'leaderLabel',
        text: 'Leader Reviewer',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '150px' };
        }
      },
      {
        dataField: 'memberLabel',
        text: 'Member Reviewer',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '150px' };
        }
      },
      {
        dataField: 'gate1',
        text: 'Gate 1',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '80px' };
        },
        formatter: (cell, cellContent, row) => {
          return (
            <div>
              { cell === 'Retained' ?
                <span style={{color: 'red'}}>{cell}</span>
                :
                <span style={{color: 'green'}}>{cell}</span>
              }
            </div>
          );
        },
      },
      {
        dataField: 'id',
        text: 'Action',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        isDummyField: true,
        headerStyle: (colum, colIndex) => {
          return { width: '60px' };
        },
        formatter: (cellContent, row) => {
          return (
            <div>
              <span className="btnInTable">
                <Button className="btn-success btn-brand btn-sm icon mg-r-2" onClick={(e) => this.openPreview(e, row)} ><i className="typcn typcn-eye"> </i></Button>
                {/* <Button className="btn-facebook btn-brand btn-sm icon" onClick={(e) => this.openForm(e, row)} ><i className="typcn typcn-pencil"> </i></Button> */}
              </span>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <div className="container d-flex p-md-0">
          <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <div className="az-content-breadcrumb">
              <span>MIA</span>
              <span>Clustering</span>
            </div>
            <h2 className="az-content-title">Clustering</h2>

            <Box sx={{ width: '100%' }}>
              <Accordion expanded={this.state.panel} onChange={this.handleChangePanel} className='accordionRoot'>
                <AccordionSummary
                  className='panelSummary'
                  expandIcon={<ExpandMore sx={{ color: '#fff' }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ backgroundColor: '#fafafa', borderBottom: '1px solid #ececec' }}
                >
                  <Typography style={{ fontSize: '1rem', fontWeight: 'bold' }}>Filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row row-sm mg-b-4 w-100">
                    <div className="col-lg-12">
                      <div className="row mg-b-4">
                        <div className="col-lg-2">
                          <span className="font-weight-bold font-italic">Novelty</span>
                          <Select name="novelty" value={this.state.novelty} options={this.state.optNovelty} onChange={(e) => this.handleChange(e, 'novelty')} isClearable />
                        </div>

                        <div className="col-lg-2">
                          <span className="font-weight-bold font-italic">ROI</span>
                          <Select name="roi" value={this.state.roi} options={this.state.optROI} onChange={(e) => this.handleChange(e, 'roi')} isClearable />
                        </div>

                        <div className="col-lg-2">
                          <span className="font-weight-bold font-italic">HSE</span>
                          <Select name="hse" value={this.state.hse} options={this.state.optHSE} onChange={(e) => this.handleChange(e, 'hse')} isClearable />
                        </div>

                        <div className="col-lg-6">
                          <span className="font-weight-bold font-italic">Cost Saving</span>
                          <Select name="costSaving" value={this.state.costSaving} options={this.state.optCostSaving} onChange={(e) => this.handleChange(e, 'costSaving')} isClearable />
                        </div>
                      </div>

                      <div className="row row-sm mg-t-8">
                        <div className="col-lg-4">
                          <span className="font-weight-bold font-italic">Application Boundary</span>
                          <Select name="applicationBoundary" value={this.state.applicationBoundary} options={this.state.optApplicationBoundary} onChange={(e) => this.handleChange(e, 'applicationBoundary')} isClearable />
                        </div>

                        <div className="col-lg-4">
                          <span className="font-weight-bold font-italic">Change Level</span>
                          <Select name="changeLevel" value={this.state.changeLevel} options={this.state.optChangeLevel} onChange={(e) => this.handleChange(e, 'changeLevel')} isClearable />
                        </div>

                        <div className="col-lg-2">
                          <span className="font-weight-bold font-italic">Cluster</span>
                          <Select name="cluster" value={this.state.cluster} options={this.state.optCluster} onChange={(e) => this.handleChange(e, 'cluster')} isClearable />
                        </div>

                        <div className="col-sm-6 col-md-2 mg-t-15">
                          <Button variant="success btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" onClick={this.handleSearch}><i className="typcn typcn-zoom" style={{ fontSize: '18px' }}></i> Apply</Button>
                        </div>

                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </Box>

            <div>
              <hr className="mg-y-30" />
            </div>

            <div className="az-content-label mg-b-5">
              <div className="az-dashboard-nav">
                <nav className="nav">
                  <a className="nav-link active" data-toggle="tab" href="#/">
                    <Button variant="success btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" onClick={this.handleProses}><i className="typcn typcn-arrow-right" style={{ fontSize: '18px' }}></i> Process</Button>
                  </a>
                </nav>

                <nav className="nav">
                  <a className="nav-link" href="#/">
                    <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}
                      onClick={this.openGate}><i className="typcn typcn-flag" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Gate</Button>
                  </a>
                  <a className="nav-link" href="#/">
                    <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}
                      onClick={this.openCluster}><i className="typcn typcn-tag" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Cluster</Button>
                  </a>
                  <a className="nav-link" href="#/">
                    <Button variant="primary btn-block" className="btn-primary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}
                      onClick={this.openForm}><i className="typcn typcn-group" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Assign Reviewer</Button>
                  </a>
                  <a className="nav-link" href="#/"><i className="fas fa-ellipsis-h"></i></a>
                </nav>
              </div>
              
              <Table2EditSelect
                caption=''
                tableHead={columns}
                datas={this.state.datas}
                handlePageChange={this.handlePageChange}
                handleSelectRow={this.handleSelectRow}
              />
            </div>

          </div>{/* az-content-body */}
        </div>{/* container */}
        <ModalPreviewSubmission open={this.state.openModalPreview} onClose={this.handleCloseModalPreview} row={this.state.rowClickButton} />
        <ModalFormSubmission open={this.state.openModalForm} onSubmit={this.handleSubmitForm} onClose={this.handleCloseModalForm} row={this.state.selectedRows} />
        <ModalGate open={this.state.openModalGate} onSubmit={this.handleSubmitForm} onClose={this.handleCloseModalGate} row={this.state.selectedRows} />
        <ModalCluster open={this.state.openModalCluster} onSubmit={this.handleSubmitForm} onClose={this.handleCloseModalCluster} row={this.state.selectedRows} />
      </div >
    )
  }
}

export default Clustering