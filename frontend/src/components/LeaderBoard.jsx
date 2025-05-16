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
  console.dir(leaderBoardScores.length);
  // const length=leaderBoardScores.length;
  for (let i = 0; i < leaderBoardScores.length; i++) {
    console.log(
      leaderBoardScores[i]["name"],
      ":",
      leaderBoardScores[i]["time"]
    );
  }

  return (
    <div className="LeaderboardDiv">
      <h1>Leader Board</h1>

      <ul className="no-bullets">
        {leaderBoardScores.map((entry, index) => (
          <li key={index}>
            {entry.name}:{entry.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderBoard;
