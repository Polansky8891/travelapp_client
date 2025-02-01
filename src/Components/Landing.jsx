import React from 'react'
import mytineraryLogo from '../assets/media/mytineraryLogo.jpg'
import circle_right from '../assets/media/circle_right.jpg'
import { Box, Typography, Button, Grid2 } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom'
import { auth, signInWithGoogle } from '../utilities/firebase';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';



export const Landing = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleClickCities = () => {
    navigate('/cities');
  };

  const handleLogin = () => {
    signInWithGoogle().then(() => setIsLoggedIn(true));
  };

  const handleLogout = () => {
    auth.signOut().then(() => setIsLoggedIn(false));
  };
  
  return (
    <>
      
      <Box sx={{ 
        textAlign: 'center', 
        p: 2, 
        backgroundColor: 'black' 
      }}>
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
          <Typography sx={{ color: "#09B6EB", fontStyle: 'italic', fontFamily: "Permanent Marker", fontWeight: 'bold' }} variant="h7" component="h5">
            Find your perfect trip, designed by <br/>  insiders who know and love their cities
          </Typography>
        </Box>

        {/* Browsing Section */}
        <Box
          mb={6}
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            textAlign: 'center', 
          }}
        >
          <Typography
            variant="h5"
            component="h4"
            sx={{ color: '#09B6EB', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', mb: 10 }}
          >
            Start browsing
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickCities}
            sx={{
              borderRadius: '50%', 
              minWidth: '60px', 
              minHeight: '60px', 
              backgroundColor: '#09B6EB', 
              transition: 'all 0.1s ease',
              '&:hover': {
                backgroundColor: '#BDF048',
                transform: 'scale(1.05)' 
              },
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '-50px'
            }}
          >
            <ArrowForwardIcon sx={{ fontSize: '24px', color: 'white' }} />
          </Button>
        </Box>

        {/* Buttons Section */}
        <Box>
          {!isLoggedIn ? (
            <>
              <Typography sx={{color: '#09B6EB', fontFamily: 'Arial Rounded MT Bold', fontWeight: 'bold'}} variant="h6" component="h4" mb={2}>
                Want to build your own MYtinerary?
              </Typography>
              <Grid2
                container 
                spacing={3} 
                justifyContent="center" 
                alignItems="center"
              >
                <Grid2 item>
                  <Button
                    onClick={handleLogin}  
                    sx={{ 
                      fontFamily: 'Arial Rounded MT Bold',
                      fontWeight: 'bold',
                      fontSize: '12px', 
                      padding: '6px 12px', 
                      backgroundColor: '#09B6EB',
                      transition: 'all 0.1s ease',
                      '&:hover': {
                        backgroundColor: '#BDF048',
                        transform: 'scale(1.05)',
                      },
                    }} 
                    variant="contained"
                  >
                    Login
                  </Button>
                </Grid2>
                <Grid2 item>
                  <Button  
                    onClick={handleLogin}  
                    sx={{ 
                      fontFamily: 'Arial Rounded MT Bold',
                      fontWeight: 'bold',
                      fontSize: '12px', 
                      padding: '6px 12px', 
                      backgroundColor: '#09B6EB',
                      transition: 'all 0.1s ease',
                      '&:hover': {
                        backgroundColor: '#BDF048',
                        transform: 'scale(1.05)',
                      },
                    }} 
                    variant="contained"
                  >
                    Create account
                  </Button>
                </Grid2>
              </Grid2>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              sx={{
                fontFamily: 'Arial Rounded MT Bold',
                fontWeight: 'bold',
                fontSize: '12px', 
                padding: '6px 12px', 
                backgroundColor: '#FF5733',
                transition: 'all 0.1s ease',
                '&:hover': {
                  backgroundColor: '#E84118',
                  transform: 'scale(1.05)',
                },
              }}
              variant="contained"
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};
