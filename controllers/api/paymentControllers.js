const mercadopago = require("mercadopago");

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(
  "TEST-4743186077626789-010801-d639b3e1f9b794f2017e5e02a1cb565c-201332717"
);

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
