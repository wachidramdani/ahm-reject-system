import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import Table2EditNoSearch from '../commons/Table/Table2EditNoSearch';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Pie } from 'react-chartjs-2';

import ModalPreviewDashboard from './modal/previewDashboard';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countSubmitter: '0',
      countClustering: '0',
      countReviewing: '0',
      countJudging: '0',
      countAward: '0',
      year: null,
      status: null,
      submitter: null,
      title: '',

      optYear: [
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' }
      ],

      optStatus: [
        { value: '1', label: 'Engineering' },
        { value: '2', label: 'Sub Surface' },
        { value: '3', label: 'Operations' },
        { value: '4', label: 'Safety' },
        { value: '5', label: 'Legal' }
      ],

      optPurpose: [
        { value: '1', label: 'Increase Production' },
        { value: '2', label: 'Reduce Cost' },
        { value: '3', label: 'Increase Efficiency' },
        { value: '4', label: 'Environmental Sustainability' },
        { value: '5', label: 'Reduced Risk' }
      ],

      optSubmitter: [
        { value: '1', label: 'Aji Siregar' },
        { value: '2', label: 'Khoirul Anam' },
        { value: '3', label: 'Cholis Firmansyah' },
        { value: '4', label: 'Syifa' },
        { value: '5', label: 'M. Nur Ragil' }
      ],

      currentPage: 1,
      sizePerPage: 2,
      datas: [],
      openModalPreview: false,
      rowClickButton: null,

      dataPie: {
        labels: ['Reviewing', 'Award', 'Judging', 'Clustering'],
        datasets: [{
          data: [],
          backgroundColor: ['#31dddd', '#0000ff', '#439d2a', '#ff0000'],
        }]
      }
    }
  }

  componentDidMount = () => {
    const cekExisting = localStorage.getItem('dataSubmission')
    let arrSubmission = []
    if (cekExisting !== null) {
      arrSubmission = JSON.parse(cekExisting)
    }
    const filterClustering = arrSubmission.filter(el => el.status === 'clustering')
    const filterReviewing = arrSubmission.filter(el => el.status === 'reviewing')
    const filterJudging = arrSubmission.filter(el => el.status === 'judging')
    const filterAward = arrSubmission.filter(el => el.status === 'award')
    const newDataPie = this.state.dataPie
    newDataPie.datasets[0].data = [
      filterReviewing.length,
      filterAward.length,
      filterJudging.length,
      filterClustering.length
    ]
    this.setState({
      datas: arrSubmission,
      countSubmitter: arrSubmission.length,
      countClustering: filterClustering.length,
      countReviewing: filterReviewing.length,
      countJudging: filterJudging.length,
      countAward: filterAward.length,
      dataPie: newDataPie
    })
  }

  handleChange = (e, name) => {
    if (e === null) {
      this.setState({ [name]: null })
    } else {
      this.setState({ [name]: e })
    }
  }

  handleSearch = () => {
    const { year, status, submitter, title } = this.state
    console.log(year, 'year')
    console.log(status, 'status')
    console.log(submitter, 'submitter')
    console.log(title, 'title')
  }

  handleCloseModalPreview = () => {
    this.setState({ openModalPreview: false, rowClickButton: null })
  }

  handlePageChange = (page, sizePerPage) => {
    this.setState({ currentPage: page, sizePerPage: sizePerPage })
  }

  openPreview = (e, row) => {
    e.stopPropagation()
    this.setState({ openModalPreview: true, rowClickButton: row })
  }

  render() {
    const pieOptions = {
      cutoutPercentage: 50,
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }

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
        dataField: 'status',
        text: 'Status',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        formatter: (cell, row, rowIndex) => {
          return <span>{cell.charAt(0).toUpperCase() + cell.slice(1)}</span>;
        },
        headerStyle: (colum, colIndex) => {
          return { width: '70px' };
        }
      },
      {
        dataField: 'fullName',
        text: 'Submitter',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '120px' };
        }
      },
      {
        dataField: 'abstract_title',
        text: 'Title',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '400px' };
        },
      },
      // {
      //   dataField: 'glance_innovation',
      //   text: 'A Glance of Innovation',
      //   headerAlign: 'center',
      //   align: 'left',
      //   editable: false,
      //   headerStyle: (colum, colIndex) => {
      //     return { width: '120px' };
      //   }
      // },
      {
        dataField: 'ranking',
        text: 'Award Winner',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        }
      },
      // {
      //   dataField: 'awarding',
      //   text: 'Awarding',
      //   headerAlign: 'center',
      //   align: 'left',
      //   editable: false,
      //   headerStyle: (colum, colIndex) => {
      //     return { width: '100px' };
      //   }
      // },
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
              <span>Dashboard</span>
            </div>
            <h2 className="az-content-title">Dashboard</h2>

            <div className="row row-sm">
              <div className="col-lg-12">
                <span>Total Submission: <b>{this.state.countSubmitter}</b></span>
              </div>
              <div className="col-lg-7">
                <div className="row row-sm">
                  <div className="col-lg-6">
                    <div className="custombox custombox-red">
                      <h2>{this.state.countClustering}</h2>
                      <p>Clustering</p>
                      <i className="typcn typcn-group"></i>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="custombox custombox-cyan">
                      <h2>{this.state.countReviewing}</h2>
                      <p>Reviewing</p>
                      <i className="typcn typcn-heart-full-outline"></i>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="custombox custombox-green">
                      <h2>{this.state.countJudging}</h2>
                      <p>Judging</p>
                      <i className="typcn typcn-star-half-outline"></i>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="custombox custombox-blue">
                      <h2>{this.state.countAward}</h2>
                      <p>Award</p>
                      <i className="typcn typcn-gift"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 mg-t-30">
                <div className="chart" style={{ height: '300px', width: '100%' }}>
                  <Pie data={this.state.dataPie} options={pieOptions} />
                </div>
              </div>
            </div>

            <div>
              <hr className="mg-y-30" />
            </div>

            <div className="row row-sm">
              <div className='col-lg-12'>
                <div className="az-content-label mg-b-5">Historical MIA</div>
                <p className="mg-b-20 font-italic">Look for paper/idea of MIA that have been submitted.</p>

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
                          <span className="font-weight-bold font-italic">Year</span>
                          <Select name="year" value={this.state.year} options={this.state.optYear} onChange={(e) => this.handleChange(e, 'year')} isClearable />
                        </div>

                        <div className="col-lg-2">
                          <span className="font-weight-bold font-italic">Function</span>
                          <Select name="status" value={this.state.status} options={this.state.optStatus} onChange={(e) => this.handleChange(e, 'status')} isClearable />
                        </div>

                        <div className="col-lg-2">
                          <span className="font-weight-bold font-italic">Submitter</span>
                          <Select name="submitter" value={this.state.submitter} options={this.state.optSubmitter} onChange={(e) => this.handleChange(e, 'submitter')} isClearable />
                        </div>

                        <div className="col-lg-2">
                          <span className="font-weight-bold font-italic">Purpose</span>
                          <Select name="purpose" value={this.state.purpose} options={this.state.optPurpose} onChange={(e) => this.handleChange(e, 'purpose')} isClearable />
                        </div>

                        <div className="col-lg-2">
                          <span className="font-weight-bold font-italic">Title</span>
                          <Form.Control type="text" name="title" value={this.state.title} placeholder="Title of Paper" onChange={(e) => this.setState({ title: e.target.value })} />
                        </div>

                        <div className="col-sm-6 col-md-2 mg-t-15">
                          <Button variant="success btn-block" onClick={this.handleSearch}><i className="typcn typcn-zoom" style={{ fontSize: '18px' }}></i> Apply</Button>
                        </div>

                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </div>
            </div>

            <div className="az-content-label mg-b-5 mg-t-20">
              <Table2EditNoSearch
                caption=''
                tableHead={columns}
                datas={this.state.datas}
                handlePageChange={this.handlePageChange}
              />
            </div>

          </div>{/* az-content-body */}
        </div>{/* container */}
        <ModalPreviewDashboard open={this.state.openModalPreview} onClose={this.handleCloseModalPreview} row={this.state.rowClickButton} />
      </div>
    )
  }
}

export default Dashboard
