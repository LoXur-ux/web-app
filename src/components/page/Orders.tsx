import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  Modal,
  Container,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import OrderModel from "./../../model/OrderModel";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AuthModel from "./../../model/AuthModel";
import AnswerModel from "./../../model/AnswerModel";
import QRCode from "../QRCodeScanner";

function dateSortFunction(a: OrderModel, b: OrderModel) {
  var dateA = new Date(a.OrderDate).getTime();
  var dateB = new Date(b.OrderDate).getTime();
  return dateA > dateB ? 1 : -1;
}

function dateToString(date: Date) {
  var temp = new Date(date).toJSON();
  var timeRegex = /^.*T(\d{2}):(\d{2}):(\d{2}).*$/;
  var dateRegex = /^(\d{4})-(\d{2})-(\d{2})T.*$/;

  var dateData = dateRegex.exec(temp);
  var timeData = timeRegex.exec(temp);

  var str =
    dateData![3] +
    "." +
    dateData![2] +
    "." +
    dateData![1] +
    " " +
    String(Number(timeData![1]) + 3) +
    ":" +
    timeData![2] +
    ":" +
    timeData![3];
  return str;
}

interface Props {
  login: string;
  qr: string;
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);

  const login: AuthModel = {
    Login: useSelector((u: RootState) => u.client.client?.Login)!,
    Password: "",
  };

  const [qr, setQr] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:8888/order/get-all", login)
      .then((res) => {
        const data: AnswerModel = res.data;
        let _orders: OrderModel[];
        if (data.Status) {
          _orders = data.Answer;
          return _orders;
        }
      })
      .then((res) => {
        res?.sort(dateSortFunction);
        setOrders(res!);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setOrders([]);
      });
  }, []);

  const OrderModalWin: React.FC<Props> = (props: Props) => {
    const [qrAccept, setQrAccept] = useState(false);

    const imgBase64 = "data:image/png;base64," + props.qr;

    const base64ToImg = (base64Img: string, callback: Function) => {
      var img = new Image();
      img.onload = () => {
        callback(img);
      };
      img.src = base64Img;
    };

    base64ToImg(imgBase64, (img: any) => {
      var doc = document.getElementById("qrCode")!.appendChild(img);
      doc.style.width = "200px";
    });

    return (
      <Modal open={open}>
        <Container
          maxWidth="sm"
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {qrAccept ? (
            <>
              <Typography variant="h5" color="initial">
                Ваш QR-Код
              </Typography>
              <Box
                id="qrCode"
                sx={{
                  m: "0 auto",
                  img: { display: "table", m: "0 auto", alignSelf: "center" },
                }}
              />
            </>
          ) : (
            <>
              <Typography variant="h5" color="initial">
                Отсканируйте QR-код
              </Typography>
              <QRCode />
            </>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setOpen(false);
              }}
            >
              Закрыть
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              onClick={() => setQrAccept(!qrAccept)}
            >
              Подтвержден
            </Button>
          </Box>
        </Container>
      </Modal>
    );
  };

  return (
    <>
      <OrderModalWin login={login.Login} qr={qr} />

      <Typography variant="h3" color="initial">
        Ваши заказы
      </Typography>

      {orders.map((item, index) => {
        return (
          <Accordion key={item.Id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle1" color="initial">
                  {index + 1}. Заказ от {dateToString(item.OrderDate)}
                </Typography>
                <Typography variant="body1" color="initial" sx={{ mr: 3 }}>
                  <b>Статус: </b>
                  {item.Status}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1" color="initial">
                <b>Адресс отправки:</b>
              </Typography>
              <Typography variant="body1" color="initial">
                {item.AddressFrom}
              </Typography>
              <Typography variant="subtitle1" color="initial">
                <b>Адресс получателя:</b>
              </Typography>
              <Typography variant="body1" color="initial">
                {item.AddressTo}
              </Typography>
              <Typography variant="subtitle1" color="initial">
                <b>Цена:</b> {item.Price}р.
              </Typography>
              <Typography variant="subtitle1" color="initial">
                <b>Ваш комментарий:</b>
              </Typography>
              <Typography variant="body2" color="initial">
                {item.Commentary}
              </Typography>
              {item.Status === "Получен. В пути" ? (
                <Button
                  onClick={() => {
                    setQr(item.QRCode);
                    setOpen(true);
                  }}
                >
                  QR-код
                </Button>
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default Orders;
