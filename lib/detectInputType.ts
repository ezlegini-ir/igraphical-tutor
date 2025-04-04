export const detectInputType = (input: string): "phone" | "email" => {
  const phoneRegex = /^0\d{10}$/;

  if (phoneRegex.test(input)) {
    return "phone";
  } else {
    return "email";
  }
};
