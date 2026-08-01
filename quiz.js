"use strict";

(() => {
  const LEADERBOARD_KEY = "queenNajmaQuizLeaderboard";
  const questions = [
    ["Favorite color?", "Teal", ["Blue", "Purple", "Pink"]],
    ["Favorite meal to cook?", "Baked Chicken", ["Biryani", "Lasagna", "Nihari"]],
    ["Favorite dessert?", "Ice Cream", ["Cheesecake", "Chocolate Cake", "Gulab Jamun"]],
    ["Favorite drink?", "Mango Lassi", ["Chai", "Coffee", "Diet Coke"]],
    ["Favorite place?", "Madinah", ["Hawaii", "Pakistan", "Banff"]],
    ["What word does Baygi say all the time?", "Thingy", ["Whatever", "Seriously", "Come on"]],
    ["What annoys Baygi the most?", "People saying they'll do something but never doing it", ["Dirty dishes", "Running late", "Loud TV"]],
    ["If Baygi had one free hour...", "Make Chai", ["Take a nap", "Watch YouTube", "Go shopping"]],
    ["What brings Baygi the most joy?", "Hearing her grandkids crack jokes", ["Traveling", "Gardening", "Watching TV"]],
    ["Which grandchild makes Baygi laugh the hardest?", "Fatima", ["Abu-Bakr", "Zaynab", "Adam"]],
    ["Who can most easily convince Baygi to go shopping?", "Fatima", ["Layla", "Zaynab", "Humza"]],
    ["One of Baygi's happiest memories?", "Finding out her first grandchild would be a girl", ["Her wedding", "Moving to America", "Visiting Hawaii"]],
    ["If Baygi could relive one day...", "The day Ali was born", ["Wedding", "Yusuf's birth", "Fatima's birth"]],
    ["When does Baygi feel most loved?", "When all her grandkids are together", ["Receiving gifts", "Flowers", "Shopping"]],
    ["Most meaningful words?", "I love you", ["Thank you", "I'm proud of you", "You're amazing"]],
    ["If she won a $500 shopping spree...", "Books", ["Amazon", "Target", "Macy's"]],
    ["Favorite hobby?", "Painting", ["Crocheting", "Shopping", "Movies"]],
    ["If she could teach one life skill...", "Cooking", ["Gardening", "Saving money", "Sewing"]],
    ["Teleport tomorrow...", "Hawaii", ["Madinah", "Pakistan", "Canada"]],
    ["Greatest accomplishment?", "Her kids, grandkids, and family are all doing well", ["Travel", "Career", "Home"]]
  ].map(([text, correct, wrong]) => ({ text, correct, answers: [correct, ...wrong] }));

  const elements = Object.fromEntries([
    "name-screen", "question-screen", "tiebreaker-screen", "results-screen", "name-form", "player-name",
    "question-count", "quiz-score-status", "quiz-progress-fill", "question-text", "quiz-options", "next-question",
    "tiebreaker-form", "tiebreaker-answer", "results-title", "quiz-title-award", "missed-section", "missed-list",
    "leaderboard-list", "play-again", "quiz-live-region"
  ].map((id) => [id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), document.getElementById(id)]));

  let playerName = "";
  let quizQuestions = [];
  let questionIndex = 0;
  let selectedAnswer = "";
  let responses = [];

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
  }

  function showOnly(target) {
    [elements.nameScreen, elements.questionScreen, elements.tiebreakerScreen, elements.resultsScreen]
      .forEach((screen) => { screen.hidden = screen !== target; });
    window.scrollTo({ top: 0, behavior: "smooth" });
    target.querySelector("h1, h2, input")?.focus({ preventScroll: true });
  }

  function startQuiz(event) {
    event.preventDefault();
    playerName = elements.playerName.value.trim();
    if (!playerName) return;
    quizQuestions = shuffle(questions).map((question) => ({ ...question, answers: shuffle(question.answers) }));
    questionIndex = 0;
    responses = [];
    renderQuestion();
    showOnly(elements.questionScreen);
  }

  function renderQuestion() {
    const question = quizQuestions[questionIndex];
    selectedAnswer = "";
    elements.questionCount.textContent = `Question ${questionIndex + 1} of ${quizQuestions.length}`;
    elements.quizScoreStatus.textContent = "Choose your answer";
    elements.questionText.textContent = question.text;
    elements.quizProgressFill.style.width = `${((questionIndex + 1) / quizQuestions.length) * 100}%`;
    elements.quizProgressFill.parentElement.setAttribute("aria-valuenow", String(questionIndex + 1));
    elements.nextQuestion.disabled = true;
    elements.nextQuestion.textContent = questionIndex === quizQuestions.length - 1 ? "Bonus Tie Breaker" : "Next Question";
    elements.quizOptions.replaceChildren(...question.answers.map((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", "false");
      button.textContent = answer;
      button.addEventListener("click", () => selectAnswer(answer, button));
      return button;
    }));
  }

  function selectAnswer(answer, button) {
    selectedAnswer = answer;
    elements.quizOptions.querySelectorAll(".quiz-option").forEach((option) => option.setAttribute("aria-checked", String(option === button)));
    elements.nextQuestion.disabled = false;
    elements.quizScoreStatus.textContent = "Answer selected";
    elements.quizLiveRegion.textContent = `${answer} selected`;
  }

  function nextQuestion() {
    if (!selectedAnswer) return;
    const question = quizQuestions[questionIndex];
    responses.push({ question: question.text, answer: selectedAnswer, correct: question.correct });
    questionIndex += 1;
    if (questionIndex === quizQuestions.length) {
      showOnly(elements.tiebreakerScreen);
      return;
    }
    renderQuestion();
    elements.questionText.focus({ preventScroll: true });
  }

  function getTitle(score) {
    if (score === 20) return "🌟 Ultimate Baygi Whisperer";
    if (score >= 16) return "👑 Bhatti Family Historian";
    if (score >= 11) return "❤️ Official Baygi Expert";
    if (score >= 6) return "😊 Family Friend";
    return "🤔 You Just Met Baygi!";
  }

  function loadLeaderboard() {
    try { return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || []; }
    catch { return []; }
  }

  function saveScore(score) {
    const scores = [...loadLeaderboard(), { name: playerName, score, date: new Date().toISOString() }]
      .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
      .slice(0, 10);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(scores));
    return scores;
  }

  function showResults(event) {
    event.preventDefault();
    const score = responses.filter((response) => response.answer === response.correct).length;
    const missed = responses.filter((response) => response.answer !== response.correct);
    elements.resultsTitle.textContent = `${playerName}, you scored ${score} / 20`;
    elements.quizTitleAward.textContent = getTitle(score);
    elements.missedSection.hidden = missed.length === 0;
    elements.missedList.replaceChildren(...missed.map((response) => {
      const item = document.createElement("article");
      item.className = "missed-item";
      const heading = document.createElement("h4");
      heading.textContent = response.question;
      const yours = document.createElement("p");
      yours.textContent = `❌ Your Answer: ${response.answer}`;
      const baygis = document.createElement("p");
      baygis.textContent = `✅ Baygi's Answer: ${response.correct}`;
      item.append(heading, yours, baygis);
      return item;
    }));
    const leaderboard = saveScore(score);
    elements.leaderboardList.replaceChildren(...leaderboard.map((entry) => {
      const item = document.createElement("li");
      item.append(document.createTextNode(`${entry.name} · ${new Date(entry.date).toLocaleDateString()} `));
      const scoreLabel = document.createElement("span");
      scoreLabel.textContent = `${entry.score}/20`;
      item.append(scoreLabel);
      return item;
    }));
    showOnly(elements.resultsScreen);
  }

  function playAgain() {
    elements.tiebreakerAnswer.value = "";
    elements.playerName.value = playerName;
    showOnly(elements.nameScreen);
  }

  elements.nameForm.addEventListener("submit", startQuiz);
  elements.nextQuestion.addEventListener("click", nextQuestion);
  elements.tiebreakerForm.addEventListener("submit", showResults);
  elements.playAgain.addEventListener("click", playAgain);

  if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
  }
})();
