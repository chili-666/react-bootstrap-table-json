import React from "react";
import { BsFileArrowUp } from "react-icons/bs";
import Navbar from "react-bootstrap/NavBar";
import { Form, FormControl, InputGroup } from "react-bootstrap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("RELOAD");
    return (
      <Navbar bg="light" expand="lg">
        <div className="add-media" onClick={this.handleClick.bind(this)}>
          <Form inline>
            <InputGroup>
              <InputGroup.Prepend>
                <BsFileArrowUp /> Datei hochladen
              </InputGroup.Prepend>
              <FormControl
                type="file"
                id="file"
                ref={(ref) => (this.fileUpload = ref)}
                accept=".json"
                style={{ display: "none" }}
                onChange={this.fileUpload}

                //   value={this.state.file}
              />
            </InputGroup>
          </Form>
          TESTTESTTESTERESTETETST
        </div>
      </Navbar>
    );
  }
}

export default NavBar;
