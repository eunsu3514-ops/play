document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(20px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0,0,0.5,1)',
                    fill: 'forwards'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.bento-item, .timeline-entry, h1, .subhead, .section-title').forEach(el => {
        el.style.opacity = 0;
        observer.observe(el);
    });
});

// Navigation logic for SPA
window.showBoard = function() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('resume-section').style.display = 'none';
    const board = document.getElementById('board-section');
    board.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.loadPosts) window.loadPosts();
};

window.showResume = function() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('board-section').style.display = 'none';
    const resume = document.getElementById('resume-section');
    resume.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'instant' });
};

window.showMain = function() {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('board-section').style.display = 'none';
    document.getElementById('resume-section').style.display = 'none';
    // Let anchor hashing do the scrolling if there's a hash, otherwise scroll to top.
    setTimeout(() => {
        if (!window.location.hash || window.location.hash === '#board' || window.location.hash === '#resume') {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, 10);
};

document.addEventListener('DOMContentLoaded', () => {
    // Recruit form submit stub
    const recruitForm = document.getElementById('recruit-form');
    if (recruitForm) {
        recruitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('지원서가 성공적으로 제출되었습니다. (프론트엔드 데모 완성)');
            recruitForm.reset();
        });
    }
});

// Free Board Logic
document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    if (!postList) return; // Prevent errors if not loaded
    const formContainer = document.getElementById('post-form-container');
    const postForm = document.getElementById('post-form');
    const btnShowForm = document.getElementById('btn-show-form');
    const btnCancelForm = document.getElementById('btn-cancel-form');
    const formTitle = document.getElementById('form-title');
    
    // Load posts from localStorage
    window.loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('board_posts')) || [];
        postList.innerHTML = '';

        if (posts.length === 0) {
            postList.innerHTML = `
                <div class="empty-state">
                    <h3>등록된 게시글이 없습니다.</h3>
                    <p>첫 번째 글을 작성해 보세요!</p>
                </div>
            `;
            return;
        }

        // Display newest first
        posts.slice().reverse().forEach(post => {
            const date = new Date(post.createdAt).toLocaleString('ko-KR');
            
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            
            // Protect against XSS
            const escapeHtml = (unsafe) => {
                return unsafe
                     .replace(/&/g, "&amp;")
                     .replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
                     .replace(/'/g, "&#039;");
            };

            postItem.innerHTML = `
                <div class="post-meta">
                    <strong>${escapeHtml(post.name)}</strong>
                    <span>${date}</span>
                </div>
                <div class="post-meta" style="color: var(--accent); margin-top:-8px; margin-bottom: 12px;">
                    ${escapeHtml(post.email)}
                </div>
                <div class="post-content">${escapeHtml(post.content)}</div>
                <div class="post-actions">
                    <button class="btn btn-outline edit-btn" data-id="${post.id}">수정</button>
                    <button class="btn btn-danger delete-btn" data-id="${post.id}">삭제</button>
                </div>
            `;
            postList.appendChild(postItem);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => editPost(e.target.getAttribute('data-id')));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => deletePost(e.target.getAttribute('data-id')));
        });
    };

    // Save or Update Post
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('post-id').value;
        const name = document.getElementById('post-name').value;
        const email = document.getElementById('post-email').value;
        const content = document.getElementById('post-content').value;
        
        if (!name.trim() || !email.trim() || !content.trim()) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        let posts = JSON.parse(localStorage.getItem('board_posts')) || [];

        if (id) {
            const index = posts.findIndex(p => p.id === id);
            if (index !== -1) {
                posts[index].name = name;
                posts[index].email = email;
                posts[index].content = content;
                posts[index].updatedAt = Date.now();
                alert('게시글이 수정되었습니다.');
            }
        } else {
            const newPost = {
                id: Date.now().toString(),
                name,
                email,
                content,
                createdAt: Date.now()
            };
            posts.push(newPost);
            alert('게시글이 등록되었습니다.');
        }

        localStorage.setItem('board_posts', JSON.stringify(posts));
        
        postForm.reset();
        document.getElementById('post-id').value = '';
        formContainer.style.display = 'none';
        
        window.loadPosts();
    });

    const deletePost = (id) => {
        if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            let posts = JSON.parse(localStorage.getItem('board_posts')) || [];
            posts = posts.filter(p => p.id !== id);
            localStorage.setItem('board_posts', JSON.stringify(posts));
            window.loadPosts();
        }
    };

    const editPost = (id) => {
        let posts = JSON.parse(localStorage.getItem('board_posts')) || [];
        const post = posts.find(p => p.id === id);
        
        if (post) {
            document.getElementById('post-id').value = post.id;
            document.getElementById('post-name').value = post.name;
            document.getElementById('post-email').value = post.email;
            document.getElementById('post-content').value = post.content;
            
            formTitle.textContent = '게시글 수정';
            formContainer.style.display = 'block';
            window.scrollTo({ top: formContainer.offsetTop - 100, behavior: 'smooth' });
        }
    };

    btnShowForm.addEventListener('click', () => {
        postForm.reset();
        document.getElementById('post-id').value = '';
        formTitle.textContent = '게시글 작성';
        formContainer.style.display = 'block';
        window.scrollTo({ top: formContainer.offsetTop - 100, behavior: 'smooth' });
    });

    btnCancelForm.addEventListener('click', () => {
        formContainer.style.display = 'none';
        postForm.reset();
    });
});
