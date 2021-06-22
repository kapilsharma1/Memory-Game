import React, { useEffect, useState } from "react";
import "./styles.css";
export default function App() {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [successTurns, setsuccessTurns] = useState(0);
  const [turns, setTurns] = useState(0);
  const shuffle = arr => arr.sort(() => 0.5 - Math.random());
  const alphabets = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
    { id: 6, name: "F" },
    { id: 7, name: "G" },
    { id: 8, name: "H" }
  ];


  const [pairOfAlphabets, setpairOfAlphabets] = useState(shuffle([...alphabets, ...alphabets]));
 

  function flipCard(index) {
    if(openedCard[0]!=index)
    {
       setOpenedCard((opened) => [...opened, index]);
       
    }

  }
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);

  }, []);



  useEffect(() => {
    //if (openedCard < 2) return;

    const firstMatched = pairOfAlphabets[openedCard[0]];
    const secondMatched = pairOfAlphabets[openedCard[1]];

    if ((secondMatched) &&firstMatched.id === secondMatched.id ) {
      setMatched([...matched, firstMatched.id]);
      setsuccessTurns(successTurns+1);
    }
    

    if (openedCard.length === 2) 
    {
      setTimeout(() => setOpenedCard([]), 1000);
      setTurns(turns+1);
    }
   
  }, [openedCard]);

  return (
    <div className="App">
     <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} >
     <h1>Successful Matches: {successTurns}</h1>
      <h1>Total Turns: {turns}</h1>
     </div>

      <div className="cards">
      
        {pairOfAlphabets.map((alphabet, index) => {
          
          


          let isFlipped = false;

          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(alphabet.id)) isFlipped = true;
          return (
            <div
              className={`alphabet-card ${isFlipped ? "flipped" : ""} `}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img
                    src={process.env.PUBLIC_URL + `/${alphabet.id}.png`}
                    alt="alphabet-name"
                    width="100"
                  />
                </div>
                <div className="back"></div>
              </div>
              
            </div>
            
          );
        })}
      </div>
      <footer style={{textAlign:"center"}}>Made by Kapil Sharma</footer>
    </div>
  );
}
