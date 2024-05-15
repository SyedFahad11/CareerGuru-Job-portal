
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./UpdateModal";


function Card(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const [cardData, setUpdatedData] = useState(props);
    const [expanded, setExpanded] = useState(false);


    return (
        <div>
            <div className="card card-component text-left col-lg-9">
                <div className="card-header">

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
                            <h6 className="text-muted">Id :</h6>
                        </div>
                        <div className="col">
                            <h6 className="mb-0 text-muted">{cardData.ApplicationId}</h6>
                        </div>
                    </div>


                    <div className="row mb-2">
                        <div className="col-auto">
                            <h6 className="text-muted">SeekerId :</h6>
                        </div>
                        <div className="col">
                            <h6 className="mb-0 text-muted">{cardData.SeekerId}</h6>
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

    },
    cardComponent: {
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        padding: '10px',
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#333',
    },
    actionButton: {
        padding: '8px 20px',
        marginLeft: '10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
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