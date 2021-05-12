import React, { useState } from "react";
import axios from "axios";
import { Typography, Container, TextField } from "@material-ui/core";

function App() {
  const [data, setData] = useState("");

  let cancelToken;

  // USING AXIOS METHOD
  const handleChange = async (e) => {
    const query = e.target.value;

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Canceling the previous req");
    }

    cancelToken = axios.CancelToken.source();

    const result = await axios.get(`https://api.github.com/users/${query}`, {
      cancelToken: cancelToken.token,
    });
    console.table(result.data);
    setData(result.data);

    // USING FETCH METHOD
    // fetch(`https://api.github.com/users/${query}`)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setData(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Container maxWidth="sm" className="main">
      <div>
        <Typography variant="h2" component="h2">
          Github Profile Finder
        </Typography>
        <Typography variant="h5" component="h2">
          get your github profile info....
        </Typography>
        <br></br>
        <input
          type="text"
          className="myInput"
          placeholder="Enter username"
          onChange={handleChange}
        />
        <div className="res">
          <br />
          {data && <h2>{data.login}</h2>}
          <br />
          {data && <img src={data.avatar_url}></img>}
          {data && <p>Bio: {data.bio}</p>}
          {data && <p>Followers: {data.followers}</p>}
          {data && <p>Following: {data.following}</p>}
          {data && <p>Twitter: {data.twitter_username}</p>}
          {data && <p>Location: {data.location}</p>}
        </div>
      </div>
    </Container>
  );
}

export default App;
