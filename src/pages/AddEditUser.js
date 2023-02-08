import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  spouse: "",
  location: "",
  address: "",
  dateofbirth:"",
  pdf_url:"",
  image_url:"",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const fd = new FormData();
  // const [name,setNmae]=useState(''),
  const { users } = useSelector((state) => state.data);
  const { name, spouse, location, address ,dateofbirth} = formValue;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    }
  }, [id]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleFile=(e)=>{
   console.log(e.target.files[0]);
setFormValue({...formValue,[e.target.name]:e.target.files[0],});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && spouse && location && address && dateofbirth  ) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated Successfully");
        setTimeout(() => navigate("/"), 500);
      }
    }
  };
  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      {/* <form onSubmit={handleSubmit}> */}
      <p className="fs-2 fw-bold">
        {editMode ? "Update User Detail" : "Add User Detail"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name || ""}
          name="name"
          type="text"
          onChange={onChange}
          required
          label="Name"
          validation="Please provide a name."
          invalid
        />
        <br />
        <MDBInput
          value={spouse || ""}
          name="spouse"
          onChange={onChange}
          required
          label="Spouse Name"
          type="text"
          validation="Please provide an spouse name."
          invalid
        />
        <br />
        <MDBInput
          value={location || ""}
          name="location"
          onChange={onChange}
          required
          label="Location"
          type="text"
          validation="Please provide a location."
          invalid
        />
        <br />
        <MDBInput
          value={address || ""}
          name="address"
          type="text"
          onChange={onChange}
          required
          label="Address"
          validation="Please provide an address"
          invalid
        />
        <br />
        <MDBInput
          value={dateofbirth || ""}
          name="dateofbirth"
          type="datetime-local"
          onChange={onChange}
          required
          label="DOB"
          validation="Please provide a date "
          invalid
          
        />
        <br />
        {/* <MDBInput
          value={image_url || ""}
          // name="image_url"
          type="file"
          onChange={handleFile}
          // required
          // label="DOB"
          // validation="Please provide a image "
          invalid
          inputProps={{
            accept: "image/png, image/jpeg, image/jpg, video/mp4",
          }}
          
        /> */}
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {editMode ? "Update" : "Add"}
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
      {/* </form> */}
    </MDBValidation>
  );
};

export default AddEditUser;
