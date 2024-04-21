import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { mapGender, userExists } from "../util/userUtil.js";
import validate from "../util/userValidation.js";

export async function signup(req, res) {
  try {
    const { email, gender, password } = req.body;
    // map the gender to the corresponding object
    if (gender) req.body.gender = mapGender(gender);

    // Validate request body
    const valid = validate(req.body);
    if (!valid) return res.status(400).json(validate.errors);

    // Check if user already exists
    const userAlreadyExists = await userExists(email);
    if (userAlreadyExists)
      return res.status(400).send("The user already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update request body with hashed password and lowercased email
    req.body.password = hashedPassword;
    req.body.email = email.toLowerCase();

    await userModel.create(req.body);

    return res.status(200).send("User is created successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
}


export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const valid = validate(req.body);

    if (!valid) return res.status(400).json(validate.errors);
    const user = await userModel.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    return res.status(200).send("Login successful");
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
}

export async function update(req, res) {}

export async function getusers(req, res) {
  // get all users from the DB
  var AllUsers = await userModel.find();
  if (AllUsers) {
      // return res.json(AllUsers);
      return (res.status(200).json({ Message: `All Users found` , AllUsers }));
  }
  return (res.status(400).json({ message: "error in loading All the Users" }));
}
