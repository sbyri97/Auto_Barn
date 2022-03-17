import React from "react";

export default function Images({ states }) {
    const {
        imageUrl, setImageUrl
    } = states;

  return (
    <div>
      <h2>&nbsp; Image Url</h2>
      <div className="formTextContainer">
        <textarea
        className="formTextBox"
        type="textarea"
        placeholder="www.imageurlgoeshere.com/niceimage.jpg (Note: Must be a jpg, jpeg, png format)"
        value={imageUrl}
        onChange={(e) => {
            setImageUrl(e.target.value)}} />
      </div>
      <br />
    </div>
  );
}
