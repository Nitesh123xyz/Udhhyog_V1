import React from "react";

const UpdateUserDetails = ({ setStep, employeesId }) => {
  return (
    <div>
      <h3>{employeesId}</h3>
      <button onClick={() => setStep(1)}>Back</button>
    </div>
  );
};

export default UpdateUserDetails;
