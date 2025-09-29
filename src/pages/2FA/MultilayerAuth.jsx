import { useState } from "react";
import Login from "./Login";
import Two_Factor_Authentication from "./Two_Factor_Authentication";

const MultilayerAuth = () => {
  const [step, setStep] = useState(1);
  const [authData, setAuthData] = useState({
    twofa_url: "",
    twofa_secret: "",
  });
  return (
    <div>
      {step === 1 && <Login setStep={setStep} setAuthData={setAuthData} />}
      {step === 2 && <Two_Factor_Authentication authData={authData} />}
    </div>
  );
};

export default MultilayerAuth;
