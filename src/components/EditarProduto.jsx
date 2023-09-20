import { Box, Container, TextField, Typography, Alert, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuResponsivo from './MenuResponsivo';

function EditarProduto() {

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
    const usuario = localStorage.getItem( "usuario" );
    fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario + "/" + id, {
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
        setErro( "Produto não encontrado!"  );
       }
     
       
      
    } )
    .catch( (erro)  => { setErro( true ) } )

   }, [] );


   function  Editar( evento ) {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "produtos", {
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
          imagem: imagem,
          usuario: localStorage.getItem( "usuario" )
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
    <>
    <MenuResponsivo/>
    <Container component="section" maxWidth="xs">
      <Box sx={{
          mt:10,
          backgroundColor: "#F59AD4",
          padding: "30px",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",

      }}>
        <Typography component="h1" variant='h4'>Editar Produto</Typography>

        { erro && ( <Alert severity="warning" sx={{mt: 2, mb: 2}}>{erro}</Alert>) }
        { editar && ( <Alert severity="success" sx={{mt: 2, mb: 2}}>Produto editado com sucesso!</Alert>) }


        <Box component="form" onSubmit={Editar}>

        <TextField
          type="name"
          label="Nome"
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
          type="name"
          label="Categoria"
          variant="filled"
          margin="normal"
          value={ano}
          onChange={ (e) => setAno( e.target.value) }
          fullWidth 
          />
          <TextField
          type="name"
          label="Cor"
          variant="filled"
          margin="normal"
          value={duracao}
          onChange={ (e) => setDuracao( e.target.value) }
          fullWidth 
          />
          <TextField
          type="name"
          label="Preço"
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
         <Button type="submit" variant="contained" fullWidth sx={ {mt: 2, mb: 3} }>Editar Produto</Button>
        </Box>
      </Box>
    </Container>
    </>
  )
}

export default EditarProduto;