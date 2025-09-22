import { useState } from "react";
import Login from "./Login";
import Two_Factor_Authentication from "./Two_Factor_Authentication";

const MultilayerAuth = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 && <Login step={step} setStep={setStep} />}
      {step === 2 && (
        <Two_Factor_Authentication step={step} setStep={setStep} />
      )}
    </div>
  );
};

export default MultilayerAuth;
