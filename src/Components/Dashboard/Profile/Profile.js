import React, { useContext, useLayoutEffect, useState } from 'react'
import ToTop from '../../Admin/includes/ToTop'
import HeaderSidebar from '../../Admin/includes/HeaderSidebar'
import AdminFooter from '../../Admin/includes/AdminFooter'
import { useFormik } from 'formik';
import { UpAdminSchema } from "../../../schema";
import AdminListService from '../../../services/admin-list.service';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreaters } from '../../../Redux';


export default function Profile() {
  const state = useSelector((state) => state.stateVals);
  const { id } = state;
  const [loading, setLoading] = useState(false);  

  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState(false);

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);


  const handleUpload = async (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  
  const uploadImage = async () => {

    if(file == "") {
      setFileError(true);
    } else {
      setFileError(false);
    
      var formData = new FormData();
      formData.append("image", file);
      
      try {

      setLoading(true);

      const response = await AdminListService.UpdateAdminProfile(
        id,
        formData,
      );

      userActions.UpdateImage({
        image: response.data.name
      });

      setLoading(false);

      toast.success(response.data.response, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

    } catch(err) {
      console.log(err);
      setLoading(false);

          // console.log(err.response.data);
      // toast.error(err.response.data, {
      //   position: "top-center",
      //   autoClose: 3000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      // if (err.response.status === 422) {
      //   setLoading(false);
      //   toast.error("Error, Unprocessable Content!", {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      // } else {
      //   setLoading(false);

      //   toast.error(err.response.data, {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      // }
      }
    }

  };
  
  return (
    <div className="semi-dark">
    <div className="wrapper">
    <ToastContainer />

      <HeaderSidebar />

      <main className="page-content">


          <div className="manage-heading-2">
            <h2>
              Profile Update
            </h2>
          </div>
          <div className="main-content-box">
             {/* <form className="profile-form" method='post'> */}
                    <div className="row">
                    
                    <div className="col-lg-6">
                      {/* <div
                        className={`form-floating ${
                          errors.file && touched.file
                            ? "is-danger"
                            : ""
                        }`}
                      > */}
                      <input type="file" name="file" className="form-control" id="customFile"
                        onClick={(e) => {
                          e.target.value = null;
                          setFile("");
                        }}
                      onChange={handleUpload} />
                    <label className="form-label" for="customFile">Choose Profile Image</label>
                        {/* {errors.file && touched.file ? (
                          <p className="help is-danger">
                            {errors.file}
                          </p>
                        ) : null} */}
                      {/* </div> */}
                    </div>

                    <div className="col-lg-6">
                        <button type="submit" className="btn btn-outline-secondary w-50" onClick={uploadImage} style={{height: "48px"}}>Update</button>
                    </div>
                    </div>
             {/* </form> */}
</div>
      </main>

      <ToTop />
      <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div>
    </div>
    <AdminFooter />
  </div>
  )
}
