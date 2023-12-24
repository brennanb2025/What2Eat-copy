import React from "react";

const ColorLegend = () => {
  const buttonStyle = {
    fontSize: "12px", // Adjust the font size as per your preference
  };

  return (
    <div className="color-legend">
      <h6 className="mt-2">Color Legend:</h6>
      <button style={buttonStyle} className="btn btn-danger m-2">
        Expired/Expiring today
      </button>
      <button style={buttonStyle} className="btn btn-warning m-2">
        Expiring in 1 week
      </button>
      <button style={buttonStyle} className="btn btn-success m-2">
        Expiring in 2 weeks
      </button>
      <button style={buttonStyle} className="btn btn-info m-2">
        Expiring in more than 2 weeks
      </button>
    </div>
  );
};

export default ColorLegend;
