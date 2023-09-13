import { Alert, Box, Button, Container, ImageList, ImageListItem, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';

function Filmes() {

    const [ titulo, setTitulo ] = useState ( "" );
    const [ descricao, setDescricao ] = useState( "" );
    const [ ano, setAno ] = useState( "" );
    const [ duracao, setDuracao ] = useState( "" );
    const [ categoria, setCategoria ] = useState( "" );
    const [ imagem, setImagem ] = useState( "" );
    const [ erro, setErro ] = useState( "" );
    const [ cadastroc, setCadastroC ] = useState( "" );


    function Cadastrar ( evento ) {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "filmes", {
         method: "POST",
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(
           {
             titulo: titulo,
             descricao: descricao,
             ano: ano,
             duracao: duracao,
             categoria: categoria,
             imagem: imagem
           }
         )
       } )
       .then( (resposta) => resposta.json() )
       .then( (json ) => {
          
         if( json.titulo ) {
            setCadastroC( true );
           setErro ( false );
         }else {
           setErro( true );
           setCadastroC( false );
         }
       } )
       .catch( (erro)  => { setErro( true ) } )
     }

    useEffect( () => {
        setTitulo( "" );
        setDescricao( "" );
        setAno( "" );
        setCategoria( "" );
        setImagem( "" );

    
      }, [ cadastroc ] );


  return (
    
    <Container component="section" maxWidth="xs">
         <Box sx={{
          mt:10,
          backgroundColor: "#FFE7E6",
          padding: "30px",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",

      }}>
         <Typography component="h1" variant='h4'>Cadastro de Filmes</Typography>

         { erro && ( <Alert severity="warning" sx={{mt: 2, mb: 2}}>Desculpe, tente novamente</Alert>) }
         {cadastroc && ( <Alert severity="success" sx={{mt: 2, mb: 2}}>Obrigado por se cadastrar!</Alert>) }

        <Box component="form" onSubmit={Cadastrar}>
        <TextField
          type="name"
          label="Título"
          variant="filled"
          margin="normal"
          value={titulo}
          onChange={ (e) => setTitulo( e.target.value) }
          fullWidth 
          />
          <TextField
          type="name"
          label="Descrição"
          variant="filled"
          margin="normal"
          value={descricao}
          onChange={ (e) => setDescricao( e.target.value) }
          fullWidth 
          />
          <TextField
          type="number"
          label="Ano"
          variant="filled"
          margin="normal"
          value={ano}
          onChange={ (e) => setAno( e.target.value) }
          fullWidth 
          />
          <TextField
          type="name"
          label="Duração"
          variant="filled"
          margin="normal"
          value={duracao}
          onChange={ (e) => setDuracao( e.target.value) }
          fullWidth 
          />
          <TextField
          type="name"
          label="Categoria"
          variant="filled"
          margin="normal"
          value={categoria}
          onChange={ (e) => setCategoria( e.target.value) }
          fullWidth 
          />
          <TextField
          type="name"
          label="Imagem"
          variant="filled"
          margin="normal"
          value={imagem}
          onChange={ (e) => setImagem( e.target.value) }
          fullWidth 
          />

           <Button type="submit" variant="contained" fullWidth sx={ {mt: 2, mb: 3} }>Cadastrar Filme</Button>
        </Box>

      </Box>










    </Container>
  )
}

export default Filmes