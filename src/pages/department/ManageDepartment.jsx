import { useState } from "react";
import Department from "./Department";
import ViewDepartment from "./ViewDepartment";

const ManageDepartment = () => {
  const [step, setStep] = useState(1);
  const [DepartmentInfo, setDepartmentInfo] = useState({
    id_profile: null,
    profile_name: "",
  });
  return (
    <>
      {step === 1 && (
        <Department
          step={step}
          setStep={setStep}
          setDepartmentInfo={setDepartmentInfo}
        />
      )}
      {step === 2 && (
        <ViewDepartment
          step={step}
          setStep={setStep}
          DepartmentInfo={DepartmentInfo}
        />
      )}
    </>
  );
};

export default ManageDepartment;
