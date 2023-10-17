import React, { useEffect, useState } from "react";
import "./style.css";
import { IoIosHeartEmpty } from "react-icons/io";

function App() {
  const [joke, setJoke] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
    fetchJoke();
  }, []);

  const fetchJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJoke(data.value);
      })
      .catch((error) => console.error("Error fetching joke:", error));
  };

  const handleJoke = (joke: string) => {
    const jokesNovo = [...favorites]; // na primeirq vez, vai estar vazio = []
    console.log("JokesNovo: ", jokesNovo);
    jokesNovo.push(joke);
    //com o personagensNovo atualizado, colocamos no estado do react
    setFavorites(jokesNovo);
    localStorage.setItem("favorites", JSON.stringify(jokesNovo));
    fetchJoke();
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Tem certeza que quer deletar?");
    if (confirmDelete) {
      const updatedFavorites = favorites.filter((_, i) => i !== index);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // camada de view => JSX / HTML
  return (
    <div className="App">
      <h1>Chuck Norris Joke</h1>
      <div className="joke-item">
        <p className="joke-name">{joke}</p>
      </div>
      <button onClick={fetchJoke}>Nova Piada</button>
      <button onClick={() => handleJoke(joke)} className="favorite-button">
        Adicionar aos Favoritos <IoIosHeartEmpty className="heart-icon" />
      </button>
      <button onClick={clearFavorites}>Limpar Favoritos</button>
      <div className="favorites-list">
        <h2>
          Lista de favoritos <IoIosHeartEmpty className="heart-icon" />
        </h2>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((favorite, index) => (
              <li key={index}>
                {favorite}
                <button onClick={() => handleDelete(index)}>Excluir</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma piada favorita.</p>
        )}
      </div>
    </div>
  );
}

export default App;
