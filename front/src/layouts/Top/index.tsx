import React, { useCallback, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import axios from 'axios';

const settings = ['내 정보 보기', '주문내역', 'Sign Out'];
function Top() {
  const [pages, setPages] = useState([
    '회원관리',
    '상품관리',
    '주문관리',
    'About Us',
    'Products',
    'Community',
  ]);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [onClickPageNavFunctions, setOnClickPageNavFunctions] = useState([
    () => {},
  ]);

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_SVR_URL}:8080/api/users/session`,
    fetcher
  );

  const navigate = useNavigate();
  const onClickManageUsers = useCallback(() => {
    navigate('/manage/user/list');
  }, []);
  const onClickManageProducts = useCallback(() => {
    navigate('/manage/product/list');
  }, []);
  const onClickManagePurchases = useCallback(() => {
    navigate('/manage/purchase');
  }, []);
  const onClickAboutUs = useCallback(() => {
    navigate('/aboutus');
  }, []);
  const onClickProducts = useCallback(() => {
    navigate('/product/list');
  }, []);
  const onClickCommunity = useCallback(() => {
    navigate('/community');
  }, []);
  const onClickMyInfo = useCallback(() => {}, []);
  const onClickPurchaseHistory = useCallback(() => {}, []);
  const onClickSignOut = useCallback(() => {
    axios
      .delete(
        `http://${import.meta.env.VITE_SPRING_SVR_URL}:8080/api/users/session`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        mutateMe();
        navigate('/');
      })
      .catch((error) => {
        console.dir(error);
      });
  }, []);

  const settingsFucntion = [
    onClickMyInfo,
    onClickPurchaseHistory,
    onClickSignOut,
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (myData?.role !== 'admin') {
      setPages(['About Us', 'Products', 'Community']);
      setOnClickPageNavFunctions([
        onClickAboutUs,
        onClickProducts,
        onClickCommunity,
      ]);
    } else {
      setPages([
        '회원관리',
        '상품관리',
        '주문관리',
        'About Us',
        'Products',
        'Community',
      ]);
      setOnClickPageNavFunctions([
        onClickManageUsers,
        onClickManageProducts,
        onClickManagePurchases,
        onClickAboutUs,
        onClickProducts,
        onClickCommunity,
      ]);
    }
  }, [myData]);

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
              component={Link}
              to="/"
            >
              React#
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, i) => (
                  <MenuItem key={page} onClick={onClickPageNavFunctions[i]}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              React#
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, i) => (
                <Button
                  key={i}
                  onClick={onClickPageNavFunctions[i]}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button sx={{ my: 2, color: 'white' }}>
                <ShoppingCartIcon />
              </Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {myData?.userId &&
                  settings.map((setting, i) => (
                    <MenuItem key={setting}>
                      <Typography
                        textAlign="center"
                        onClick={settingsFucntion[i]}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                {!myData?.userId && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      to="/user/signin"
                      component={Link}
                      sx={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      Sign In
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Top;
