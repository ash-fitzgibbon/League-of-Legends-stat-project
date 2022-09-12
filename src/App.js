import React, { useState } from 'react'
import axios from 'axios'
// import logo from './logo.svg'
import './App.css'
const port = process.env.PORT || 3000

function App() {
  const [searchText, setSearchText] = useState('')
  const [playerData, setPlayerData] = useState({})
  const API_KEY = 'RGAPI-5747fb5c-1456-434e-aa0d-1a301be2bc00'

  function searchForPlayer(event) {
    //Set up Correct API Call
    var APICallString =
      'https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
      searchText +
      '?api_key=' +
      API_KEY
    //Handle the API call
    axios
      .get(APICallString)
      .then(function (response) {
        //Success
        setPlayerData(response.data)
      })
      .catch(function (error) {
        //Error
        console.log(error)
      })
  }

  console.log(playerData)

  return (
    <div className="App">
      <div className="container">
        <title>League Check</title>
        <h5>League of Legends Player Searcher</h5>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button onClick={(e) => searchForPlayer(e)}>Search for Player</button>
      </div>
      {JSON.stringify(playerData) != '{}' ? (
        <>
          <p>{playerData.name}</p>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/${playerData.profileIconId}.png`}
          />
          {/* <img src=`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/`/> */}
          <p>Summoner level {playerData.summonerLevel}</p>
        </>
      ) : (
        <>
          {' '}
          <p>No player data</p>
        </>
      )}
    </div>
  )
}

export default App
