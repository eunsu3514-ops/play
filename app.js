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

// --- DMU Specific Knowledge ---
const DMU_RESOURCES = {
    "학사일정": "https://www.dongyang.ac.kr/dmu/132/subview.do",
    "장학/등록": "https://www.dongyang.ac.kr/dmu/138/subview.do",
    "대학공지": "https://www.dongyang.ac.kr/dmu/156/subview.do",
    "학과소개": "https://www.dongyang.ac.kr/dmu/161/subview.do",
    "도서관": "https://lib.dongyang.ac.kr"
};

const CERTIFICATION_DB = {
    "정보처리기사": {
        desc: "IT 서비스의 설계, 개발, 운영 전반을 아우르는 국가기술자격입니다.",
        howTo: "시나공 또는 수제비 교재 3회독은 필수입니다. 큐넷(Q-Net)에서 접수하며, 코딩 실습 비중이 높아졌으니 꾸준한 연습이 필요해요.",
        deep: "최근 개정 이후 합격률이 10~20%대로 낮아졌습니다. <strong>C, Java, Python</strong> 프로그래밍 코드 분석과 <strong>SQL 응용</strong> 파트에서 당락이 결정됩니다. <br><br> ✦ <strong>추천 일정 (6주):</strong> <br> - 1~2주: 언어 기초 및 SQL <br> - 3~4주: 기출 유형 분석 <br> - 5~6주: 신기술 용어 및 오답 정리",
        site: "https://www.q-net.or.kr",
        tags: ["필수", "IT기초"]
    },
    "일반기계기사": {
        desc: "기계 설계 및 제조 공정의 핵심 전공 자격입니다. 정밀 기계 및 금형 설계 역량을 증명합니다.",
        howTo: "CAD 작업형이 50%를 차지하므로 학원이나 인강을 통한 도면 작성 연습이 합격을 가릅니다.",
        deep: "5시간 내에 3D 모델링과 2D 도면을 모두 완성해야 합니다. <strong>인벤터(Inventor)</strong>를 활용해 3D에서 2D를 추출하면 시간을 단축할 수 있습니다. <br><br> ✦ <strong>공략 팁:</strong> <br> - 끼워맞춤 공차 및 기하 공차 규격 암기 필수 <br> - 동력전달장치 등 빈출 유형 무한 반복 <br> - 도면 템플릿 미리 제작해두기",
        site: "https://www.q-net.or.kr",
        tags: ["기계", "설계"]
    },
    "SQLD": {
        desc: "데이터베이스 모델링과 SQL 작성 능력을 평가하는 국가기술자격입니다.",
        howTo: "이른바 '노랭이' 수험서 반복 풀이가 정석입니다. 유튜브 '홍쌤의 데이터랩' 강의를 추천드려요.",
        deep: "비전공자도 2주면 가능합니다. 2과목 <strong>'SQL 기본 및 활용'</strong>에서 윈도우 함수와 계층형 질의가 가장 어렵지만 비중이 높습니다. <br><br> ✦ <strong>단기 공략 (2주):</strong> <br> - 1주: 노랭이 문제집 1회독 및 유튜브 병행 <br> - 2주: 기출 오답 무한 반복",
        site: "https://www.dataq.or.kr",
        tags: ["데이터", "DB"]
    },
    "ADsP": {
        desc: "데이터 분석 준전문가 자격증으로, 통계학적 지식과 분석 기획 역량을 평가합니다.",
        howTo: "민트책(데이터에듀)으로 핵심 이론을 정리하고 기출문제를 반복하세요.",
        deep: "3과목 <strong>'데이터 분석'</strong>이 가장 어렵고 비중이 큽니다. 이론을 깊게 파기보다 기출문제를 먼저 풀고 틀린 내용을 역으로 학습하세요."
    }
};

