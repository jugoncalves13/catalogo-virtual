import { Box, Container, TextField, Typography, Alert, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditaFilme() {

  const { id } = useParams();

  console.log( id);
  const [ titulo, setTitulo ] = useState ( "" );
  const [ descricao, setDescricao ] = useState( "" );
  const [ ano, setAno ] = useState( "" );
  const [ duracao, setDuracao ] = useState( "" );
  const [ categoria, setCategoria ] = useState( "" );
  const [ imagem, setImagem ] = useState( "" );
  const [ erro, setErro ] = useState( false );
  const [ editar, setEditar ] = useState( false );

   useEffect( () => {
    fetch( process.env.REACT_APP_BACKEND + "filmes/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    } )
    .then( (resposta) => resposta.json() )
    .then( (json ) => {

       if( !json.status ) { 
        setTitulo(  json.titulo );
        setDescricao( json.descricao );
        setAno(  json.ano );
        setDuracao(  json.duracao );
        setImagem(  json.imagem );
        setCategoria(  json.categoria );
       } else {
        setErro( "Filme não encontrado!"  );
       }
     
       
      
    } )
    .catch( (erro)  => { setErro( true ) } )

   }, [] );


   function  Editar( evento ) {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "filmes", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          id: id,
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
       
      if( json._id ) {
         setEditar( true );
        setErro ( false );
      }else {
        setErro("Não foi possível encontrar o filme!" );
        setEditar( false );
      }
    } )
    .catch( (erro)  => { setErro( true ) } )
  }

  return (
    <Container component="section" maxWidth="xs">
      <Box sx={{
          mt:10,
          backgroundColor: "#FBC4E7",
          padding: "30px",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",

      }}>
        <Typography component="h1" variant='h4'>Editar Filme</Typography>

        { erro && ( <Alert severity="warning" sx={{mt: 2, mb: 2}}>{erro}</Alert>) }
        { editar && ( <Alert severity="success" sx={{mt: 2, mb: 2}}>Filme editado com sucesso!</Alert>) }


        <Box component="form" onSubmit={Editar}>

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
         <Button type="submit" variant="contained" fullWidth sx={ {mt: 2, mb: 3} }>Editar Filme</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default EditaFilme