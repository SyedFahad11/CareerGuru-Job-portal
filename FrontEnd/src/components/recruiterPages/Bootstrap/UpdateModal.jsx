import React, { useState } from "react";

function Modal(props) {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(props.cardData);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem('token');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, location, salary, description, category, contractType } = e.target;

    const response = await fetch("http://localhost:5000/api/rec/updateJob", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'jobId': props.cardData._id
        },
        body: JSON.stringify({
            title: title.value,
            location:location.value,
            salary: salary.value,
            description: description.value,
            category:category.value,
            contractType:contractType.value,

        })
    });
    const json = await response.json();
    console.log(json)

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  }

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={handleShow} style={styles.actionButton}>
        Update Details
      </button>

        <div
          className={`modal fade ${show ? 'show' : ''}`}
          style={{ display: show ? 'block' : 'none', }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={styles.modalContent}>

              <div className="modal-header" >
                <h6 className="modal-title" id="modal-title">
                  Update Details
                </h6>

                <div style={styles.closeButton}>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={handleClose}

                  >
                    <span aria-hidden="true" >&times;</span>

                  </button>
                </div>

              </div>

              <div className="modal-body">
                <form onSubmit={handleUpdate} className="form-signup">

                  <div className="form-group mb-2">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control mt-1 text-muted "
                      id="title"
                      name="title"
                      placeholder="Enter title"
                      value={modalData.Title}
                      onChange={handleChange}

                      style={styles.input}
                    // Add any necessary onChange handlers or defaultValue if needed
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="location">Location </label>
                    <input
                      type="text"
                      className="form-control  mt-1 text-muted"
                      id="location"
                      name="location"
                      placeholder="Enter location"
                      value={modalData.Location}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="salary">Salary </label>
                    <input
                      type="text"
                      className="form-control mt-1 text-muted"
                      id="salary"
                      name="salary"
                      placeholder="Enter salary"
                      value={modalData.Salary}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="info">Description </label>
                    <textarea
                      className="form-control mt-1 text-muted"
                      id="info"
                      name="description"
                      rows="4"
                      placeholder="Write info"
                      value={modalData.Info}
                      onChange={handleChange}
                      style={styles.textarea}
                    ></textarea>
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="category">Category </label>
                    <input
                      type="text"
                      className="form-control mt-1 text-muted"
                      id="category"
                      name="category"
                      placeholder="Enter category"
                      value={modalData.Category}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="contractType">Contract Type </label>
                    <input
                      type="text"
                      className="form-control mt-1 text-muted "
                      id="contractType"
                      name="contractType"
                      placeholder="Enter contract type"
                      value={modalData.Contract}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.buttonGroup}>

                    <button className="btn btn-primary mt-4 px-4" type="submit">
                      Update
                    </button>
                  </div>
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
  textarea: {
    resize: 'vertical', // Allow vertical resizing
    minHeight: '100px', // Set a minimum height
    maxHeight: '300px', // Set a maximum height (optional)
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default Modal;
