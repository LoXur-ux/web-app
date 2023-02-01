import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import sha256 from "sha256";

export const Home: React.FC = () => {
  const user = useSelector((u: RootState) => u.client);

  return (
    <>
      {/* Вводная информация */}
      <Grid container justifyContent={"space-evenly"}>
        <Grid item xs={4}>
          <Typography variant="h5" color="initial">
            Доставка.ру
          </Typography>
          <Typography variant="body1" color="initial">
            Мы мастера своего дела! Доставим вашу посылку куда угодно!
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img
            src={require("../../assets/delivery.jpg")}
            alt="Sorry... Some was wrong"
            style={{ width: "100%", borderRadius: 7 }}
          />
        </Grid>
      </Grid>

      {/* Кнопки навигации */}
      <Grid
        id="MainContent"
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <Grid item xs={3}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            href=""
            onClick={() => {
              console.log("О нас");
            }}
          >
            О нас
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            href={user.isAuth ? "/order" : "/auth/signin"}
            onClick={() => {
              console.log("Доставить");
            }}
          >
            Доставить
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            href={user.isAuth ? "/personal" : "/auth/signin"}
            onClick={() => {
              console.log("Личный кабинет");
            }}
          >
            Личный кабинет
          </Button>
        </Grid>
      </Grid>

      {/* Комментарии пользователей */}
      <></>
    </>
  );
};

export default Home;
