import { useState } from "react";
import Users from "./Users";
import UserAdditionalDetails from "./UserAdditionalDetails";
import UpdateUserDetails from "./UpdateUserDetails";
import AddUserDetails from "./AddUserDetails";

const UserTableInfo = () => {
  const [step, setStep] = useState(1);
  const [employeesId, setEmployeesId] = useState(null);
  return (
    <>
      {step === 1 && (
        <Users step={step} setStep={setStep} setEmployeesId={setEmployeesId} />
      )}
      {step === 2 && (
        <UserAdditionalDetails
          step={step}
          setStep={setStep}
          employeesId={employeesId}
        />
      )}
      {step === 3 && (
        <UpdateUserDetails
          step={step}
          setStep={setStep}
          employeesId={employeesId}
        />
      )}
      {step === 4 && <AddUserDetails step={step} setStep={setStep} />}
    </>
  );
};

export default UserTableInfo;
