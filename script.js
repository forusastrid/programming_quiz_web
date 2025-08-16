  let selectedQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  let nickname = '';
  
  function startQuiz() {
    nickname = document.getElementById('nickname').value.trim();
    if (nickname === '') {
      alert("닉네임을 입력하세요 ❗");
      return;
    }
  
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
  
    selectedQuestions = shuffleArray(allQuestions).slice(0, 5);
    currentQuestionIndex = 0;
    score = 0;
  
    startTimer();
    showQuestion();
  }
  
  function startTimer() {
    timeLeft = 30;
    document.getElementById('timer').innerText = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }
  
  function showQuestion() {
    const q = selectedQuestions[currentQuestionIndex];
    document.getElementById('question').innerText = q.question;
    
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
  
    q.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.innerText = choice;
      button.onclick = () => selectAnswer(index);
      choicesDiv.appendChild(button);
    });
  }
  
  function selectAnswer(index) {
    clearInterval(timer);
  
    const q = selectedQuestions[currentQuestionIndex];
    if (index === q.answer) {
      score++;
    }
  
    nextQuestion();
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
      startTimer();
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('final-score').innerText = `${nickname}님, 최종 점수는 ${score} / 5입니다!`;
  }
  
  function restartQuiz() {
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('nickname').value = '';
  }
  
  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  