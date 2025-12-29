import { useState } from "react";
import ViewVendor from "./ViewVendor";
import ViewVendorAdditionalDetails from "./ViewVendorAdditionalDetails";

const ManageVendor = () => {
  const [step, setStep] = useState(1);
  const [vendorId, setVendorId] = useState(null);
  return (
    <>
      {step === 1 && <ViewVendor setStep={setStep} setVendorId={setVendorId} />}
      {step === 2 && (
        <ViewVendorAdditionalDetails
          step={step}
          setStep={setStep}
          vendorId={vendorId}
        />
      )}
      {/* {step === 3 && (
        <UpdateUserDetails
          step={step}
          setStep={setStep}
          vendorId={vendorId}
        />
      )}
      {step === 4 && <AddUserDetails step={step} setStep={setStep} />} */}
    </>
  );
};

export default ManageVendor;
