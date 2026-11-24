const typingSentences = [
    "The quick brown fox jumps over the dog.",
    "A warm cup of coffee is the best way.",
    "Learning a brand new skill takes work.",
    "The gentle sound of rain helps us sleep.",
    "Always remember to check your work now.",
    "The bright golden sunset painted the sky.",
    "Can you please show me the old room now?",
    "Hard work and focus always bring success",
    "A small act of kindness can change lives",
    "We need to find a clean way to fix cars."
];

const typingArea = document.getElementById('typeArea');
const textToType = document.querySelector('.textToType');
const timerDisplay = document.getElementById('number');
const feedbackMsg = document.getElementById('feedback-msg');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timeLimit = 60;

let currentSentence = "";
let sentenceIndex = 0;
let isTimerRunning = false;
let timerInterval = null;
let timeLeft = timeLimit;
let totalKeys = 0;
let correctKeys = 0;
let correctChars = 0;

const calcWpm = () => {
    const elapsedSeconds = timeLimit - timeLeft;
    if (elapsedSeconds <= 0) return 0;
    return Math.round((correctChars / 5) / (elapsedSeconds / 60));
};

const calcAccuracy = () => {
    if (totalKeys === 0) return 100;
    return Math.round((correctKeys / totalKeys) * 100);
};

const updateStats = () => {
    wpmDisplay.textContent = calcWpm();
    accuracyDisplay.textContent = calcAccuracy() + '%';
};

const updateFeedback = (text, status = 'info') => {
    feedbackMsg.textContent = text;
    feedbackMsg.style.borderColor = "#181717";

    if (status === 'error') {
        feedbackMsg.style.backgroundColor = "#ffcdd2";
        feedbackMsg.classList.add('shake-error')  
    } else if (status === 'success') {
        feedbackMsg.style.backgroundColor = "#c8e6c9"; 
    } else if (status === 'warning') {
        feedbackMsg.style.backgroundColor = "#ffe0b2"; 
    } else {
        feedbackMsg.style.backgroundColor = "#ffffff"; 
    }
};

const loadNewSentence = () => {
    if (sentenceIndex >= typingSentences.length) {
        updateFeedback("Amazing job! You completed everything!", "success");
        clearInterval(timerInterval);
        tellScore();
        return;
    }
    currentSentence = typingSentences[sentenceIndex];
    textToType.textContent = currentSentence;
};

loadNewSentence();

const checkTypingMatch = (userInput, correctSentence) => {

    const userArray = userInput.trim().split(/\s+/);
    const correctArray = correctSentence.trim().split(/\s+/);
    
    let isPerfectMatch = true;
    let highlightedHTML = [];

    for (let i = 0; i < correctArray.length; i++) {
        if (userArray[i] !== correctArray[i]) {
            isPerfectMatch = false;
            
            highlightedHTML.push(`<span style="color: red; font-weight: bold;">${correctArray[i]}</span>`);
        } else {
            highlightedHTML.push(correctArray[i]);
        }
    }

    textToType.innerHTML = highlightedHTML.join(' ');

    if (isPerfectMatch && userArray.length === correctArray.length) {
        updateFeedback("Perfect! Loaded the next sentence...", "success");
        correctChars += correctSentence.length;
        updateStats();
        typingArea.value = "";
        typingArea.style.borderColor = "#181717";
        sentenceIndex++;
        loadNewSentence();
    } else {
        updateFeedback("The text doesn't match perfectly yet. Check red words!", "error");
        typingArea.style.borderColor = "#b71c1c";
    }
};

const tellScore = () => {
    let msg = "";
    document.title = "Result";

    const percentage = (sentenceIndex / typingSentences.length) * 100;
    const scoreText = percentage + '%';
    const finalWpm = calcWpm();
    const finalAccuracy = calcAccuracy();

    if (sentenceIndex < 4) {
        msg = "You're just getting started! Keep practicing to type more sentences.";
    } else if (sentenceIndex === 4) {
        msg = "You match the speed of an average typist. Good job! Try again to improve your score.";
    } else if (sentenceIndex > 4 && sentenceIndex < typingSentences.length) {
        msg = "You did great! You are faster than an average typist. Fast performer!";
    } else if (sentenceIndex === typingSentences.length) {
        msg = "You did excellent! You are an excellent typist.";
    }

    document.querySelector('.tester-cont').innerHTML = `
        <div class="result-card">
            <h2>Test Complete!</h2>
            <div class="score-badge">Score: ${scoreText}</div>
            <div class="result-stats">
                <div class="score-badge small">⚡ WPM: ${finalWpm}</div>
                <div class="score-badge small">🎯 Accuracy: ${finalAccuracy}%</div>
            </div>
            <p class="result-msg">${msg}</p>
            <button type="button" id="reset-btn" onclick="location.reload()">Play again</button>
        </div>
    `;
};

typingArea.addEventListener('input', () => {
    if (!isTimerRunning) {
        isTimerRunning = true;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft + ' sec';
            updateStats();

            if (timeLeft <= 0) {
                typingArea.disabled = true;
                clearInterval(timerInterval);
                updateFeedback("Time's up!", "error");
                tellScore();
            } else if (timeLeft <= 10) {
                timerDisplay.className = "error-text";
            } else if (timeLeft < 20) {
                timerDisplay.className = "warning-text";
            }
        }, 1000);
    }
});

typingArea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        checkTypingMatch(typingArea.value, currentSentence);
    }
});

typingArea.addEventListener('input', (event) => {
    textToType.textContent = currentSentence;
    typingArea.style.borderColor = "#181717";

    if (event.inputType === 'insertText') {
        const position = typingArea.value.length - 1;
        totalKeys++;
        if (typingArea.value[position] === currentSentence[position]) {
            correctKeys++;
        }
        updateStats();
    }
});

typingArea.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    updateFeedback("Right-click menu disabled in typing area!", "warning");
});

typingArea.addEventListener('paste', (event) => {
    event.preventDefault();
    updateFeedback("Pasting is strictly prohibited!", "error");
});

typingArea.addEventListener('copy', (event) => {
    event.preventDefault();
    updateFeedback("Copying text is disabled!", "warning");
});

typingArea.addEventListener('cut', (event) => {
    event.preventDefault();
    updateFeedback("Cutting text is disabled!", "warning");
});
