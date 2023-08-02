import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import Table2EditSearch from "../commons/Table/Table2EditSearch";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';

function PrintSuratJalan() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [datas, setDatas] = useState(JSON.parse(localStorage.getItem('dataRc')).filter((el) => el.status === 'SUPPLIER' && el.plat_number_reject_give === ""));
  const [transaksi, setTransaksi] = useState([]);
  const [disabledRc, setDisabledRc] = useState(true)
  const [rc, setRc] = useState({
    transaksi: "",
    no_rc: "",
    partNumber: "",
    partNumberDesc: "",
    vendor: "",
    delivery_note: "",
    est_date_arrival: "",
    est_time_arrival: "",
    platNumber: ""
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

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    setRc({
      ...rc,
      operatorId: dataUser?.id,
    });
  }, []);

  const handleChange = (e, name) => {
    setRc({
      ...rc,
      [name]: e.target.value,
    });
  };

  const handleChangeSelect = (e, name) => {
    const tempData = JSON.parse(localStorage.getItem('dataRc')).filter((el) => el.status === 'SUPPLIER' && el.plat_number_reject_give === "")
    if (name === "transaksi") {
      setTransaksi(e);
      if (e && e.label) {
        setDisabledRc(false)
        setRc({
          ...rc,
          transaksi: e ? e.label : "",
        });
        if (e.value === 'A') {
          setDatas(tempData.filter((el) => el.action !== "Scrap"))
        } else if (e.value === 'B') {
          setDatas(tempData.filter((el) => el.quality_quantity === "Quantity"))
        }
      } else {
        setDisabledRc(true)
      }
    }
  };

  const handlePageChange = (page, sizePerPage) => {
    setCurrentPage(page);
    setSizePerPage(sizePerPage);
  };

  const handleSelectPart = (e, row) => {
    e.stopPropagation();
    console.log(row, 'row')
    setRc({
      ...rc,
      no_rc: row.no_rc,
      partNumber: row.part_number_induk,
      partNumberDesc: row.part_induk_desc,
      vendor: row.supplier_desc,
      delivery_note: row.delivery_note_give_part,
      est_date_arrival: row.estimated_date_give_part,
      est_time_arrival: row.estimated_time_give_part,
      platNumber: row.plat_number_reject_give
    });
    setShow(false)
  }

  const handleCreate = () => {
    const tempData = JSON.parse(localStorage.getItem("dataRc"))
    if (rc.no_rc && rc.no_rc !== "") {
      const newData = tempData.map((el) => el["no_rc"] === rc.no_rc ? {
        ...el,
        delivery_note_give_part: rc.delivery_note,
        estimated_date_give_part: rc.est_date_arrival,
        estimated_time_give_part: rc.est_time_arrival,
        plat_number_reject_give: rc.platNumber,
        no_surat_jalan: new Date()
      } : el);
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
            <span>PRINT SURAT JALAN</span>
          </div>
          <h2 className="az-content-title">Print Surat Jalan</h2>

          <div className="row row-sm mt-0">
            <div className="col-lg-6">
              <div className="az-content-label mg-b-5">
                Find and print surat jalan
              </div>
              <p className="mg-b-20 font-italic">Size paper: A5 - Potrait</p>
              <form>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Transaksi
                  </label>
                  <div class="col-sm-8">
                    <Select
                      className="w-100"
                      name="transaksi"
                      value={transaksi}
                      onChange={(e) => handleChangeSelect(e, "transaksi")}
                      isClearable={true}
                      options={[
                        { value: "A", label: "Take Part Reject-Give Part Replacement" },
                        { value: "B", label: "Send Part Repair" },
                      ]}
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
                      onClick={() => setShow(true)}
                      placeholder="Input RC No."
                      disabled={disabledRc}
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
                    Vendor Desc
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="vendor"
                      value={rc.vendor}
                      onChange={(e) => handleChange(e, "vendor")}
                      placeholder="Auto Vendor Desc"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Delivery Note
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="delivery_note"
                      value={rc.delivery_note}
                      onChange={(e) => handleChange(e, "delivery_note")}
                      placeholder="Input Delivery Note"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Est. Date Arrival
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="date"
                      name="est_date_arrival"
                      value={rc.est_date_arrival}
                      onChange={(e) => handleChange(e, "est_date_arrival")}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Est. Time Arrival
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="est_time_arrival"
                      value={rc.est_time_arrival}
                      onChange={(e) => handleChange(e, "est_time_arrival")}
                      placeholder="Input Est. Time Arrival"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Plat Number
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="platNumber"
                      value={rc.platNumber}
                      onChange={(e) => handleChange(e, "platNumber")}
                      placeholder="Input Plat Number"
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

export default PrintSuratJalan;
