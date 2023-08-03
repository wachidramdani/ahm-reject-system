import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from "react-select";
import { Typeahead } from 'react-bootstrap-typeahead';
import { MaterialReactTable } from 'material-react-table';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

function MonitoringRs() {
    const [selected, setSelected] = useState([]);
    const [suplierRepairCode, setSuplierRepairCode] = useState(null)
    const [process, setProcess] = useState(null);
    const [status, setStatus] = useState(null);

    const [fields, setFields] = useState({
        dateCreate: "",
        sd: "",
        suplierCode: null,
        suplierDesc: null,
        suplierRepairCode: null,
        suplierRepairDesc: null,
        process: null,
        status: null
    })

    const optStatus = [
        { id: 1, label: 'RC. Created' },
        { id: 2, label: 'Completed' },
    ]

    const options = [
        {
            label: 'Alabama',
            population: 4780127,
            capital: 'Montgomery',
            region: 'South',
        },
        { label: 'Alaska', population: 710249, capital: 'Juneau', region: 'West' },
        { label: 'Arizona', population: 6392307, capital: 'Phoenix', region: 'West' },
        {
            label: 'Arkansas',
            population: 2915958,
            capital: 'Little Rock',
            region: 'South',
        },
        {
            label: 'California',
            population: 37254503,
            capital: 'Sacramento',
            region: 'West',
        },
        { label: 'Colorado', population: 5029324, capital: 'Denver', region: 'West' },
        {
            label: 'Connecticut',
            population: 3574118,
            capital: 'Hartford',
            region: 'Northeast',
        },
    ]

    const optProcess = [
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
    ]

    const columns =
        [
            {
                accessorKey: 'no',
                header: 'No',
                size: 50
            },
            {
                accessorKey: 'no_rc',
                header: 'No. RC',
                size: 280,
                muiTableHeadCellProps: {
                    align: 'center',
                }
            },
            {
                accessorKey: 'process',
                header: 'Process',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'sloc_asal',
                header: 'Sloc Asal',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'bin',
                header: 'Bin',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'part_number_induk',
                header: 'Part Number Induk',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'part_induk_desc',
                header: 'Part Induk Desc.',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'part_number_anak',
                header: 'Part Number Anak',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'part_anak_desc',
                header: 'Part Anak Desc.',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'mrp_controller',
                header: 'MRP Controller',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'beban',
                header: 'Beban Section/Supplier Description',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'jumlah',
                header: 'Jumlah',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'quality_quantity',
                header: 'Quality/Quantity',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'beban',
                header: 'Symptom',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'action',
                header: 'Action',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'operator_id_create',
                header: 'Operator ID Create RC',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'vendor_repair',
                header: 'Vendor Repair',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'alasan_reprint',
                header: 'Alasan Re-Print',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'operator_id_cancel',
                header: 'Operator ID CANCEL PIC',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'delivery_note_take_part',
                header: 'Delivery Note/Take Part Reject',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'plat_number_reject_take',
                header: 'Plat Number Reject',
                size: 150,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'estimated_date_take_project',
                header: 'Estimated Date Take Part Reject',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'estimated_time_take_project',
                header: 'Estimated Time Take Part Reject',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'actual_date_give_part',
                header: 'Actual Date Give Part Reject',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'actual_time_give_part',
                header: 'Actual Time Give Part Reject',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'operator_id_give_part',
                header: 'Operator ID Give Part Reject',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'delivery_note_give_part',
                header: 'Delivery Note Give Part Replacement/Repair',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'plat_number_reject_give',
                header: 'Plat Number Reject',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'estimated_date_give_part',
                header: 'Estimated Date Give Part Replacement/Repair',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },

            {
                accessorKey: 'estimated_time_give_part',
                header: 'Estimated Time Give Part Replacement/Repair',
                size: 250,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'actual_date_receive_part',
                header: 'Actual Date Receive Part Replacement/Repair',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'actual_time_receive_part',
                header: 'Actual Time Receive Part Replacement/Repair',
                size: 200,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'actual_time_receive_part',
                header: 'Operator ID Receive Part Reject Replacement/Repair',
                size: 300,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'actions',
                header: 'Action',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
        ]

    const [data, setData] = useState([
        {
            id: '1',
            no_rc: 'COMPLETE',
            process: '',
            sloc_asal: '',
            bin: '',
            part_number_induk: '',
            part_induk_desc: '',
            part_number_anak: '',
            part_anak_desc: '',
            mrp_controller: '',
            beban: '',
            jumlah: '',
            quality_quantity: '',
            syomptom: '',
            subRows: [],
        },
        {
            id: '2',
            no_rc: 'GIVE PART REJECT TO SUPLIER',
            process: '',
            sloc_asal: '',
            bin: '',
            part_number_induk: '',
            part_induk_desc: '',
            part_number_anak: '',
            part_anak_desc: '',
            subRows: [],
        },
        {
            id: '3',
            no_rc: 'RC Created',
            process: '',
            sloc_asal: '',
            bin: '',
            part_number_induk: '',
            part_induk_desc: '',
            part_number_anak: '',
            part_anak_desc: '',
            subRows: [],
        },
        {
            id: '4',
            no_rc: 'RC Save As Draft',
            process: '',
            sloc_asal: '',
            bin: '',
            part_number_induk: '',
            part_induk_desc: '',
            part_number_anak: '',
            part_anak_desc: '',
            subRows: [],
        },
    ])

    useEffect(() => {
        const dataRc = JSON.parse(localStorage.getItem('dataRc'))
        let tempDataComplete = dataRc.filter((el) => el.status === 'COMPLETE')
        let tempDataSupplier = dataRc.filter((el) => el.status === 'SUPPLIER' || el.status === 'GIVE PART')
        let tempDataCreate = dataRc.filter((el) => el.status === 'CREATED')
        let tempDataDraft = dataRc.filter((el) => el.status === 'DRAFT')

        // if (tempDataComplete && tempDataComplete.length > 0) {
        tempDataComplete.forEach((el, index) => {
            el.no = index + 1

        });
        // }

        tempDataSupplier.forEach((el, index) => {
            el.no = index + 1
        });
        tempDataCreate.forEach((el, index) => {
            el.no = index + 1
        });
        tempDataDraft.forEach((el, index) => {
            el.no = index + 1
        });

        setData([
            {
                no: '',
                id: '1',
                no_rc: `COMPLETE (${tempDataComplete.length})`,
                process: '',
                sloc_asal: '',
                bin: '',
                part_number_induk: '',
                part_induk_desc: '',
                part_number_anak: '',
                part_anak_desc: '',
                mrp_controller: '',
                beban: '',
                jumlah: '',
                quality_quantity: '',
                symptom: '',
                subRows: tempDataComplete,
            },
            {
                no: '',
                id: '2',
                no_rc: `GIVE PART REJECT TO SUPLIER (${tempDataSupplier.length})`,
                process: '',
                sloc_asal: '',
                bin: '',
                part_number_induk: '',
                part_induk_desc: '',
                part_number_anak: '',
                part_anak_desc: '',
                mrp_controller: '',
                beban: '',
                jumlah: '',
                quality_quantity: '',
                symptom: '',
                subRows: tempDataSupplier,
            },
            {
                no: '',
                id: '3',
                no_rc: `RC CREATED (${tempDataCreate.length})`,
                process: '',
                sloc_asal: '',
                bin: '',
                part_number_induk: '',
                part_induk_desc: '',
                part_number_anak: '',
                part_anak_desc: '',
                mrp_controller: '',
                beban: '',
                jumlah: '',
                quality_quantity: '',
                symptom: '',
                subRows: tempDataCreate,
            },
            {
                no: '',
                id: '4',
                no_rc: `RC SAVE AS DRAFT (${tempDataDraft.length})`,
                process: '',
                sloc_asal: '',
                bin: '',
                part_number_induk: '',
                part_induk_desc: '',
                part_number_anak: '',
                part_anak_desc: '',
                mrp_controller: '',
                beban: '',
                jumlah: '',
                quality_quantity: '',
                symptom: '',
                subRows: tempDataDraft,
            },
        ])
    }, [])

    const handleChange = (e, name) => {
        setFields({
            ...fields,
            [name]: e.target.value,
        });
    }

    const handleChangeSelect = (e, name) => {
        if (name === "suplierRepairCode") {
            setSuplierRepairCode(e);
            setFields({
                ...fields,
                suplierRepairCode: e ? e.label : "",
            });
        } else if (name === "process") {
            setProcess(e);
            setFields({
                ...fields,
                process: e ? e.label : "",
            });
        } else if (name === "status") {
            setStatus(e);
            setFields({
                ...fields,
                status: e ? e.label : "",
            });
        }
    };

    return (
        <div>
            <div className="container p-md-0">
                <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                    <div className="az-content-breadcrumb">
                        <span>Master</span>
                        <span>Inspection</span>
                    </div>
                    <h2 className="az-content-title">Monitoring Reject System</h2>
                    <div className="row row-sm">
                        <div className="col-lg-12 mg-t-15">
                            <form>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">
                                        Date Create RC
                                    </label>
                                    <div class="col-sm-3">
                                        <Form.Control type="date" name='dateCreate' value={fields.dateCreate} onChange={(e) => handleChange(e, 'dateCreate')} />
                                    </div>
                                    <label for="staticEmail" class="col-sm-1 col-form-label">
                                        s/d
                                    </label>
                                    <div class="col-sm-3">
                                        <Form.Control type="date" name='sd' value={fields.sd} onChange={(e) => handleChange(e, 'sd')} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">
                                        Beban Section/Suplier Code
                                    </label>
                                    <div class="col-sm-4">
                                        <Typeahead
                                            id="basic-example"
                                            onChange={setSelected}
                                            options={options}
                                            placeholder="Choose a state..."
                                            selected={selected}
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">
                                        Beban Section/Suplier Desc
                                    </label>
                                    <div class="col-sm-4">
                                        <Form.Control
                                            type="text"
                                            name="suplierDesc"
                                            value={fields.suplierDesc}
                                            onChange={(e) => handleChange(e, "suplierDesc")}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">
                                        Suplier Repair Code
                                    </label>
                                    <div class="col-sm-4">
                                        <Select
                                            className="w-100"
                                            name="suplierRepairCode"
                                            value={suplierRepairCode}
                                            onChange={(e) => handleChangeSelect(e, "suplierRepairCode")}
                                            isClearable={true}
                                            options={options}
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">
                                        Suplier Repair Desc
                                    </label>
                                    <div class="col-sm-4">
                                        <Form.Control
                                            type="text"
                                            name="suplierRepairDesc"
                                            value={fields.suplierRepairDesc}
                                            onChange={(e) => handleChange(e, "suplierRepairDesc")}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">
                                        Process
                                    </label>
                                    <div class="col-sm-4">
                                        <Select
                                            className="w-100"
                                            name="process"
                                            value={process}
                                            onChange={(e) => handleChangeSelect(e, "process")}
                                            isClearable={true}
                                            options={optProcess}
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">
                                        Status
                                    </label>
                                    <div class="col-sm-4">
                                        <Select
                                            className="w-100"
                                            name="status"
                                            value={status}
                                            onChange={(e) => handleChangeSelect(e, "status")}
                                            isClearable={true}
                                            options={optStatus}
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className="az-dashboard-nav" style={{ marginTop: 20 }}>
                                <nav className="nav">
                                    <a className="nav-link" href="#/">
                                        <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-zoom-outline" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Search</Button>
                                    </a>
                                    <a className="nav-link" href="#/">
                                        <Button variant="danger btn-block" className="btn-danger btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }} ><i className="typcn typcn-arrow-sync" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Reset</Button>
                                    </a>
                                    <a className="nav-link" href="/transaction/createrc">
                                        <Button variant="primary btn-block" className="btn-primary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-plus" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Create RC</Button>
                                    </a>
                                    <a className="nav-link" href="/transaction/printrc">
                                        <Button variant="secondary btn-block" className="btn-secondary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-printer" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Print RC</Button>
                                    </a>
                                    <a className="nav-link" href="/transaction/printsj">
                                        <Button variant="secondary btn-block" className="btn-secondary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-printer" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Print Surat Jalan</Button>
                                    </a>



                                    <a className="nav-link" href="#/"><i className="fas fa-ellipsis-h"></i></a>
                                </nav>
                            </div>
                            <div className="az-dashboard-nav" style={{ marginTop: 20 }}>
                                <nav className="nav">
                                    <a className="nav-link" href="#/">
                                        <Button variant="primary btn-block" className="btn-primary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-arrow-maximise" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Give Part Rejected</Button>
                                    </a>
                                    <a className="nav-link" href="#/">
                                        <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-arrow-minimise" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Receive Replacement</Button>
                                    </a>
                                    <a className="nav-link" href="#/">
                                        <Button variant="warning btn-block" className="btn-warning btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-tick" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Completed</Button>
                                    </a>
                                    <a className="nav-link" href="#/">
                                        <Button variant="primary btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-upload" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Export Excel</Button>
                                    </a>
                                    <a className="nav-link" href="#/"><i className="fas fa-ellipsis-h"></i></a>
                                </nav>
                            </div>
                            <div>
                                <div className="az-content-label mg-b-5">
                                    <MaterialReactTable
                                        columns={columns}
                                        data={data}
                                        enableExpanding
                                        enableExpandAll //default
                                        enableColumnActions={false}
                                        enableColumnFilters={false}
                                        // enablePagination={false}
                                        enableSorting={false}
                                        enableBottomToolbar={false}
                                        enableTopToolbar={false}
                                        muiTableBodyRowProps={{ hover: false }}
                                        // muiTableProps={{
                                        //     sx: {
                                        //         border: '1px solid rgba(81, 81, 81, 1)',
                                        //     },
                                        // }}
                                        muiTableHeadCellProps={{
                                            sx: {
                                                border: '1px solid rgba(81, 81, 81, 1)',
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonitoringRs
