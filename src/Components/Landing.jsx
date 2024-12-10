import React from 'react'
import mytineraryLogo from '../assets/media/mytineraryLogo.jpg'
import circle_right from '../assets/media/circle_right.jpg'
import Login from './Login'
import Register from './Register'
import { Box, Typography, Button, Grid2 } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export const Landing = () => {
  
  
  return (
    <>
      
      <Box sx={{ textAlign: 'center', p: 2, backgroundImage: 'url("/images/fondo3.jpg")', backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: 'no-repeat' }}>
        {/* Logo */}
        <Box mb={4}>
          <img 
            src={mytineraryLogo}
            alt="MYtinerary Logo"
            style={{ maxWidth: '100%', height: 'auto' }}
            

          />
        </Box>

        {/* Info Section */}
        <Box mb={7}>
          <Typography sx={{ color: "black", fontStyle: 'italic', fontFamily: 'Arial Rounded MT Bold', fontWeight: 'bold' }} variant="h7" component="h5">
            Find your perfect trip, designed by insiders who know and love their cities
          </Typography>
        </Box>

        {/* Browsing Section */}
        <Box
  mb={6}
  sx={{
    display: 'flex', // Hacer que los elementos se comporten como un contenedor flexible
    flexDirection: 'column', // Alinearlos en columna
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
    textAlign: 'center', // Asegurar que el texto esté centrado
  }}
>
  <Typography
    variant="h5"
    component="h4"
    sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', mb: 10 }}
  >
    Start browsing
  </Typography>
  <Button
    variant="contained"
    sx={{
      borderRadius: '50%', // Hace el botón circular
      minWidth: '60px', // Tamaño mínimo para el ancho
      minHeight: '60px', // Tamaño mínimo para la altura
      backgroundColor: 'red', // Color de fondo
      transition: 'all 0.1s ease',
      '&:hover': {
        backgroundColor: '#0E6FFF',
        transform: 'scale(1.05)' // Color al pasar el mouse
      },
      display: 'flex', // Para centrar el contenido
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ArrowForwardIcon sx={{ fontSize: '24px', color: 'white' }} />
  </Button>
</Box>

        {/* Buttons Section */}
        <Box>
          <Typography sx={{color: 'white', fontFamily: 'Arial Rounded MT Bold', fontWeight: 'bold'}} variant="h6" component="h4" mb={2}>
            Want to build your own MYtinerary?
          </Typography>
          <Grid2
            container 
            spacing={3} 
            justifyContent="center" 
            alignItems="center"
          >
            <Grid2 item>
              <Button  sx={{ fontFamily: 'Arial Rounded MT Bold',
                             fontWeight: 'bold',
                             backgroundColor: 'red',
                             transition: 'all 0.1s ease',
                             '&:hover': {
                              backgroundColor: '#0E6FFF',
                              transform: 'scale(1.05)'
                             } }} variant="contained">
                Register
              </Button>
            </Grid2>
            <Grid2 item>
              <Button  sx={{ fontFamily: 'Arial Rounded MT Bold',
                             fontWeight: 'bold',
                             backgroundColor: 'red',
                             transition: 'all 0.1s ease',
                             '&:hover': {
                              backgroundColor: '#0E6FFF',
                              transform: 'scale(1.05)'
                             } }} variant="contained">
                Login
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </>
  );
};