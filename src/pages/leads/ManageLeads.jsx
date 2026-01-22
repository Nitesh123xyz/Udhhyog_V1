import { useState } from "react";
import ViewLeads from "./ViewLeads";

const ManageLeads = () => {
  const [step, setStep] = useState(1);
  const [leadsId, setLeadsId] = useState(null);

  return (
    <>
      {step === 1 && <ViewLeads setStep={setStep} setLeadsId={setLeadsId} />}
      {/* {step === 2 && (
        <ViewVendorAdditionalDetails
          step={step}
          setStep={setStep}
          leadsId={leadsId}
        />
      )}
      {step === 3 && <UpdateVendor setStep={setStep} leadsId={leadsId} />} */}
    </>
  );
};

export default ManageLeads;
