import React, { Component } from 'react';
import Table2EditSelect from '../commons/Table/Table2EditSelect';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import ModalPreviewJudging from './modal/previewJudging';
import ModalFormJudging from './modal/formJudging';
import ModalGate from './modal/gate3';

export class Judging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      sizePerPage: 2,
      datas: [],
      defaultDatas: [],
      selectedRows: [],
      openModalPreview: false,
      openModalForm: false,
      openModalGate: false,
      rowClickButton: null
    }
  }

  componentDidMount = () => {
    const cekExisting = localStorage.getItem('dataSubmission')
    let arrSubmission = []
    if (cekExisting !== null) {
      arrSubmission = JSON.parse(cekExisting)
    }
    const filterArr = arrSubmission.filter(el => el.status === 'judging')
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

  handleProses = () => {
    const { selectedRows, defaultDatas } = this.state
    selectedRows.forEach(el => {
      el.status = 'award'
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
            this.props.history.push('/mia/award')
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

  setRangking = () => {
    const newDatas = this.state.datas
    newDatas.forEach(el => {
      el.scoreJudging = el.scoreJudging ? +el.scoreJudging : 0
    })
    newDatas.sort((a, b) => b.scoreJudging - a.scoreJudging)
    newDatas.forEach((el,index) => {
      el.ranking = index+1
    })
    let newAllDatas = []
    this.state.defaultDatas.forEach(currentItem => {
      let x = currentItem
      newDatas.forEach(el => {
        currentItem = currentItem.id === el.id ? el : currentItem
      })
      newAllDatas.push(x)
    })
    newAllDatas.sort((a, b) => b.scoreJudging - a.scoreJudging)
    this.setState({datas: newDatas}, () => {
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
        dataField: 'criteriaJudgingLabel',
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
              <span>Criteria Judging</span>
            </div>
          );
        },
      },
      {
        dataField: 'scoreReviewing',
        text: 'Review Score',
        headerAlign: 'center',
        align: 'right',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        }
      },
      {
        dataField: 'scoreJudging',
        text: 'Judge Score',
        headerAlign: 'center',
        align: 'right',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        }
      },
      {
        dataField: 'ranking',
        text: 'Ranking',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '70px' };
        }
      },
      {
        dataField: 'gate3',
        text: 'Gate 3',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '70px' };
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
          return { width: '60px' };
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
              <span>Judging</span>
            </div>
            <h2 className="az-content-title">Judging</h2>

            <div className="az-content-label mg-b-5 mt-4">
              <div className="az-dashboard-nav">
                <nav className="nav">
                  <a className="nav-link active" data-toggle="tab" href="#/">
                    <Button variant="success btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" onClick={this.handleProses}><i className="typcn typcn-arrow-right" style={{ fontSize: '18px' }}></i> Process</Button>
                  </a>
                </nav>

                <nav className="nav">
                  <a className="nav-link" href="#/">
                    <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}
                      onClick={this.openForm}><i className="typcn typcn-tag" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Scoring</Button>
                  </a>
                  <a className="nav-link" href="#/">
                    <Button variant="primary btn-block" className="btn-primary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}
                      onClick={this.setRangking}><i className="typcn typcn-chart-line" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Assign Ranking</Button>
                  </a>
                  <a className="nav-link" href="#/">
                    <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}
                      onClick={this.openGate}><i className="typcn typcn-flag" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Gate</Button>
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
        <ModalPreviewJudging open={this.state.openModalPreview} onClose={this.handleCloseModalPreview} row={this.state.rowClickButton} />
        <ModalFormJudging open={this.state.openModalForm} onSubmit={this.handleSubmitForm} onClose={this.handleCloseModalForm} row={this.state.selectedRows} />
        <ModalGate open={this.state.openModalGate} onSubmit={this.handleSubmitForm} onClose={this.handleCloseModalGate} row={this.state.selectedRows} />
      </div >
    )
  }
}

export default Judging