import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import Button from "@mui/material/Button";

export default function RedeemTicketScanner(props) {
  const [data, setData] = useState('No result');
  const [active, setActive] = useState(null);

  useEffect(() => {
      if (active == false) {
        window.location.reload();
      }
  }, [active]);

  return (
    <>
      {
        !active &&
          <Button
            variant="contained"
            onClick={() => setActive(true)}>Scan QR Code
          </Button>
      }
      { active &&
        <>
          <Button
            variant="contained"
            onClick={() => setActive(false)}>Stop Scan
          </Button>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
        </>
      }
      <p>{data}</p>
    </>
  );
};
