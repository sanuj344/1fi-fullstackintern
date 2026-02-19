export const healthCheck = (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "emi-platform-api",
    timestamp: new Date().toISOString()
  });
};
