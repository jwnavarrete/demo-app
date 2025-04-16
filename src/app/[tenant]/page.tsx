"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import styles from '../page.module.css';

type NavbarColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';

const colorOptions: Record<NavbarColor, string> = {
  default: 'inherit',
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  inherit: 'inherit',
};

export default function LoginPage() {
  const params = useParams();
  const tenant = params.tenant;
  const router = useRouter();

  const [navbarColor, setNavbarColor] = useState<NavbarColor>('inherit');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const savedColor = localStorage.getItem('navbarColor');
    if (savedColor) {
      setNavbarColor(savedColor as NavbarColor);
    }
  }, []);

  const handleColorChange = (color: NavbarColor) => {
    setNavbarColor(color);
    localStorage.setItem('navbarColor', color);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const redirectToHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.page}>
      <AppBar position="static" color={navbarColor}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Aplicación
          </Typography>
          <Button color="inherit" onClick={handleMenuOpen}>
            Cambiar Color
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {Object.keys(colorOptions).map((key) => (
              <MenuItem key={key} onClick={() => handleColorChange(key as NavbarColor)}>
                {key}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <main className={styles.main}>
        <h1>Bienvenido a {process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <h1 style={{ textAlign: 'center' }}>
          {tenant ? `Welcome to ${tenant}` : 'Welcome'}
        </h1>        
      </main>
      <footer className={styles.footer}>Creado por Generali</footer>
    </div>
  );
}
