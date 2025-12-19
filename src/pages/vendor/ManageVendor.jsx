import { useState } from "react";
import ViewVendor from "./ViewVendor";

const ManageVendor = () => {
  const [step, setStep] = useState(1);
  const [employeesId, setEmployeesId] = useState(null);
  return (
    <>
      {step === 1 && (
        <ViewVendor
          step={step}
          setStep={setStep}
          setEmployeesId={setEmployeesId}
        />
      )}
      {/* {step === 2 && (
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
      {step === 4 && <AddUserDetails step={step} setStep={setStep} />} */}
    </>
  );
};

export default ManageVendor;
