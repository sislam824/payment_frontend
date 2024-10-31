import React from "react";

const Success: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="https://i.gifer.com/7efs.gif" alt="Payment Successful" />
      <h2>Payment Successful</h2>
    </div>
  );
};

export default Success;
