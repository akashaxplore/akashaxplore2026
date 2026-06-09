// ===== CONFIGURATION =====
// Replace these with your actual Google Sheets API credentials
const GOOGLE_SHEETS_API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY';
const GOOGLE_SHEETS_ID = 'YOUR_GOOGLE_SHEET_ID';
const QUIZ_SHEET_NAME = 'quiz_data';
const SUBMISSIONS_SHEET_NAME = 'submissions';

// Quiz Configuration
let QUIZ_CONFIG = {
    sessionStartTime: null,
    quizEndTime: null,
    quizDuration: 90, // minutes
    isSessionActive: false,
    isQuizStarted: false,
    initializedTime: null,
};

// Initialize quiz start time (30 minutes from first load)
function initializeQuizTiming() {
    const savedState = localStorage.getItem('quizSessionState');
    
    if (savedState) {
        // Restore from saved state
        const state = JSON.parse(savedState);
        QUIZ_CONFIG.sessionStartTime = new Date(state.sessionStartTime);
        QUIZ_CONFIG.quizEndTime = state.quizEndTime ? new Date(state.quizEndTime) : null;
        QUIZ_CONFIG.isSessionActive = state.isSessionActive;
        QUIZ_CONFIG.isQuizStarted = state.isQuizStarted;
    } else {
        // First time - set up timing
        const now = new Date();
        QUIZ_CONFIG.sessionStartTime = new Date(now.getTime() + 30 * 60000); // 30 minutes from now
        QUIZ_CONFIG.initializedTime = now.getTime();
        saveSessionState();
    }
}

// ===== DOM ELEMENTS =====
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const sessionInfo = document.getElementById('sessionInfo');
const startTime = document.getElementById('startTime');
const timerHours = document.getElementById('timerHours');
const timerMinutes = document.getElementById('timerMinutes');
const timerSeconds = document.getElementById('timerSeconds');
const rulesContent = document.getElementById('rulesContent');
const rulesToggle = document.getElementById('rulesToggle');
const questionPaperContent = document.getElementById('questionPaperContent');
const questionsContainer = document.getElementById('questionsContainer');
const essayForm = document.getElementById('essayForm');
const formMessage = document.getElementById('formMessage');
const quizTimerSection = document.getElementById('quizTimerSection');
const quizHours = document.getElementById('quizHours');
const quizMinutes = document.getElementById('quizMinutes');
const quizSeconds = document.getElementById('quizSeconds');
const timerProgress = document.getElementById('timerProgress');
const countdownHint = document.getElementById('countdownHint');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeQuizTiming(); // Initialize timing first
    initializeQuiz();
    setupEventListeners();
});

function initializeQuiz() {
    // Set session start time display
    const formattedTime = QUIZ_CONFIG.sessionStartTime.toLocaleTimeString();
    startTime.textContent = formattedTime;
    
    // Start real-time timers with 100ms update frequency for smoothness
    updateSessionTimer();
    const sessionTimerInterval = setInterval(updateSessionTimer, 100);
    
    // Fetch quiz data from Google Sheets
    fetchQuizData();
    
    // Save state every 5 seconds
    setInterval(saveSessionState, 5000);
    
    console.log('Quiz initialized - Real-time timer enabled');
}

function setupEventListeners() {
    // Rules toggle
    document.querySelector('.rules-section .section-header').addEventListener('click', toggleRules);
    
    // Essay form submission
    essayForm.addEventListener('submit', submitEssay);
}

// ===== SESSION TIMER - REAL-TIME =====
function updateSessionTimer() {
    const now = new Date();
    const timeRemaining = QUIZ_CONFIG.sessionStartTime - now;
    
    if (timeRemaining <= 0) {
        // Session has started
        if (!QUIZ_CONFIG.isSessionActive) {
            QUIZ_CONFIG.isSessionActive = true;
            statusText.textContent = 'Quiz Session Active';
            statusIndicator.style.color = '#10B981';
            
            // Show questions
            showQuestionsSection();
            showQuizTimer();
            
            // Start quiz timer
            startQuizTimer();
            
            saveSessionState();
        }
        
        // Display 00:00:00
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        return;
    }
    
    // Calculate remaining time with milliseconds precision
    const totalMilliseconds = timeRemaining;
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    
    // Update display with zero-padding
    timerHours.textContent = String(hours).padStart(2, '0');
    timerMinutes.textContent = String(minutes).padStart(2, '0');
    timerSeconds.textContent = String(seconds).padStart(2, '0');
    
    // Update countdown hint
    const totalSeconds = Math.floor(timeRemaining / 1000);
    if (totalSeconds < 300 && totalSeconds > 0) {
        countdownHint.textContent = `⚠️ Quiz starts in ${minutes}m ${seconds}s`;
        countdownHint.style.color = '#F59E0B';
    } else if (totalSeconds <= 0) {
        countdownHint.textContent = '🟢 Quiz is now active!';
        countdownHint.style.color = '#10B981';
    }
}

