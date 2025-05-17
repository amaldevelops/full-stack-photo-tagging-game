import React, { useEffect, useState } from "react";

const apiURL = import.meta.env.VITE_API_URL;

function LeaderBoard() {
  const [leaderBoardScores, SetLeaderBoardScores] = useState([]);
  const [backEndStatus, SetBackEndStatus] = useState("loading");

  useEffect(() => {
    async function fetchLeaderBoard() {
      try {
        let response = await fetch(`${apiURL}/leaderboard`);

        if (!response.ok) {
          SetBackEndStatus("error");
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const queryResult = await response.json();
        SetLeaderBoardScores(queryResult);
        SetBackEndStatus("ok"); // Set status to ok after successful fetch
      } catch (err) {
        SetBackEndStatus("error");
        console.error(err);
      }
    }

    fetchLeaderBoard();
  }, []);

  return (
    <div className="LeaderboardDiv">
      {backEndStatus === "loading" && <p>BackEnd Resuming....</p>}

      {backEndStatus === "error" && (
        <p>
          Error loading leaderboard data. This may be due to backend is in the
          process of waking up. Please try again later.
        </p>
      )}

      {backEndStatus === "ok" && leaderBoardScores.length > 0 && (
        <>
          <h2>Leader Board</h2>
          <ul className="no-bullets">
            {leaderBoardScores.map((entry, index) => (
              <li className="leaderboard-row" key={index}>
                <span className="name">{entry.name}</span>
                <span className="time">{entry.time}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {backEndStatus === "ok" && leaderBoardScores.length === 0 && (
        <p>No leaderboard data available</p>
      )}
    </div>
  );
}

export default LeaderBoard;
