const { Product } = require("../../database/models");

const productController = {
  getProductById: (req, res) => {
    const productId = req.params.id;
    Product.findByPk(productId).then((product) => {
      if (product) {
        res.status(200).send({
          meta: {
            status: 200,
            url: `/api/product/${productId}`,
          },
          product: product,
        });
      } else {
        res.status(404).send({
          meta: {
            status: 404,
            url: `/api/product/${productId}`,
          },
          product: product,
        });
      }
    });
  },
  getAllProducts: (req,res)=>{
    Product.findAll()
    .then((products)=>{
      res.json({
        meta:{
          url:'/api/products',
          count:products.length
        },
        products:products
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }
};

module.exports = productController;
