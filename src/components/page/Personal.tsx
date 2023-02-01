import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Typography, Container, Stack, Link } from "@mui/material";
import { RootState } from "../../redux/store";
import AnswerModel from "./../../model/AnswerModel";
import { FileModel } from "../../model/FileModel";

const style = {
  switcherBox: { display: "flex" },
  switcher: { alignSelf: "center" },
};

export const Personal: React.FC = () => {
  const client = useSelector((c: RootState) => c.client.client);
  const [download, setDownload] = useState({
    src: "",
    getted: false,
  });

  const getReport = () => {
    axios
      .post("http://localhost:8888/services/get-report", client)
      .then((res) => {
        const data: AnswerModel = res.data;
        if (data.Status) {
          const file: FileModel = data.Answer;
          console.log(file);
          return file;
        }
      })
      .then((res) => {
        console.log("2", res?.base64File);

        setDownload({
          src: "data:application/vnd.ms-excel;base64," + res,
          getted: true,
        });
        console.log(download.src);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="xs">
      <Stack>
        <Typography variant="subtitle1" color="initial">
          <b>Логин</b>
        </Typography>
        <Typography variant="body1" color="initial">
          {client?.Login}
        </Typography>
        <Typography variant="subtitle1" color="initial">
          <b>Почта</b>
        </Typography>
        <Typography variant="body1" color="initial">
          {client?.Email}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ width: "70%", mt: 2, alignSelf: "center" }}
          onClick={getReport}
        >
          Получить отчет по заказам
        </Button>

        <Link
          href={download.src}
          hidden={!download.getted}
          download="report.xlsx"
          sx={{ m: "16px auto" }}
        >
          <Button variant="contained" color="success" sx={{ m: "2 auto" }}>
            Скачать
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default Personal;
