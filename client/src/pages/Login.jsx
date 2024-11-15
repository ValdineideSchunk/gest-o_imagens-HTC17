import React, { useState } from "react";

function Login() {
    const [login,setLogin] = useState('');
    const [senha,setSenha] = useState('');

    async function efetuarLogin() {
        const usuario = {login,senha}
        try {
            const resposta = await fetch('http://localhost:5000/logar',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(usuario)
            });
            if(!resposta.ok){
                alert('Usuario ou senha invalidos')
            }else{
                alert('Login efetuado com sucessooooo')
            }
        } catch (error) {
            
        }
    }



  return (
    <div className="container">
      <div className="mt-5 col-md-3 mx-auto">
        <h1 className="text-center">Efetue Login</h1>
        <label htmlFor="">Login</label>
        <input 
        className="form-control" 
        type="text" 
        placeholder="login" 
        onChange={(e) => setLogin(e.target.value)}/>
        <label htmlFor="">Senha</label>
        <input 
        className="form-control" 
        type="password" 
        placeholder="******" 
        onChange={(e) => setSenha(e.target.value)}/>

        <div>
            <button className="float-end btn btn-success mt-2" onClick={efetuarLogin}>logar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
