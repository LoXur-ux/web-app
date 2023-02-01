import React, { useState } from "react";
import { Box, Typography, Container, Modal, Button } from "@mui/material";

interface Props {
  login: string;
  qr: string;
  open: boolean;
}

export const OrderModalWin: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(props.open);

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
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          position: "static",
          ">": { m: "0 auto" },
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" color="initial">
          QR-Код
        </Typography>
        <Box id="qrCode" sx={{}} />
        <Button variant="contained" color="warning">
          Закрыть
        </Button>
      </Container>
    </Modal>
  );
};

export default OrderModalWin;
