const UsersService = require("./service");
const { body, query, param, validationResult } = require("express-validator");
const models = require("./../../models");

const User = models.User;
const usersService = new UsersService({
  User,
});

function createUser(req, res) {
  const paramsValidation = [
    body("fullName").notEmpty().withMessage("Full Name is required."),
    body("job").notEmpty().withMessage("Job is required."),
    body("role").notEmpty().withMessage("Role is required."),
    body("email").notEmpty().withMessage("Email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ];

  Promise.all(paramsValidation.map((validation) => validation.run(req)))
    .then(async () => {
      const validationErr = validationResult(req);

      if (!validationErr.isEmpty()) {
        return res.status(400).send({
          errors: validationErr.array(),
        });
      }

      const response = await usersService.createUser(req.body);

      return res.send(response);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Something went wrong",
      });
    });
}

function updateUser(req, res) {
  const paramsValidation = [
    param("id").notEmpty().withMessage("User ID is required."),
    body("fullName").notEmpty().withMessage("Full Name is required."),
    body("job").notEmpty().withMessage("Job is required."),
    body("role").notEmpty().withMessage("Role is required."),
    body("email").notEmpty().withMessage("Email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ];

  Promise.all(
    paramsValidation.map((validation) => validation.run(req))
  ) /* on attend que tous se fasse 
    avant de passer à la suite*/
    .then(async () => {
      const validationErr = validationResult(req);

      if (!validationErr.isEmpty()) {
        return res.status(400).send({
          errors: validationErr.array(),
        });
      }

      const response = await usersService.updateUser(req.params.id, req.body);
      return res.send(response);
    });
}

function deleteUser(req, res) {
  //_id
  const paramsValidation = [
    param("id").notEmpty().withMessage("User ID is required. "),
  ];

  Promise.all(paramsValidation.map((validation) => validation.run(req))).then(
    async () => {
      const validationErr = validationResult(req);

      if (!validationErr.isEmpty()) {
        return res.status(400).send({
          errors: validationErr.array(),
        });
      }

      const response = await usersService.deleteUser(req.params.id);
      //params._id
      return res.send(response);
    }
  );
}

async function listAllUsers(req, res) {
  const paramsValidation = [
    query("page").optional().isInt().withMessage("Page must be an integer."),
    query("limit").optional().isInt().withMessage("Limit must be an integer."),
  ];

  Promise.all(paramsValidation.map((validation) => validation.run(req)))
    .then(async () => {
      const validationErr = validationResult(req);

      if (!validationErr.isEmpty()) {
        return res.status(400).send({
          errors: validationErr.array(),
        });
      }

      const response = await usersService.listAllUsers(req.query);

      return res.send(response);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Something went wrong",
      });
    });
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  listAllUsers,
};
