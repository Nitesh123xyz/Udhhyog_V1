import { useState } from "react";
import Department from "./Department";
import UpdateUserDetails from "./UpdateUserDetails";
import AddUserDetails from "./AddUserDetails";
import ViewDepartment from "./ViewDepartment";

const ManageDepartment = () => {
  const [step, setStep] = useState(1);
  const [employeesId, setEmployeesId] = useState(null);
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

export default ManageDepartment;
