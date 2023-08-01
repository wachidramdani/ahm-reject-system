import React, { Component } from 'react';
import Table2Edit from '../commons/Table/Table2Edit';
import { Button } from 'react-bootstrap';

import ModalPreviewAward from './modal/previewAward';
import ModalAward from './modal/award';

export class Award extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      sizePerPage: 2,
      datas: [],
      openModalPreview: false,
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
    arrSubmission = arrSubmission.filter(el => el.status === 'award')
    this.setState({ datas: arrSubmission })
  }

  handlePageChange = (page, sizePerPage) => {
    this.setState({ currentPage: page, sizePerPage: sizePerPage })
  }

  handleCloseModalPreview = () => {
    this.setState({ openModalPreview: false, rowClickButton: null })
  }

  openPreview = (e, row) => {
    e.stopPropagation()
    this.setState({ openModalPreview: true, rowClickButton: row })
  }

  handleCloseModalAward = () => {
    this.setState({ openModalAward: false })
  }

  openAward = (e, row) => {
    e.stopPropagation()
    this.setState({ openModalAward: true })
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
        text: 'Submitter',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        }
      },
      {
        dataField: 'abstract_title',
        text: 'Title',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '390px' };
        },
      },
      {
        dataField: 'glance_innovation',
        text: 'A Glance of Innovation',
        headerAlign: 'center',
        align: 'left',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '120px' };
        }
      },
      {
        dataField: 'ranking',
        text: 'Award Winner',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '80px' };
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
                {/* <Button className="btn-facebook btn-brand btn-sm icon" ><i className="typcn typcn-pencil"> </i></Button> */}
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
              <span>Award</span>
            </div>
            <h2 className="az-content-title">Award</h2>

            <div className='mg-b-10 w-25'>
              <Button variant="success btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" onClick={this.openAward}><i className="typcn typcn-calendar" style={{ fontSize: '18px' }}></i> Event Checklist</Button>
            </div>

            <div className="az-content-label mg-b-5">
              <Table2Edit
                caption=''
                tableHead={columns}
                datas={this.state.datas}
                handlePageChange={this.handlePageChange}
              />
            </div>

          </div>{/* az-content-body */}
        </div>{/* container */}
        <ModalPreviewAward open={this.state.openModalPreview} onClose={this.handleCloseModalPreview} row={this.state.rowClickButton} />
        <ModalAward open={this.state.openModalAward} onClose={this.handleCloseModalAward} />
      </div >
    )
  }
}

export default Award