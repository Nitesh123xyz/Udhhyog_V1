import React, { useState } from "react";
import Users from "./Users";
import UserAdditionalDetails from "./UserAdditionalDetails";
import UpdateUserDetails from "./UpdateUserDetails";

const UserTableInfo = () => {
  const [step, setStep] = useState(1);
  const [employeesId, setEmployeesId] = useState(null);
  return (
    <>
      {step === 1 && (
        <Users setStep={setStep} setEmployeesId={setEmployeesId} />
      )}
      {step === 2 && (
        <UserAdditionalDetails setStep={setStep} employeesId={employeesId} />
      )}
      {step === 3 && (
        <UpdateUserDetails setStep={setStep} employeesId={employeesId} />
      )}
    </>
  );
};

export default UserTableInfo;
