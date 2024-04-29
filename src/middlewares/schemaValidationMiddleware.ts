const schemaValidator = (req: any, res: any, next: any) => {
  const { x_capacity, y_capacity, z_amount_wanted } = req.body;

  let schema_validate: boolean;

  try {
    schema_validate = [x_capacity, y_capacity, z_amount_wanted].every(
      (val) => Number.isInteger(val) && val > 0
    );
  } catch (error) {
    return res
      .status(400)
      .json({ error: "All parameters must be positive integers." });
  }

  if (!schema_validate) {
    return res
      .status(400)
      .json({ error: "All parameters must be positive integers." });
  }
  next();
};
export default schemaValidator;
