import { useState } from "react";
import ViewTeam from "./ViewTeam";
import ViewAllTeam from "./ViewAllTeam";

const TeamManage = () => {
  const [step, setStep] = useState(1);
  const [teamId, setTeamId] = useState(null);
  return (
    <>
      {step === 1 && <ViewAllTeam setStep={setStep} setTeamId={setTeamId} />}
      {step === 2 && <ViewTeam setStep={setStep} teamId={teamId} />}
    </>
  );
};

export default TeamManage;