// ===== QUIZ TIMER - REAL-TIME =====
let quizTimerInterval = null;

function startQuizTimer() {
    // Calculate quiz end time based on saved state or current time
    if (!QUIZ_CONFIG.quizEndTime) {
        QUIZ_CONFIG.quizEndTime = new Date(new Date().getTime() + QUIZ_CONFIG.quizDuration * 60000);
        saveSessionState();
    }
    
    updateQuizTimer();
    
    // Update every 100ms for smooth display
    if (quizTimerInterval) clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(updateQuizTimer, 100);
}

function updateQuizTimer() {
    if (!QUIZ_CONFIG.quizEndTime) return;
    
    const now = new Date();
    const timeRemaining = QUIZ_CONFIG.quizEndTime - now;
    
    if (timeRemaining <= 0) {
        // Quiz ended
        handleQuizEnd();
        return;
    }
    
    // Calculate time with milliseconds precision
    const totalMilliseconds = timeRemaining;
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    
    // Update display with zero-padding
    quizHours.textContent = String(hours).padStart(2, '0');
    quizMinutes.textContent = String(minutes).padStart(2, '0');
    quizSeconds.textContent = String(seconds).padStart(2, '0');
    
    // Update progress bar based on actual time remaining
    const progressPercent = (timeRemaining / (QUIZ_CONFIG.quizDuration * 60000)) * 100;
    timerProgress.style.width = Math.max(0, progressPercent) + '%';
    
    // Color change based on time remaining
    if (timeRemaining < 300000) { // Less than 5 minutes
        timerProgress.style.background = 'linear-gradient(90deg, #EF4444, #F59E0B)';
        quizHours.style.color = '#EF4444';
        quizMinutes.style.color = '#EF4444';
        quizSeconds.style.color = '#EF4444';
    } else if (timeRemaining < 900000) { // Less than 15 minutes
        timerProgress.style.background = 'linear-gradient(90deg, #F59E0B, #10B981)';
        quizHours.style.color = '#F59E0B';
        quizMinutes.style.color = '#F59E0B';
        quizSeconds.style.color = '#F59E0B';
    }
}

function handleQuizEnd() {
    showMessage('Quiz time has ended!', 'error');
    document.querySelector('.submit-btn').disabled = true;
    document.querySelector('.submit-btn').textContent = 'Quiz Ended';
}

// ===== SECTION VISIBILITY =====
function showQuestionsSection() {
    questionPaperContent.style.display = 'none';
    questionsContainer.style.display = 'flex';
}

function showQuizTimer() {
    quizTimerSection.style.display = 'block';
}

// ===== RULES TOGGLE =====
function toggleRules() {
    rulesContent.style.display = rulesContent.style.display === 'none' ? 'block' : 'none';
    rulesToggle.classList.toggle('rotated');
}

