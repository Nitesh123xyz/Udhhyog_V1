import { useState } from "react";
import ViewVendor from "./ViewVendor";
import ViewVendorAdditionalDetails from "./ViewVendorAdditionalDetails";
import UpdateVendor from "./UpdateVendor";

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
      {step === 3 && <UpdateVendor setStep={setStep} vendorId={vendorId} />}
    </>
  );
};

export default ManageVendor;
