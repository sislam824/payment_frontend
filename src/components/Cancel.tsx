import React from "react";

const Cancel: React.FC = () => {
  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <img
        style={{ borderRadius: "50%" }}
        src="https://media0.giphy.com/media/H83AtuIiUPdxvWXzFK/200w.gif?cid=6c09b952e0y84lhpg330r96vl3vdos939fonaks89qc87ok2&ep=v1_gifs_search&rid=200w.gif&ct=g"
        alt="Cancelled payment animation"
      />
      <h2>Payment Cancelled!!!</h2>
    </div>
  );
};

export default Cancel;
