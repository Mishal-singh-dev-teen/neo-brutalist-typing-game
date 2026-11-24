# ⌨️ Typing Speed Challenge

A simple, interactive typing game built using **HTML, CSS, and JavaScript**. Test your typing accuracy, complete sentences, and challenge yourself against a 60-second timer.

## 🚀 Features

- **Sentence Typing:** Type randomly presented sentences.
- **60-Second Timer:** Complete as many sentences as possible within the time limit.
- **Sentence Validation:** Checks whether the entered sentence matches the original sentence.
- **Error Highlighting:** Highlights incorrect words to help identify mistakes.
- **Instant Feedback:** Displays success, error, and warning messages.
- **Result Screen:** Shows your completion percentage after the challenge.
- **Play Again:** Restart the challenge and try to improve your result.
- **Input Restrictions:** Prevents copying, cutting, pasting, and right-clicking inside the typing area.
- **Interactive UI:** Includes animations, visual feedback, and a clean interface.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling, layout and animations |
| JavaScript | Game logic and interactivity |

## 📂 Project Structure

```text
Typing-Speed-Challenge/
│
├── index.html
├── style.css
└── script.js
```

## ▶️ How to Run

1. Clone this repository:

   ```bash
   git clone https://github.com/mishalbhai/neo-brutalist-typing-game/tree/main
   ```

2. Open the project folder.
3. Open `index.html` in your web browser.
4. Start typing and press **Enter** to submit each sentence.

## 🎮 How to Play

1. Open the application.
2. Click inside the typing area to start the timer.
3. Type the displayed sentence exactly as shown.
4. Press **Enter** to submit your sentence.
5. Correct sentences advance to the next challenge.
6. Complete as many sentences as possible before the timer reaches zero.
7. View your final completion score and play again!

## 📊 Scoring

The final score is calculated using the percentage of completed sentences.

```js
(sentenceIndex / typingSentences.length) * 100
```

## 🎨 Design

The interface uses a minimal, monochromatic design with bold borders, offset shadows, and interactive visual feedback.

## 👨‍💻 Developer

**Mishal Singh**

Built as a personal JavaScript learning project to practise DOM manipulation, event handling, arrays, functions, timers, and dynamic content updates.

---

*Thanks for checking out my project!*
