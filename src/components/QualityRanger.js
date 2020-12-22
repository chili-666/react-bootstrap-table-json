import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

class QualityRanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markup: false,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleMarkup = this.handleMarkup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  static propTypes = {
    value: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
  };
  static defaultProps = {
    value: 0,
  };
  getValue() {
    return this.state.content;
  }

  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }

  handleInputChange(e) {
    this.setState({ content: e.target.value });
  }

  handleMarkup = () => {
    this.setState((prev) => ({
      markup: !prev.markup,
    }));
  };

  render() {
    const { value, onUpdate, ...rest } = this.props;
    return [
      <div>
        ,
        <Row className="d-flex justify-content-center">
          {!this.state.markup ? (
            <Col md={6} lg={6}>
              <Button variant="outline-secondary" onClick={this.handleMarkup}>
                Markup
              </Button>
            </Col>
          ) : null}
          {this.state.markup ? (
            <Col md={6} lg={6}>
              <Button variant="outline-secondary">Normal</Button>
            </Col>
          ) : null}
        </Row>
        <Row
          style={{ marginTop: "5px" }}
          className="d-flex justify-content-center"
        >
          {this.state.markup ? (
            <Modal show={this.state.markup} style={{ opacity: 1 }}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Editor
                  key="editorText"
                  ref={(node) => (this.editorText = node)}
                  initialValue={value}
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
                  onChange={this.handleEditorChange}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleMarkup}>
                  Übernehmen
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            <input
              {...rest}
              key="content"
              type="text"
              value={this.state.content}
              onChange={this.handleInputChange}
            />
          )}
        </Row>
        <Row
          style={{ marginTop: "5px" }}
          className="d-flex justify-content-center"
        >
          {/* <button
            key="submit"
            className="btn btn-default"
            onClick={() => onUpdate(this.state.content)}
          >
            Speichern
          </button> */}
        </Row>
      </div>,
    ];
  }
}

export default QualityRanger;
