import { useState } from "react";
import ViewLeads from "./ViewLeads";
import ViewLeadAdditionalDetails from "./ViewLeadAdditionalDetails";
import UpdateLeads from "./UpdateLeads";

const ManageLeads = () => {
  const [step, setStep] = useState(1);
  const [leadsId, setLeadsId] = useState(null);

  return (
    <>
      {step === 1 && <ViewLeads setStep={setStep} setLeadsId={setLeadsId} />}
      {step === 2 && (
        <ViewLeadAdditionalDetails
          step={step}
          setStep={setStep}
          leadsId={leadsId}
        />
      )}
      {step === 3 && (
        <UpdateLeads step={step} setStep={setStep} leadsId={leadsId} />
      )}
    </>
  );
};

export default ManageLeads;
