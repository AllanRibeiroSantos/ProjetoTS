import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState("");

  function getLivros() {
    axios
      .get("http://localhost:3001/livros")
      .then((resp) => setPosts(resp.data))
      .catch((erro) => console.log(erro.message, erro.name, erro.code));
  }

  useEffect(() => {getLivros()}, []);

  function onSubmit(event) {
    event.preventDefault();
    const id = uuidv4();
    axios
      .post(`http://localhost:3001/livros/:${id}`, {
        id: id,
        title: title,
        content: content,
        username: username,
      })
      .then((resp) => getLivros())
      .catch((erro) => console.log(erro.message, erro.name, erro.code));
  }

  function onDeletePost(event, id) {
    event.preventDefault();
    console.log(id);
    axios
      .delete(`http://localhost:3001/livros/${id}`)
      .then((resp) => getLivros())
      .catch((erro) => console.log(erro.message, erro.name, erro.code));
  }

  return (
    <div className="container">
      <form className="form__container">
        <label>Titulo</label>
        <input type="text" onChange={(event) => setTitle(event.target.value)} />
        <label>Postagem</label>
        <input
          type="text"
          onChange={(event) => setContent(event.target.value)}
        />
        <label>Username</label>
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className="form__container--submit_button" onClick={onSubmit}>
          Criar postagem
        </button>
      </form>
      <section className="post__container">
        <h2>Postagens</h2>
        <div className="form__container--bindestreck" />
        {posts &&
          posts.map((post) => (
            <div key={uuidv4()} className="post__container--post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>{post.username}</p>
              <div>
                <button
                  className="post__container--delete_button"
                  onClick={(event) => onDeletePost(event, post.id)}
                >
                  Deletar
                </button>
                <button className="post__container--update_button">
                  Editar
                </button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
