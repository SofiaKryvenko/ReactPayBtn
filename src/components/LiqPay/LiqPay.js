import React from "react";
import PropTypes from "prop-types";
import crypto from "crypto";

const base64_encode = str => window.btoa(unescape(encodeURIComponent(str)));

//orderId - Унікальний ID покупки у Вашому магазині. Максимальна довжина 255 символів.

const LiqPay = ({
  publicKey,
  privateKey,
  amount,
  service_description,
  currency = "UAH",
  title = "Payment",
  orderId = Math.floor(1 + Math.random() * 900000000)
}) => {
  const json_srtring = {
    version: "3",
    action: "pay",
    amount: amount,
    public_key: publicKey,
    currency: currency,
    description: service_description,
    order_id: orderId,
    verifycode: ""
  };

  const data = base64_encode(JSON.stringify(json_srtring));
  //creating signature
  const signature = crypto
    .createHash("sha1")
    .update(privateKey + data + privateKey)
    .digest("base64");

  return (
    <form
      method="POST"
      action="https://www.liqpay.ua/api/3/checkout"
      acceptCharset="utf-8"
    >
      <input type="hidden" name="data" value={data} />
      <input type="hidden" name="signature" value={signature} />
      <button className="pay_btn">
        <img
          src="https://static.liqpay.ua/buttons/logo-small.png"
          name="btn_text"
          alt="liqPay btn img"
        />
        <span>
          {title} {amount} {currency}
        </span>
      </button>
    </form>
  );
};

LiqPay.propTypes = {
  publicKey: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  service_description: PropTypes.string.isRequired,
  orderId: PropTypes.any.isRequired,
  title: PropTypes.string
};

export default LiqPay;
