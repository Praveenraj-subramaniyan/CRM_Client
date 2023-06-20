import React from "react";

function Dashboard(data) {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-10 col-sm-5 me-5 mb-3 py-5 dashBoardComp me-2">
          <h2 className="my-5 text-center">TotalUser : {data.TotalUser}</h2>
        </div>
        <div className="col-10 col-sm-5 me-5  mb-3 py-5 dashBoardComp">
          <h2 className="my-5 text-center">TotalLeads : {data.TotalLeads}</h2>
        </div>
        <div className="col-10 col-sm-5 me-5 mb-3 py-5 dashBoardComp">
          <h2 className="my-5 text-center">TotalServices : {data.TotalServices}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
