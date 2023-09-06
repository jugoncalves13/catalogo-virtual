import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';

function Cadastro() {

  const [ email, setEmail ] = useState ( "" );
  const [ senha, setSenha ] = useState( "" );
  const [ nome, setNome ] = useState( "" );
  const [ telefone, setTelefone ] = useState( "" );
  const [ cpf, setCpf ] = useState( "" );
  const [ cadastro, setCadastro ] = useState( false );
  const [ erro, setErro ] = useState( "" );

  function Cadastrar(  evento ) {
     evento.preventDefault();
     fetch( "http://10.139.75.32:8080/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          nome: nome,
          email: email,
          cpf: cpf,
          telefone: telefone,
          senha: senha
        }
      )
    } )
    .then( (resposta) => resposta.json() )
    .then( (json ) => {
       
      if( json.cpf ) {
        setCadastro( true );
        setErro ( false );
      }else {
        setErro( true );
        setCadastro( false );
      }
    } )
    .catch( (erro)  => { setErro( true ) } )
  }

  useEffect( () => {
    setNome( "" );
    setEmail( "" );
    setCpf( "" );
    setTelefone( "" );
    setSenha( "" );
    //setCadastro( false );

  }, [ cadastro ] );



  return (
    <Container component="section" maxWidth="xs">
      <Box sx={{
          mt:10,
          backgroundColor: "#DE8BF5",
          padding: "30px",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",

      }}>
        <Typography component="h1" variant='h4'>Cadastrar</Typography>

        { erro && ( <Alert severity="warning" sx={{mt: 2, mb: 2}}>Desculpe, tente novamente</Alert>) }
        { cadastro && ( <Alert severity="success" sx={{mt: 2, mb: 2}}>Obrigado por se cadastrar!</Alert>) }

        <Box component="form" onSubmit={Cadastrar}>
          <TextField
          type="name"
          label="Nome"
          variant="filled"
          margin="normal"
          value={nome}
          onChange={ (e) => setNome( e.target.value) }
          fullWidth 
          />
          <TextField
          type="name"
          label="Email"
          variant="filled"   
          margin="normal"
          value={email}
          onChange={ (e) => setEmail( e.target.value) }
          fullWidth
          />
           <TextField
           type="password"
           label="senha"
           variant="filled"   
           margin="normal"
           value={senha}
           onChange={ (e) => setSenha( e.target.value) }
           fullWidth 
          />
           <TextField
          type="number"
          label="Telefone"
          variant="filled"   
          margin="normal"
          value={telefone}
          onChange={ (e) => setTelefone( e.target.value) }
          fullWidth
          />
          <TextField  
          type="number"
          label="Cpf"
          variant="filled"   
          margin="normal"
          value={cpf}
          onChange={ (e) => setCpf( e.target.value) }
          fullWidth
          />
          <Button type="submit" variant="contained" fullWidth sx={ {mt: 2, mb: 3} }>Concluido</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Cadastro;