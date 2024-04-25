const ProductsService = require("./service");
const models = require("../../models");
const { body, isISO8601, validationResult } = require("express-validator");

const Product = models.Product;
const User = models.User;
const productsService = new ProductsService({ Product, User });

function createProduct(req, res) {
  const paramsValidation = [
    body("userId").notEmpty().withMessage("userId is required"),
    body("dueDate")
      .notEmpty()
      .withMessage("dueDate is required")
      .isISO8601()
      .withMessage("dueDate must be a valid date"),
  ];
  Promise.all(paramsValidation.map((validation) => validation.run(req)))
    .then(async () => {
      const validationErr = validationResult(req);

      if (!validationErr.isEmpty()) {
        return res.status(400).send({
          errors: validationErr.array(),
        });
      }
      const response = await productsService.createProduct(req.body);
      return res.send(response);
    })
    .catch((_err) => {
      return res.status(500).send({
        message: "Something went wrong",
      });
    });
}
function updateProduct(req, res) {
  const paramsValidation = [
    body("_id").notEmpty().withMessage("_id is required"),
    body("userId").notEmpty().withMessage("userId is required"),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("dueDate must be a valid date"),
  ];
  Promise.all(paramsValidation.map((validation) => validation.run(req)))
    .then(async () => {
      const validationErr = validationResult(req);

      if (!validationErr.isEmpty()) {
        return res.status(400).send({
          errors: validationErr.array(),
        });
      }
      const response = await productsService.updateProduct(
        req.params._id,
        req.body
      );
      return res.send(response);
    })
    .catch((_err) => {
      return res.status(500).send({
        message: "Something went wrong",
      });
    });
}
function deleteProduct(req, res) {
  const paramsValidation = [
    param("_id").notEmpty().withMessage("Product Id is required. "),
  ];

  Promise.all(paramsValidation.map((validation) => validation.run(req))).then(
    async () => {
      const validationErr = validationResult(req);

      if (!validationErr.isEmpty()) {
        return res.status(400).send({
          errors: validationErr.array(),
        });
      }

      const response = await productsService.deleteUser(req.params._id);

      return res.send(response);
    }
  );
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};