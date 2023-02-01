import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, TextField, Button, Grid, Box } from "@mui/material";

import OrderModel from "../../model/OrderModel";
import { useSelector } from "react-redux";
import OrderService from "./../../service/OrderService";
import { RootState } from "../../redux/store";

const style = {
  flexItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    display: "block",
    width: "49.8%",
  },
  item: {
    width: "100%",
    mt: 1,
  },
};

interface IAddress {
  street: string;
  house: string;
  building: string;
  appartment: string;
}

export const Order: React.FC = () => {
  const login = useSelector((u: RootState) => u.client.client?.Login);
  const [price, setPrice] = useState<number>(500);

  const [addressTo, setAddressTo] = useState<IAddress>({
    street: "",
    house: "",
    building: "",
    appartment: "",
  });
  const handleChangeAddressTo =
    (prop: keyof IAddress) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddressTo({ ...addressTo, [prop]: event.target.value.trim() });
    };

  useEffect(() => {
    if (addressTo.house !== "")
      setPrice(500 + 40 * Math.round(Math.random() * (0 - 8) + 8));
  }, [addressTo.house]);

  const [addressFrom, setAddressFrom] = useState<IAddress>({
    street: "",
    house: "",
    building: "",
    appartment: "",
  });

  const handleChangeAddressFrom =
    (prop: keyof IAddress) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddressFrom({ ...addressTo, [prop]: event.target.value.trim() });
    };

  const [comment, setComment] = useState({ value: "" });
  const handleChangeComment =
    (prop: "value") => (event: React.ChangeEvent<HTMLInputElement>) => {
      setComment({ ...comment, [prop]: event.target.value.trim() });
    };

  const doOrder = () => {
    let _addressFrom: string = "ул. ";
    _addressFrom += addressFrom.street + ", дом ";
    _addressFrom += addressFrom.house + ", ";
    if (addressTo.building.length !== 0)
      _addressFrom += "корп. " + addressFrom.building + ", ";
    _addressFrom += "кв. " + addressFrom.appartment;

    let _addressTo: string = "ул. ";
    _addressTo += addressTo.street + ", дом ";
    _addressTo += addressTo.house + ", ";
    if (addressTo.building.length !== 0)
      _addressTo += "корп. " + addressTo.building + ", ";
    _addressTo += "кв. " + addressTo.appartment;

    let order: OrderModel = {
      Id: 0,
      AddressFrom: _addressFrom,
      AddressTo: _addressTo,
      Commentary: comment.value,
      Price: price,
      QRCode: "",
      OrderDate: new Date(),
      Status: "",
      Login: login!,
    };

    new OrderService().createOrder(order);
  };

  return (
    <>
      <Typography variant="h3" color="initial">
        Заказать доставку
      </Typography>

      <Box sx={style.flexItem}>
        <Grid container sx={style.address}>
          <Grid item>
            <Typography variant="h6" color="initial">
              Откуда забрать?
            </Typography>
          </Grid>
          {/* Адреса */}
          <Grid item>
            <TextField
              id="streetFrom"
              label="Улица"
              sx={style.item}
              onChange={handleChangeAddressFrom("street")}
            />
          </Grid>
          <Grid item>
            <TextField
              id="houseFrom"
              label="Дом"
              sx={style.item}
              onChange={handleChangeAddressFrom("house")}
            />
          </Grid>
          <Grid item>
            <TextField
              id="buildingFrom"
              label="Корпус"
              sx={style.item}
              onChange={handleChangeAddressFrom("building")}
            />
          </Grid>
          <Grid item>
            <TextField
              id="appartmentFrom"
              label="Квартира"
              sx={style.item}
              onChange={handleChangeAddressFrom("appartment")}
            />
          </Grid>
        </Grid>

        <Grid container sx={style.address}>
          <Grid item>
            <Typography variant="h6" color="initial">
              Куда доставить?
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="streetTo"
              label="Улица"
              sx={style.item}
              onChange={handleChangeAddressTo("street")}
            />
          </Grid>
          <Grid item>
            <TextField
              id="houseTo"
              label="Дом"
              sx={style.item}
              onChange={handleChangeAddressTo("house")}
            />
          </Grid>
          <Grid item>
            <TextField
              id="buildingTo"
              label="Корпус"
              sx={style.item}
              onChange={handleChangeAddressTo("building")}
            />
          </Grid>
          <Grid item>
            <TextField
              id="appartmentTo"
              label="Квартира"
              sx={style.item}
              onChange={handleChangeAddressTo("appartment")}
            />
          </Grid>
        </Grid>
      </Box>
      <TextField
        id="comment"
        label="Описание и комментарий"
        multiline
        sx={style.item}
        onChange={handleChangeComment("value")}
      />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "end",
          button: { mr: 1, ml: 1 },
        }}
      >
        <Typography variant="h6" color="initial" sx={{ alignSelf: "center" }}>
          <b>Цена:</b> {price}р
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          href="/"
          sx={{ m: "0 8px" }}
        >
          На главную
        </Button>

        <Button variant="contained" color="primary" onClick={() => doOrder()}>
          Заказать
        </Button>
      </Box>
    </>
  );
};

export default Order;
