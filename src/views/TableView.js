import React from "react";
import ToolkitProvider, {
  Search,
  ColumnToggle,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import QualityRanger from "../components/QualityRanger";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

let columns = [];
let anzeige;
let keyfield = "";
let nested = false;
let expandRow = "";
let nestedColumns = [
  {
    dataField: "df1",
    isDummyField: true,
    text: "Action 1",
    formatter: (cellContent, row) => {
      return (
        <h5>
          <span className="label label-danger"> Backordered</span>
        </h5>
      );
    },
  },
  {
    dataField: "df2",
    isDummyField: true,
    text: "Action 2",
    formatter: (cellContent, row) => {
      return (
        <h5>
          <span className="label label-danger"> Backordered</span>
        </h5>
      );
    },
  },
];

const { SearchBar, ClearSearchButton } = Search;
const { ToggleList } = ColumnToggle;
const { ExportCSVButton } = CSVExport;

class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      showModal: false,
      columnId: "",
      rowId: "",
      editor: "",
      cellValue: "",
      tableKeys: [],
      showSearch: false,
    };
    // this.getHeader = this.getHeader.bind(this);
    // // this.getRowsData = this.getRowsData.bind(this);
    // this.getKeys = this.getKeys.bind(this);
  }

  showModal = () => {
    this.setState((prev) => ({
      showModal: !prev.showModal,
    }));
  };

  getCellContent(columnID, rowID) {
    console.log("CellContent", columnID, rowID);
    this.setState({
      columnId: columnID,
      rowId: rowID,
    });
  }

  componentDidUpdate(props) {
    console.log("Table-Update", this.props.search);
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
    this.setState({ loading: false });
    nestedColumns = [{ text: "Data", datafield: this.state.data[0] }];
  }

  // checkNested(obj /*, level1, level2, ... levelN*/) {
  //   var args = Array.prototype.slice.call(arguments, 1);

  //   for (var i = 0; i < args.length; i++) {
  //     if (!obj || !obj.hasOwnProperty(args[i])) {
  //       return false;
  //     }
  //     obj = obj[args[i]];
  //   }
  //   return true;
  // }

  checkNested(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj);
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getKeys() {
    if (this.state.loading !== true) {
      let keys = Object.keys(this.state.data);

      keys = keys.filter(this.onlyUnique);
      // for (let i = 0; i < keys.length; i++) {
      //   let key = keys[i];
      //   let subkeys = Object.keys(this.state.data[key]);
      keys.forEach((element) => {
        if (this.checkNested(this.state.data, element)) {
          let subkeys = Object.keys(this.state.data[element]);
          subkeys = subkeys.filter(this.onlyUnique);

          subkeys.forEach((subkey) => {
            if (this.checkNested(this.state.data, element, subkey)) {
              let subsub = Object.keys(this.state.data[element][subkey]);
              subsub = subsub.filter(this.onlyUnique);

              subsub.forEach((sub) => {
                if (this.checkNested(this.state.data, element, subkey, sub)) {
                  // Brauche ich hier noch was???
                  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  // console.log("NEsted");
                } else {
                  keys = Object.keys(this.state.data);
                  nested = true;
                  //console.log("Last IF", keys);
                }
              });
            } else {
              //console.log("Middle IF");
              keys = Object.keys(this.state.data[0]);
            }
          });
        } else {
          //console.log("Outer IF");
          keys = Object.keys(this.state.data[0]);
        }
      });
      //console.log("KEYS2", keys);

      // if (this.state.data[key] != undefined) {
      // console.log("EXPAND!");
      // } else {
      //
      // console.log("No Expand", keys);
      // }
      // }
      // console.log("TypeOf", typeof keys[0]);

      return keys;
    }
  }

  // getKeys() {
  //   let keys = {};
  //   if (this.state.loading !== true) {
  //     console.log("Length", typeof this.state.data);
  //     if (typeof this.state.data == "object") {
  //       let key = Object.keys(this.state.data);
  //       keys[key] = this.state.data[key];
  //       console.log("KEYS", keys);
  //     }
  //     // return Object.keys(this.state.data[0]);
  //     return keys;
  //   }
  // }

  getHeader = function () {
    let regexTrue = /true/gm;
    let regexFalse = /false/gm;
    let regexNum = /[^a-zA-z]/gm;
    console.log("Beginning", columns);
    columns = [];
    if (this.state.loading === false) {
      var keys = this.getKeys();
      if (!nested) {
        console.log("Not Nested");
        columns = keys.map((key) => ({
          dataField: key,
          text: key,
          sort: true,
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <QualityRanger {...editorProps} value={value} />,
        }));
      } else {
        if (keys.length <= 1) {
          console.log("Nested", keys.length, keys, keys[0]);
          let columnsPush = {
            dataField: keys[0],
            text: keys[0],
            sort: true,
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => <QualityRanger {...editorProps} value={value} />,
          };
          console.log("to push", columnsPush);
          columns.push(columnsPush);
          console.log("Pushed", columns);
          expandRow = {
            renderer: (row) => (
              <div>
                <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
                <p>
                  You can render anything here, also you can add additional data
                  on every row object
                </p>
                <p>
                  expandRow.renderer callback will pass the origin row object to
                  you
                </p>
              </div>
            ),
          };
        } else {
          console.log("ELSE");
          columns = keys.map((key) => ({
            dataField: key,
            text: key,
            sort: true,
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => <QualityRanger {...editorProps} value={value} />,
          }));
        }
      }
      for (let x = 0; x < keys.length; x++) {
        let dataDump = [];
        for (let i = 0; i < this.state.data.length; i++) {
          let dataRow = this.state.data[i];
          dataDump.push(dataRow[keys[x]]);
        }
        if (regexFalse.test(dataDump) || regexTrue.test(dataDump)) {
          columns[x].editor = { type: Type.CHECKBOX, value: "true:false" };
          columns[x].editorRenderer = null;
        }
      }
      // if (!regexNum.test(dataDump)) {
      //   columns[x].editor = {

      // }

      console.log("Columns", columns);
      return columns;
    }
  };

  render() {
    if (this.state.loading === false && !nested) {
      keyfield = this.getKeys();
      console.log("Keyfield", keyfield);
    } else if (this.state.loading === false && nested) {
      keyfield = this.getKeys();
      console.log("Nested Keyfield", keyfield);
    }
    let nestedData = [
      { id: 1, name: "George", animal: "Monkey" },
      { id: 2, name: "Jeffrey", animal: "Giraffe" },
      { id: 3, name: "Alice", animal: "Giraffe" },
      { id: 4, name: "Alice", animal: "Tiger" },
    ];
    return (
      <div>
        {this.state.loading === false && !nested ? (
          <div>
            <ToolkitProvider
              keyField={keyfield[0]}
              data={this.state.data}
              columns={this.getHeader()}
              search
              columnToggle
              exportCSV
            >
              {(props) => (
                <div>
                  <Row className={this.props.search ? "show" : "noshow"}>
                    <Col md={4} lg={3}>
                      {/* <Row>
                        <Col md={4} lg={2}> */}
                      <h5>Suchen:</h5>
                      {/* </Col>
                        <Col md={4} lg={4}> */}
                      <SearchBar
                        {...props.searchProps}
                        className="tableSearch"
                      />
                      {/* </Col>
                        <Col md={4} lg={2} l> */}
                      <ClearSearchButton
                        {...props.searchProps}
                        className={this.props.search ? "show" : "noshow"}
                      />
                      {/* </Col>
                      </Row> */}
                    </Col>
                    <Col md={4} lg={6}>
                      <span className="toggleList">Spalten ein/ausblenden</span>
                      <br />
                      <ToggleList
                        {...props.columnToggleProps}
                        className="toggle-custom-class"
                        btnClassName="toggle-btn-custom-class"
                      />
                    </Col>
                    <Col md={4} lg={3}>
                      <ExportCSVButton {...props.csvProps}>
                        Export CSV
                      </ExportCSVButton>
                    </Col>
                    <Col>
                      {/* <QualityRanger
                        onClose={this.showModal}
                        show={this.state.showModal}
                        row={this.state.rowId}
                        column={this.state.columnId}
                        data={this.state.data}
                        keys={this.state.tableKeys}
                      /> */}
                    </Col>
                  </Row>

                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    cellEdit={cellEditFactory({
                      mode: "click",
                      autoSelectCell: true,
                      blurToSave: true,
                      onStartEdit: (row, column, rowIndex, columnIndex) => {
                        this.showModal();
                        this.getCellContent(columnIndex, rowIndex);
                      },
                    })}
                    rowClasses="row-class"
                    striped
                    hover
                    condensed
                    id="editTable"
                    // expandRow={expandRow}
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        ) : null}
        {this.state.loading === false && nested ? (
          <div>
            <ToolkitProvider
              keyField={keyfield[0]}
              data={nestedData}
              noDataIndication="There is no data"
              columns={this.nestedColumns}
              // search
              // columnToggle
              // exportCSV
            >
              {(props) => (
                <div>
                  <Row className={this.props.search ? "show" : "noshow"}>
                    <Col md={4} lg={3}>
                      {/* <Row>
                        <Col md={4} lg={2}> */}
                      <h5>Suchen:</h5>
                      {/* </Col>
                        <Col md={4} lg={4}> */}
                      <SearchBar
                        {...props.searchProps}
                        className="tableSearch"
                      />
                      {/* </Col>
                        <Col md={4} lg={2} l> */}
                      <ClearSearchButton
                        {...props.searchProps}
                        className={this.props.search ? "show" : "noshow"}
                      />
                      {/* </Col>
                      </Row> */}
                    </Col>
                    <Col md={4} lg={6}>
                      <span className="toggleList">Spalten ein/ausblenden</span>
                      <br />
                      <ToggleList
                        {...props.columnToggleProps}
                        className="toggle-custom-class"
                        btnClassName="toggle-btn-custom-class"
                      />
                    </Col>
                    <Col md={4} lg={3}>
                      <ExportCSVButton {...props.csvProps}>
                        Export CSV
                      </ExportCSVButton>
                    </Col>
                    <Col>
                      {/* <QualityRanger
                        onClose={this.showModal}
                        show={this.state.showModal}
                        row={this.state.rowId}
                        column={this.state.columnId}
                        data={this.state.data}
                        keys={this.state.tableKeys}
                      /> */}
                    </Col>
                  </Row>

                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    cellEdit={cellEditFactory({
                      mode: "click",
                      autoSelectCell: true,
                      blurToSave: true,
                      onStartEdit: (row, column, rowIndex, columnIndex) => {
                        this.showModal();
                        this.getCellContent(columnIndex, rowIndex);
                      },
                    })}
                    rowClasses="row-class"
                    striped
                    hover
                    condensed
                    id="editTable"
                    expandRow={expandRow}
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TableView;
