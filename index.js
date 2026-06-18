const coursesData = {
    micro: [
        { title: "반도체 소자 입문 (Beginner)", level: "Beginner", current: 28, max: 30, status: "접수중" },
        { title: "반도체 제조 공정 교육 (Intermediate)", level: "Intermediate", current: 20, max: 20, status: "접수마감" },
        { title: "PLC 기반 설비 제어 실습", level: "Intermediate", current: 15, max: 25, status: "접수중" },
        { title: "반도체 분석 및 계측 (Advanced)", level: "Advanced", current: 10, max: 15, status: "접수중" }
    ],
    immersive: [
        { title: "SolidWorks 실무 마스터 클래스", level: "Corporate", current: 18, max: 20, status: "접수중" },
        { title: "두산로보틱스 협동로봇 운용 전문과정", level: "Corporate", current: 25, max: 25, status: "접수마감" },
        { title: "반도체 레이아웃 설계 실무", level: "Corporate", current: 12, max: 15, status: "접수중" }
    ],
    others: [
        { title: "하계 반도체 산업체 견학 프로그램", level: "Others", current: 40, max: 40, status: "접수마감" },
        { title: "반도체 캡스톤 디자인 경진대회", level: "Others", current: 15, max: 30, status: "접수중" },
        { title: "차세대 반도체 취업 박람회", level: "Others", current: 200, max: 300, status: "접수중" }
    ]
};

const notices = [
    { 
        id: 1, 
        title: "2026학년도 동계 반도체 부트캠프 신청 안내", 
        date: "2026-06-18", 
        body: "안녕하세요. 반도체부트캠프사업단입니다. 2026학년도 동계 집중 교육과정 신청 접수가 시작되었습니다. 자세한 사항은 첨부된 모집 요강을 확인하시기 바랍니다.",
        file: "2026_winter_bootcamp_guide.pdf"
    },
    { 
        id: 2, 
        title: "두산로보틱스 협동로봇 교육 조기 마감 안내", 
        date: "2026-06-15", 
        body: "성원에 힘입어 두산로보틱스 협업 과정이 조기 마감되었습니다. 추가 개설 여부는 추후 공지하겠습니다.",
        file: "notice_closed.pdf"
    },
    { 
        id: 3, 
        title: "[필독] 교육생 안전 교육 및 실습실 수칙 안내", 
        date: "2026-06-10", 
        body: "실습실 이용 시 반드시 보호구를 착용해야 하며, 안전 수칙을 준수하지 않을 경우 이용이 제한될 수 있습니다.",
        file: "safety_rules.pdf"
    }
];

let currentSession = null;

document.addEventListener('DOMContentLoaded', () => {
    initParityUI();
});

function initParityUI() {
    renderCurriculum('micro');
    renderNotices();
    setupEventListeners();
}

function renderCurriculum(category) {
    const container = document.getElementById('curriculum-container');
    const data = coursesData[category];
    
    container.innerHTML = data.map(course => {
        const percent = (course.current / course.max) * 100;
        const isFull = course.status === "접수마감";
        return `
            <div class="course-card-p">
                <div class="meta">${course.level} <span class="status-tag" style="background:${isFull ? '#fdd' : '#dfd'}; color:${isFull ? '#c00' : '#080'}">${course.status}</span></div>
                <h4>${course.title}</h4>
                <div class="progress-zone">
                    <div class="c-info-row">
                        <span>신청현황</span>
                        <span>${course.current} / ${course.max}</span>
                    </div>
                    <div class="c-bar">
                        <div class="c-fill" style="width: ${percent}%"></div>
                    </div>
                </div>
                <button class="btn-apply-p" ${isFull ? 'disabled' : ''} onclick="handlePortalApply('${course.title}')">
                    ${isFull ? '접수마감' : '신청하기'}
                </button>
            </div>
        `;
    }).join('');
}

function renderNotices() {
    const noticeList = document.getElementById('notice-list');
    noticeList.innerHTML = notices.map(n => `
        <li onclick="viewNoticeDetail(${n.id})">
            <span>${n.title}</span>
            <span>${n.date}</span>
        </li>
    `).join('');
}

function viewNoticeDetail(id) {
    const notice = notices.find(n => n.id === id);
    if (!notice) return;

    document.getElementById('detail-title').innerText = notice.title;
    document.getElementById('detail-date').innerText = notice.date;
    document.getElementById('detail-body').innerHTML = `<p>${notice.body}</p>`;
    
    const downloadBtn = document.getElementById('download-mock');
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = `<i class="fas fa-file-download"></i> ${notice.file} [Download]`;
    
    downloadBtn.onclick = () => {
        alert(`${notice.file} 파일을 다운로드합니다.`);
    };
}

function handlePortalApply(courseTitle) {
    if (!currentSession) {
        alert('포털 로그인이 필요한 서비스입니다.');
        document.getElementById('login-modal').classList.remove('hidden');
        return;
    }
    alert(`[${courseTitle}]\n정상적으로 신청되었습니다. 마이페이지에서 확인하세요.`);
}

function setupEventListeners() {
    // Tab dynamic switching
    const currTabs = document.querySelectorAll('.curr-tab');
    currTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            currTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCurriculum(tab.getAttribute('data-curr'));
        });
    });

    // Modal logic
    const modal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');
    const loginTrigger = document.getElementById('login-trigger');

    loginTrigger.onclick = () => modal.classList.remove('hidden');
    closeBtn.onclick = () => modal.classList.add('hidden');
    
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        currentSession = { name: "홍길동" };
        loginTrigger.innerText = "Logged In: 홍길동";
        modal.classList.add('hidden');
        alert('반갑습니다, 홍길동 학생!');
    };

    // Smooth scroll for GNB
    document.querySelectorAll('.gnb-link, .dropdown li a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Global window reference for onclick
window.handlePortalApply = handlePortalApply;
window.viewNoticeDetail = viewNoticeDetail;
window.renderCurriculum = renderCurriculum;
