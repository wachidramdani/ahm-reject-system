import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const Table2Edit = (props) => {

    return(
        <div>
            <ToolkitProvider
                    keyField="id"
                    data={ props.datas }
                    columns={ props.tableHead }
                    // search
                    caption={ props.caption }
                >
                    {
                        (props) => (
                            <div>
                                {/* <SearchBar { ...props.searchProps } />
                                <ClearSearchButton { ...props.searchProps } className="btn-outline-dark ml-1 mb-1"/> */}
                                {/* <MySearch { ...props.searchProps } /> */}
                                {/* <hr /> */}
                                <BootstrapTable 
                                    { ...props.baseProps }
                                    striped
                                    hover
                                    condensed
                                    wrapperClasses="table-responsive"
                                    // pagination={ paginationFactory(options) }
                                />
                            </div>
                        )
                    }
            </ToolkitProvider>
        </div>
    )
}

export default Table2Edit