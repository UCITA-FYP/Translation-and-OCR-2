import React from "react";

const ImageWrapper = ({ uploadFile, loading }) => {
  return (
    <div className="image-wrapper">
      {loading ? (
        <h2>Processing...Please wait</h2>
      ) : (
        <form>
          <input
            type="file"
            className="custom-file-input"
            name="image"
            onChange={e => uploadFile(e)}
          />
        </form>
      )}
    </div>
  );
};

export default ImageWrapper;