// ===== GOOGLE SHEETS API =====
async function fetchQuizData() {
    try {
        // Fetch questions from Google Sheets
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${QUIZ_SHEET_NAME}?key=${GOOGLE_SHEETS_API_KEY}`
        );
        
        if (!response.ok) {
            console.warn('Could not fetch quiz data from Google Sheets. Using demo data.');
            loadDemoQuestions();
            return;
        }
        
        const data = await response.json();
        parseQuizData(data.values);
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        loadDemoQuestions();
    }
}

function parseQuizData(rows) {
    // Expected format:
    // [0] = Headers: ["Question", "Option A", "Option B", "Option C", "Option D", "Correct Answer"]
    // [1+] = Question data
    
    if (!rows || rows.length < 2) {
        loadDemoQuestions();
        return;
    }
    
    const questions = [];
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length >= 5) {
            questions.push({
                id: i - 1,
                text: row[0],
                options: [row[1], row[2], row[3], row[4]],
                correctAnswer: row[5] ? row[5].toUpperCase() : 'A'
            });
        }
    }
    
    renderQuestions(questions);
}

function loadDemoQuestions() {
    const demoQuestions = [
        {
            id: 1,
            text: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 'C'
        },
        {
            id: 2,
            text: 'Which planet is the largest in our solar system?',
            options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'],
            correctAnswer: 'B'
        },
        {
            id: 3,
            text: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 'B'
        }
    ];
    
    renderQuestions(demoQuestions);
}

function renderQuestions(questions) {
    questionsContainer.innerHTML = '';
    
    questions.forEach((question) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        
        let optionsHTML = '';
        const options = ['A', 'B', 'C', 'D'];
        question.options.forEach((option, index) => {
            optionsHTML += `
                <label class="option-item">
                    <input type="radio" name="question_${question.id}" value="${options[index]}" hidden>
                    <div class="option-radio"></div>
                    <span class="option-text">${option}</span>
                </label>
            `;
        });
        
        questionCard.innerHTML = `
            <div class="question-number">Question ${question.id}</div>
            <div class="question-text">${question.text}</div>
            <div class="options-list">
                ${optionsHTML}
            </div>
        `;
        
        questionsContainer.appendChild(questionCard);
    });
}

// ===== ESSAY SUBMISSION =====
async function submitEssay(event) {
    event.preventDefault();
    
    const studentName = document.getElementById('studentName').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const essayLink = document.getElementById('essayLink').value;
    const essayNotes = document.getElementById('essayNotes').value;
    
    // Validate Google Drive link
    if (!essayLink.includes('docs.google.com')) {
        showMessage('Please provide a valid Google Drive link', 'error');
        return;
    }
    
    // Collect MCQ answers
    const answers = collectAnswers();
    
    // Submit to Google Sheets
    const submission = {
        timestamp: new Date().toLocaleString(),
        studentName,
        studentEmail,
        rollNumber,
        essayLink,
        essayNotes,
        mcqAnswers: answers,
    };
    
    try {
        await submitToGoogleSheets(submission);
        
        // Show success message
        showMessage('✓ Essay submitted successfully!', 'success');
        
        // Show submission status
        showSubmissionStatus(submission);
        
        // Disable form
        document.querySelector('.submit-btn').disabled = true;
        essayForm.style.opacity = '0.5';
    } catch (error) {
        console.error('Submission error:', error);
        showMessage('Error submitting essay. Please try again.', 'error');
    }
}

function collectAnswers() {
    const answers = {};
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        answers[radio.name] = radio.value;
    });
    return answers;
}

async function submitToGoogleSheets(submission) {
    // This requires server-side implementation due to CORS restrictions
    // For now, we'll save to localStorage as demo
    
    const submissions = JSON.parse(localStorage.getItem('quizSubmissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('quizSubmissions', JSON.stringify(submissions));
    
    // In production, you would make a POST request to your backend
    // which would then append the data to Google Sheets
    console.log('Submission saved:', submission);
}

function showSubmissionStatus(submission) {
    const submissionStatus = document.getElementById('submissionStatus');
    const statusDetails = document.getElementById('statusDetails');
    
    const statusHTML = `
        <div class="status-item">
            <span class="status-item-label">Student Name</span>
            <span class="status-item-value">${submission.studentName}</span>
        </div>
        <div class="status-item">
            <span class="status-item-label">Email</span>
            <span class="status-item-value">${submission.studentEmail}</span>
        </div>
        <div class="status-item">
            <span class="status-item-label">Roll Number</span>
            <span class="status-item-value">${submission.rollNumber || 'N/A'}</span>
        </div>
        <div class="status-item">
            <span class="status-item-label">Submission Time</span>
            <span class="status-item-value">${submission.timestamp}</span>
        </div>
        <div class="status-item">
            <span class="status-item-label">Google Drive Link</span>
            <span class="status-item-value">
                <a href="${submission.essayLink}" target="_blank" style="color: #7C3AED; text-decoration: underline;">
                    View Document
                </a>
            </span>
        </div>
    `;
    
    statusDetails.innerHTML = statusHTML;
    submissionStatus.style.display = 'block';
}

// ===== UTILITY FUNCTIONS =====
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

function goHome() {
    window.location.href = 'index.html';
}

// ===== PERSISTENT TIMER SYNC (REAL-TIME) =====
function saveSessionState() {
    const state = {
        sessionStartTime: QUIZ_CONFIG.sessionStartTime.getTime(),
        quizEndTime: QUIZ_CONFIG.quizEndTime ? QUIZ_CONFIG.quizEndTime.getTime() : null,
        isSessionActive: QUIZ_CONFIG.isSessionActive,
        isQuizStarted: QUIZ_CONFIG.isQuizStarted,
        lastSaveTime: new Date().getTime(), // For drift detection
    };
    localStorage.setItem('quizSessionState', JSON.stringify(state));
}

function restoreSessionState() {
    const saved = localStorage.getItem('quizSessionState');
    if (saved) {
        const state = JSON.parse(saved);
        QUIZ_CONFIG.sessionStartTime = new Date(state.sessionStartTime);
        if (state.quizEndTime) QUIZ_CONFIG.quizEndTime = new Date(state.quizEndTime);
        QUIZ_CONFIG.isSessionActive = state.isSessionActive;
        QUIZ_CONFIG.isQuizStarted = state.isQuizStarted;
        
        // Check for system time drift
        const timeSinceSave = new Date().getTime() - state.lastSaveTime;
        if (timeSinceSave < 0) {
            console.warn('System time appears to have changed backwards');
        }
        
        return true;
    }
    return false;
}

// Save state before unload
window.addEventListener('beforeunload', saveSessionState);

// Restore on load
document.addEventListener('DOMContentLoaded', function() {
    restoreSessionState();
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + S to submit
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        submitEssay(new Event('submit'));
    }
});

console.log('Quiz app loaded successfully');
