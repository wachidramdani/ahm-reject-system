import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import Table2Edit from '../commons/Table/Table2Edit';
import { ExpandMore } from '@material-ui/icons';
import AddSymptopmp from './components/maintainSymptomp';
import datas  from '../commons/jsonFile/symptom.json'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';

// const useStyles = makeStyles(() => ({
//     label: {
//         width: 200
//     },
// }))

function Sympstoms() {
    const [panel, setPanel] = useState(true)
    const [partNumber, setPartNumber] = useState(null)
    const [vdf, setVdf] = useState("")
    const [vdt, setVdt] = useState("")
    const [valStatus, setValStatus] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(2)
    const [openAdd, setOpenAdd] = useState(false)

    // const datas = [
    //     { id: '000001', catSymptomp: 'Logam', nameSymptomp: 'Retak', vdf: '01/02/2022', vdt: '31/12/2022', status: 'Active' },
    //     { id: '000002', catSymptomp: 'Logam', nameSymptomp: 'Patah', vdf: '01/02/2022', vdt: '31/12/2022', status: 'Active' },
    // ]

    const optPartNumber = [
        { value: '1', label: '1234' },
        { value: '2', label: '5678' }
    ]

    const optStatus = [
        { value: '1', label: 'All' },
        { value: '2', label: 'Active' },
        { value: '3', label: 'Non-Active' }
    ]

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
                return { width: '30px' };
            },
        },
        {
            dataField: 'id',
            text: 'Id Symptom',
            headerAlign: 'center',
            align: 'left',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            }
        },
        {
            dataField: 'catSymptomp',
            text: 'Category Symptom',
            headerAlign: 'center',
            align: 'left',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            },
        },
        {
            dataField: 'nameSymptomp',
            text: 'Name Of Symptom',
            headerAlign: 'center',
            align: 'left',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            },
        },
        {
            dataField: 'vdf',
            text: 'Valid Date From',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            }
        },
        {
            dataField: 'vdt',
            text: 'Valid Date To',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            }
        },
        {
            dataField: 'status',
            text: 'Status',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '80px' };
            }
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
                            <Button className="btn-success btn-brand btn-sm icon mg-r-2"><i className="typcn typcn-eye"> </i></Button>
                            <Button className="btn-facebook btn-brand btn-sm icon" ><i className="typcn typcn-pencil"> </i></Button>
                        </span>
                    </div>
                );
            },
        },
    ]

    const handleChange = (e, name) => {
        if (e) {
            if (name === 'pn') { setPartNumber(e) }
            else if (name === 'status') { setValStatus(e) }
        }
    }

    const handleChangeInput = (e, name) => {
        if (name === 'vdf') { setVdf(e.target.value) }
        else if (name === 'vdt') { setVdt(e.target.value) }
    }

    const handleSearch = () => {
        console.log(partNumber, vdf, vdt, valStatus, 'SEARCH')
    }

    const handlePageChange = (page, sizePerPage) => {
        setCurrentPage(page)
        setSizePerPage(sizePerPage)
    }

    const handleReset = () => {
        setPartNumber(null)
        setVdf("")
        setVdt("")
        setValStatus(null)
    }

    const handleAdd = () => {
        setOpenAdd(true)
    }

    const handleCloseAdd = () => {
        setOpenAdd(false)
    }

    return (
        <div>
            <div className="container d-flex p-md-0">
                <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                    <div className="az-content-breadcrumb">
                        <span>Master</span>
                        <span>Inspection</span>
                    </div>
                    <h2 className="az-content-title">Master Sympstoms</h2>

                    <Box sx={{ width: '100%' }}>
                        <Accordion expanded={panel} onChange={() => setPanel(!panel)} className='accordionRoot'>
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
                                    <div className="col-lg-12">
                                        <div className="row mg-b-4">
                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Category Sympstoms</span>
                                                <Select name="pn" value={partNumber} options={optPartNumber} onChange={(e) => handleChange(e, 'pn')} isClearable />
                                            </div>

                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Valid  Date From</span>
                                                <input type="date" className="form-control" name="vdf" value={vdf} onChange={(e) => handleChangeInput(e, 'vdf')} />
                                            </div>
                                        </div>

                                        <div className="row mg-b-4 mt-2">
                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Status</span>
                                                <Select name="status" value={valStatus} options={optStatus} onChange={(e) => handleChange(e, 'status')} isClearable />
                                            </div>

                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Valid  Date To</span>
                                                <input type="date" className="form-control" name="vdt" value={vdt} onChange={(e) => handleChangeInput(e, 'vdt')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div className="az-dashboard-nav" style={{ marginTop: 20 }}>
                            {/* <nav className="nav">
                                <a className="nav-link active" data-toggle="tab" href="#/">
                                    <Button variant="success btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" ><i className="typcn typcn-arrow-right" style={{ fontSize: '18px' }}></i> Process</Button>
                                </a>
                            </nav> */}

                            <nav className="nav">
                                <a className="nav-link" href="#/">
                                    <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-zoom-outline" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Search</Button>
                                </a>
                                <a className="nav-link" href="#/">
                                    <Button variant="danger btn-block" className="btn-danger btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }} onClick={handleReset}><i className="typcn typcn-arrow-sync" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Reset</Button>
                                </a>
                                <a className="nav-link" href="#/">
                                    <Button variant="primary btn-block" className="btn-primary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }} onClick={handleAdd}><i className="typcn typcn-plus" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Add New</Button>
                                </a>
                                <a className="nav-link" href="#/"><i className="fas fa-ellipsis-h"></i></a>
                            </nav>
                        </div>
                        <div className="az-content-label mg-b-5">
                            <Table2Edit
                                caption=''
                                tableHead={columns}
                                datas={datas}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    </Box>
                </div>
            </div>

            <AddSymptopmp open={openAdd} onClose={handleCloseAdd} />

        </div>
    )
}

export default Sympstoms
