import { useState, useEffect } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = ({ addNew }) => {
  const { clear: clearContent, ...contentRest } = useField("text");
  const { clear: clearAuthor, ...authorRest } = useField("text");
  const { clear: clearUrl, ...urlRest } = useField("url");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: contentRest.value,
      author: authorRest.value,
      info: urlRest.value,
      votes: 0,
    });
  };

  const handleReset = () => {
    clearAuthor();
    clearContent();
    clearUrl();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...contentRest} />
        </div>
        <div>
          author
          <input {...authorRest} />
        </div>
        <div>
          url for more info
          <input {...urlRest} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );
};

const Anecdote = ({ anecdote, toVote }) => {
  const id = useMatch("/anecdote/:id").params.id;
  const anecdoteId = Number(id);
  const anecdoteToShow = anecdote(anecdoteId);

  return (
    <div>
      <h2>{anecdoteToShow.content}</h2>
      <p>by {anecdoteToShow.author}</p>
      <p>has {anecdoteToShow.votes} votes</p>
      <button onClick={() => toVote(id)}>vote</button>
      <p>
        for more info see{" "}
        <a href={anecdoteToShow.info}>{anecdoteToShow.info}</a>
      </p>
    </div>
  );
};

const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return notification ? <div style={style}>{notification}</div> : null;
};

const App = () => {
  const navigation = useNavigate();
  const [notification, setNotification] = useState("");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
    navigation("/");
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(Number(id));
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    setAnecdotes(anecdotes.map((a) => (a.id === Number(id) ? voted : a)));
  };

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdote/:id"
          element={<Anecdote anecdote={anecdoteById} toVote={vote} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
