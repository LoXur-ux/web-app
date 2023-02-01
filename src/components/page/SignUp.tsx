import React, { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  Switch,
  Grid,
  Container,
} from "@mui/material";
import ClientModel from "./../../model/ClientModel";
import RegistrationModel from "./../../model/RegistrationModel";
import AuthService from "../../service/AuthService";
import sha256 from "sha256";

const style = {
  text: { p: 0 },
  form: {
    display: "block",
    width: "300px",
    m: "auto",
  },
  item: {
    width: "100%",
    mt: 1,
  },
  switcherBox: { display: "flex" },
  switcher: { alignSelf: "center" },
};

export const LogUp: React.FC = () => {
  const [isAnonim, setIsAnonim] = useState<boolean>(true);
  const [client, setClient] = useState<RegistrationModel>({
    Login: "",
    Password: "",
    Email: "",
    IsAnonimus: isAnonim,
    FirstName: null,
    MidName: null,
    LastName: null,
    PhoneNumber: null,
  });

  const handleChange =
    (prop: keyof RegistrationModel) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setClient({ ...client, [prop]: event.target.value.trim() });
    };

  const register = () => {
    let cl: RegistrationModel = {
      Login: client.Login,
      Password: sha256(client.Password),
      Email: client.Email,
      IsAnonimus: isAnonim,
      FirstName: isAnonim ? null : client.FirstName,
      MidName: isAnonim ? null : client.MidName,
      LastName: isAnonim ? null : client.LastName,
      PhoneNumber: isAnonim ? null : client.PhoneNumber,
    };
    alert("Подтвердите регистрацию");
    AuthService.logup(cl);
    window.location.replace("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" color="black">
        Регистрация
      </Typography>
      <Grid container sx={style.form}>
        <Grid item>
          <TextField
            id="login"
            label="Логин"
            sx={style.item}
            value={client.Login}
            onChange={handleChange("Login")}
          />
        </Grid>

        <Grid item>
          <TextField
            id="email"
            label="Почта"
            sx={style.item}
            value={client.Email}
            onChange={handleChange("Email")}
          />
        </Grid>

        <Grid item>
          <TextField
            id="password"
            label="Пароль"
            type="password"
            sx={style.item}
            value={client.Password}
            onChange={handleChange("Password")}
          />
        </Grid>

        <Grid item sx={style.switcherBox}>
          <Typography variant="body1" color="initial" sx={style.switcher}>
            Анонимный аккаунт
          </Typography>
          <Switch
            checked={isAnonim}
            sx={style.switcher}
            onClick={() => setIsAnonim(!isAnonim)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="fName"
            label="Имя"
            sx={style.item}
            disabled={isAnonim}
            value={client.FirstName}
            onChange={handleChange("FirstName")}
          />
        </Grid>
        <Grid item>
          <TextField
            id="mName"
            label="Отчество"
            sx={style.item}
            disabled={isAnonim}
            value={client.MidName}
            onChange={handleChange("MidName")}
          />
        </Grid>
        <Grid item>
          <TextField
            id="lName"
            label="Фамилия"
            sx={style.item}
            disabled={isAnonim}
            value={client.LastName}
            onChange={handleChange("LastName")}
          />
        </Grid>
        <Grid item>
          <TextField
            id="phone"
            label="Телефон"
            sx={style.item}
            disabled={isAnonim}
            value={client.PhoneNumber}
            onChange={handleChange("PhoneNumber")}
          />
        </Grid>

        <Grid item sx={style.item}>
          <Button
            variant="contained"
            color="primary"
            sx={style.item}
            onClick={() => register()}
          >
            Зарегистрироваться
          </Button>
          <Button variant="text" sx={style.item} color="secondary">
            Есть аккаунт? Войдите!
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogUp;
