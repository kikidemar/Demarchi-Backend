import { Router } from "express";

const logger_router = Router()

logger_router.use('/', (req, res) => {
  req.logger.debug("Debug message");
  req.logger.info("Info message");
  req.logger.warning("Warning message");
  req.logger.error("Error message");
  req.logger.fatal("Fatal message");
  res.send("Logger test completed.");
})

export default logger_router