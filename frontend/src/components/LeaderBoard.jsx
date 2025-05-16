import React, { useEffect, useState } from "react";

const apiURL = import.meta.env.VITE_API_URL;

function LeaderBoard() {
  useEffect(() => {
    async function fetchLeaderBoard() {
      try {
        let response = await fetch(`${apiURL}/leaderboard`);

        if (!response.ok) {
          throw new Error("HTTP Error! Status", response.status);
        }

        const queryResult = await response.json();
        console.log(queryResult);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLeaderBoard();
  }, []);

  return (
    <div>
      <h1>Leader Board</h1>
    </div>
  );
}

export default LeaderBoard;
