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

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToolPanel: true,
            columnDefs: [
                // this row just shows the row index, doesn't use any data from the row
                {
                    headerName: "ID", width: 50,
                    cellRenderer: function (params) {
                        if (params.data !== undefined) {
                            return params.node.id;
                        } else {
                            // return '<img src="../images/loading.gif">'
                        }
                    },
                    // we don't want to sort by the row index, this doesn't make sense as the point
                    // of the row index is to know the row index in what came back from the server
                    suppressSorting: true,
                    suppressMenu: true,
                    suppressFilter: true
                },
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
                {headerName: "Bronze", field: "bronze", width: 100, editable: true},
                {headerName: "Total", field: "total", width: 100, valueGetter: 'data.gold + data.silver + data.bronze'}
            ],
            height: 400
        }
    }

    componentDidMount() {

        var gridOptions = {
            floatingFilter:true,
            debug: true,
            enableServerSideSorting: true,
            enableServerSideFilter: true,
            enableColResize: true,
            rowSelection: 'single',
            rowDeselection: true,
            columnDefs: this.state.columnDefs,
            rowModelType: 'infinite',
            paginationPageSize: 10,
            cacheOverflowSize: 1,
            maxConcurrentDatasourceRequests: 2,
            infiniteInitialRowCount: 1,
            maxBlocksInCache: 1,
            cacheBlockSize: 1,
            infiniteBlockSize: 10,
            pagination: true,
            getRowNodeId: function(item) {
                return item.id;
            }
        };

        function setRowData(allOfTheData) {
            // give each row an id
            allOfTheData.forEach( function(data, index) {
                data.id = 'R' + (index + 1);
            });

            var dataSource = {
                rowCount: null, // behave as infinite scroll
                getRows: function (params) {
                    console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                    // At this point in your code, you would call the server, using $http if in AngularJS 1.x.
                    // To make the demo look real, wait for 500ms before returning
                    setTimeout(function () {
                        // take a slice of the total rows
                        var dataAfterSortingAndFiltering = sortAndFilter(allOfTheData, params.sortModel, params.filterModel);
                        var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
                        // if on or after the last page, work out the last row.
                        var lastRow = -1;
                        if (dataAfterSortingAndFiltering.length <= params.endRow) {
                            lastRow = dataAfterSortingAndFiltering.length;
                        }
                        // call the success callback
                        params.successCallback(rowsThisPage, lastRow);
                    }, 500);
                }
            };

            gridOptions.api.setDatasource(dataSource);
        }

        function sortAndFilter(allOfTheData, sortModel, filterModel) {
            return sortData(sortModel, filterData(filterModel, allOfTheData))
        }

        function sortData(sortModel, data) {
            var sortPresent = sortModel && sortModel.length > 0;
            if (!sortPresent) {
                return data;
            }
            // do an in memory sort of the data, across all the fields
            var resultOfSort = data.slice();
            resultOfSort.sort(function(a,b) {
                for (var k = 0; k<sortModel.length; k++) {
                    var sortColModel = sortModel[k];
                    var valueA = a[sortColModel.colId];
                    var valueB = b[sortColModel.colId];
                    // this filter didn't find a difference, move onto the next one
                    if (valueA==valueB) {
                        continue;
                    }
                    var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
                    if (valueA > valueB) {
                        return sortDirection;
                    } else {
                        return sortDirection * -1;
                    }
                }
                // no filters found a difference
                return 0;
            });
            return resultOfSort;
        }

        function filterData(filterModel, data) {
            var filterPresent = filterModel && Object.keys(filterModel).length > 0;
            if (!filterPresent) {
                return data;
            }

            var resultOfFilter = [];
            for (var i = 0; i<data.length; i++) {
                var item = data[i];

                if (filterModel.age) {
                    var age = item.age;
                    var allowedAge = parseInt(filterModel.age.filter);
                    // EQUALS = 1;
                    // LESS_THAN = 2;
                    // GREATER_THAN = 3;
                    if (filterModel.age.type == 'equals') {
                        if (age !== allowedAge) {
                            continue;
                        }
                    } else if (filterModel.age.type == 'lessThan') {
                        if (age >= allowedAge) {
                            continue;
                        }
                    } else {
                        if (age <= allowedAge) {
                            continue;
                        }
                    }
                }

                if (filterModel.year) {
                    if (filterModel.year.indexOf(item.year.toString()) < 0) {
                        // year didn't match, so skip this record
                        continue;
                    }
                }

                if (filterModel.country) {
                    if (filterModel.country.indexOf(item.country)<0) {
                        continue;
                    }
                }

                resultOfFilter.push(item);
            }

            return resultOfFilter;
        }

        new agGrid.Grid(this.grid, gridOptions);
        // gridOptions.api.setRowData(httpResult);
        this.gridApi = gridOptions.api;
        var _this = this;
        fetch('/public/json/olympicWinners.json').then((response) => response.json()).then((json) => {
            _this.originalData = json;
            setRowData(json);
        });

        window.gridApi = this.gridApi;

    }

    render() {
        return (
            <div style={{height: 500}}>
                <div ref={(grid) => this.grid = grid} className="ag-fresh" style={{width: '99%', height: this.state.height}}></div>
            </div>
        )
    }
}

ReactDom.render(<Pagination/>, document.getElementById('root'));
