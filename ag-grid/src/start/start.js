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
import {
    AgGridReact
} from 'ag-grid-react';

// import  from 'react-';

class Start extends Component {
    render() {
        return (
            <AgGridReact>Test</AgGridReact>
        )
    }
}

ReactDom.render(<Start/>, document.getElementById('root'));
