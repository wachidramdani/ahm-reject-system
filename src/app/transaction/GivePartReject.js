import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Table2EditSearch from "../commons/Table/Table2EditSearch";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';

function GivePartReject() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [datas, setDatas] = useState(JSON.parse(localStorage.getItem('dataRc')).filter((el) => el.status === 'SUPPLIER' && el.no_surat_jalan !== ""));
  const [rc, setRc] = useState({
    nomor_surat_jalan: "",
    no_rc: "",
    operatorId: "",
    mrp_controller: "",
    supplier_code: "",
    supplier_desc: "",
    partNumber: "",
    partNumberDesc: "",
    jumlah: ""
  });

  const columns = [
    {
      dataField: "#",
      text: "#",
      headerAlign: "center",
      align: "center",
      formatter: (cell, row, rowIndex) => {
        let rowNumber = (currentPage - 1) * sizePerPage + (rowIndex + 1);
        return <span>{rowNumber}</span>;
      },
      headerStyle: (colum, colIndex) => {
        return { width: "40px" };
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
              <Button className="btn-success btn-brand btn-sm icon mg-r-2" onClick={(e) => handleSelectPart(e, row)}><i className="typcn typcn-input-checked"> </i> </Button>
            </span>
          </div>
        );
      },
    },
    {
      dataField: "no_surat_jalan",
      text: "No Surat Jalan",
      headerAlign: "center",
      align: "center",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "150px" };
      },
    },
  ]

  const handleSelectPart = (e, row) => {
    e.stopPropagation();
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));

    setRc({
      ...rc,
      nomor_surat_jalan: row.no_surat_jalan,
      no_rc: row.no_rc,
      operatorId: dataUser?.id,
      mrp_controller: row.mrp_controller,
      supplier_code: row.supplier_code,
      supplier_desc: row.supplier_desc,
      partNumber: row.part_number_induk,
      partNumberDesc: row.part_induk_desc,
      jumlah: row.jumlah
    });
    setShow(false)
  }

  // useEffect(() => {
  //   const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  //   setRc({
  //     ...rc,
  //     operatorId: dataUser?.id,
  //   });
  // }, []);

  const handleChange = (e, name) => {
    setRc({
      ...rc,
      [name]: e.target.value,
    });
  };

  const handlePageChange = (page, sizePerPage) => {
    setCurrentPage(page);
    setSizePerPage(sizePerPage);
  };

  const handleProcess = () => {
    if (rc && rc.no_rc !== "") {
      const newData = datas.map((el) => el["no_rc"] === rc.no_rc ? { ...el, status: "GIVE PART", operatorId: rc.operatorId } : el);
      localStorage.setItem("dataRc", JSON.stringify(newData))
      window.location.assign('/monitoring-rs')
    } else {
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'silahkan pilih No Rc yang akan di proses',
      });
    }
  }

  return (
    <div>
      <div className="container d-flex p-md-0">
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
          <div className="az-content-breadcrumb">
            <span>TRANSACTION</span>
            <span>GIVE PART REJECT</span>
          </div>
          <h2 className="az-content-title">Give Part Reject</h2>

          <div className="row row-sm mt-0">
            <div className="col-lg-6">
              <div className="az-content-label mg-b-5">Confirmation</div>
              <p className="mg-b-20 font-italic">
                Please check quantity before confirm
              </p>
              <form>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Nomor SJ
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="nomor_surat_jalan"
                      value={rc.nomor_surat_jalan}
                      onClick={() => setShow(true)}
                      placeholder="Scan/Input Nomor SJ"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    RC No.
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="no_rc"
                      value={rc.no_rc}
                      onChange={(e) => handleChange(e, "no_rc")}
                      placeholder="Auto Input RC No."
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Operator ID
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="operatorId"
                      value={rc.operatorId}
                      onChange={(e) => handleChange(e, "operatorId")}
                      placeholder="Auto Input Operator ID"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    MRP Controller
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="mrp_controller"
                      value={rc.mrp_controller}
                      onChange={(e) => handleChange(e, "mrp_controller")}
                      placeholder="Auto Input MRP Controller"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Supplier Code
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="supplier_code"
                      value={rc.supplier_code}
                      onChange={(e) => handleChange(e, "supplier_code")}
                      placeholder="Auto Input Supplier Code"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Supplier Desc
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="supplier_desc"
                      value={rc.supplier_desc}
                      onChange={(e) => handleChange(e, "supplier_desc")}
                      placeholder="Auto Input Supplier Desc"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Part Number
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="partNumber"
                      value={rc.partNumber}
                      onChange={(e) => handleChange(e, "partNumber")}
                      placeholder="Auto Input Part Number"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Part Desc.
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="partNumberDesc"
                      value={rc.partNumberDesc}
                      onChange={(e) => handleChange(e, "partNumberDesc")}
                      placeholder="Auto Input Part Desc"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Jumlah
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="jumlah"
                      value={rc.jumlah}
                      onChange={(e) => handleChange(e, "jumlah")}
                      placeholder="Auto Input Jumlah"
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            <hr className="mg-y-10" />
          </div>

          <div className="row row-sm">
            <div className="row row-xs wd-xl-80p">
              <div className="col-sm-4 col-md-4 mg-t-10">
                <Button variant="success btn-block" onClick={handleProcess}>
                  <i
                    className="typcn typcn-location-arrow"
                    style={{ fontSize: "18px" }}
                  ></i>{" "}
                  Process
                </Button>
              </div>
              <div className="col-sm-4 col-md-4 mg-t-10">
                <Button variant="danger btn-block">
                  <i
                    className="typcn typcn-arrow-sync"
                    style={{ fontSize: "18px" }}
                  ></i>{" "}
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>List Surat Jalan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table2EditSearch
            caption=""
            tableHead={columns}
            datas={datas}
            handlePageChange={handlePageChange}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default GivePartReject;
