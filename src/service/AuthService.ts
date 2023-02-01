import axios from "axios";
import { removeCookie, setCookie } from "typescript-cookie";
import RegistrationModel from "../model/RegistrationModel";
import AnswerModel from "../model/AnswerModel";
import ClientModel from "../model/ClientModel";
import { clientActions } from "../redux/slices/clientSlice";
import { LoginFail, RegisterFail } from "../redux/actions/authActions";
import AuthModel from "../model/AuthModel";

const URL = "http://localhost:8888/auth/";

class AuthService {
  logup(model: RegistrationModel) {
    return axios
      .post(URL + "signup", model)
      .then((res) => {
        const data: AnswerModel = res.data;
        if (data.Status) {
          setCookie("access_token", data.Answer.access_token, {
            expires: 1,
            path: "",
          });
          setCookie("refresh_token", data.Answer.refresh_token, {
            path: "",
          });
          const client: ClientModel = data.Answer.user;
          localStorage.setItem("user", JSON.stringify(client));
          return clientActions.registerSuccess({
            isAuth: true,
            client: client,
          });
        }
        return RegisterFail(data.ErrorMessage!);
      })
      .catch((err) => {
        console.log(err);

        return RegisterFail(err);
      });
  }

  login(model: AuthModel) {
    return axios
      .post(URL + "signin", model)
      .then((res) => {
        const data: AnswerModel = res.data;
        if (data.Status) {
          setCookie("access_token", data.Answer.token);
          const client: ClientModel = data.Answer.user;
          localStorage.setItem("user", JSON.stringify(client));
          console.log(client);
          return clientActions.loginSuccess;
        }
        return LoginFail(data.ErrorMessage!);
      })
      .catch((err) => {
        console.log(err);

        return LoginFail(err);
      });
  }

  logout() {
    removeCookie("access_token", { path: "" });
    localStorage.removeItem("user");
    return clientActions.logout();
  }
}

export default new AuthService();
