import React, { useEffect, useState } from "react";

const apiURL = import.meta.env.VITE_API_URL;

function LeaderBoard() {
  const [leaderBoardScores, SetLeaderBoardScores] = useState([]);
  useEffect(() => {
    async function fetchLeaderBoard() {
      try {
        let response = await fetch(`${apiURL}/leaderboard`);

        if (!response.ok) {
          throw new Error("HTTP Error! Status", response.status);
        }

        const queryResult = await response.json();
        SetLeaderBoardScores(queryResult);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLeaderBoard();
  }, []);

  return (
    <div className="LeaderboardDiv">
      <h1>Leader Board</h1>

      <ul className="no-bullets">
        {leaderBoardScores.map((entry, index) => (
          <li className="leaderboard-row" key={index}>
            <span className="name">{entry.name}</span>
            <span className="time">{entry.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderBoard;
