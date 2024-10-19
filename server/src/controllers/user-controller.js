import jwt from "jsonwebtoken";
import userModel from "../postgresql/schema/userSchema.js";
import roleModel from "../postgresql/schema/rolesSchema.js";
import permissionModel from "../postgresql/schema/permissionSchema.js";

const SECRET_KEY = "f27om2feQYLKQZl6uBkw";

const signup = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await userModel.findOne({
    where: {
      username: username,
    },
  });
  if (existingUser) {
    return res.status(409).send("User already exists");
  } else {
    try {
      const user = await userModel.create({ username: username, password: password });
      const role = await roleModel.findOne({
        where: {
          role: "default",
        },
      });
      user.addRole(role);
      res.status(201).send("User registered");
    } catch (err) {
      console.log(err);
      res.status(401).send("User could not be created");
    }
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await userModel.findOne({
    where: {
      username: username,
    },
  });

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (isMatch && existingUser) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "10h" });
    res.status(201).json({ token });
  } else {
    res.status(409).send("Invalid credentials");
  }
};

await userModel.sync({ alter: true });

const userController = {
  signup,
  signin,
};

export default userController;
