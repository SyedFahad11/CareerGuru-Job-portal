
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";


function Card(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const [cardData, setUpdatedData] = useState(props);
  const [expanded, setExpanded] = useState(false);


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
                    <h6 className="text-muted">SOP :</h6>
                  </div>
                  <div className="col">
                    <h6 className="mb-0 text-muted">{cardData.Sop}</h6>
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

              </div>
              <div className="col-auto">
                <div className="row">
                  <Modal type="Accept"/>

                </div>
                <div className="row">
                  <Modal type="Reject"/>
                </div>
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
    margin:'auto'

  },
  cardComponent: {
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    padding: '10px',
  },

  button: {
    marginRight: '8px',
    marginBottom: '8px',
    width: '100%',
  },

};
export default Card;