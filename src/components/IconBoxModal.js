import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const IconBoxModal = (props) => {
  const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);

  return (
    <Modal
      {...props}
      show={props.show}
      onHide={props.handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.data.subTitle}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default IconBoxModal;
