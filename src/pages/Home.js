import React, { useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserStart, loadUsersStart } from "../redux/actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams} from "react-router-dom";
const Home = () => {
  const { users, loading } = useSelector((state) => state.data);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);
  const { id } = useParams();
  // const singleUser = users.find((item) => item.id === Number(id));
  const handleclick = (item) => {
    // using Java Script method to get PDF file
    fetch(item).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "data.pdf";
        alink.click();
      });
    });
  };

  

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete user ?")) {
      dispatch(deleteUserStart(id));
      toast.success("User Delete Successfully");
    }
  };
  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Spouse Name</th>
            <th scope="col">Location</th>
            <th scope="col">Address</th>
            <th scope="col">DOB</th>
            <th scope="col">Image</th>
            <th scope="col">Download Pdf</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        {users &&
          users.map((item, index) => (
            <MDBTableBody>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.spouse}</td>
                <td>{item.location}</td>
                <td>{item.address}</td>
                <td>{item.dateofbirth.substring(0, 10)}</td>
                <td> <img
                      src={item.image_url}
                      style={{ width: "100px", height: "50px" }}
                      alt="StocksLOGO"
                    />
                          </td>
                <td>
                  <MDBBtn
                    color="dark"
                    type="submit"
                    onClick={() =>
                      handleclick("http://localhost:5000/users/${pdf}/pdf" + item.pdf_url)
                    }
                  >
                    <a
                      download="data.pdf"
                      target="_blank"
                      href={"http://localhost:5000/users/${pdf}/pdf" + item.pdf_url}
                      style={{ textDecoration: "none" }}
                    >
                      Download
                    </a>
                  </MDBBtn>
                </td>
                <td>
                  <MDBBtn
                    className="m-1"
                    tag="a"
                    color="none"
                    onClick={() => handleDelete(item.id)}
                  >
                    {" "}
                    <MDBTooltip title="Delete" tag="a">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39" }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </MDBBtn>{" "}
                  <Link to={`/editUser/${item.id}`}>
                    <MDBTooltip title="Edit" tag="none">
                      <MDBIcon
                        fas
                        icon="pen"
                        style={{ color: "#55acee", marginBottom: "10px" }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>{" "}
                  <Link to={`/userInfo/${item.id}`}>
                    <MDBTooltip title="View" tag="none">
                      <MDBIcon
                        fas
                        icon="eye"
                        size="lg"
                        style={{ color: "#3b5998", marginBottom: "10px" }}
                      />
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            </MDBTableBody>
          ))}
      </MDBTable>
    </div>
  );
};

export default Home;
