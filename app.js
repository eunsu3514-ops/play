// Comprehensive Mock Questions
const MOCK_QUESTIONS = [
    { id: 'q1', category: 'dept', departmentName: '기계설계공학과', title: 'CATIA vs SolidWorks 실무 비중', content: '중견기업 설계직군에서는 솔웍도 많이 쓰는지 궁금합니다.', author: '설계꿈나무', timestamp: Date.now() - 5000000 },
    { id: 'q2', category: 'dept', departmentName: '로봇소프트웨어과', title: 'C언어 포인터 부분 팁', content: '임베디드 하려면 포인터 마스터해야 한다는데... 쉽게 이해하는 법?', author: '코딩초보', timestamp: Date.now() - 7200000 },
    { id: 'q3', category: 'dept', departmentName: '로봇자동화공학과', title: 'PLC 실습실 장비 사양', content: 'LS산전 XGT 시리즈 쓰나요?', author: '자동화덕후', timestamp: Date.now() - 10800000 },
    { id: 'q4', category: 'dept', departmentName: '반도체전자공학과', title: '반도체 공정 실습 방진복', content: '개인적으로 준비해야 하는 물품이 있는지 궁금합니다.', author: '나노맨', timestamp: Date.now() - 14400000 },
    { id: 'q5', category: 'dept', departmentName: '컴퓨터소프트웨어공학과', title: '스프링부트 vs 노드', content: '백엔드 희망하는데 무엇을 먼저 할까요?', author: '백엔드러', timestamp: Date.now() - 18000000 },
    { id: 'q10', category: 'dept', departmentName: '생명화학공학과', title: '정유사 생산직 준비물', content: '성적 말고 위험물 자격증 1개로 충분할까요?', author: '취준생', timestamp: Date.now() - 36000000 },
    { id: 'q12', category: 'dept', departmentName: '세무회계학과', title: '전산세무 1급 합격 꿀팁', content: '실무 시험에서 법인세 부분이 너무 헷갈립니다.', author: '회계사', timestamp: Date.now() - 44000000 },
    { id: 'q18', category: 'alumni', departmentName: '컴퓨터소프트웨어공학과', title: '[졸업생] 네이버 클라우드 현직 선배입니다.', content: '자격증보다 중요한 건 본인이 만든 서비스의 사용자 피드백입니다.', author: '08학번', timestamp: Date.now() - 1000000 }
];

