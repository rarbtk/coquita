const { Cart, CartItem, Product } = require("../../database/models");
const cartController = {
  create: (req, res) => {
    Cart.create({
      user_id: req.body.user_id,
      finished: "false",
    }).then(() => {
      res.send({
        status: 200,
        message: "cart created",
      });
    });
  },
  createItem: (req, res) => {
    const body = req.body;
    //check if product_id exist
    Product.findByPk(req.body.product_id).then((exist) => {
      //product_ix exist should create cartItem
      if (exist) {
        CartItem.create({
          product_id: req.body.product_id,
          quantity: req.body.quantity,
          cart_id: req.body.cart_id,
        })
          .then((cartItem) => {
            res.status(201).send({
              meta: {
                status: 201,
              },
              data: {
                cartItem: cartItem,
              },
            });
          })
          .catch((error) => {
            res.status(500).send({
              error: error,
              message: "Ups ha ocurrido un error al intentar crear el item",
            });
          });
      } else {
        //product_id want add to cartItem not exist, return error
        res.status(404).send({
          status: 404,
          message: `product_id(${req.body.product_id}) not found`,
        });
      }
    });
  },
  deleteItem: (req, res) => {
    console.log("deleteItem - start");
    CartItem.destroy({
      where: {
        id: req.body.id,
      },
    }).then((item) => {
      if (item) {
        res.send({
          status: 200,
          message: "Cart Item was removed successfully",
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Cart Item to delete was not found",
        });
      }
    });
  },
};

module.exports = cartController;
