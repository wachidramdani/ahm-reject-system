import React, { Component } from 'react';
import Select from 'react-select';
import Table2EditSelect from '../commons/Table/Table2EditSelect';
import { Button } from 'react-bootstrap';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Swal from 'sweetalert2';

import ModalPreviewReviewing from './modal/previewReviewing';
import ModalGate from './modal/gate2';
import ModalScore from './modal/scoreReviewing';
import ModalFormReviewing from './modal/formReviewing';

export class Reviewing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: null,
      criteria: null,
      cluster: null,
      optTeam: [
        { value: '1', label: 'Team 1' },
        { value: '2', label: 'Team 2' }
      ],

      optCriteria: [
        { value: '1', label: 'A' },
        { value: '2', label: 'B' },
        { value: '3', label: 'C' }
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
      openModalScore: false,
      rowClickButton: null
    }
  }

  componentDidMount = () => {
    const cekExisting = localStorage.getItem('dataSubmission')
    let arrSubmission = []
    if (cekExisting !== null) {
      arrSubmission = JSON.parse(cekExisting)
    }
    const filterArr = arrSubmission.filter(el => el.status === 'reviewing')
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
    const { team, criteria, cluster } = this.state
    console.log(team, 'team')
    console.log(criteria, 'criteria')
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
    if (this.state.selectedRows.length > 0) {
      this.setState({ openModalForm: true, rowClickButton: row })
    } else {
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
    if (this.state.selectedRows.length > 0) {
      this.setState({ openModalGate: true, rowClickButton: row })
    } else {
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'No data selected'
      })
    }
  }

  handleCloseModalScore = () => {
    this.setState({ openModalScore: false, rowClickButton: null })
  }

  openScore = (e, row) => {
    e.stopPropagation()
    if (this.state.selectedRows.length > 0) {
      this.setState({ openModalScore: true, rowClickButton: row })
    } else {
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
      el.status = 'judging'
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
            this.props.history.push('/mia/judging')
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
          return { width: '110px' };
        },
      },
      {
        dataField: 'abstract_title',
        text: 'Title',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '140px' };
        },
      },
      {
        dataField: 'clusterLabel',
        text: 'Cluster',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '80px' };
        }
      },
      {
        dataField: 'criteriaLabel',
        text: 'Criteria',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        },
        formatter: (cell, cellContent, row) => {
          return (
            <div>
              <span>Criteria Review</span>
            </div>
          );
        },
      },
      {
        dataField: 'scoreReviewing',
        text: 'Score',
        headerAlign: 'center',
        align: 'right',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '70px' };
        }
      },
      {
        dataField: 'leaderJuryLabel',
        text: 'Leader Judging',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '105px' };
        }
      },
      {
        dataField: 'memberJuryLabel',
        text: 'Member Judging',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '105px' };
        }
      },
      {
        dataField: 'gate2',
        text: 'Gate 2',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '80px' };
        },
        formatter: (cell, cellContent, row) => {
          return (
            <div>
              {cell === 'Retained' ?
                <span style={{ color: 'red' }}>{cell}</span>
                :
                <span style={{ color: 'green' }}>{cell}</span>
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
          return { width: '50px' };
        },
        formatter: (cellContent, row) => {
          return (
            <div>
              <span className="btnInTable">
                <Button className="btn-success btn-brand btn-sm icon mg-r-2" onClick={(e) => this.openPreview(e, row)}><i className="typcn typcn-eye"> </i></Button>
                {/* <Button className="btn-facebook btn-brand btn-sm icon" onClick={(e) => this.openForm(e, row)}><i className="typcn typcn-pencil"> </i></Button> */}
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
              <span>Reviewing</span>
            </div>
            <h2 className="az-content-title">Reviewing</h2>

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
                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Team</span>
                      <Select name="team" value={this.state.team} options={this.state.optTeam} onChange={(e) => this.handleChange(e, 'team')} isClearable />
                    </div>
                     
                    {/*<div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Criteria</span>
                      <Select name="criteria" value={this.state.criteria} options={this.state.optCriteria} onChange={(e) => this.handleChange(e, 'criteria')} isClearable />
                    </div> */}

                    <div className="col-lg-2">
                      <span className="font-weight-bold font-italic">Cluster</span>
                      <Select name="cluster" value={this.state.cluster} options={this.state.optCluster} onChange={(e) => this.handleChange(e, 'cluster')} isClearable />
                    </div>

                    <div className="col-sm-6 col-md-2 mg-t-15">
                      <Button variant="success btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" onClick={this.handleSearch}><i className="typcn typcn-zoom" style={{ fontSize: '18px' }}></i> Apply</Button>
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
                      onClick={this.openScore}><i className="typcn typcn-tag" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Scoring</Button>
                  </a>
                  <a className="nav-link" href="#/">
                    <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}
                      onClick={this.openGate}><i className="typcn typcn-flag" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Gate</Button>
                  </a>
                  <a className="nav-link" href="#/">
                    <Button variant="primary btn-block" className="btn-primary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}
                      onClick={this.openForm}><i className="typcn typcn-group" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Assign Judging</Button>
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
        <ModalPreviewReviewing open={this.state.openModalPreview} onClose={this.handleCloseModalPreview} row={this.state.rowClickButton} />
        <ModalFormReviewing open={this.state.openModalForm} onSubmit={this.handleSubmitForm} onClose={this.handleCloseModalForm} row={this.state.selectedRows} />
        <ModalGate open={this.state.openModalGate} onSubmit={this.handleSubmitForm} onClose={this.handleCloseModalGate} row={this.state.selectedRows} />
        <ModalScore open={this.state.openModalScore} onSubmit={this.handleSubmitForm} onClose={this.handleCloseModalScore} row={this.state.selectedRows} />
      </div >
    )
  }
}

export default Reviewing