// Re-restoring Full 24-Department Premium Mentor Data
const MOCK_MENTOR_DATA = {
    "기계공학과": { top3: ["일반기계기사", "기계설계산업기사", "공조냉동기계기사"], companies: ["현대자동차", "삼성중공업", "한화"], duration: "4개월", books: "한홍걸 일기기", tip: "CAD 실기를 1학년 때 끝내세요." },
    "기계설계공학과": { top3: ["일반기계기사", "전산응용기계제도", "치공구설계"], companies: ["두산에너빌리티", "LG전자"], duration: "3개월", books: "다솔유씨", tip: "도면 해독이 취업의 90%입니다." },
    "로봇소프트웨어과": { top3: ["정보처리기사", "임베디드기사", "리눅스마스터"], companies: ["네이버랩스", "카카오"], duration: "3개월", books: "임베디드C", tip: "C언어 포인터를 마스터하세요." },
    "로봇자동화공학과": { top3: ["전기기사", "설비보전기사", "PLC제어"], companies: ["포스코", "SK온"], duration: "4개월", books: "PLC실무", tip: "스마트팩토리 인턴십을 병행하세요." },
    "전기공학과": { top3: ["전기산업기사", "전기공사", "소방설비"], companies: ["한국전력", "삼성물산"], duration: "5개월", books: "엔트미디어", tip: "산업기사 따고 바로 전공심화 가세요." },
    "정보전자공학과": { top3: ["전자계산기기사", "무선설비", "정보처리기사"], companies: ["LG디스플레이", "SK하이닉스"], duration: "3개월", books: "디지털논리회로", tip: "회로 설계 능력이 핵심입니다." },
    "반도체전자공학과": { top3: ["반도체설계기사", "전자계산기", "위험물"], companies: ["삼성전자", "SK하이닉스"], duration: "4개월", books: "반도체공정8대", tip: "교내 팹 실습 경험을 필수로 자소서에 녹이세요." },
    "정보통신공학과": { top3: ["정보통신기사", "무선설비", "네트워크관리사"], companies: ["SKT", "KT", "LG U+"], duration: "3개월", books: "네트워크운영", tip: "CCNA를 추가로 따면 아주 유리합니다." },
    "컴퓨터정보공학과": { top3: ["정보처리기사", "SQLD", "ADsP"], companies: ["카카오", "신한은행 IT"], duration: "2개월", books: "수제비", tip: "DB 역량이 가장 중요합니다." },
    "컴퓨터소프트웨어공학과": { top3: ["정보처리기사", "OCP", "AWS"], companies: ["쿠팡", "배달의민족"], duration: "3개월", books: "알고리즘문제해결", tip: "백준 실버 이상을 유지하세요." },
    "웹응용소프트웨어공학과": { top3: ["정보처리기사", "웹디자인기능사", "React"], companies: ["토스", "야놀자"], duration: "2개월", books: "모던웹JS", tip: "개인 포트폴리오 사이트는 필수입니다." },
    "인공지능소프트웨어학과": { top3: ["빅데이터분석기사", "ADsP", "Tensorflow"], companies: ["업스테이지", "구글코리아"], duration: "4개월", books: "파이썬머신러닝", tip: "kaggle 경진대회 참여 경험이 큰 스펙입니다." },
    "생명화학공학과": { top3: ["위험물산업기사", "화학분석기사", "공정관리"], companies: ["LG화학", "GS칼텍스"], duration: "3개월", books: "위험물성사", tip: "생산직/품질관리직무 선택이 우선입니다." },
    "바이오융합공학과": { top3: ["생명공학기사", "식품기사", "품질관리사"], companies: ["삼성바이오로직스", "셀트리온"], duration: "4개월", books: "생물공학기초", tip: "GMP 교육 이수가 자격증보다 중요할 수 있습니다." },
    "건축과": { top3: ["건축산업기사", "실내건축", "전산응용건축제도"], companies: ["현대건설", "희림"], duration: "4개월", books: "건축기사필기", tip: "CAD와 SketchUp 실력을 키우세요." },
    "실내건축디자인과": { top3: ["실내건축기사", "컬러리스트", "전산응용건축"], companies: ["한샘", "현대리바트"], duration: "3개월", books: "실내건축이론", tip: "포트폴리오에 본인만의 디자인 철학을 담으세요." },
    "시각디자인과": { top3: ["시각디자인산업기사", "GTQ 1급", "컴퓨터그래픽스"], companies: ["배민디자인", "라인"], duration: "2개월", books: "디자인이론", tip: "자격증은 기본, 비헨스(Behance) 활동을 하세요." },
    "AR·VR콘텐츠디자인과": { top3: ["유니티인증", "멀티미디어콘텐츠", "언리얼"], companies: ["데브시스터즈", "컴투스"], duration: "4개월", books: "유니티실전", tip: "엔진 사용 숙련도가 취업의 모든 것입니다." },
    "경영학과": { top3: ["ERP정보관리사", "컴활 1급", "유통관리사"], companies: ["삼성물산", "CJ대한통운"], duration: "3개월", books: "ERP마스터", tip: "엑셀 실력은 생존입니다." },
    "세무회계학과": { top3: ["전산세무 1급", "재경관리사", "TAT"], companies: ["삼정KPMG", "세무법인"], duration: "5개월", books: "전산세무비전", tip: "연말정산 실무 경험이 아주 중요합니다." },
    "유통마케팅학과": { top3: ["유통관리사 2급", "물류관리사", "검색광고마케터"], companies: ["이마트", "신세계몰"], duration: "3개월", books: "유통관리사기출", tip: "데이터 분석(GA4) 자격증을 병행하세요." },
    "호텔관광학과": { top3: ["관광통역안내사", "조주기능사", "OPIC AL"], companies: ["신라호텔", "인천공항"], duration: "3개월", books: "호텔서비스", tip: "어학이 1순위, 자격증은 필수 어학 확보 후 따세요." },
    "경영정보학과": { top3: ["SAP 인증", "ERP", "정보처리기사"], companies: ["LG CNS", "SDS"], duration: "4개월", books: "ERP정보", tip: "IT와 경영 마인드를 같이 갖추세요." },
    "빅데이터경영과": { top3: ["ADsP", "SQLD", "GA4"], companies: ["쿠팡 데이터팀", "무신사"], duration: "3개월", books: "데이터분석준전문가", tip: "파이썬 데이터 시각화 라이브러리를 익히세요." },
    "자유전공학과": { top3: ["컴활 1급", "정보처리기사", "한국사"], companies: ["공공기관", "중견기업"], duration: "2개월", books: "기본자격수험서", tip: "1학년 때 적성을 찾아 전공을 선택하는 것이 핵심입니다." }
};

