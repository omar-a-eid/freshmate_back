import Ajv from "ajv";

const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 50 },
    email: { type: "string" },
    password: { type: "string", minLength: 6 },
    gender: {
      type: "object",
      properties: {
        ar: { type: "string", enum: ["ذكر", "انثى"] },
        en: { type: "string", enum: ["male", "female"] },
      },
      required: ["ar", "en"],
    },
  },
  required: ["username", "email", "password", "gender"],
};

export default ajv.compile(userSchema);
