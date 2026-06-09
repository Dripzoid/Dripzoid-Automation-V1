export function verifyInternalKey(req, res, next) {
  const key = req.headers["x-internal-key"];

  if (key !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
}