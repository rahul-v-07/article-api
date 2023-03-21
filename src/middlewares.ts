import { Request, Response, NextFunction } from "express";

function errorHandlingMiddleware(
  resource: (req: Request, res: Response, next: NextFunction) => Promise<void>
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    resource(req, res, next).catch((error) => {
      next(error);
    });
  };
}

export { errorHandlingMiddleware };
