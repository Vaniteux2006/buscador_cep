import { useState } from 'react';
import { MdFindInPage } from "react-icons/md";
import './styles.css'
import api from "./services/api"

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === '') {
      alert("Vazio!")
      setInput("");
      return;
    } {
      try {
        const response = await api.get(`${input}/json`);
        if (!response.data.complemento) {
          response.data.complemento = "Sem Complemento";
        }

        setCep(response.data);
        setInput("");
      }
      catch {
        alert("Erro 400")
        setInput("");
        return;
      }
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador de Endereços</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}></input>
        <button className="buttonSearch" onClick={handleSearch}>
          <MdFindInPage size={20} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Endereço: {cep.logradouro} </span>
          <span>Complemento: {cep.complemento} </span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf} </span>

        </main>
      )}

    </div>

  );
}

export default App;
