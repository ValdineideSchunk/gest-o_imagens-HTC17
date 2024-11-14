import React, {useEffect, useState} from 'react'

function Home() {
    const [imagens, setImagens] = useState([]);
    useEffect(()=>{
        carregarImagens();
    },[]);
    
    
    async function carregarImagens(){
        try {
            const [resposta] = await fetch('http://localhost:5000/imagem',{
                method:'GET',
                headers:{
                    'Content-type':'application/json'
                }
            });

            if (!resposta){
                //throw new Error();
            }
            const consulta = await resposta.json();
            setImagens(resposta);
        } catch (error) {
            console.log(error);
            console.log('erro ao carregar imagens')
        }
    }
 
  return (
    <div>
        <h1>Gestão de imagens</h1>
        {imagens.map((imagem)=>(
            <div Key={imagem.id_imagem}>
        <img src={`http://localhost:5000/public/${imagem.caminho}`} alt={imagem.descricao}/>
        </div>        
    ))}
    </div>
  )
}

export default Home
