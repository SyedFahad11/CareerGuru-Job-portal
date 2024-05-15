import React, { useState } from "react";

function Modal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.description.value;
    console.log(content);
    props.type === 'Accept' ? props.setter("Accepted") : props.setter("Rejected");
    /* const response = await fetch('http://localhost:5000/api/seek/applyJob', {
  method: 'Post',
  headers: {
    'auth-token': token,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ job_id: props._id, sop: content })
});
const resp = await response.text();
console.log(resp);
*/
  }

  return (
    <>
      {props.type === "Accept" && <button className="btn btn-success btn-sm" onClick={handleShow} style={styles.button}>
        Accept
      </button>}
      {props.type === "Reject" && <button className="btn btn-danger btn-sm" onClick={handleShow} style={styles.button}>
        Reject
      </button>}


      <div
        className={`modal fade ${show ? 'show' : ''}`}
        style={{ display: show ? 'block' : 'none' }}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable " role="document">
          <div className="modal-content" style={styles.modalContent}>
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title">
                Write Message
              </h6>

              <button
                type="button"
                className="close ml-auto"
                aria-label="Close"
                onClick={handleClose}
                style={styles.closeButton}
              >
                <span aria-hidden="true">&times;</span>
              </button>

            </div>
            <div className="modal-body" >
              <form onSubmit={handleSubmit} className="form-signup">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4" // Adjust the number of rows as needed
                    placeholder="Reason"
                    style={styles.textarea} // Add custom styles
                    required
                  ></textarea>
                </div>

                <button className={`btn ${props.type === 'Accept' ? 'btn-success' : 'btn-danger'} mt-2`} type="submit">
                  {props.type}
                </button>
              </form>
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
    maxWidth: "800px", // Adjust as needed
    margin: "auto",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Add box shadow for a better appearance

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
  textarea: {
    resize: 'vertical', // Allow vertical resizing
    minHeight: '100px', // Set a minimum height
    maxHeight: '300px', // Set a maximum height (optional)
  },
  input: {
    width: '',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '0.25rem',
    border: '1px solid #ced4da',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    boxSizing: 'border-box',
  },
  button: {
    marginRight: '8px',
    marginBottom: '8px',
    width: '100%',
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto'
  },
};

export default Modal;
