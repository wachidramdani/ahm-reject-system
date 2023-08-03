import React, { useState } from "react";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import Table2EditSearch from "../commons/Table/Table2EditSearch";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';

function PrintRejectCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [datas, setDatas] = useState(JSON.parse(localStorage.getItem('dataRc')).filter((el) => el.status === 'CREATED' || el.status === 'SUPPLIER'));
  const [show, setShow] = useState(false);
  const [disabledSup, setDisabledSup] = useState(true);
  const [openModalSymptom, setOpenModalSymptom] = useState(false);
  const [optSupplier, setOptSuplier] = useState([])
  const [rc, setRc] = useState({
    tgl_created: "",
    tgl_to: "",
    process: "",
    supplier_code: "",
    supplier_desc: "",
    print_reprint: "",
    no_rc: "",
    alasan_reprint: ""
  });

  const [printReprint, setPrintReprint] = useState(null);
  const [process, setProcess] = useState(null);
  const [suppCode, setSuppCode] = useState(null);
  const [disabledAlasan, setDisabledAlasan] = useState(true)
  const [disabledPrint, setDisabledPrint] = useState(true)
  const [disabledRc, setDisabledRc] = useState(true)


  const [processOption, setProcessOption] = useState([
    { value: "A", label: "Receiving" },
    {
      value: "B",
      label: "Transfer & Confirm Putaway",
    },
    { value: "C", label: "Assign Pro to Pallet" },
    { value: "D", label: "Finish. Prod. Preparation" },
    { value: "E", label: "Out Preparation" },
    { value: "F", label: "Confirm Production Order" },
    { value: "G", label: "Confirm Replenishment" },
    { value: "H", label: "Custom Picking" },
    { value: "I", label: "Validasi Picking" },
  ]);

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
      dataField: "no_rc",
      text: "No RC",
      headerAlign: "center",
      align: "center",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "120px" };
      },
    },
  ]

  const handleSelectPart = (e, row) => {
    e.stopPropagation();
    setRc({
      ...rc,
      no_rc: row.no_rc,
    });
    setShow(false)
  }

  const handleChange = (e, name) => {
    setRc({
      ...rc,
      [name]: e.target.value,
    });
  };

  const handleChangeSelect = (e, name) => {
    console.log(e, 'ee')
    if (name === "process") {
      setProcess(e);
      if (e && e.label && e.label !== "") {
        setDisabledSup(false)
        setRc({
          ...rc,
          process: e ? e.label : "",
        });
        const xdata = JSON.parse(localStorage.getItem("dataRc"))
        const tempVendor = xdata.filter((el) => (el.status === "CREATED" || el.status === "SUPPLIER") && el.process === e?.label)
        let newArr = []
        tempVendor && tempVendor.forEach(el => {
          newArr = newArr.concat({
            id: el.id,
            value: el.supplier_code,
            label: el.supplier_code,
            name: el.supplier_desc,
          })
          setOptSuplier(newArr)
        });
      } else {
        setDisabledSup(true)
      }
    } else if (name === "suppCode") {
      setSuppCode(e);
      if (e && e.label) {
        setRc({
          ...rc,
          supplier_code: e ? e.label : "",
          supplier_desc: e ? e.name : ""
        });
        setDisabledPrint(false)
      } else {
        setRc({
          ...rc,
          supplier_code: "",
          supplier_desc: ""
        });
        setDisabledPrint(true)
      }
    } else if (name === "printReprint") {
      setPrintReprint(e);
      if (e && e.label) {
        setRc({
          ...rc,
          printReprint: e ? e.label : "",
        });
        if (e.label === "Reprint") {
          setDisabledAlasan(false)
          console.log(datas, 'data')
          setDatas(datas.filter((el) => el.status === "SUPPLIER" && el.alasan_reprint === ""))
        } else {
          setDisabledAlasan(true)
          setDatas(datas.filter((el) => el.status === "CREATED"))
        }
        setDisabledRc(false)
      } else {
        setDisabledRc(true)
        setDisabledAlasan(true)
      }

    }
  };

  //---modal symptom
  const handleCloseModalSymptom = () => {
    setOpenModalSymptom(false);
  };

  const openSymptom = (e, row) => {
    e.stopPropagation();
    setOpenModalSymptom(true);
  };

  const handlePageChange = (page, sizePerPage) => {
    setCurrentPage(page);
    setSizePerPage(sizePerPage);
  };

  const handleCreate = () => {
    const tempData = JSON.parse(localStorage.getItem("dataRc"))
    if (rc?.printReprint === 'Reprint') {
      const newData = tempData.map((el) => el["no_rc"] === rc.no_rc ? { ...el, alasan_reprint: rc.alasan_reprint } : el);
      localStorage.setItem("dataRc", JSON.stringify(newData))
      window.location.assign('/monitoring-rs')
    } else if (rc?.printReprint === 'Print') {
      const newData = tempData.map((el) => el["no_rc"] === rc.no_rc ? { ...el, status: 'SUPPLIER' } : el);
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
            <span>PRINT REJECT CARD</span>
          </div>
          <h2 className="az-content-title">Print Reject Card</h2>

          <div className="row row-sm mt-0">
            <div className="col-lg-7">
              <div className="az-content-label mg-b-5">Find and print RC</div>
              <p className="mg-b-20 font-italic">Size paper: A7</p>
              <form>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    Tanggal Created
                  </label>
                  <div class="col-sm-4">
                    <Form.Control
                      type="date"
                      name="tgl_created"
                      value={rc.tgl_created}
                      onChange={(e) => handleChange(e, "tgl_created")} />
                  </div>
                  <label for="inputPassword" class="col-sm-1 col-form-label">
                    To
                  </label>
                  <div class="col-sm-4">
                    <Form.Control
                      type="date"
                      name="tgl_to"
                      value={rc.tgl_to}
                      onChange={(e) => handleChange(e, "tgl_to")}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-3 col-form-label">
                    Process
                  </label>
                  <div class="col-sm-9">
                    <Select
                      className="w-100"
                      name="process"
                      value={process}
                      onChange={(e) => handleChangeSelect(e, "process")}
                      isClearable={true}
                      options={processOption}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    Seksi/Supplier Code
                  </label>
                  <div class="col-sm-9">
                    <Select
                      className="w-100"
                      name="suppCode"
                      value={suppCode}
                      onChange={(e) => handleChangeSelect(e, "suppCode")}
                      isClearable={true}
                      options={optSupplier}
                      isDisabled={disabledSup}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    Seksi/Supplier Desc.
                  </label>
                  <div class="col-sm-9">
                    <Form.Control
                      type="text"
                      name="supplier_desc"
                      value={rc.supplier_desc}
                      onChange={(e) => handleChange(e, "supplier_desc")}
                      placeholder="Auto Input Seksi/Supplier Desc"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    Print / Reprint
                  </label>
                  <div class="col-sm-9">
                    <Select
                      className="w-100"
                      name="printReprint"
                      value={printReprint}
                      onChange={(e) => handleChangeSelect(e, "printReprint")}
                      isClearable={true}
                      options={[
                        { value: "Print", label: "Print" },
                        { value: "Reprint", label: "Reprint" },
                      ]}
                      isDisabled={disabledPrint}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    RC No.
                  </label>
                  <div class="col-sm-9">
                    <Form.Control
                      type="text"
                      name="no_rc"
                      value={rc.no_rc}
                      onClick={() => setShow(true)}
                      placeholder="Input RC No."
                      disabled={disabledRc}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    Alasan Reprint
                  </label>
                  <div class="col-sm-9">
                    <Form.Control
                      type="text"
                      name="alasan_reprint"
                      value={rc.alasan_reprint}
                      onChange={(e) => handleChange(e, "alasan_reprint")}
                      placeholder="Input alasan reprint"
                      disabled={disabledAlasan}
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
                <Button variant="success btn-block" onClick={handleCreate}>
                  <i
                    className="typcn typcn-location-arrow"
                    style={{ fontSize: "18px" }}
                  ></i>{" "}
                  Create
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
          <Modal.Title>List RC</Modal.Title>
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

export default PrintRejectCard;
