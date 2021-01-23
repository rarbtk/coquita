const mercadopago = require("mercadopago");
require("dotenv").config();
//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

const paymentControllers = {
  processPayment: (req, res) => {
    console.log("payment in progress");

    var payment_data = {
      transaction_amount: Number(req.body.transactionAmount),
      token: req.body.token,
      description: req.body.description,
      installments: Number(req.body.installments),
      payment_method_id: req.body.paymentMethodId,
      issuer_id: req.body.issuer,
      payer: {
        email: req.body.email,
        identification: {
          type: req.body.docType,
          number: req.body.docNumber,
        },
      },
    };

    mercadopago.payment
      .save(payment_data)
      .then(function (response) {
        res.status(response.status).json({
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id,
        });
      })
      .catch(function (error) {
        res.status(error.status).send(error);
      });
  },
};

module.exports = paymentControllers;
