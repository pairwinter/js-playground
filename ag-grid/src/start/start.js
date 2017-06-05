/**
 * @ignore  =====================================================================================
 * @file    start
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 2:32 PM 09/04/2017
 * @ignore  =====================================================================================
 */
import React, {Component} from "react";
import ReactDom from "react-dom";
import agGrid from "ag-grid";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/theme-fresh.css";
import "ag-grid/dist/styles/theme-bootstrap.css";
import "./start.css";

// import  from 'react-';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToolPanel: true,
            columnDefs: [
                {
                    headerName: "Athlete", field: "athlete", width: 150,
                    editable: true,
                    cellEditor: 'select',
                    cellEditorParams: {
                        values: '1,2,3,4'.split(',')
                    },
                    /**
                     * newValueHandler is provided a params object with attributes:
                     * node: The grid node in question.
                     * data: The row data in question.
                     * oldValue: If 'field' is in the column definition, contains the value in the data before the edit.
                     * newValue: The string value entered into the default editor.
                     * rowIndex: The index of the virtualised row.
                     * colDef: The column definition.
                     * context: The context as set in the gridOptions.
                     * api: A reference to the ag-Grid API.
                     * @param params
                     */
                    newValueHandler: function (params) {
                        var targetField = params.colDef.field;
                        var originalData = params.data;
                        var newValue = params.newValue;
                        newValue = newValue + '-new value';
                        originalData[targetField] = newValue;
                    }
                },
                {headerName: "Country", field: "country", width: 120, filter: 'text', editable: true},
                {
                    headerName: 'Age and Year',
                    children: [
                        {headerName: "Age", field: "age", width: 90, editable: true},
                        {headerName: "Year", field: "year", width: 90, filter: 'number', editable: true, editable: true},
                    ]
                },
                {
                    headerName: "Date", field: "date", width: 110, filter: 'date', filterParams: {

                    // provide comparator function
                    comparator: function (filterLocalDateAtMidnight, cellValue) {

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var dateParts = cellValue.split("/");
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);

                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }, editable: true
                },
                {headerName: "Sport", field: "sport", width: 110, editable: true, cellEditor: 'text'},
                {headerName: "Gold", field: "gold", width: 100, editable: true, cellEditor: 'text'},
                {headerName: "Silver", field: "silver", width: 100, editable: true},
                {headerName: "Bronze", field: "bronze", width: 100, editable: true},{headerName: "Sport", field: "sport", width: 110, editable: true, cellEditor: 'text'},
                {headerName: "Gold", field: "gold", width: 100, editable: true, cellEditor: 'text'},
                {headerName: "Silver", field: "silver", width: 100, editable: true},
                {headerName: "Bronze", field: "bronze", width: 100, editable: true},
                {headerName: "Total", field: "total", width: 100, valueGetter: 'data.gold + data.silver + data.bronze'}
            ],
            height: 400
        }
    }

    componentDidMount() {
        var gridOptions = {
            columnDefs: this.state.columnDefs,
            enableSorting: true,
            enableColResize: true,
            enableFilter: true,
            animateRows: true,
            rowHeight: 30,
            pagination: true,
            // paginationAutoPageSize: true,
            // editType: 'fullRow',
            onGridReady: function () {
                // gridOptions.api.sizeColumnsToFit();
                gridOptions.columnApi.setColumnPinned('country', 'left');
                gridOptions.columnApi.setColumnPinned('age', 'left');
                gridOptions.columnApi.setColumnPinned('total', 'right');
            },
            getRowClass: function (params) {
                if (params.node.floating) {
                    return 'test-floating-row';
                } else if (params.node.data.isNew){
                    return 'test-new-row';
                }
            },
            isFullWidthCell: function (rowData) {
                return !!rowData.data.fullWidth;
            },
            fullWidthCellRenderer: function (params) {
                let api = params.api;
                if (params.node.floating) {
                    let click = () => {
                        let newItem = api.getFloatingTopRow(0);
                        console.log(newItem.data);
                        //valid data
                        if(newItem.data.gold === 0){
                            api.startEditingCell({
                                rowIndex: -1,
                                colKey: 'athlete'
                            })
                        }
                    };
                    let container = document.createElement('div');
                    let div = <div className="test-add-full-width">
                        <button onClick={click} style={{'marginTop': '1px'}}>Save</button>
                    </div>;
                    return ReactDom.render(div, container);
                }
            }
        };
        new agGrid.Grid(this.grid, gridOptions);
        // gridOptions.api.setRowData(httpResult);
        this.gridApi = gridOptions.api;
        var _this = this;
        fetch('/public/json/olympicWinners.json').then((response) => response.json()).then((json) => {
            _this.originalData = json;
            gridOptions.api.setRowData(json);
        });
        window.gridApi = this.gridApi;
    }

    fillLarge() {
        this.setState({
            height: '100%'
        });
        this.gridApi.doLayout();
    }

    fillMedium() {
        this.setState({
            height: '50%'
        });
        this.gridApi.doLayout();
    }

    sortByColumn() {
        this.gridApi.setSortModel([{
            colId: 'country',
            sort: 'desc'
        }]);
    }

    frozenSomeRows() {
        var rowsData = this.originalData.slice(0, Math.floor(Math.random() * 50) || 1);
        this.gridApi.setFloatingTopRowData(rowsData);
        var otherRowsData = this.originalData.slice(rowsData.length);
        this.gridApi.setRowData(otherRowsData);
    }

    addNewItem() {
        var item = {
            athlete: "Michael Phelps",
            age: 19,
            country: "United States",
            year: 2004,
            date: "29/08/2004",
            sport: 100,
            gold: 200,
            silver: 300,
            bronze: 200,
            total: 0,
        };
        var defaultItem = {
            athlete: "1",
            age: 0,
            country: "2",
            year: '',
            date: "",
            sport: 0,
            gold: 0,
            silver: 0,
            bronze: 0,
            total: 0
        };
        item.isNew = true;
        this.gridApi.insertItemsAtIndex(0,[item]);
        // this.gridApi.addItems([defaultItem]);
        // this.gridApi.setFloatingTopRowData([defaultItem, {fullWidth: true}]);
    }

    render() {
        return (
            <div style={{height: 500}}>
                <div>
                    <button onClick={this.fillLarge.bind(this)}>Fill 100%</button>
                    <button onClick={this.fillMedium.bind(this)}>Fill 60%</button>
                    <button onClick={this.sortByColumn.bind(this)}>Sort by Country</button>
                    <button onClick={this.frozenSomeRows.bind(this)}>Frozen Some Rows</button>
                    <button onClick={this.addNewItem.bind(this)}>Add Item</button>
                </div>
                <div ref={(grid) => this.grid = grid} className="ag-fresh" style={{width: '99%', height: this.state.height}}></div>
            </div>
        )
    }
}

ReactDom.render(<Start/>, document.getElementById('root'));
