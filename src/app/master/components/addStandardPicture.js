import React, { useState, useRef } from 'react';
import { Modal, Form, Button, Dropdown  } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import Table2EditSelect from '../../commons/Table/Table2EditSelect';
import Swal from "sweetalert2";
import "../../App.scss";

const useStyles = makeStyles(() => ({
  label: {
    width: 170,
    fontWeight: 700,
    fontStyle: 'italic'
  },
  flexForm: {
    display: 'flex',
    marginBottom: 10
  },
  w30: {
    width: '30%'
  },
  titleTabel: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 500
  }
}))

function AddStandardPicture({ open, onClose }) {
  const classes = useStyles()
  const [partNumber, setPartNumber] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [datas, setDatas] = useState([])
  const fileInputRef = useRef(null);

  const columns = [
    {
      dataField: '#',
      text: '#',
      headerAlign: 'center',
      align: 'center',
      formatter: (cell, row, rowIndex) => {
        let rowNumber = (currentPage - 1) * sizePerPage + (rowIndex + 1);
        return <span>{rowNumber}</span>;
      },
      headerStyle: (colum, colIndex) => {
        return { width: '50px' };
      },
    },
    {
      dataField: 'nameFile',
      text: 'Name File',
      headerAlign: 'center',
      align: 'left',
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: '270px' };
      }
    },
    // {
    //   dataField: 'id',
    //   text: 'Action',
    //   headerAlign: 'center',
    //   align: 'center',
    //   editable: false,
    //   isDummyField: true,
    //   headerStyle: (colum, colIndex) => {
    //     return { width: '30px' };
    //   },
    //   formatter: (cellContent, row) => {
    //     return (
    //       <div>
    //         <span className="btnInTable">
    //           <Button className="btn-success btn-brand btn-sm icon mg-r-2"><i className="typcn typcn-download"> </i></Button>
    //           <Button className="btn-danger btn-brand btn-sm icon" onClick={() => handleDeleteRow(row)}><i className="typcn typcn-trash"> </i></Button>
    //         </span>
    //       </div>
    //     );
    //   },
    // },
  ]


  const handleDeleteRow = (item) => {
    console.log(item, datas, 'item')
    setDatas(datas.filter((el) => el.id !== item.id))
  }

  const handleChange = (e, name) => {
    if (name === 'partNumber') { setPartNumber(e.target.value) }
    if (name === 'pict') {
      const temp = { id: datas.length + 1, nameFile: e.target.files[0].name }
      if (temp) {
        setDatas(datas.concat(temp))
        if (fileInputRef) fileInputRef.current.value = null;
      }
    }
  }

  const handlePageChange = (page, sizePerPage) => {
    setCurrentPage(page);
    setSizePerPage(sizePerPage);
  };

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      Swal.fire({
        title: "Warning",
        text: "Are you sure you want to delete this data?",
        icon: "warning",
        cancelButtonText: "Cancel!",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          let newDatas = datas.filter((item) => !selectedRows.includes(item));
          setDatas(newDatas);
          handleSelectRow('all', null, false);
        }
      });
    }
  };

  const handleSelectRow = (cat, row, isSelect) => {
    if (isSelect === true && cat === "single") {
      setSelectedRows([...selectedRows, row]);
    } else if (isSelect === true && cat === "all") {
      setSelectedRows(row);
    } else if (cat === "single") {
      var array = selectedRows;
      var index = array.findIndex((el) => el.id === row.id);
      if (index !== -1) {
        array.splice(index, 1);
        setSelectedRows(array);
      }
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <Modal show={open} onHide={onClose} dialogClassName="custom-modal" >
      <Modal.Header closeButton>
        <Modal.Title><div className='div-icon'><i className="typcn typcn-plus"></i></div> Standard Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-sm">
          <div className="col-lg-12 mg-t-15">
            <div className={classes.flexForm}>
              <span className={classes.label}>Part Number<span style={{ color: 'red' }}>*</span></span>
              <div className={classes.w30}>
                <Form.Control type="text" name='partNumber' value={partNumber} onChange={(e) => handleChange(e, 'partNumber')} />
              </div>
            </div>
            <div className={classes.flexForm}>
              <span className={classes.label}>Part Desc.</span>
              <div className={classes.w30}>
                <Form.Control type="text" name='partNumber' value={partNumber} onChange={(e) => handleChange(e, 'partNumber')} disabled />
              </div>
            </div>
            <div className={classes.flexForm}>
              <span className={classes.label}>Valid Date From<span style={{ color: 'red' }}>*</span></span>
              <div className={classes.w30}>
                <Form.Control type="date" name='partNumber' value={partNumber} onChange={(e) => handleChange(e, 'partNumber')} />
              </div>
            </div>
            <div className={classes.flexForm}>
              <span className={classes.label}>Valid Date To<span style={{ color: 'red' }}>*</span></span>
              <div className={classes.w30}>
                <Form.Control type="date" name='partNumber' value={partNumber} onChange={(e) => handleChange(e, 'partNumber')} />
              </div>
            </div>
            <div className={classes.flexForm}>
              <span className={classes.label}>Standard Picture<span style={{ color: 'red' }}>*</span></span>
              <div className={classes.w30}>
                <Form.Control type="file" name='pict' onChange={(e) => handleChange(e, 'pict')} ref={fileInputRef} />
              </div>
            </div>
          </div>
          <Dropdown.Divider style={{width: '100%'}}/>
          <div className="col-sm-12">
            {/* <div className="col-sm-6"> */}
              <div className={classes.titleTabel}>List File Attachment</div>
            {/* </div> */}

            <div className="az-content-label mg-b-5" >
              <div className="az-dashboard-nav" style={{borderBottom: 'none', marginBottom: 0}}>
                <nav className="nav">
                  <a className="nav-link" href="javascript:;">
                    <Button
                      variant="success btn-block"
                      className="btn-info btn-brand btn-sm icon mg-r-2"
                      style={{ lineHeight: "28px", display: "flex" }}
                      // onClick={openSymptom}
                      disabled={datas.length === 0}
                    >
                      <i
                        className="typcn typcn-download"
                        style={{ fontSize: "18px", lineHeight: "28px" }}
                      ></i>{" "}
                      Download
                    </Button>
                  </a>
                  <a className="nav-link" href="javascript:;">
                    <Button
                      variant="danger btn-block"
                      className="btn-danger btn-brand btn-sm icon mg-r-2"
                      style={{ lineHeight: "28px", display: "flex" }}
                      onClick={handleDelete}
                      disabled={datas.length === 0}
                    >
                      <i
                        className="typcn typcn-trash"
                        style={{ fontSize: "18px", lineHeight: "28px" }}
                      ></i>{" "}
                      Delete
                    </Button>
                  </a>
                  <a className="nav-link" href="#/">
                    <i className="fas fa-ellipsis-h"></i>
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="az-content-label mg-b-5" style={{ width: '50%' }}>
            {/* <Table2Edit
              caption=''
              tableHead={columns}
              datas={datas}
            /> */}
            <Table2EditSelect
              caption=""
              tableHead={columns}
              datas={datas}
              handlePageChange={handlePageChange}
              handleSelectRow={handleSelectRow}
            />
          </div>
          <div className="row row-sm w-100" style={{ padding: '0 0 0 20px', justifyContent: 'center' }}>
            <div className="col-lg-2">
              <Button variant="success btn-block" onClick={onClose}><i className="typcn typcn-tick" style={{ fontSize: '18px' }}></i> Save</Button>
            </div>
            <div className="col-lg-2">
              <Button variant="danger btn-block" onClick={onClose}><i className="typcn typcn-times" style={{ fontSize: '18px' }}></i> Back</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddStandardPicture;