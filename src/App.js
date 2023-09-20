import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import Filme from "./components/Filme";
import MenuResponsivo from "./components/MenuResponsivo";
import Foto from "./components/img/foto de fundo.jpg";

function App() {
   
  document.body.style.backgroundImage = "url("+ Foto + ")";
   const [ filmes, setFilmes ] = useState();
   const [ erro, setErro ] = useState();
   const [ usuario, setUsuario ] = useState( "");

   useEffect( () => {

    const usuario = localStorage.getItem( "usuario" );
    
      fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario, {
        headers: {
          'Content-Type': 'application/json'
        },
      } )
      .then( (resposta) => resposta.json() )
      .then( (json ) => { setFilmes( json ) } )
      .catch( (erro)  => { setErro( true ) } )

   },  [])

   function Excluir( evento, id )
  {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "produtos", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
         id: id,
         usuario:localStorage.getItem( "usuario" )
        }
      )
    } )
    .then( (resposta) => resposta.json() )
    .then( (json ) => {
       
      const novaLista = filmes.filter( (filme) => filme._id !== id );
      setFilmes(  novaLista );
    } )
    .catch( (erro)  => { setErro( true ) } )
  
  }
     
 return(
    <>
    <MenuResponsivo />
    <h1>Produtos</h1>
    <Container sx={{
         display:"flex",
         flexFlow:"row",
         flexWrap:"wrap",
         gap:"2rem"
    }}>
    { filmes && (
      filmes. map( (filme, index ) => ( 
         <Filme 
                imagem={filme.imagem}
                titulo={filme.titulo}
                descricao={filme.descricao}
                categoria={filme.categoria}
                ano={filme.ano}
                duracao={filme.duracao}
                excluir={ (e) => Excluir( e, filme._id) }
                id={filme._id} 
         />
      ))
    )}
    </Container>
    </>
 );

}

export default App;
