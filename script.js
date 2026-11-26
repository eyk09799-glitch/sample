// ===============================
// 1. 문제 데이터
//    text: 문제 문장, answer: 정답(true = O, false = X), explain: 해설
// ===============================
const questions = [
    {
    text: "'p이면 q이다'가 참일 때, p는 q이기 위한 충분조건이다.",
    answer: true,
    explain: "p ⇒ q가 참이면 p는 q이기 위한 충분조건, q는 p이기 위한 필요조건입니다."
  },
  {
    text: "'2는 홀수이다'는 명제이다.",
    answer: true,
    explain: "거짓인 문장이지만, 참·거짓을 분명히 판별할 수 있으므로 명제입니다."
  },
  {
    text: "'오늘은 날씨가 좋다'는 명제이다.",
    answer: false,
    explain: "'좋다'의 기준이 사람마다 달라 참·거짓을 판별할 수 없으므로 명제가 아닙니다."
  },
  {
    text: "'x = 2이면 x² = 4이다'는 참인 명제이다.",
    answer: true,
    explain: "x = 2를 넣으면 x² = 4가 항상 성립하므로 참입니다."
  },
  {
    text: "'x² = 4이면 x = 2이다'는 참인 명제이다.",
    answer: false,
    explain: "x = -2일 때도 x² = 4이므로 반례가 있습니다. 따라서 거짓입니다."
  },
  {
    text: "'p이면 q이다'의 대우는 'q가 아니면 p가 아니다'이다.",
    answer: true,
    explain: "대우는 가정과 결론을 서로 바꾸고 둘 다 부정한 것입니다: ~q → ~p"
  },
  {
    text: "'p이면 q이다'의 이(裏)는 'q이면 p이다'이다.",
    answer: false,
    explain: "'q이면 p이다'는 역입니다. 이는 가정과 결론을 각각 부정한 '~p → ~q'입니다."
  },
  {
    text: "어떤 명제가 참이면, 그 대우도 항상 참이다.",
    answer: true,
    explain: "명제와 그 대우는 참·거짓이 항상 같습니다."
  },
  {
    text: "어떤 명제의 역이 참이면, 원래 명제도 항상 참이다.",
    answer: false,
    explain: "역이 참이어도 원래 명제는 거짓일 수 있습니다. 예: 역 'x = 2이면 x² = 4'는 참이지만, 원래 명제 'x² = 4이면 x = 2'는 거짓입니다."
  },
  {
    text: "'p 그리고 q'가 참이려면 p와 q가 모두 참이어야 한다.",
    answer: true,
    explain: "'그리고(∧)'는 두 명제가 모두 참일 때만 참입니다."
  },
  {
    text: "'p 또는 q'가 참이려면 p와 q가 모두 참이어야 한다.",
    answer: false,
    explain: "'또는(∨)'은 둘 중 하나만 참이어도 참입니다."
  }
];

// ===============================
// 2. 화면 요소 가져오기
// ===============================
const startScreen  = document.getElementById("start-screen");
const quizScreen   = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const progressEl = document.getElementById("progress");
const scoreEl    = document.getElementById("score");
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const nextBtn    = document.getElementById("next-btn");
const oxButtons  = document.querySelectorAll(".ox-btn");

// ===============================
// 3. 상태 변수
// ===============================
let order = [];      // 문제를 내는 순서 (섞인 배열)
let current = 0;     // 지금 몇 번째 문제인지
let score = 0;       // 맞힌 개수

// 배열을 무작위로 섞는 함수 (피셔-예이츠 셔플)
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// 화면 하나만 보이게 하는 함수
function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

// ===============================
// 4. 퀴즈 흐름
// ===============================
function startQuiz() {
  order = shuffle(questions);
  current = 0;
  score = 0;
  showScreen(quizScreen);
  showQuestion();
}

function showQuestion() {
  const q = order[current];
  progressEl.textContent = `${current + 1} / ${order.length}`;
  scoreEl.textContent = `점수: ${score}`;
  questionEl.textContent = q.text;

  // 버튼과 해설 초기화
  oxButtons.forEach(btn => (btn.disabled = false));
  feedbackEl.className = "feedback hidden";
  nextBtn.classList.add("hidden");
}

function checkAnswer(userAnswer) {
  const q = order[current];
  const isCorrect = userAnswer === q.answer;

  if (isCorrect) score++;

  // 한 번 고르면 다시 못 누르게
  oxButtons.forEach(btn => (btn.disabled = true));

  // 해설 보여주기
  feedbackEl.className = "feedback " + (isCorrect ? "correct" : "wrong");
  feedbackEl.innerHTML =
    `<b>${isCorrect ? "⭕ 정답!" : "❌ 오답!"}</b> (정답: ${q.answer ? "O" : "X"})<br>${q.explain}`;

  scoreEl.textContent = `점수: ${score}`;
  nextBtn.textContent = current === order.length - 1 ? "결과 보기" : "다음 문제";
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  current++;
  if (current < order.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);
  document.getElementById("result-text").textContent = `${order.length}문제 중 ${score}개 정답`;

  let message;
  if (score === order.length) message = "완벽해요! 논리 마스터 🏆";
  else if (score >= order.length * 0.7) message = "잘했어요! 틀린 문제의 해설을 다시 확인해 봐요 👍";
  else message = "역·이·대우의 뜻을 다시 정리하고 도전해 봐요 💪";
  document.getElementById("result-message").textContent = message;
}

// ===============================
// 5. 버튼 클릭 연결
// ===============================
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
oxButtons.forEach(btn => {
  btn.addEventListener("click", () => checkAnswer(btn.dataset.answer === "true"));
});
