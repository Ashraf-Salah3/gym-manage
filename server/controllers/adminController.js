import jwt from "jsonwebtoken";
import jsend from "jsend";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res
        .status(400)
        .json(jsend.fail({ message: "Email is not correct" }));
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res
        .status(400)
        .json(jsend.fail({ message: "Password is not correct" }));
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(jsend.success({ message: "Login successful" }));
  } catch (error) {
    res.status(500).json(jsend.error({ message: "Server error" }));
  }
};

export { loginAdmin };
