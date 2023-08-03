import React, { useState, useEffect } from "react";
import BarCode from 'react-barcode';
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import Table2EditSelect from "../commons/Table/Table2EditSelect";
import Table2EditSearch from "../commons/Table/Table2EditSearch";
import ModalSymptom from "./modal/Symptom";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

function RejectCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [datasPart, setDatasPart] = useState([]);
  const [datas, setDatas] = useState([]);
  const [defaultDatas, setDefaultDatas] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openModalSymptom, setOpenModalSymptom] = useState(false);
  const dataSymptoms = localStorage.getItem("dataSymptoms");
  const [listSymptomOption, setListSymptomOption] = useState([]);
  const [listDefaultSymptomOption, setListDefaultSymptomOption] = useState([]);
  const localRc = JSON.parse(localStorage.getItem('dataRc'));
  const [rc, setRc] = useState({
    id: "",
    no_rc: "",
    process: "",
    operator_id_create: "",
    operator_id_cancel: "",
    sloc_asal: "",
    bin: "",
    beban: "",
    part_number_induk: "",
    part_induk_desc: "",
    part_number_anak: "",
    part_anak_desc: "",
    mrp_controller: "",
    reject_symptom: "",
    supplier_code: "",
    supplier_desc: "",
    jumlah: "",
    quality_quantity: "",
    symptoms: [],
    sloc_tujuan: "",
    action: "",
    vendor_repair: "",
    status: "",
    alasan_reprint: "",
    delivery_note_take_part: "",
    plat_number_reject_take: "",
    estimated_date_take_project: "",
    estimated_time_take_project: "",
    actual_date_give_project: "",
    actual_time_give_project: "",
    operator_id_give_part: "",
    delivery_note_give_part: "",
    plat_number_reject_give: "",
    estimated_date_give_part: "",
    estimated_time_give_part: "",
    actual_date_receive_part: "",
    actual_time_receive_part: "",
    operator_id_receiver_part: ""    
  });

  const [process, setProcess] = useState(null);
  const [processOption, setProcessOption] = useState([]);

  const [slocAsal, setSlocAsal] = useState(null);
  const [slocAsalOption, setAlocAsalOption] = useState([
    { value: "M401", label: "M401" },
    {
      value: "M402",
      label: "M402",
    },
    { value: "M404", label: "M404" },
    { value: "M405", label: "M405" },
    { value: "M406", label: "M406" },
    { value: "M501", label: "M501" },
    { value: "M502", label: "M502" },
    { value: "M503", label: "M503" },
  ]);

  const [mrp, setMrp] = useState(null);
  const [mrpOption, setMrpOption] = useState([]);

  const [rejectSymptom, setRejectSymptom] = useState(null);
  const [rejectSymptomOption, setRejectSymptomOption] = useState([
    { value: "Cairan", label: "Cairan" },
    { value: "Electrical", label: "Electrical" },
    { value: "Logam", label: "Logam" },
    { value: "Plastik", label: "Plastik" },
  ]);

  const [beban, setBeban] = useState(null);

  const [supplierCode, setSupplierCode] = useState(null);
  const [supplierCodeOption, setSupplierCodeOption] = useState([]);
  const [supplierTempOption, setSupplierTempOption] = useState([]);

  const [quantityQuality, setQuantityQuality] = useState(null);
  const [quantityQualityOption, setQuantityQualityOption] = useState([]);

  const [action, setAction] = useState(null);
  const [actionOption, setActionOption] = useState([]);

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    setRc({
      ...rc,
      operator_id_create: dataUser?.id,
    });
    let opt = [];
    if (dataUser.dept === "Manage Incoming Good") {
      opt = [{ value: "A", label: "Receiving" }];
    } else if (dataUser.dept === "Manage Putaway") {
      opt = [{ value: "B", label: "Transfer & Confirm Putaway" }];
    } else if (dataUser.dept === "Local Process") {
      opt = [
        { value: "C", label: "Assign Pro to Pallet" },
        { value: "D", label: "Finish. Prod. Preparation" },
        { value: "E", label: "Out Preparation" },
        { value: "F", label: "Confirm Production Order" },
      ];
    } else if (dataUser.dept === "Manage Replenishment") {
      opt = [{ value: "G", label: "Confirm Replenishment" }];
    } else if (dataUser.dept === "Manage Picking") {
      opt = [{ value: "H", label: "Custom Picking" }];
    } else if (dataUser.dept === "Check & Pack") {
      opt = [{ value: "I", label: "Validasi Picking" }];
    } else {
      opt = [
        { value: "A", label: "Receiving" },
        { value: "B", label: "Transfer & Confirm Putaway" },
        { value: "C", label: "Assign Pro to Pallet" },
        { value: "D", label: "Finish. Prod. Preparation" },
        { value: "E", label: "Out Preparation" },
        { value: "F", label: "Confirm Production Order" },
        { value: "G", label: "Confirm Replenishment" },
        { value: "H", label: "Custom Picking" },
        { value: "I", label: "Validasi Picking" },
      ];
    }
    setProcessOption(opt);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (e, title) => {
    e.stopPropagation();
    let dt = [];
    let dtSource = JSON.parse(localStorage.getItem("dataPartNumber"));
    if (title === "Part Induk") {
      dt = dtSource.filter((el) => el.isParent && el.isActive === true);
      setDatasPart(dt);
    } else {
      console.log(rc.part_number_induk, "induk");
      dt = dtSource.filter(
        (el) =>
          el.part_number_parent === rc.part_number_induk && el.isActive === true
      );
      setDatasPart(dt);
    }
    setModalTitle(title);
    setShow(true);
  };

  useEffect(() => {
    if (rc.part_number_anak.length === 0) {
      setSupplierTempOption([]);
    }
  }, [rc.part_number_anak]);

  const handleSelectPart = (e, row) => {
    e.stopPropagation();
    if (modalTitle === "Part Induk") {
      setRc({
        ...rc,
        part_number_induk: row.part_number,
        part_induk_desc: row.part_number_desc,
        part_number_anak: "",
        part_anak_desc: "",
        mrp_controller: "",
      });
    } else {
      setRc({
        ...rc,
        part_number_anak: row.part_number,
        part_anak_desc: row.part_number_desc,
        mrp_controller: row.mrp_controller,
        beban: e ? e.label : "",
        supplier_desc: "",
      });
      setSupplierTempOption([
        {
          value: row.vendor_desc,
          label: row.vendor_code,
        },
      ]);
      setSupplierCode(null);
      setBeban(null);
    }

    handleClose();
  };

  const loadSymptomList = (cat) => {
    //--set list symptom
    const dtSymptom = JSON.parse(dataSymptoms);
    let opt = [];
    dtSymptom.forEach((el) => {
      if (el.catSymptomp === cat && el.status === "Active") {
        opt.push({
          id: el.id,
          value: el.id,
          label: el.nameSymptomp,
        });
      }
    });
    setListSymptomOption(opt);
    setListDefaultSymptomOption(opt);
  };

  const handleChange = (e, name) => {
    if (name === "part_number_induk" && e.target.value === "") {
      setRc({
        ...rc,
        [name]: e.target.value,
        part_number_anak: "",
        part_anak_desc: "",
      });
    } else {
      setRc({
        ...rc,
        [name]: e.target.value,
      });
    }
  };

  const handleChangeSelect = (e, name) => {
    if (name === "process") {
      setProcess(e);
      let opt = [];
      let norc = "";
      if (e) {
        if (e.label === "Receiving") {
          opt = [{ value: "Quality", label: "Quality" }];
        } else {
          opt = [
            { value: "Quality", label: "Quality" },
            { value: "Quantity", label: "Quantity" },
          ];
        }
        let nrc = localRc.filter(el => el.process === e.label).length+1;
        if(nrc<10){
          nrc = "00"+nrc;
        }else if(nrc < 100){
          nrc = "0"+nrc;
        }else{
          nrc = ""+nrc;
        }
        norc = "RC"+e.value+"2023000"+nrc;
      }
      setRc({
        ...rc,
        no_rc: norc.length === 0 ? "" : norc,
        process: e ? e.label : "",
        quality_quantity: "",
      });
      setQuantityQuality(null);
      setAction(null);
      setQuantityQualityOption(opt);
    } else if (name === "slocAsal") {
      setSlocAsal(e);
      setRc({
        ...rc,
        sloc_asal: e ? e.label : "",
      });
    } else if (name === "rejectSymptom") {
      setRejectSymptom(e);
      setDatas([]);
      setRc({
        ...rc,
        reject_symptom: e ? e.label : "",
      });

      if (e && e.label) {
        loadSymptomList(e.label);
      }
    } else if (name === "beban") {
      setBeban(e);
      let opt = [];
      if (e) {
        if (e.label === "Vendor") {
          opt = supplierTempOption;
        } else {
          opt = [
            { label: "SA", value: "Seksi A" },
            { label: "SB", value: "Seksi B" },
            { label: "SC", value: "Seksi C" },
          ];
        }
      }
      setRc({
        ...rc,
        beban: e ? e.label : "",
        supplier_desc: "",
      });
      setSupplierCode(null);
      setSupplierCodeOption(opt);
    } else if (name === "quantityQuality") {
      setQuantityQuality(e);
      let tujuan = "";
      let opt = [];
      if (e) {
        if (e.label === "Quantity") {
          tujuan = "M407 Prov. To Vendor";
          opt = [
            { value: "Claim Goods", label: "Claim Goods" },
            { value: "Debit Note", label: "Debit Note" },
            { value: "Scrap", label: "Scrap" },
          ];
        } else if (e.label === "Quality") {
          tujuan = "M407";
          opt = [
            { value: "Claim Goods", label: "Claim Goods" },
            { value: "Repair to Vendor", label: "Repair to Vendor" },
            { value: "Debit Note", label: "Debit Note" },
            { value: "Scrap", label: "Scrap" },
          ];
        }
      }
      setRc({
        ...rc,
        quality_quantity: e ? e.label : "",
        sloc_tujuan: tujuan,
      });
      setAction(null);
      setActionOption(opt);
    } else if (name === "action") {
      setAction(e);
      setRc({
        ...rc,
        action: e ? e.label : "",
      });
    } else if (name === "supplierCode") {
      setSupplierCode(e);
      setRc({
        ...rc,
        supplier_code: e ? e.label : "",
        supplier_desc: e ? e.value : "",
      });
    }
  };

  const handleValidation = (dataRc) => {
    let err = false;
    if(dataRc.process === ""){
      console.log('1')
      err = true;
    }
    if(!slocAsal){
      console.log('2')
      err = true;
    }
    if(rc.part_number_induk.length === 0){
      console.log('3')
      err = true;
    }
    if(rc.part_number_anak.length === 0){
      console.log('4')
      err = true;
    }
    if(!rejectSymptom){
      console.log('5')
      err = true;
    }
    if(!beban){
      console.log('6')
      err = true;
    }
    if(!quantityQuality){
      console.log('7')
      err = true;
    }
    if(rc.jumlah === "" || +rc.jumlah < 1){
      console.log('8')
      err = true;
    }
    if(!action){
      console.log('9')
      err = true;
    }
    if(rc.symptoms.length < 1){
      console.log('10')
      err = true;
    }

    return err;
  }

  const handleCreate = (e) => {
    e.stopPropagation();
    let dataRc = rc;
    dataRc.symptoms = datas;
    console.log(dataRc, 'data rc');
    const cekVal = handleValidation(dataRc);
    if(!cekVal){
      const newId = Math.max(...localRc.map(o => +o.id))+1;
      dataRc.id = ""+newId;
      dataRc.status = 'CREATED'
      console.log(dataRc, 'data rc');
      const newLocalRc = localRc.concat(dataRc);
      localStorage.setItem('dataRc', JSON.stringify(newLocalRc));
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Create Reject Card Success!'
      }).then(() => {
        window.location.reload(false);
      })
    }else{
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'Data belum lengkap'
      })
    }
  }

  //---modal symptom
  const handleCloseModalSymptom = () => {
    setOpenModalSymptom(false);
  };

  const openSymptom = (e, row) => {
    e.stopPropagation();
    // let newList = listDefaultSymptomOption.filter((item) => !datas.includes(item.id));
    const newList = listDefaultSymptomOption.filter((item) =>
      datas.every((el) => el.id !== item.id)
    );
    console.log(datas, "datas");
    console.log(newList, "new list");
    setListSymptomOption(newList);
    setOpenModalSymptom(true);
  };

  const handleSubmitForm = (dataSubmit) => {
    setOpenModalSymptom(false);
    let newData = datas;
    newData = newData.concat({
      id: dataSubmit.symptom.value,
      name: dataSubmit.symptom.label,
      quantity: dataSubmit.quantity,
    });
    setDatas(newData);
    handleSelectRow("all", null, false);
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
          handleSelectRow("all", null, false);
        }
      });
    }
  };
  //---

  const handlePageChange = (page, sizePerPage) => {
    setCurrentPage(page);
    setSizePerPage(sizePerPage);
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
      dataField: "name",
      text: "Name",
      headerAlign: "center",
      align: "left",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "180px" };
      },
    },
    {
      dataField: "quantity",
      text: "Quantity",
      headerAlign: "center",
      align: "left",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "180px" };
      },
    },
  ];

  const columnsPart = [
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
      dataField: "id",
      text: "Action",
      headerAlign: "center",
      align: "center",
      editable: false,
      isDummyField: true,
      headerStyle: (colum, colIndex) => {
        return { width: "60px" };
      },
      formatter: (cellContent, row) => {
        return (
          <div>
            <span className="btnInTable">
              <Button
                className="btn-success btn-brand btn-sm icon mg-r-2"
                onClick={(e) => handleSelectPart(e, row)}
              >
                <i className="typcn typcn-input-checked"> </i>{" "}
              </Button>
            </span>
          </div>
        );
      },
    },
    {
      dataField: "part_number",
      text: "Part Number",
      headerAlign: "center",
      align: "center",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "120px" };
      },
    },
    {
      dataField: "part_number_desc",
      text: "Part Desc",
      headerAlign: "center",
      align: "left",
      editable: false,
      headerStyle: (colum, colIndex) => {
        return { width: "180px" };
      },
    },
  ];

  return (
    <div>
      <div className="container d-flex p-md-0">
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
          <div className="az-content-breadcrumb">
            <span>TRANSACTION</span>
            <span>REJECT CARD</span>
          </div>
          <h2 className="az-content-title">Create Reject Card</h2>

          <div className="row row-sm mt-0">
            <div className="col-lg-6">
              <div className="az-content-label mg-b-5">Fill Reject Data</div>
              <p className="mg-b-20 font-italic">Fields (*) are required</p>
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-4 col-form-label">
                    Process *
                  </label>
                  <div class="col-sm-8">
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
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Operator ID
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="operator_id_create"
                      value={rc.operator_id_create}
                      onChange={(e) => handleChange(e, "operator_id_create")}
                      placeholder="Auto Input Operator ID"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Sloc Asal *
                  </label>
                  <div class="col-sm-8">
                    <Select
                      className="w-100"
                      name="slocAsal"
                      value={slocAsal}
                      onChange={(e) => handleChangeSelect(e, "slocAsal")}
                      isClearable={true}
                      options={slocAsalOption}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Nomor BIN
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="bin"
                      value={rc.bin}
                      onChange={(e) => handleChange(e, "bin")}
                      placeholder="Input Nomor Bin"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Part Number Induk *
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="part_number_induk"
                      value={rc.part_number_induk}
                      onClick={(e) => handleShow(e, "Part Induk")}
                      // onChange={(e) => handleChange(e, "part_number_induk")}
                      placeholder="Input Part Number Induk"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Part Induk Desc.
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="part_induk_desc"
                      value={rc.part_induk_desc}
                      onChange={(e) => handleChange(e, "part_induk_desc")}
                      placeholder="Auto Input Part Induk Desc"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Part Number Anak *
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="part_number_anak"
                      value={rc.part_number_anak}
                      // onChange={(e) => handleChange(e, "part_number_anak")}
                      onClick={(e) => handleShow(e, "Part Anak")}
                      placeholder="Input Part Number Anak"
                      disabled={rc.part_number_induk === ""}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Part Anak Desc.
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="part_anak_desc"
                      value={rc.part_anak_desc}
                      onChange={(e) => handleChange(e, "part_anak_desc")}
                      placeholder="Auto Input Part Anak Desc"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    MRP Controller *
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
                    {/* <Select
                      className="w-100"
                      name="mrp"
                      value={mrp}
                      onChange={(e) => handleChangeSelect(e, "mrp")}
                      isClearable={true}
                      options={mrpOption}
                    /> */}
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Reject Symptom Cat. *
                  </label>
                  <div class="col-sm-8">
                    <Select
                      className="w-100"
                      name="rejectSymptom"
                      value={rejectSymptom}
                      onChange={(e) => handleChangeSelect(e, "rejectSymptom")}
                      isClearable={true}
                      options={rejectSymptomOption}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Beban Vendor/Seksi *
                  </label>
                  <div class="col-sm-8">
                    <Select
                      className="w-100"
                      name="beban"
                      value={beban}
                      onChange={(e) => handleChangeSelect(e, "beban")}
                      isClearable={true}
                      options={[
                        { value: "Vendor", label: "Vendor" },
                        { value: "Seksi", label: "Seksi" },
                      ]}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Seksi/Supplier Code *
                  </label>
                  <div class="col-sm-8">
                    <Select
                      className="w-100"
                      name="supplierCode"
                      value={supplierCode}
                      onChange={(e) => handleChangeSelect(e, "supplierCode")}
                      isClearable={true}
                      options={supplierCodeOption}
                      isDisabled={rc.beban === "" || beban === null}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Seksi/Supplier Desc.
                  </label>
                  <div class="col-sm-8">
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
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Quantity/Quality *
                  </label>
                  <div class="col-sm-8">
                    <Select
                      className="w-100"
                      name="quantityQuality"
                      value={quantityQuality}
                      onChange={(e) => handleChangeSelect(e, "quantityQuality")}
                      isClearable={true}
                      options={quantityQualityOption}
                      isDisabled={rc.process === ""}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Jumlah *
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="number"
                      name="jumlah"
                      value={rc.jumlah}
                      onChange={(e) => handleChange(e, "jumlah")}
                      placeholder="Input Jumlah"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Sloc Tujuan
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="sloc_tujuan"
                      value={rc.sloc_tujuan}
                      onChange={(e) => handleChange(e, "sloc_tujuan")}
                      placeholder="Auto Input Sloc Tujuan"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Action *
                  </label>
                  <div class="col-sm-8">
                    <Select
                      className="w-100"
                      name="action"
                      value={action}
                      onChange={(e) => handleChangeSelect(e, "action")}
                      isClearable={true}
                      options={actionOption}
                      isDisabled={rc.quality_quantity === ""}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Vendor Repair *
                  </label>
                  <div class="col-sm-8">
                    <Form.Control
                      type="text"
                      name="vendor_repair"
                      value={rc.vendor_repair}
                      onChange={(e) => handleChange(e, "vendor_repair")}
                      placeholder="Input Vendor Repair"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="az-content-label mg-b-5">Symptoms</div>
              <p className="mg-b-20 font-italic">Required minimal 1 symptom</p>
              <div className="az-content-label mg-b-5">
                <div className="az-dashboard-nav">
                  <nav className="nav">
                    <a className="nav-link" href="javascript:;">
                      <Button
                        variant="success btn-block"
                        className="btn-info btn-brand btn-sm icon mg-r-2"
                        style={{ lineHeight: "28px", display: "flex" }}
                        onClick={openSymptom}
                        disabled={rc.reject_symptom === ""}
                      >
                        <i
                          className="typcn typcn-plus"
                          style={{ fontSize: "18px", lineHeight: "28px" }}
                        ></i>{" "}
                        Add Symptom
                      </Button>
                    </a>
                    <a className="nav-link" href="javascript:;">
                      <Button
                        variant="danger btn-block"
                        className="btn-danger btn-brand btn-sm icon mg-r-2"
                        style={{ lineHeight: "28px", display: "flex" }}
                        onClick={handleDelete}
                        disabled={datas.length === 0}
                        // disabled={datas.length === 0 || selectedRows.length === 0}
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

                <Table2EditSelect
                  caption=""
                  tableHead={columns}
                  datas={datas}
                  handlePageChange={handlePageChange}
                  handleSelectRow={handleSelectRow}
                />
                <div className="mg-t-20 d-flex justify-content-center">
                  <BarCode value={rc.no_rc} width={1.5} height={70} fontSize={14} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <hr className="mg-y-10" />
          </div>

          <div className="row row-sm">
            <div className="row row-xs wd-xl-80p">
              <div className="col-sm-4 col-md-4 mg-t-10">
                <Button variant="secondary btn-block">
                  <i
                    className="typcn typcn-printer"
                    style={{ fontSize: "18px" }}
                  ></i>{" "}
                  Save as Draft
                </Button>
              </div>
              <div className="col-sm-4 col-md-4 mg-t-10">
                <Button variant="success btn-block"
                onClick={(e) => handleCreate(e)}>
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
                    className="typcn typcn-arrow-back"
                    style={{ fontSize: "18px" }}
                  ></i>{" "}
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSymptom
        open={openModalSymptom}
        listSymptomOption={listSymptomOption}
        onSubmit={handleSubmitForm}
        onClose={handleCloseModalSymptom}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table2EditSearch
            caption=""
            tableHead={columnsPart}
            datas={datasPart}
            handlePageChange={handlePageChange}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RejectCard;
