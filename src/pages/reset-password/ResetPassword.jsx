import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Otp from "./Otp";
import ChangePassword from "./ChangePassword";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [sharing_otp, setSharingOtp] = useState("");

  return (
    <>
      {step === 1 && <ForgotPassword setStep={setStep} />}
      {step === 2 && <Otp setStep={setStep} setSharingOtp={setSharingOtp} />}
      {step === 3 && <ChangePassword sharing_otp={sharing_otp} />}
    </>
  );
};

export default ResetPassword;
