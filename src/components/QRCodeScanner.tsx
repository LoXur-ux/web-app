import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { TextField } from "@mui/material";

const QRCodeScanner = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qrReader",
      {
        qrbox: {
          width: 400,
          height: 400,
        },
        fps: 20,
      },
      false
    );

    const successScanner = (result: any) => {
      console.log(result);
      var textEl: HTMLInputElement = document.getElementById(
        "result"
      )! as HTMLInputElement;
      textEl.value = result;
      scanner.clear();
    };

    const failScanner = (err: any) => {
      console.log(err);
    };

    scanner.render(successScanner, failScanner);
  }, []);

  return (
    <>
      <div id="qrReader"></div>
      <TextField id="result" sx={{ mt: 1, mb: 1, width: "100%" }} />
    </>
  );
};

export default QRCodeScanner;
