import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import AuthService from "../service/AuthService";

const style = {
  box: {
    m: 0,
    mb: 2,
    pl: 6,
    pr: 6,
    borderWidth: 0,
  },
  login: {
    mr: 2,
  },
};

const Appbar: React.FC = () => {
  const user = useSelector((u: RootState) => u.client);

  return (
    <AppBar position="static" sx={style.box}>
      <Toolbar disableGutters>
        <ApiIcon />
        <Box flexGrow={1}>
          <Link to="/">
            <Typography variant="h5" color="black">
              Доставка.ру
            </Typography>
          </Link>
        </Box>
        <>
          {user.client?.Role === 2 ? (
            <>
              <Tooltip title="Рабочие заказы">
                <IconButton href="/work/orders">
                  <HubOutlinedIcon sx={{ color: "black", height: "100%" }} />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <></>
          )}
          <Tooltip title="На главную">
            <IconButton href="/">
              <HomeOutlinedIcon sx={{ color: "black", height: "100%" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Заказать доставку">
            <IconButton href="/order">
              <AddCircleOutlineOutlinedIcon
                sx={{ color: "black", height: "100%" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ваши доставки">
            <IconButton href="/orders">
              <ArchiveOutlinedIcon sx={{ color: "black", height: "100%" }} />
            </IconButton>
          </Tooltip>

          {!user.isAuth ? (
            <Box>
              <Link to="/auth/signin">
                <Button variant="contained" color="secondary" sx={{ mr: 1 }}>
                  Вход
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button variant="contained" color="primary">
                  Регистрация
                </Button>
              </Link>
            </Box>
          ) : (
            <>
              <Tooltip title="Личный кабинет">
                <IconButton href="/personal">
                  <AccountCircle sx={{ color: "black", height: "100%" }} />
                </IconButton>
              </Tooltip>
              <Link to="/personal">
                <Typography sx={(style.login, { color: "black" })}>
                  {user.client?.Login}
                </Typography>
              </Link>

              <Tooltip title="Выйти из аккаунта">
                <IconButton
                  onClick={() => AuthService.logout()}
                  href="/"
                  sx={{ color: "black", height: "100%" }}
                >
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
