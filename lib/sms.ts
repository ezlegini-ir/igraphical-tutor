import Kavenegar from "kavenegar";
import { generateSmsOtp } from "./otp";

var sms = Kavenegar.KavenegarApi({
  apikey: process.env.KAVENEGAR_API!,
});

export const sendOtpSms = async (phone: string) => {
  const { plainOtp } = await generateSmsOtp(phone);

  return sms.VerifyLookup(
    {
      receptor: phone,
      token: plainOtp,
      template: "igraphical",
    },
    function (response, status) {
      // console.log(response);
      // console.log(status);
    }
  );
};
