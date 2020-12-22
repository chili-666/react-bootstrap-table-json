import React from "react";
import { BsFileArrowDown, BsFileArrowUp } from "react-icons/bs";
// import Navbar from "react-bootstrap/Navbar";
import {
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import TableView from "./TableView";

let showTable;

// const writeJsonFile = require("write-json-file");

class FileDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "none",
      data: [],
      loading: true,
      safe: "",
      showSearch: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.changeSafe = this.changeSafe.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.fileUploadInput = React.createRef();
  }

  handleClick(e) {
    this.fileUpload.click();
  }

  fileUpload(event) {
    const scope = this;
    scope.setState({
      loading: true,
    });
    var file = event.target.files[0];
    console.log("FileUpload", file["name"]);
    var reader = new FileReader();
    reader.onload = function (event) {
      // The file's text will be printed here
      let jsonData = JSON.parse(event.target.result);
      console.log("JSONDATA", jsonData);
      scope.setState({
        data: jsonData,
        file: file,
        loading: false,
        safe: file["name"],
        showSearch: false,
      });
    };
    this.showTableFunction();
    reader.readAsText(file);
  }

  changeSafe(e) {
    console.log("ChangeSafe", e.target.value);
    this.setState({ safe: e.target.value });
  }

  // handleSafe = async () => {
  //   try {
  //     await writeJsonFile("foo.json", { foo: true });
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // };

  handleSafe = () => {
    console.log("KLICK SAFE", this.state.safe);
    if (!this.state.loading) {
      const fileData = JSON.stringify(this.state.data);
      const blob = new Blob([fileData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = this.state.safe;
      link.href = url;
      link.click();
    }
  };

  showTableFunction() {
    return showTable;
  }

  showSearch() {
    this.setState((prev) => ({
      showSearch: !prev.showSearch,
    }));
  }

  componentDidUpdate() {
    console.log("DIDIUpdate", this.props);
  }

  render() {
    return (
      <div>
        <Navbar bg="light" variant="light" fixed="top">
          {/* <div className="add-media"> */}
          <Navbar.Collapse>
            <Form inline>
              <InputGroup>
                <FormControl
                  type="file"
                  id="file"
                  ref={(ref) => (this.fileUploadInput = ref)}
                  accept=".json"
                  style={{ display: "block" }}
                  onChange={this.fileUpload}
                  // value={this.state.file}
                />
              </InputGroup>
            </Form>
            <Nav className="ml-auto">
              {!this.state.loading ? (
                <div className="searchToggle">
                  Zusatzmenü
                  {this.state.showSearch ? (
                    <BsFileArrowUp onClick={this.showSearch} />
                  ) : (
                    <BsFileArrowDown onClick={this.showSearch} />
                  )}
                </div>
              ) : null}
            </Nav>
            {/* <div className="safePanel"> */}
            <Form inline className="ml-auto">
              <InputGroup>
                <FormControl
                  type="text"
                  id="filename"
                  style={{ display: "block" }}
                  onChange={this.changeSafe}
                  value={this.state.safe}
                />
              </InputGroup>
            </Form>
            <Button onClick={this.handleSafe}>Speichern</Button>
            {/* </div> */}
          </Navbar.Collapse>
          {/* </div> */}
        </Navbar>

        {!this.state.loading ? (
          <TableView
            file={this.state.file}
            data={this.state.data}
            search={this.state.showSearch}
          />
        ) : (
          <div>Bitte Datei auswählen</div>
        )}
        {/* <TableView data={this.state.file} /> */}
      </div>
    );
  }
}

export default FileDialog;
