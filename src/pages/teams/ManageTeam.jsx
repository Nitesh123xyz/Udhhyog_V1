import { useState } from "react";
import ViewTeam from "./ViewTeam";
import ViewAllTeam from "./ViewAllTeam";

const ManageTeam = () => {
  const [step, setStep] = useState(1);
  const [teamId, setTeamId] = useState(null);
  const [teamName, setTeamName] = useState("");
  return (
    <>
      {step === 1 && (
        <ViewAllTeam
          setStep={setStep}
          setTeamId={setTeamId}
          setTeamName={setTeamName}
        />
      )}
      {step === 2 && (
        <ViewTeam setStep={setStep} teamId={teamId} teamName={teamName} />
      )}
    </>
  );
};

export default ManageTeam;
