import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import QRCode from "../QRCodeScanner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AuthModel from "./../../model/AuthModel";
import AnswerModel from "./../../model/AnswerModel";
import WorkerOrderModel from "../../model/WorkerOrderModel";

const url = "http://localhost:8888/worker";

interface Props {
  order: WorkerOrderModel;
}

interface PropsQr {
  login: string;
  qr: string;
}

interface DateTime {
  dateToRecive: string;
  timeToRecive: string;
  dateToDeliver: string;
  timeToDeliver: string;
}

// function dateSortFunction(a: OrderModel, b: OrderModel) {
//   var dateA = new Date(a.OrderDate).getTime();
//   var dateB = new Date(b.OrderDate).getTime();
//   return dateA > dateB ? 1 : -1;
// }

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

const statuses = ["В обработке", "Подтвержден", "Получен. В пути", "Выполнен"];

const InProgress: React.FC<Props> = (props: Props) => {
  const [dateTime, setDateTime] = useState<DateTime>({
    dateToRecive: "",
    timeToRecive: "",
    dateToDeliver: "",
    timeToDeliver: "",
  });

  const changeHandler =
    (prop: keyof DateTime) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDateTime({ ...dateTime, [prop]: event.target.value });
    };

  const confirm = () => {
    props.order.TimeToRecive = new Date(
      dateTime.dateToRecive + " " + dateTime.timeToRecive
    );
    props.order.TimeToDeliver = new Date(
      dateTime.dateToDeliver + " " + dateTime.timeToDeliver
    );
    axios
      .post(url + "/accept", props.order)
      .then((res) => {
        const data = res.data;
        if (data !== null) {
          document.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="initial">
        <b>Установить время для получения:</b>
      </Typography>
      <Box>
        <TextField
          id="DateToRecive"
          label="Дата"
          type="date"
          onChange={changeHandler("dateToRecive")}
        />
        <TextField
          id="TimeToRecive"
          label="Время"
          type="time"
          onChange={changeHandler("timeToRecive")}
        />
      </Box>
      <Typography variant="subtitle1" color="initial">
        <b>Установить время для доставки:</b>
      </Typography>
      <Box>
        <TextField
          id="DateToDeliver"
          label="Дата"
          type="date"
          onChange={changeHandler("dateToDeliver")}
        />
        <TextField
          id="TimeToDeliver"
          label="Время"
          type="time"
          onChange={changeHandler("timeToDeliver")}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={confirm}
        sx={{ mt: 1 }}
      >
        Подтвердить
      </Button>
    </Box>
  );
};

const Accepted: React.FC<Props> = (props: Props) => {
  const accept = () => {
    axios
      .post(url + "/recive", props.order)
      .then((res) => {
        const data = res.data;
        if (data !== null) {
          document.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Typography variant="subtitle1" color="initial">
        <b>Время получения:</b>
      </Typography>
      <Typography variant="body1" color="initial">
        {dateToString(props.order.TimeToRecive)}
      </Typography>
      <Typography variant="subtitle1" color="initial">
        <b>Время доставки:</b>
      </Typography>
      <Typography variant="body1" color="initial">
        {dateToString(props.order.TimeToDeliver)}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 1 }}
        onClick={accept}
      >
        Посылка получена
      </Button>
    </>
  );
};

const Recived: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);

  const OrderModalWin: React.FC<PropsQr> = (props: PropsQr) => {
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
          {!qrAccept ? (
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

  const deliver = () => {
    axios
      .post(url + "/deliver", props.order)
      .then((res) => {
        const data = res.data;
        if (data !== null) {
          document.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <OrderModalWin qr={props.order.QR} login={props.order.Login} />
      <Typography variant="subtitle1" color="initial">
        <b>Время получения:</b>
      </Typography>
      <Typography variant="body1" color="initial">
        {dateToString(props.order.TimeToRecive)}
      </Typography>
      <Typography variant="subtitle1" color="initial">
        <b>Время доставки:</b>
      </Typography>
      <Typography variant="body1" color="initial">
        {dateToString(props.order.TimeToDeliver)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 1 }}
        onClick={() => setOpen(true)}
      >
        QRCode
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 1, ml: 1 }}
        onClick={deliver}
      >
        Завершить
      </Button>
    </>
  );
};

const Delivered: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Typography variant="subtitle1" color="initial">
        <b>Время получения:</b>
      </Typography>
      <Typography variant="body1" color="initial">
        {dateToString(props.order.TimeToRecive)}
      </Typography>
      <Typography variant="subtitle1" color="initial">
        <b>Время доставки:</b>
      </Typography>
      <Typography variant="body1" color="initial">
        {dateToString(props.order.TimeToDeliver)}
      </Typography>
      <Typography variant="h6" color="initial">
        Доставка выполнена
      </Typography>
    </>
  );
};

export const WorkerOrders: React.FC = () => {
  const [allOrders, setAllOrders] = useState<WorkerOrderModel[]>([]);

  const login: AuthModel = {
    Login: useSelector((u: RootState) => u.client.client)!.Login,
    Password: "",
  };

  useEffect(() => {
    axios
      .post("http://localhost:8888/worker/orders", login)
      .then((res) => {
        const data: AnswerModel = res.data;
        let _orders: WorkerOrderModel[];
        if (data.Status) {
          _orders = data.Answer;
          return _orders;
        }
        return [];
      })
      .then((res) => {
        console.log(res);
        setAllOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h3" color="initial">
          Заказы на доставку
        </Typography>
        {allOrders.map((item, index) => {
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
                    {item.Id}. Заказ от {dateToString(item.OrderTime)}
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
                  <b>Комментарий:</b>
                </Typography>
                <Typography variant="body2" color="initial">
                  {item.Commentary}
                </Typography>
                {item.Status === statuses[0] ? (
                  <InProgress order={item} />
                ) : item.Status === statuses[1] ? (
                  <Accepted order={item} />
                ) : item.Status === statuses[2] ? (
                  <Recived order={item} />
                ) : (
                  <Delivered order={item} />
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>
    </>
  );
};
