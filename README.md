# full-stack-photo-tagging-game

Full Stack Photo Tagging Game with React Front End, Node.js Back End and PostgreSQL database

## 📘 Project Introduction

This demo game is designed to strengthen technical proficiency in building an app that, will feel very similar to a photo tagging app. Starting with a large photograph containing several elements the user is meant to find, e.g. Maverick, The Wizard, Ice Man etc. The user will make selections for each character and they will be given feedback on whether they are correct or not.

In the photo need oto identify where exactly each person is using its pixel position and save the coordinates. When the user clicks the photo, a box should pop up containing a list of possible characters.

When the user selects one of these characters, code will check to see if that character is actually within the targeting box. Provide the user with appropriate feedback (e.g. if wrong, an error message). If correct, place a marker on the photo in the character.

Keep track of how long it takes from when the photo is first loaded to when the user finally identifies all of the characters. Once a round is complete, ask the user for their name and record that time.

## 🚀 Live Demo

- **Front End (GitHub Pages):** [https://www.amalk.au/full-stack-photo-tagging-game](https://www.amalk.au/full-stack-photo-tagging-game)
- **Backend (Render):** [https://full-stack-photo-tagging-game.onrender.com/](https://full-stack-photo-tagging-game.onrender.com/)

  > Note: Free hosting tiers may cause delays of up to 50 seconds on first load.

  ## 💻 Source Code

- **Main GitHub Repository:** [Main GitHub Repository](https://github.com/amaldevelops/full-stack-photo-tagging-game)
- **Front End Code:** [Front End Source Code](https://github.com/amaldevelops/full-stack-photo-tagging-game/tree/main/frontend)
- **Back End Code:** [Back End Source Code](https://github.com/amaldevelops/full-stack-photo-tagging-game/tree/main/backend)

## 🧱 Tech Stack

### Front End

- JavaScript, React, Vite, HTML, CSS

### Back End

- Node.js, Express, Postman

## ⚙️ Deployment Guide

### Setup

```bash
git clone git@github.com:amaldevelops/full-stack-photo-tagging-game.git

# Front End
cd frontend
npm install

# Back End
cd ../backend
npm install

# GitHub Pages (Frontend Hosting)
npm run deploy
```
