const form = document.getElementById('quiz-form');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const submitBtn = document.querySelector('.submit-btn');
const progressBar = document.querySelector('.progress');
let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const totalQuestions = questions.length;

function showQuestion(index) {
    questions.forEach((question, i) => {
        question.style.display = (i === index) ? 'block' : 'none';
    });
    updateProgressBar(index);
}

function updateProgressBar(index) {
    const progressPercentage = ((index + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allAnswered = true;

    questions.forEach((question) => {
        const inputs = question.querySelectorAll('input');
        const answered = Array.from(inputs).some(input => input.checked);
        if (!answered) {
            allAnswered = false;
        }
    });

    if (allAnswered) {
        calculateScore();
    } else {
        document.getElementById('warning-popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
});

document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('warning-popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

function calculateScore() {
    let score = 0;
    const form = document.getElementById('quiz-form');
    const questions = form.querySelectorAll('.question');

    questions.forEach(question => {
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        if (selectedAnswer) {
            score += parseInt(selectedAnswer.value);
        }
    });

    let resultUrl = '';

    if (score >= 104 && score <= 160) {
        resultUrl = 'resultados1.html';
    } else if (score >= 84 && score <= 103) {
        resultUrl = 'resultados2.html';
    } else if (score >= 74 && score <= 83) {
        resultUrl = 'resultados3.html';
    } else if (score >= 40 && score <= 73) {
        resultUrl = 'resultados4.html';
    } else {
        alert('Puntuación no válida.');
        return;
    }

    window.location.href = resultUrl;
}

showQuestion(currentQuestion); // Muestra la primera pregunta al cargar