const ALL_DEPTS = Object.keys(MOCK_MENTOR_DATA);

document.addEventListener('DOMContentLoaded', () => {
    const qnaList = document.getElementById('qna-list');
    const navFilterBtns = document.querySelectorAll('.nav-filter-btn');
    const subFilterContainer = document.getElementById('sub-filter-container');
    const subFilterBtns = document.querySelectorAll('.sub-filter-btn');
    const searchInput = document.getElementById('search-input');
    const suggestionsDropdown = document.getElementById('search-suggestions');
    const modalOverlay = document.getElementById('modal-overlay');
    const facultyItems = document.querySelectorAll('.faculty-item');

    let allQuestions = [...MOCK_QUESTIONS];

    const closeModalFn = () => modalOverlay.classList.add('hidden');
    window.closeModalFn = closeModalFn;

    // Faculty Accordion Logic
    facultyItems.forEach(item => {
        const header = item.querySelector('.faculty-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            facultyItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Search Suggestions Logic
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (!val) {
            suggestionsDropdown.classList.add('hidden');
            render();
            return;
        }
        const matches = ALL_DEPTS.filter(d => d.toLowerCase().includes(val));
        if (matches.length > 0) {
            suggestionsDropdown.innerHTML = matches.map(m => `<div>${m}</div>`).join('');
            suggestionsDropdown.classList.remove('hidden');
            suggestionsDropdown.querySelectorAll('div').forEach(div => {
                div.addEventListener('click', () => {
                    const chosen = div.innerText;
                    searchInput.value = chosen;
                    suggestionsDropdown.classList.add('hidden');
                    subFilterBtns.forEach(sb => {
                        if (sb.dataset.dept === chosen) {
                            const facultyItem = sb.closest('.faculty-item');
                            facultyItems.forEach(i => i.classList.remove('active'));
                            facultyItem.classList.add('active');
                            sb.classList.add('active');
                        } else {
                            sb.classList.remove('active');
                        }
                    });
                    render();
                });
            });
        } else {
            suggestionsDropdown.classList.add('hidden');
            render();
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            suggestionsDropdown.classList.add('hidden');
        }
    });

    const showDetailModal = (dept) => {
        const data = MOCK_MENTOR_DATA[dept];
        modalOverlay.querySelector('.modal-content').innerHTML = `
            <button class="close-modal" onclick="closeModalFn()">&times;</button>
            <div class="mentor-detail">
                <h2>${dept} 자격증 상세 준비법</h2>
                <div class="detail-section"><h3>🗓️ 대비 기간</h3><p>${data.duration}</p></div>
                <div class="detail-section"><h3>📚 추천 교재 및 자료</h3><p>${data.books}</p></div>
                <div class="detail-section"><h3>💡 전문가 합격 비결</h3><p>${data.tip}</p></div>
                <button class="btn-primary" style="width:100%; margin-top:2rem;" onclick="closeModalFn()">확인</button>
            </div>
        `;
        modalOverlay.classList.remove('hidden');
    };

    const createQnaCard = (data) => {
        const card = document.createElement('div');
        card.className = 'qna-card';
        card.innerHTML = `
            <div class="card-header">
                <div><span class="category-tag">${data.category === 'dept' ? '학과별 질문' : '실시간 멘토'}</span> <span class="dept-tag">${data.departmentName}</span></div>
            </div>
            <h3>${data.title}</h3>
            <p>${data.content}</p>
            <div class="qna-meta"><span>by ${data.author} · ${new Date(data.timestamp).toLocaleDateString()}</span></div>
        `;
        return card;
    };

    const createMentorCard = (dept) => {
        const data = MOCK_MENTOR_DATA[dept];
        if (!data) return null;
        const card = document.createElement('div');
        card.className = 'qna-card mentor-card premium-card';
        card.onclick = () => showDetailModal(dept);
        card.innerHTML = `
            <div class="card-header"><div><span class="category-tag mentor-badge">TOP 3 자격증</span> <span class="dept-tag">${dept}</span></div></div>
            <h3>${dept} 취업 Guide</h3>
            <div class="cert-list">${data.top3.map((c,i)=>`<span class="cert-item">0${i+1}. ${c}</span>`).join('')}</div>
            <div class="benefit-companies"><strong>🚀 가산점 기업:</strong> <div class="company-tags">${data.companies.map(c=>`<span class="company-tag">${c}</span>`).join('')}</div></div>
            <div class="card-footer-tip">클릭하여 선배의 비결 확인하기 →</div>
        `;
        return card;
    };

    const render = () => {
        const activeNavBtn = document.querySelector('.nav-filter-btn.active');
        const activeNav = activeNavBtn ? activeNavBtn.dataset.category : 'all';
        const activeSub = document.querySelector('.sub-filter-btn.active');
        const dept = activeSub ? activeSub.dataset.dept : null;
        const query = searchInput.value.toLowerCase();

        qnaList.innerHTML = '';

        if (activeNav === 'mentor') {
            const depts = dept ? [dept] : Object.keys(MOCK_MENTOR_DATA);
            depts.forEach(d => {
                const card = createMentorCard(d);
                if (card) qnaList.appendChild(card);
            });
        } else {
            let filtered = allQuestions;
            if (activeNav !== 'all') filtered = filtered.filter(q => q.category === activeNav);
            if (dept) filtered = filtered.filter(q => q.departmentName === dept);
            if (query && !dept) {
                filtered = filtered.filter(q => 
                    q.title.toLowerCase().includes(query) || 
                    q.content.toLowerCase().includes(query) ||
                    (q.departmentName && q.departmentName.toLowerCase().includes(query))
                );
            }
            if (filtered.length === 0) {
                qnaList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 5rem; color: #999;">표시할 내용이 없습니다.</p>';
            } else {
                filtered.sort((a,b)=>b.timestamp-a.timestamp).forEach(q => qnaList.appendChild(createQnaCard(q)));
            }
        }
    };

    navFilterBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        navFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        subFilterContainer.classList.toggle('hidden', cat !== 'dept' && cat !== 'mentor');
        render();
    }));

    subFilterBtns.forEach(btn => btn.addEventListener('click', () => {
        const wasActive = btn.classList.contains('active');
        subFilterBtns.forEach(sb => sb.classList.remove('active'));
        if (!wasActive) btn.classList.add('active');
        render();
    }));

    render();
});
