import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";

const UserInfo = () => {
  const { users } = useSelector((state) => state.data);
  const { id } = useParams();
  const navigate = useNavigate();
  const singleUser = users.find((item) => item.id === Number(id));
  

  return (
    <div style={{ marginTop: "100px" }}>
      <div
        className="row"
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
        }}
      >
        <p className="col-md-12 fs-3">User Detail</p>
        <hr />
        <p className="col-md-6 fw-bold">ID:</p>
        <p className="col-md-6">{singleUser.id}</p>
        <p className="col-md-6 fw-bold">Name:</p>
        <p className="col-md-6">{singleUser.name}</p>
        <p className="col-md-6 fw-bold">Spouse Name:</p>
        <p className="col-md-6">{singleUser.spouse}</p>
        <p className="col-md-6 fw-bold">Location:</p>
        <p className="col-md-6">{singleUser.location}</p>
        <p className="col-md-6 fw-bold">Address:</p>
        <p className="col-md-6">{singleUser.address}</p>
        <p className="col-md-6 fw-bold">DOB:</p>
        <p className="col-md-6">{singleUser.dateofbirth.substring(0, 10)}</p>
        
      </div>
      <MDBBtn onClick={() => navigate("/")} color="danger">
        Go Back
      </MDBBtn>
      
    </div>
  );
};

export default UserInfo;
