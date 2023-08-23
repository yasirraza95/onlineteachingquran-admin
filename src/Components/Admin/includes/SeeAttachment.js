import React from "react";
export default function SeeAttachment(props) {
  const placeholderImage =
  "https://res.cloudinary.com/sparkcloudsforewards/image/upload/v1678783786/No_Image_Available_izjkwf.jpg";
const onImageError = (e) => {
  e.target.src = placeholderImage;
};
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered img-control-wid">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Attachment
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <img src={props.src} alt="no url" className="img-fluid" onError={onImageError}/>
          </div>
        </div>
      </div>
    </div>
  );
}
