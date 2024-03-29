const db = require("../../database/models");
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
  //close cart
  close: (req, res) => {
    Cart.update(
      {
      finished: "true",
    },{
      where:{
        id:req.body.cart_id
      }
    }).then((cart) => {
      if(cart>0){
        res.send({
          status: 200,
          message: "cart finished",
        });

      }else{
        res.status(404).send({
          status: 404,
          message: "cart to finish not found :(",
        });
      }
      
    });
  },
  createItem: (req, res) => {
    const body = req.body;
    //check if product_id exist
    Product.findByPk(req.body.product_id).then((exist) => {
      //product_ix exist should create cartItem
      if (exist) {
        // check if item already exist with the same product id and replace with new quantity
        CartItem.findAll({
          where:{
            cart_id:req.body.cart_id,
            product_id:req.body.product_id
          }
        })
        .then(item_to_delete=>{
          CartItem.destroy(item_to_delete.id)
        }).catch(error=> res.json(error))
        CartItem.create({
          product_id: req.body.product_id,
          user_id: req.body.user_id,
          quantity: req.body.quantity,
          cart_id: req.body.cart_id,
          price: Number(req.body.price),
          subTotal: Number(req.body.price * req.body.quantity),
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
  getCartById: (req, res) => {
    cartId = req.params.id;

    Cart.findByPk(cartId).then((cart) => {
      if (cart) {
        CartItem.findAll({
          where: {
            cart_id: cartId,
          },
        }).then((cartItems) => {
          res.send({
            meta: {
              status: 200,
              url: `/api/cart/${cartId}`,
            },
            data: {
              cart,
              cartItems,
            },
          });
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Cart Item was not found",
        });
      }
    });
  },
  getCartByUserId: (req, res) => {
    userId = req.params.id;
    console.log("************************************************************");
    Cart.findAll({
      where: {
        user_id: userId,
        finished: "false",
      },
      include: ["products"],
    }).then((cart) => {
      //console.log("cart:controller: ",cart)
      console.log("cart:controller: ",cart[0].dataValues.products.length);
      res.json({
        meta: {
          status: 200,
          items_count: cart[0].dataValues.products.length,
          url: `/api/cart/byUserId/${userId}`,
        },
        data: {
          cart,
        },
      });
    });
  },
};

module.exports = cartController;
