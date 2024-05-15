
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";


function Card(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const [cardData, setUpdatedData] = useState(props);
  const [expanded, setExpanded] = useState(false);
  const [buttonState, setButton] = useState(props.Status);

  const handleToggleDescription = () => {
    setExpanded(!expanded);
  };


  return (
    <div className="row">
      <div className="col-md-6" style={styles.cardContainer}>


        <div className="card card-component text-left col-lg-9" style={styles.cardComponent}>
          <div className="card-body ">

            <div className="row">
              <div className="col">
                <div className="row mb-2">
                  <div className="col-auto">
                    <h6 className="text-muted">Name :</h6>
                  </div>
                  <div className="col">
                    <h6 className="mb-0 text-muted">{cardData.Name}</h6>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-auto">
                    <h6 className="text-muted">Date :</h6>
                  </div>
                  <div className="col">
                    <h6 className="mb-0 text-muted">{cardData.Date}</h6>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-auto">
                    <h6 className="text-muted">SOP :</h6>
                  </div>

                  {props.Sop.length > 100 ? (
                    <div className="col">
                      {expanded ? (
                        <div className="row mb-2" style={styles.expanded}>
                          <div className="">
                            <h6 className="fw-normal mb-0 text-muted" style={styles.para}>
                              {props.Sop}
                            </h6>
                          </div>
                          <div className="">
                            <button className="btn btn-link btn-sm" onClick={handleToggleDescription}>
                              Show Less
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="row mb-2" style={styles.truncated}>
                          <div className="">
                            <h6 className="fw-normal mb-0 text-muted" style={styles.para}>
                              {props.Sop.substring(0, 200)}
                            </h6>
                          </div>
                          <div className="">
                            <button className="btn btn-link btn-sm pt-0 mt-0" onClick={handleToggleDescription}>
                              Show More
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col">
                        <h6 className="fw-normal mb-2 text-muted">{props.Sop}</h6>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              <div className="col-auto">
                {buttonState === 'Pending' &&
                  <div  >
                    <div className="row" >
                      <Modal type="Accept" setter={setButton} _id={props.ApplicationId}/>

                    </div>
                    <div className="row">
                      <Modal type="Reject" setter={setButton} _id={props.ApplicationId}/>

                    </div>
                  </div>

                }
                {buttonState === 'Accepted' &&
                  <button className="btn btn-success p-4 btn-md">Accepted</button>
                }
                {buttonState === 'Rejected' &&
                  <button className="btn btn-danger p-4 btn-md">Rejected</button>
                }
              </div>



            </div>





          </div>
        </div>
      </div>
    </div >
  )
}

const styles = {
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    margin: 'auto'

  },
  cardComponent: {
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    padding: '10px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  button: {
    marginRight: '8px',
    marginBottom: '8px',
    width: '100%',
  },
  truncated: {

    overflow: 'visible',
    whiteSpace: 'normal',

  },

  expanded: {
    overflow: 'hidden',
    whiteSpace: 'normal',

  },
  para: {
    lineHeight: '1.5em',
    whiteSpace: 'pre-wrap'

  }

};
export default Card;