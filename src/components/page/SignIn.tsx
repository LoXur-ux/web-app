import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import AuthModel from "./../../model/AuthModel";
import sha256 from "sha256";
import AuthService from "../../service/AuthService";

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

export const SignIn: React.FC = () => {
  const [login, setLogin] = useState<AuthModel>({
    Login: "",
    Password: "",
  });

  const handleChange =
    (prop: keyof AuthModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLogin({ ...login, [prop]: event.target.value.trim() });
    };

  const signin = () => {
    let lg: AuthModel = {
      Login: login.Login,
      Password: sha256(login.Password),
    };
    AuthService.login(lg);
    window.location.replace("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" color="black">
        Вход
      </Typography>
      <Grid container sx={style.form}>
        <Grid item>
          <TextField
            id="login"
            label="Логин"
            sx={style.item}
            value={login.Login}
            onChange={handleChange("Login")}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            label="Пароль"
            type="password"
            sx={style.item}
            value={login.Password}
            onChange={handleChange("Password")}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            sx={style.item}
            onClick={() => signin()}
          >
            Вход
          </Button>
          <Button variant="text" color="secondary" sx={style.item}>
            Нет аккаунта? Зарегистрируйтесь!
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
