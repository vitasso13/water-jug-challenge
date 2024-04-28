import express, { Request, Response, Router } from "express";
import bodyParser from "body-parser";
import jugService from "../services/jugService";

const router = Router();

router.use(bodyParser.json());

router.post("/jug", (req: Request, res: Response) => {
    const { x_capacity, y_capacity, z_amount_wanted } = req.body;

    if (
        [x_capacity, y_capacity, z_amount_wanted].some(
            (val) => typeof val !== "number" || val <= 0
        )
    ) {
        return res
            .status(400)
            .json({ error: "All parameters must be positive integers." });
    }

    const solution = jugService(x_capacity, y_capacity, z_amount_wanted);

    return typeof solution === "string"
        ? res.status(404).json({ solution })
        : res.json({ solution });
});

export default router;