const ROADMAP_DATA = {
    "기계공학과": {

            deptUrl: "https://www.dongyang.ac.kr/me/index.do",
            certs: ["일반기계기사", "산업안전기사", "건설기계설비기사"],
            companies: [
                { name: "현대자동차", url: "https://www.hyundai.com", logo: "hyundai.com" },
                { name: "포스코", url: "https://www.posco.co.kr", logo: "posco.com" },
                { name: "두산에너빌리티", url: "https://www.doosanenerbility.com", logo: "doosan.com" },
                { name: "현대제철", url: "https://www.hyundai-steel.com", logo: "hyundai-steel.com" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "기계설계공학과": {
            deptUrl: "https://www.dongyang.ac.kr/med/index.do",
            certs: ["기계설계산업기사", "전산응용기계제도기능사", "일반기계기사"],
            companies: [
                { name: "LG전자", url: "https://www.lge.co.kr", logo: "lge.co.kr" },
                { name: "현대위아", url: "https://www.hyundai-wia.com", logo: "hyundai-wia.com" },
                { name: "덕양산업", url: "https://www.dyauto.kr", logo: "dyauto.kr" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "자동화공학과": {
            deptUrl: "https://www.dongyang.ac.kr/auto/index.do",
            certs: ["생산자동화산업기사", "메카트로닉스기사", "유공압기능사"],
            companies: [
                { name: "삼성전자", url: "https://www.samsung.com", logo: "samsung.com" },
                { name: "LS일렉트릭", url: "https://www.ls-electric.com", logo: "ls-electric.com" },
                { name: "현대모비스", url: "https://www.mobis.co.kr", logo: "mobis.co.kr" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "로봇소프트웨어과": {
            deptUrl: "https://www.dongyang.ac.kr/robot/index.do",
            certs: ["전자계산기제어산업기사", "정보처리기사", "임베디드기사"],
            companies: [
                { name: "두산로보틱스", url: "https://www.doosanrobotics.com", logo: "doosan.com" },
                { name: "한화로보틱스", url: "https://www.hanwharobotics.com", logo: "hanwha.com" },
                { name: "로보티즈", url: "https://www.robotis.com", logo: "robotis.com" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "웹응용소프트웨어공학과": {
            deptUrl: "https://www.dongyang.ac.kr/computer/index.do",
            certs: ["정보처리기사", "AWS Solution Architect", "SQLD"],
            companies: [
                { name: "네이버", url: "https://www.navercorp.com", logo: "navercorp.com" },
                { name: "우아한형제들", url: "https://www.woowayahan.com", logo: "woowayahan.com" },
                { name: "토스", url: "https://toss.im", logo: "toss.im" },
                { name: "당근", url: "https://www.daangn.com", logo: "daangn.com" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "컴퓨터소프트웨어공학과": {
            deptUrl: "https://www.dongyang.ac.kr/software/index.do",
            certs: ["정보처리기사", "정보보안기사", "네트워크관리사"],
            companies: [
                { name: "카카오", url: "https://www.kakaocorp.com", logo: "kakaocorp.com" },
                { name: "라인", url: "https://linepluscorp.com", logo: "linepluscorp.com" },
                { name: "안랩", url: "https://www.ahnlab.com", logo: "ahnlab.com" },
                { name: "신한DS", url: "https://www.shinhands.co.kr", logo: "shinhan.com" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "인공지능소프트웨어학과": {
            deptUrl: "https://www.dongyang.ac.kr/ai/index.do",
            certs: ["ADsP", "빅데이터분석기사", "SQLD"],
            companies: [
                { name: "업스테이지", url: "https://www.upstage.ai", logo: "upstage.ai" },
                { name: "루닛", url: "https://lunit.io", logo: "lunit.io" },
                { name: "네이버클라우드", url: "https://www.ncloud.com", logo: "ncloud.com" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "건축과": {
            deptUrl: "https://www.dongyang.ac.kr/arch/index.do",
            certs: ["건축기사", "전산응용건축제도기능사"],
            companies: [
                { name: "현대건설", url: "https://www.hdec.kr", logo: "hdec.kr" },
                { name: "GS건설", url: "https://www.gsenc.com", logo: "gsenc.com" },
                { name: "희림건축", url: "https://www.heerim.com", logo: "heerim.com" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "실내건축디자인과": {
            deptUrl: "https://www.dongyang.ac.kr/id/index.do",
            certs: ["실내건축기사", "전산응용실내제도기능사"],
            companies: [
                { name: "한샘", url: "https://www.hanssem.com", logo: "hanssem.com" },
                { name: "국보디자인", url: "https://www.kukbo.com", logo: "kukbo.com" },
                { name: "현대리바트", url: "https://www.hyundailivart.co.kr", logo: "hyundailivart.co.kr" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "시각디자인과": {
            deptUrl: "https://www.dongyang.ac.kr/visual/index.do",
            certs: ["시각디자인기사", "GTQ", "Adobe Specialist"],
            companies: [
                { name: "제일기획", url: "https://www.cheil.com", logo: "cheil.com" },
                { name: "대홍기획", url: "https://www.daehong.com", logo: "daehong.com" },
                { name: "플러스엑스", url: "https://www.plus-ex.com", logo: "plus-ex.com" }
            ],
            qnet: "https://www.q-net.or.kr"
        },
        "웹응용소프트웨어공학과": {
            deptUrl: "https://www.dongyang.ac.kr/computer/index.do",
            certs: ["정보처리기사", "AWS Solution Architect", "SQLD"],
            companies: [

            { name: "네이버", url: "https://www.navercorp.com", logo: "navercorp.com" },
            { name: "우아한형제들", url: "https://www.woowayahan.com", logo: "woowayahan.com" },
            { name: "토스", url: "https://toss.im", logo: "toss.im" },
            { name: "당근", url: "https://www.daangn.com", logo: "daangn.com" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "컴퓨터소프트웨어공학과": {
        certs: ["정보처리기사", "정보보안기사", "네트워크관리사"],
        companies: [
            { name: "카카오", url: "https://www.kakaocorp.com", logo: "kakaocorp.com" },
            { name: "라인", url: "https://linepluscorp.com", logo: "linepluscorp.com" },
            { name: "안랩", url: "https://www.ahnlab.com", logo: "ahnlab.com" },
            { name: "신한DS", url: "https://www.shinhands.co.kr", logo: "shinhan.com" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "인공지능소프트웨어학과": {
        certs: ["ADsP", "빅데이터분석기사", "SQLD"],
        companies: [
            { name: "업스테이지", url: "https://www.upstage.ai", logo: "upstage.ai" },
            { name: "루닛", url: "https://lunit.io", logo: "lunit.io" },
            { name: "네이버클라우드", url: "https://www.ncloud.com", logo: "ncloud.com" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "건축과": {
        certs: ["건축기사", "전산응용건축제도기능사"],
        companies: [
            { name: "현대건설", url: "https://www.hdec.kr", logo: "hdec.kr" },
            { name: "GS건설", url: "https://www.gsenc.com", logo: "gsenc.com" },
            { name: "희림건축", url: "https://www.heerim.com", logo: "heerim.com" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "실내건축디자인과": {
        certs: ["실내건축기사", "전산응용실내제도기능사"],
        companies: [
            { name: "한샘", url: "https://www.hanssem.com", logo: "hanssem.com" },
            { name: "국보디자인", url: "https://www.kukbo.com", logo: "kukbo.com" },
            { name: "현대리바트", url: "https://www.hyundailivart.co.kr", logo: "hyundailivart.co.kr" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "시각디자인과": {
        certs: ["시각디자인기사", "GTQ", "Adobe Specialist"],
        companies: [
            { name: "제일기획", url: "https://www.cheil.com", logo: "cheil.com" },
            { name: "대홍기획", url: "https://www.daehong.com", logo: "daehong.com" },
            { name: "플러스엑스", url: "https://www.plus-ex.com", logo: "plus-ex.com" }
        ],
        qnet: "https://www.q-net.or.kr"
    },
    "AR·VR콘텐츠디자인과": {
        certs: ["Unity Certified", "GTQ"],
        companies: [
            { name: "넥슨", url: "https://www.nexon.com", logo: "nexon.com" },
            { name: "넷마블", url: "https://www.netmarble.net", logo: "netmarble.net" },
            { name: "자이언트스텝", url: "https://www.giantstep.com", logo: "giantstep.com" }
        ],
        qnet: "https://unity.com/learn"
    },
    "경영학과": {
        certs: ["컴퓨터활용능력 1급", "ERP정보관리사", "ADsP"],
        companies: [
            { name: "CJ프레시웨이", url: "https://www.cjfreshway.com", logo: "cj.net" },
            { name: "롯데지주", url: "https://www.lotte.co.kr", logo: "lotte.co.kr" },
            { name: "신세계", url: "https://www.shinsegae.com", logo: "shinsegae.com" }
        ],
        qnet: "https://license.korcham.net"
    },
    "세무회계학과": {
        certs: ["전산세무 1급", "재경관리사", "기업회계 1급"],
        companies: [
            { name: "삼일회계법인", url: "https://www.pwc.com/kr", logo: "pwc.com" },
            { name: "삼정KPMG", url: "https://kpmg.com/kr", logo: "kpmg.com" },
            { name: "한영회계법인", url: "https://www.ey.com/ko_kr", logo: "ey.com" }
        ],
        qnet: "https://license.kacpta.or.kr"
    },
    "유통마케팅학과": {
        certs: ["유통관리사 2급", "GAIQ", "ADsP"],
        companies: [
            { name: "이마트", url: "https://store.emart.com", logo: "emart.com" },
            { name: "쿠팡", url: "https://www.coupang.com", logo: "coupang.com" },
            { name: "BGF리테일", url: "https://www.bgfretail.com", logo: "bgfretail.com" }
        ],
        qnet: "https://license.korcham.net"
    },
    "호텔관광학과": {
        certs: ["조주기능사", "관광통역안내사", "OPIc IH"],
        companies: [
            { name: "호텔신라", url: "https://www.hotelshilla.net", logo: "shilla.net" },
            { name: "대한항공", url: "https://www.koreanair.com", logo: "koreanair.com" },
            { name: "파라다이스", url: "https://www.paradise.co.kr", logo: "paradise.co.kr" }
        ],
        qnet: "https://www.q-net.or.kr"
    }
};

const AI_KNOWLEDGE = {
    "기계공학과": "기계공학과는 역학, 설계, 제조 등 산업의 근간이 되는 기술을 배웁니다.",
    "기계설계공학과": "기계설계공학과는 3D CAD 정밀 설계와 시스템 구축을 전문으로 합니다.",
    "자동화공학과": "자동화공학과는 스마트 팩토리, 제어 시스템, 센서 기술을 배웁니다.",
    "로봇소프트웨어과": "로봇소프트웨어과는 로봇 제어 알고리즘과 임베디드 시스템을 배웁니다.",
    "웹응용소프트웨어공학과": "웹응용소프트웨어공학과는 풀스택 개발과 클라우드 아키텍처를 학습합니다.",
    "컴퓨터소프트웨어공학과": "컴퓨터소프트웨어공학과는 알고리즘, OS, 보안 등 소프트웨어 원리를 다룹니다.",
    "인공지능소프트웨어학과": "인공지능소프트웨어학과는 머신러닝, 딥러닝, 데이터 분석을 전문으로 합니다.",
    "건축과": "건축과는 설계, 구조, 공법 등 건축물 전과정을 배웁니다.",
    "실내건축디자인과": "실내건축디자인과는 공간 기획과 환경 디자인을 다룹니다.",
    "시각디자인과": "시각디자인과는 브랜딩, UI/UX, 그래픽 커뮤니케이션을 학습합니다.",
    "AR·VR콘텐츠디자인과": "AR·VR콘텐츠디자인과는 실감형 미디어와 인터랙티브 디자인을 전문으로 합니다.",
    "경영학과": "경영학과는 경영 전략, 인사, 재무 등 조직 관리 전반을 배웁니다.",
    "세무회계학과": "세무회계학과는 기업의 재무 투명성을 위한 회계와 세법을 학습합니다.",
    "유통마케팅학과": "유통마케팅학과는 물류 최적화와 소비자 마케팅 전략을 다룹니다.",
    "호텔관광학과": "호텔관광학과는 글로벌 호스피탈리티 산업의 서비스 경영을 배웁니다."
};

// Fallback Mock Data
const INITIAL_MOCK_QUESTIONS = [
    { id: 'q1', category: 'dept', departmentName: '컴퓨터소프트웨어공학과', title: '컴퓨팅 아카이브 01', content: '실무 환경에서의 React와 Vue 비교 분석.', author: '관리자', timestamp: Date.now() - 1000000 },
    { id: 'q2', category: 'dept', departmentName: '기계설계공학과', title: '기계설계 아카이브 02', content: '3D 모델링 최적화 및 베스트 프랙티스.', author: '선배님', timestamp: Date.now() - 5000000 },
    { id: 'q3', category: 'dept', departmentName: '시각디자인과', title: '디자인 아카이브 03', content: '스트릿 브랜드 아이덴티티 시각 분석.', author: '디자이너', timestamp: Date.now() - 10000000 },
    { id: 'm1', category: 'mentor', departmentName: '취업지원센터', title: '멘토의 취업 팁', content: '포트폴리오 작성 시 가장 중요한 3가지 요소.', author: '채용담당자', timestamp: Date.now() - 2000000 }
];

document.addEventListener('DOMContentLoaded', () => {
    // ── Tab Management ──────────────────────────────────────────
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabPanels = {
        home:     document.getElementById('tab-home'),
        archive:  document.getElementById('tab-archive'),
        dept:     document.getElementById('tab-dept'),
        mentor:   document.getElementById('tab-mentor'),
        register: document.getElementById('tab-register'),
    };

    const switchTab = (tabName) => {
        // Update nav buttons
        navTabs.forEach(t => t.classList.remove('active'));
        const activeTabBtn = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
        if (activeTabBtn) activeTabBtn.classList.add('active');

        // Update panels
        Object.keys(tabPanels).forEach(key => {
            if (tabPanels[key]) {
                if (key === tabName) {
                    tabPanels[key].classList.remove('hidden');
                    tabPanels[key].classList.add('active');
                } else {
                    tabPanels[key].classList.add('hidden');
                    tabPanels[key].classList.remove('active');
                }
            }
        });

        // Trigger rendering for lists
        if (tabName === 'home') renderHomePreview();
        if (tabName === 'archive') renderQna('archive');
        if (tabName === 'mentor') renderQna('mentor');
        if (tabName === 'dept') clearDeptView();
    };

    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(tab.dataset.tab);
        });
    });

    // Home links
    document.getElementById('home-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('home');
    });

    document.querySelectorAll('.btn-home-cta').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.goto));
    });

    // ── Data Handling ───────────────────────────────────────────
    let allQuestions = [];

    const fetchQuestions = () => {
        if (useFirebase && database) {
            database.ref('questions').on('value', (snapshot) => {
                const data = snapshot.val();
                allQuestions = data ? Object.values(data) : [];
                refreshCurrentTab();
            });
        } else {
            const localData = localStorage.getItem('ddas_questions_v3');
            allQuestions = localData ? JSON.parse(localData) : INITIAL_MOCK_QUESTIONS;
            refreshCurrentTab();
        }
    };

    const refreshCurrentTab = () => {
        const activeTabName = document.querySelector('.nav-tab.active')?.dataset.tab;
        if (activeTabName === 'home') renderHomePreview();
        if (activeTabName === 'archive') renderQna('archive');
        if (activeTabName === 'mentor') renderQna('mentor');
        if (activeTabName === 'dept') renderQna('dept');
    };

    const renderHomePreview = () => {
        const listEl = document.getElementById('home-qna-preview');
        if (!listEl) return;
        
        const recent = [...allQuestions].sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);
        listEl.innerHTML = '';
        
        recent.forEach((data, index) => {
            const card = document.createElement('div');
            card.className = 'qna-card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="dept-tag">${data.departmentName || ''}</span>
                    <span class="category-tag">${data.category === 'dept' ? '전공' : '멘토'}</span>
                </div>
                <h3 style="font-size:1.1rem;">${data.title}</h3>
                <p style="font-size:0.8rem; margin-bottom:1rem;">${data.content.substring(0, 60)}...</p>
                <div class="qna-meta" style="font-size:0.6rem;">
                    <span>${data.author}</span>
                    <span>${new Date(data.timestamp).toLocaleDateString()}</span>
                </div>
            `;
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => openAiModal(data.departmentName, data.title));
            listEl.appendChild(card);
        });
    };

    // ── QnA Rendering ──────────────────────────────────────────
    const renderQna = (mode) => {
        const listId = mode === 'archive' ? 'qna-list-archive' : mode === 'mentor' ? 'qna-list-mentor' : 'qna-list-dept';
        const listEl = document.getElementById(listId);
        if (!listEl) return;

        const query = (document.getElementById('search-input')?.value || '').toLowerCase();

        let filtered = allQuestions;
        if (mode === 'mentor') filtered = filtered.filter(q => q.category === 'mentor');
        if (mode === 'archive') filtered = filtered.filter(q => q.category === 'dept' || q.category === 'mentor');
        if (mode === 'dept') {
            const activeSubBtn = document.querySelector('.sub-filter-btn.active');
            const activeDept = activeSubBtn?.dataset.dept;
            if (activeDept) filtered = filtered.filter(q => q.departmentName === activeDept);
            else {
                // Show all dept questions if no specific dept selected
                filtered = filtered.filter(q => q.category === 'dept');
            }
        }

        if (query && mode === 'archive') {
            filtered = filtered.filter(q =>
                q.title.toLowerCase().includes(query) ||
                q.content.toLowerCase().includes(query) ||
                (q.departmentName && q.departmentName.toLowerCase().includes(query))
            );
        }

        listEl.innerHTML = '';
        if (filtered.length === 0) {
            listEl.innerHTML = '<div style="grid-column:1/-1;padding:4rem;text-align:center;font-weight:800;color:#888;">표시할 아카이브 정보가 없습니다.</div>';
            return;
        }

        filtered.sort((a, b) => b.timestamp - a.timestamp).forEach((data, index) => {
            const card = document.createElement('div');
            card.className = 'qna-card';
            const serial = (filtered.length - index).toString().padStart(3, '0');
            card.innerHTML = `
                <div style="font-size:0.6rem;color:#888;margin-bottom:0.5rem;font-family:monospace;">ITEM NO. ${serial} / ARCHIVE SERIES</div>
                <div class="card-header">
                    <span class="dept-tag">${data.departmentName || ''}</span>
                    <span class="category-tag">${data.category === 'dept' ? '학과 질문' : '멘토 가이드'}</span>
                </div>
                <h3>${data.title}</h3>
                <p>${data.content}</p>
                <div class="qna-meta">
                    <span>작성자: ${data.author}</span>
                    <span>${new Date(data.timestamp).toLocaleDateString()}</span>
                </div>
                <div class="card-footer-cta">
                    <button class="btn-card-ai" onclick="event.stopPropagation();">AI 멘토에게 물어보기</button>
                    ${ROADMAP_DATA[data.departmentName]?.deptUrl ? `<a href="${ROADMAP_DATA[data.departmentName].deptUrl}" target="_blank" class="link-dept-site" onclick="event.stopPropagation();">학과 홈 ↗</a>` : ''}
                </div>
            `;
            card.addEventListener('click', () => openAiModal(data.departmentName, data.title));
            card.querySelector('.btn-card-ai')?.addEventListener('click', (e) => {
                e.stopPropagation();
                openAiModal(data.departmentName, data.title);
            });
            listEl.appendChild(card);
        });
    };

    // ── Search Event ───────────────────────────────────────────
    document.getElementById('search-input')?.addEventListener('input', () => {
        renderQna('archive');
    });

    // ── Dept View & Roadmap ────────────────────────────────────
    const roadmapContainer = document.getElementById('roadmap-display');
    const backBtnDept = document.getElementById('header-back-btn-dept');
    const subFilterBtns = document.querySelectorAll('.sub-filter-btn');

    const clearDeptView = () => {
        subFilterBtns.forEach(b => b.classList.remove('active'));
        if (roadmapContainer) {
            roadmapContainer.innerHTML = '';
            roadmapContainer.classList.add('hidden');
        }
        backBtnDept?.classList.add('hidden');
        const deptList = document.getElementById('qna-list-dept');
        if (deptList) deptList.innerHTML = '';
    };

    backBtnDept?.addEventListener('click', clearDeptView);

    const renderRoadmap = (deptName) => {
        if (!deptName || !ROADMAP_DATA[deptName]) return;
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
                            ${data.certs.map(c => `<a href="${data.qnet || '#'}" target="_blank" class="roadmap-tag cert-tag">${c}</a>`).join('')}
                        </div>
                    </div>
                    <div class="roadmap-section">
                        <h5>주요 취업처</h5>
                        <div class="company-grid">
                            ${data.companies.map(c => {
                                const name = typeof c === 'string' ? c : c.name;
                                const url  = typeof c === 'string' ? '#' : (c.url || '#');
                                const logo = typeof c === 'string' ? '' : (c.logo || '');
                                return `
                                    <a href="${url}" target="_blank" class="company-card">
                                        <div class="company-logo">
                                            <img src="https://logo.clearbit.com/${logo}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=111&color=fff'" alt="${name}">
                                        </div>
                                        <span class="company-name">${name}</span>
                                    </a>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
                <div class="ai-consult-trigger-wrapper" style="margin-top:2rem;">
                    <button class="btn-ai-consult">1:1 AI 상담 시작하기</button>
                </div>
            </div>
        `;
        // Attach AI button listener
        roadmapContainer.querySelector('.btn-ai-consult')?.addEventListener('click', () => openAiModal(deptName));
    };

    subFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const dept = btn.dataset.dept;
            subFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            backBtnDept?.classList.remove('hidden');
            renderRoadmap(dept);
            renderQna('dept');
            // Auto-scroll to roadmap
            roadmapContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ── Questionnaire Form ─────────────────────────────────────
    const qnaForm = document.getElementById('qna-form');
    const cancelRegister = document.getElementById('cancel-register');

    qnaForm?.addEventListener('submit', (e) => {
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

        if (useFirebase && database) {
            database.ref('questions').push(newQuestion);
        } else {
            allQuestions.unshift(newQuestion);
            localStorage.setItem('ddas_questions_v3', JSON.stringify(allQuestions));
            refreshCurrentTab();
        }
        
        qnaForm.reset();
        switchTab('archive');
    });

    cancelRegister?.addEventListener('click', () => qnaForm.reset());

    // ── AI Modal System ────────────────────────────────────────
    const aiModalOverlay = document.getElementById('ai-modal-overlay');
    const aiChatHistory = document.getElementById('ai-chat-history');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const closeAiModalBtn = document.getElementById('close-ai-modal');
    const aiModalBackBtn = document.getElementById('ai-modal-back-btn');

    let currentConsultingDept = null;
    let currentTopic = null;
    let currentTopicData = null;

    const openAiModal = (deptName, contextTitle) => {
        currentConsultingDept = deptName || "공통";
        aiModalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        aiChatHistory.innerHTML = '';
        currentTopic = contextTitle || "intro";
        
        if (contextTitle) {
            handleAiResponse(`아카이브의 "${contextTitle}" 내용에 대해 동양미래대학교 ${currentConsultingDept} 멘토로서 자세히 설명해줘.`);
        } else {
            handleAiResponse("반가워");
        }
    };

    const closeAiModal = () => {
        aiModalOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    const addChatMessage = (role, text) => {
        const msg = document.createElement('div');
        msg.className = `chat-message ${role}`;
        msg.innerHTML = text;
        aiChatHistory.appendChild(msg);
        aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
    };

    const addChatMessageWithTyping = (role, text) => {
        const msg = document.createElement('div');
        msg.className = `chat-message ${role}`;
        aiChatHistory.appendChild(msg);
        let i = 0;
        const type = () => {
            if (i <= text.length) {
                msg.innerHTML = text.substring(0, i) + '<span class="typing-dot"></span>';
                i += 3;
                aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
                setTimeout(type, 20);
            } else {
                msg.innerHTML = text;
            }
        };
        type();
    };

    const handleAiResponse = (userInput) => {
        const input = userInput.toLowerCase();
        let response = "";
        let foundMatch = false;

        if (input.includes("안녕") || input.includes("반가워")) {
            response = `반갑습니다! <strong>동양미래대학교 ${currentConsultingDept}</strong> 전공 멘토 봇입니다. 전공 로드맵부터 취업 전략, 학사 정보까지 궁금한 점을 다 물어보세요!`;
            foundMatch = true;
        } else if (input.includes("취업") || input.includes("진로") || input.includes("회사")) {
            const companies = ROADMAP_DATA[currentConsultingDept]?.companies.map(c => typeof c === 'string' ? c : c.name).join(', ') || "다양한 글로벌 리딩 기업";
            response = `<strong>${currentConsultingDept}</strong> 선배들의 주요 취업처는 <strong>${companies}</strong> 등이 있습니다. 해당 기업들의 공고나 면접 팁이 필요하신가요?`;
            foundMatch = true;
        } else if (input.includes("자격증") || input.includes("따야")) {
            const certs = ROADMAP_DATA[currentConsultingDept]?.certs || ["정보처리기사", "컴퓨터활용능력"];
            response = `추천드리는 핵심 자격증은 <strong>${certs.join(', ')}</strong>입니다. 구체적인 준비 방법이 알고 싶은 자격증이 있나요?`;
            foundMatch = true;
        }
        
        if (!foundMatch) {
            for (const cert in CERTIFICATION_DB) {
                if (input.includes(cert)) {
                    currentTopicData = CERTIFICATION_DB[cert];
                    response = `<strong>${cert}</strong>에 대한 분석 데이터입니다: <br><br> ${currentTopicData.desc} <br><br> ✦ <strong>공략법:</strong> ${currentTopicData.howTo}`;
                    foundMatch = true;
                    break;
                }
            }
        }

        if (!foundMatch) {
            response = `질문하신 <strong>"${userInput}"</strong>에 대해 학과 아카이브를 분석한 결과입니다. <br><br> 더 구체적인 정보는 <a href="https://www.google.com/search?q=${encodeURIComponent(userInput + " " + currentConsultingDept)}" target="_blank" style="color:#4285f4; font-weight:700;">[구글 실시간 검색 ↗]</a>에서도 확인하실 수 있습니다. 제가 더 도와드릴 만한 세부 전공 내용이 있을까요?`;
        }

        addChatMessage('bot', response);
    };


    aiSendBtn?.addEventListener('click', () => {
        const text = aiChatInput.value.trim();
        if (!text) return;
        addChatMessage('user', text);
        aiChatInput.value = '';
        handleAiResponse(text);
    });

    aiChatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') aiSendBtn.click();
    });

    closeAiModalBtn?.addEventListener('click', closeAiModal);
    aiModalBackBtn?.addEventListener('click', closeAiModal);
    aiModalOverlay?.addEventListener('click', (e) => {
        if (e.target === aiModalOverlay) closeAiModal();
    });

    // ── Initialize ─────────────────────────────────────────────
    fetchQuestions();
    switchTab('home');
});
