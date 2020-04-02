import React, { Component } from "react";

import "./App.css";

import LiqPay from "./components/LiqPay";

//amount - передавати суму оплати
//service_description - передавати опис,за які послуги
//orderId - Унікальний ID покупки у Вашому магазині. Максимальна довжина 255 символів.
//файлик .env потрібно створити і додати ключі

class App extends Component {
  render() {
    return (
      <div className="App">
        <LiqPay
          publicKey={process.env.REACT_APP_PUBLIC_KEY}
          privateKey={process.env.REACT_APP_PRIVATE_KEY}
          amount="1"
          currency="UAH"
          orderId={Math.floor(1 + Math.random() * 900000000)}
          service_description="Medical support"
          // title="те що відображатиметься в назві кнопки"
        />
      </div>
    );
  }
}

export default App;
