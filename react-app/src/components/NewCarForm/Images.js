import React from "react";

export default function Images({ states }) {
    const {
        imageUrl, setImageUrl
    } = states;

  return (
    <div className="model TextContainer">
      <h3>&nbsp; Image Url:</h3>
      <div className="formTextContainer">
        <textarea
        className="image-formTextBox"
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
