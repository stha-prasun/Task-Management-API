import jwt from "jsonwebtoken";

const isReporter = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(decode.role !== "reporter"){
        return res.status(401).json({
        message: "Invalid permissions",
        success: false,
        });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default isReporter;