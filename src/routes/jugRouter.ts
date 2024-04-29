import express, { Request, Response, Router } from "express";
import bodyParser from "body-parser";
import processJug from "../services/jugService";
import schemaValidator from "../middlewares/schemaValidationMiddleware";

const router = Router();

router.use(bodyParser.json());
router.use(schemaValidator);

router.post("/jug", (req: Request, res: Response) => {
    const { x_capacity, y_capacity, z_amount_wanted } = req.body;

    const solution = processJug(x_capacity, y_capacity, z_amount_wanted);

    return typeof solution === "string"
        ? res.status(404).json({ solution })
        : res.json({ solution });
});

export default router;
