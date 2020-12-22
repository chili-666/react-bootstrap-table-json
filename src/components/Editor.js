import React from "react";
import TableView from "../views/TableView";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      shouldClose: true,
    };
    // this.closeModal = this.closeModal.bind(this);
  }
  getValue() {
    return parseInt(this.range.value, 10);
  }

  // componentDidUpdate(props) {
  //   let table = document.getElementById("editTable");

  //   let rows = table.rows;
  //   let cells = rows[this.props.row + 1].cells;
  //   let headers = [];
  //   for (let i = 0; i < cells.length; i++) {
  //     console.log("For", cells[i]);
  //   }

  //   let data = this.props.data[this.props.row];
  //   // console.log("ROW", rows[this.props.row + 0]);
  //   // console.log("Column", cells[this.props.column]);
  //   // console.log("DATA", data);
  // }

  render() {
    console.log("Modal-Props", this.props);
    return (
      <div>
        <Modal
          show={this.props.show}
          // hide={this.props.hide}
          onHide={this.props.onClose}
          style={{ opacity: 1 }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            TestModal
            {this.props.value}
            {/* <Editor
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
              }}
            /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Editor;
