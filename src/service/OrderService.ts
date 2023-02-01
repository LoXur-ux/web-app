import axios from "axios";
import OrderModel from "../model/OrderModel";
import AnswerModel from "../model/AnswerModel";

const URL = "http://localhost:8888/order/";

class OrderService {
  createOrder(model: OrderModel) {
    return axios
      .post(URL + "add-order", model)
      .then((res) => {
        const data: AnswerModel = res.data;
        if (data.Status) {
          const orders: OrderModel[] = data.Answer;
          localStorage.setItem("orders", JSON.stringify(orders));
          window.location.href = "/orders";
          return;
        }
        console.log(data.ErrorMessage);
        return data.Error;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }
}

export default OrderService;
