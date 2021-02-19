import './App.scss';
import React, {useState, useEffect} from 'react';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons'

const quoteDBUrl = "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"

function App() {
  const [quote, setQuote] = useState("Peace at home, peace at the world.")
  const [author, setAuthor] = useState("M. Kemal Atatürk")
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34');

  const fetchQuotes = async (url) =>{
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON);
  }

  useEffect(() =>{
    fetchQuotes(quoteDBUrl)});

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    setAccentColor(COLORS_ARRAY[randomInteger])
  }

  return (
    <div className="App">
      <header className="App-header" style={ 
        {backgroundColor: accentColor}}>
        <div id="quote-box" style={ 
        {color: accentColor }}>
          
          <p id="text">
            <span id="quote-icon"><FontAwesomeIcon icon={faQuoteLeft}/></span>
            "{quote}"
          </p>
          <p id="author">- {author}</p>     
          <div className="buttons">
            <a id="tweet-quote" href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote} -${author}`)} target="_blank" rel="noreferrer" style={ 
            {backgroundColor: accentColor}}
            ><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote" onClick={()=> getRandomQuote()} style={ 
            {backgroundColor: accentColor}}>Get a Random Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
