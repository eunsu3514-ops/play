// Firebase Configuration (User: Please fill in your details here)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let database = null;
let useFirebase = false;

if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    try {
        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        useFirebase = true;
        console.log("Firebase initialized successfully.");
    } catch (error) {
        console.error("Firebase init error:", error);
    }
}

const ROADMAP_DATA = {
    "기계공학과": {
        certs: ["일반기계기사", "산업안전기사", "AutoCAD 전문자격"],
        companies: [
            { name: "삼성전자", url: "https://www.samsungcareers.com" },
            { name: "현대자동차", url: "https://recruit.hyundai.com" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "컴퓨터소프트웨어공학과": {
        certs: ["정보처리기사", "AWS Solution Architect", "SQLD"],
        companies: [
            { name: "네이버", url: "https://recruit.navercorp.com" },
            { name: "카카오", url: "https://careers.kakao.com" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "웹응용소프트웨어공학과": {
        certs: ["정보처리기사", "구글 Cloud 엔지니어", "Web Design Specialist"],
        companies: [
            { name: "우아한형제들", url: "https://career.woowahan.com" },
            { name: "토스", url: "https://toss.im/career" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "시각디자인과": {
        certs: ["시각디자인기사", "GTQ 1급", "Adobe Certified Professional"],
        companies: [
            { name: "배달의민족(디자인)", url: "https://career.woowahan.com" },
            { name: "라인 플러스", url: "https://recruit.linepluscorp.com" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "경영학과": {
        certs: ["전산세무회계", "ERP정보관리사", "ADsP"],
        companies: [
            { name: "LG CNS", url: "https://recruit.lgcns.com" },
            { name: "삼일회계법인", url: "https://www.pwc.com/kr/ko/careers.html" }
        ],
        qnet: "https://www.q-net.or.kr"
    }
};

// Fallback Mock Data
const INITIAL_MOCK_QUESTIONS = [
    { id: 'q1', category: 'dept', departmentName: '컴퓨터소프트웨어공학과', title: '컴퓨팅 아카이브 01', content: '실무 환경에서의 React와 Vue 비교 분석.', author: '관리자', timestamp: Date.now() - 1000000 },
    { id: 'q2', category: 'dept', departmentName: '기계설계공학과', title: '기계설계 아카이브 02', content: '3D 모델링 최적화 및 베스트 프랙티스.', author: '선배님', timestamp: Date.now() - 5000000 },
    { id: 'q3', category: 'dept', departmentName: '시각디자인과', title: '디자인 아카이브 03', content: '스트릿 브랜드 아이덴티티 시각 분석.', author: '디자이너', timestamp: Date.now() - 10000000 }
];

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    const qnaList = document.getElementById('qna-list');
    const navFilterBtns = document.querySelectorAll('.nav-filter-btn');
    const subFilterBtns = document.querySelectorAll('.sub-filter-btn');
    const searchInput = document.getElementById('search-input');
    const modalOverlay = document.getElementById('modal-overlay');
    const askBtn = document.getElementById('ask-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const modalBackBtn = document.getElementById('modal-back-btn');
    const headerBackBtn = document.getElementById('header-back-btn');
    const qnaForm = document.getElementById('qna-form');

    let allQuestions = [];

    const fetchQuestions = () => {
        if (useFirebase) {
            database.ref('questions').on('value', (snapshot) => {
                const data = snapshot.val();
                allQuestions = data ? Object.values(data) : [];
                render();
            });
        } else {
            const localData = localStorage.getItem('ddas_questions_v2'); // New namespace for new style
            allQuestions = localData ? JSON.parse(localData) : INITIAL_MOCK_QUESTIONS;
            render();
        }
    };

    const openModal = () => {
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    const addQuestion = (qData) => {
        if (useFirebase) {
            database.ref('questions').push(qData);
        } else {
            allQuestions.unshift(qData);
            localStorage.setItem('ddas_questions_v2', JSON.stringify(allQuestions));
            render();
        }
        closeModal();
    };

    const renderRoadmap = (deptName) => {
        const roadmapContainer = document.getElementById('roadmap-display');
        if (!deptName || !ROADMAP_DATA[deptName]) {
            roadmapContainer.innerHTML = '';
            roadmapContainer.classList.add('hidden');
            return;
        }

        const data = ROADMAP_DATA[deptName];
        roadmapContainer.classList.remove('hidden');
        roadmapContainer.innerHTML = `
            <div class="roadmap-card">
                <div class="roadmap-header">
                    <h4>${deptName} 진로 로드맵</h4>
                </div>
                <div class="roadmap-body">
                    <div class="roadmap-section">
                        <h5>추천 자격증</h5>
                        <div class="tag-group">
                            ${data.certs.map(c => `<a href="${data.qnet}" target="_blank" class="roadmap-tag cert-tag">${c}</a>`).join('')}
                        </div>
                    </div>
                    <div class="roadmap-section">
                        <h5>주요 취업처</h5>
                        <div class="tag-group">
                            ${data.companies.map(c => `<a href="${c.url}" target="_blank" class="roadmap-tag company-tag">${c.name}</a>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const render = () => {
        const activeNavBtn = document.querySelector('.nav-filter-btn.active');
        const activeNav = activeNavBtn ? activeNavBtn.dataset.category : 'all';
        
        // Correctly find the active department from sub-filter buttons
        const activeSubBtn = document.querySelector('.sub-filter-btn.active');
        const activeDept = activeSubBtn ? activeSubBtn.dataset.dept : null;
        const query = searchInput.value.toLowerCase();

        // Toggle Hero Section and Header Back Button
        if (activeDept) {
            heroSection.classList.add('hidden');
            headerBackBtn.classList.remove('hidden');
        } else {
            heroSection.classList.remove('hidden');
            headerBackBtn.classList.add('hidden');
        }

        renderRoadmap(activeDept);
        qnaList.innerHTML = '';

        let filtered = allQuestions;
        if (activeNav === 'dept') {
            filtered = filtered.filter(q => q.category === 'dept');
        } else if (activeNav === 'mentor') {
            filtered = filtered.filter(q => q.category === 'mentor');
        }

        if (activeDept) {
            filtered = filtered.filter(q => q.departmentName === activeDept);
        }

        if (query) {
            filtered = filtered.filter(q => 
                q.title.toLowerCase().includes(query) || 
                q.content.toLowerCase().includes(query) ||
                (q.departmentName && q.departmentName.toLowerCase().includes(query))
            );
        }

        if (filtered.length === 0) {
            qnaList.innerHTML = '<div style="grid-column: 1/-1; padding: 4rem; text-align: center; font-weight: 800;">데이터를 찾을 수 없습니다</div>';
            return;
        }

        filtered.sort((a,b) => b.timestamp - a.timestamp).forEach(data => {
            const card = document.createElement('div');
            card.className = 'qna-card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="dept-tag">${data.departmentName}</span>
                    <span class="category-tag">${data.category === 'dept' ? '학과 질문' : '멘토 가이드'}</span>
                </div>
                <h3>${data.title}</h3>
                <p>${data.content}</p>
                <div class="qna-meta">
                    <span>작성자: ${data.author}</span>
                    <span>${new Date(data.timestamp).toLocaleDateString()}</span>
                </div>
            `;
            qnaList.appendChild(card);
        });
    };

    askBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);
    modalBackBtn.addEventListener('click', closeModal);
    
    headerBackBtn.addEventListener('click', () => {
        subFilterBtns.forEach(sb => sb.classList.remove('active'));
        searchInput.value = '';
        render();
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    qnaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newQuestion = {
            id: Date.now().toString(),
            category: document.getElementById('category').value,
            departmentName: document.getElementById('department-name').value,
            title: document.getElementById('title').value,
            content: document.getElementById('content').value,
            author: document.getElementById('author').value,
            timestamp: Date.now()
        };
        addQuestion(newQuestion);
        qnaForm.reset();
    });

    navFilterBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        navFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render();
    }));

    subFilterBtns.forEach(btn => btn.addEventListener('click', () => {
        const wasActive = btn.classList.contains('active');
        subFilterBtns.forEach(sb => sb.classList.remove('active'));
        if (!wasActive) btn.classList.add('active');
        render();
    }));

    searchInput.addEventListener('input', render);

    fetchQuestions();
});
