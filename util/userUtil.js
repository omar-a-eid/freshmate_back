import userModel from "../models/userModel.js";

export async function userExists(email) {
  const existingUser = await userModel.findOne({ email: email.toLowerCase() });
  return existingUser;
}

export function mapGender(gender) {
  const genderMapping = {
    male: { en: "male", ar: "ذكر" },
    female: { en: "female", ar: "انثى" },
    ذكر: { en: "male", ar: "ذكر" },
    انثى: { en: "female", ar: "انثى" },
  };
  return genderMapping[gender.toLowerCase()];
}
