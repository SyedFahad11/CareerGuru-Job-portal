import React, { useState } from "react";

function Modal(props) {
  const [show, setShow] = useState(props.effect);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-success btn-sm" onClick={handleShow} style={styles.actionButton}>
        Apply
      </button>

      <div
        className={`modal fade ${show ? 'show' : ''}`}
        style={{ display: show ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={styles.modalContent}>
            <div className="modal-header">
              <h5 className="modal-title" id="modal-title">
                Modal Title
              </h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Modal Content Goes Here
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop show" style={styles.backdrop}></div>}
    </>
  );
}

const styles = {
  modalContent: {
    backgroundColor: "white",
    borderRadius: "10px",
    maxWidth: "600px", // Adjust as needed
    margin: "auto",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" // Add box shadow for a better appearance
  },
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    zIndex: 1040 // Make sure it's above the modal
  },
  actionButton: {
    padding: '8px 20px',
    marginLeft: '10px',
},
};

export default Modal;
