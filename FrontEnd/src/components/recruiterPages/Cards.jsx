import React , { useState ,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import Popover from '@mui/material/Popover';


function Card(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const [popOverData, setPopOverData] = useState({});
    const [cardData,setUpdatedData]=useState(props);

    useEffect(() => {
        setPopOverData(props)
    }, [])



    const handleDelete = async (e) => {
        const response = await fetch('http://localhost:5000/api/jobs/deleteJob', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'jobId':props._id
            }
        })
        window.location.reload();
    }
    const handleApply = () => {

    }

    const [anchorEl, setAnchorEl] = useState(null);
    const handleUpdate= (event) => {
        setAnchorEl(1);
    };
    const handleClose = () => {
        setPopOverData(cardData);
        setAnchorEl(0);
    };

    const updateJobs=async(e)=>{
        e.preventDefault();
        const {title,Salary,Recruiter,WorkingHours,Info,Contact}=e.target;
        const response = await fetch("http://localhost:5000/api/jobs/updateJob", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'jobId':props._id
            },
            body: JSON.stringify({
                title: title.value,
                salary: Salary.value,
                postedBy: Recruiter.value,
                workingHours:WorkingHours.value,
                description:Info.value,
                contact:Contact.value
            })
        });
        const json=await response.json();
        setUpdatedData(popOverData);
    }
    const OnChange=(e)=>{

        setPopOverData({...popOverData,[e.target.name]:e.target.value})

    }



    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    return (
        <div>
            <div className="card card-component text-left col-lg-9 " style={{ borderRadius: "15px" }}>
                <div className="card-body " >

                    <h5 className=" row card-title mb-3">{cardData.title}</h5>

                    <div className="row mb-1">
                        <h6 className=" mb-0 text-muted">Salary :</h6>
                        <h6 className=" font-weight-normal mb-0 text-muted  ">{cardData.Salary}</h6>

                    </div>

                    <div className="row mb-1">
                        <h6 className=" mb-0 text-muted">Posted By :</h6>
                        <h6 className=" font-weight-normal mb-0 text-muted ">{cardData.Recruiter},
                            <a href="https://www.arcesium.com/careers/" className="text-muted" style={{ color: "black" }}> Arcesium</a></h6>

                    </div>
                    <div className="row mb-1">
                        <h6 className=" mb-0 text-muted">Working Hours:</h6>
                        <h6 className=" font-weight-normal mb-0 text-muted ">{cardData.WorkingHours}</h6>




                    </div>
                    <p className="row mb-2  text-muted ">{cardData.Info}</p>

                    <div className="row mb-2">
                        <h6 className=" mb-0 text-muted">Posted On :</h6>
                        <h6 className=" font-weight-normal mb-2 text-muted ">{cardData.postedDate}</h6>

                    </div>
                    {cardData.delete === 'false' ?
                        <div style={{}} >
                            <button className="btn btn-primary btn-sm" style={{ padding: "5px 50px", marginLeft: "-15px", marginRight: "25px",maxWidth:"150px" }} onClick={handleUpdate} >Update</button>

                            <button className="btn btn-danger btn-sm" style={{ padding: "5px 50px", marginLeft: "-15px" ,maxWidth:"150px"}} onClick={handleDelete}>Delete</button></div>
                            :
                        <div style={{}} >
                            <button className="btn btn-danger btn-sm" style={{ padding: "5px 50px", marginLeft: "-15px", marginRight: "25px" }} onClick={handleDelete}>Delete</button>

                            <button className="btn btn-success btn-sm" style={{ padding: "5px 50px", marginLeft: "-15px" }} onClick={handleApply}>Apply</button></div>
                    }

                </div>

            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}

                PaperProps={{
                    style: { width: '80%',height:'70%',marginTop:'10%',opacity:'90%' },
                }}
            >
                <div className="container-fluid my-3 ">
                    <h4>Update Job</h4>
                    <form className="my-3" onSubmit={updateJobs} >
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label ">Title</label>
                            <input type="text" className="form-control" name="title"
                             value={popOverData.title} required   onChange={OnChange} />
                            {/**/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label ">Salary</label>
                            <input type="text" className="form-control" name="Salary"  value={popOverData.Salary} required onChange={OnChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label ">PostedBy</label>
                            <input type="text" className="form-control" name="Recruiter" value={popOverData.Recruiter} onChange={OnChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label ">WorkingHours</label>
                            <input type="text" className="form-control" name="WorkingHours" value={popOverData.WorkingHours} onChange={OnChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label " >Description</label>
                            <input type="text" className="form-control" name="Info"  value={popOverData.Info}required  onChange={OnChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label ">Contact</label>
                            <input type="text" className="form-control" name="Contact" value={popOverData.Contact} required onChange={OnChange}/>
                        </div>

                        <button type="submit" className="btn btn-danger" >Update</button>
                    </form>
                </div>



            </Popover>

        </div>
    )
}
export default Card;