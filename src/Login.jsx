import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import {createTheme, ThemeProvider }from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';



const theme = createTheme( {
  palette: {
    mode: 'light',
    primary: {
      main: '#C000F5',
    },
    secondary: {
      main: '#E099D8',
    },
  },
});


function Login() {

  const [ email, setEmail ] = useState ( "" );
  const [ senha, setSenha ] = useState( "" );
  const [ lembrar, setLembrar ] = useState( false );
  const [ login, setLogin ] =  useState( false ); 
  const [ erro, setErro ] = useState( false );
  const Navigate = useNavigate();

  /* as aspas do SetSenha são para deixar os campos vazios, o localStorange salva os dados desses campos
  com textfield podemos avisar que errou algo */

  useEffect( () => {
   
     if( login ) {
      setEmail( "" );
      setSenha( "" );
      Navigate("/");
     }

  }, [ login ] );

  function Autenticar( evento )
  {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          email: email,
          senha: senha
        }
      )
    } )
    .then( (resposta) => resposta.json() )
    .then( (json ) => {
       
      if( json.user ) {
        localStorage.setItem( "usuario" , JSON.stringify( json.user._id) );
        setLogin( true );
      }else {
        localStorage.removeItemItem( "usuario" );
        setErro( true );
      }
    } )
    .catch( (erro)  => { setErro( true ) } )
  
  }

  return (
    <Container component="section" maxWidth="xs">
      <Box sx={{
          mt:10,
          backgroundColor: "#F59AD4",
          padding: "30px",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",

      }}
      >
        <Typography component="h1" variant='h4'>Entrar</Typography>
        { erro && ( <Alert severity="warning">Revise seus dados e tente novamente</Alert>) }
        <Box component="form" onSubmit={Autenticar}>
          <TextField
           type="email"
           label="Email"
           variant="filled"
           margin="normal"
           value={email}
           onChange={ (e) => setEmail( e.target.value) }
           fullWidth 
           {...erro && ("error") }
            />
          <TextField
           type="password"
           label="senha"
           variant="filled"   
           margin="normal"
           value={senha}
           onChange={ (e) => setSenha( e.target.value) }
           fullWidth />
          <FormControlLabel
          control={ <Checkbox value={lembrar}  name="lembrar" onChange={ (e) => setLembrar( !lembrar) } />}
          label="Lembrar-me"
          />
          <Button type="submit" variant="contained" fullWidth sx={ {mt: 2, mb: 2} }>Login</Button>
          <Grid container>
            <Grid item xs>
                Esqueci a senha
            </Grid>
            <Grid item>
                Cadastrar
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Container>
  )
}

export default Login;