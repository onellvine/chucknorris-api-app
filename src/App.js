import React, { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';

function App() {

  const [state, setState] =  useState({
    joke: ''
  });

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () =>{
    const result = await axios.get("https://api.chucknorris.io/jokes/categories");
    setState({
      ...state,
      joke: result.data
    });
  }

  const getJoke = async (e, category) => {
    var category = e.currentTarget.innerHTML;
    console.log(category);
    let real_joke = await axios.get("https://api.chucknorris.io/jokes/random?category="+`${category}`);
    console.log(real_joke.data.value);

    setState({
      ...state,
      the_joke: real_joke.data.value
    });
  };

  const categories = state.joke;
  const menu = [];
  for(let cat of categories){
    menu.push(<li style={{marginRight:'30px', cursor:'pointer'}} onClick={getJoke} key={cat}>{cat}</li>);
  }
  return (
    <div className='container'>
      <h1>Chuck Norris API</h1>
      {/* <p onClick={getJoke}>{ state.joke + " " }</p> */}
      <ul style={{listStyle: 'none', display:'flex', justifyContent:'center'}}>{menu}</ul>
      <p id="joke"> { state.the_joke }</p>
    </div>
  );
}


export default App;
