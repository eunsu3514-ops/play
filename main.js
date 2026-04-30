document.addEventListener('DOMContentLoaded', () => {
    // Advanced Reveal animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(30px) scale(0.95)', filter: 'blur(10px)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
                ], {
                    duration: 1200,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    fill: 'forwards',
                    delay: index * 100 // Staggered effect
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.bento-item, .showcase-item, .timeline-entry, h1, .subhead, .section-title').forEach(el => {
        el.style.opacity = 0;
        observer.observe(el);
    });

    // Mouse-following Glow Effect for Bento Items
    document.querySelectorAll('.bento-item').forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            item.style.setProperty('--mouse-x', `${x}%`);
            item.style.setProperty('--mouse-y', `${y}%`);
        });
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
    if (!postList) return;
    const formContainer = document.getElementById('post-form-container');
    const postForm = document.getElementById('post-form');
    const btnShowForm = document.getElementById('btn-show-form');
    const btnCancelForm = document.getElementById('btn-cancel-form');
    const formTitle = document.getElementById('form-title');
    
    const escapeHtml = (unsafe) => {
        if (!unsafe) return "";
        return unsafe.toString()
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    };

    // Load posts from localStorage
    window.loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('board_posts')) || [];
        postList.innerHTML = '';

        if (posts.length === 0) {
            postList.innerHTML = `<div class="empty-state"><h3>등록된 게시글이 없습니다.</h3><p>첫 번째 글을 작성해 보세요!</p></div>`;
            return;
        }

        posts.slice().reverse().forEach(post => {
            const date = new Date(post.createdAt).toLocaleString('ko-KR');
            const likes = post.likes || 0;
            const comments = post.comments || [];
            
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            
            let commentsHtml = comments.map(c => `
                <div class="comment-item">
                    <span class="comment-author">${escapeHtml(c.author)}</span>
                    <span class="comment-text">${escapeHtml(c.text)}</span>
                </div>
            `).join('');

            postItem.innerHTML = `
                <div class="post-meta">
                    <strong>${escapeHtml(post.name)}</strong>
                    <span>${date}</span>
                </div>
                <div class="post-meta" style="color: var(--accent); margin-top:-8px; margin-bottom: 12px;">
                    ${escapeHtml(post.email)}
                </div>
                <div class="post-content">${escapeHtml(post.content)}</div>
                
                <div class="post-footer">
                    <div class="interaction-bar">
                        <button class="like-btn" onclick="likePost('${post.id}')">
                            👍 <span>${likes}</span>
                        </button>
                        <span style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center;">
                            💬 댓글 ${comments.length}개
                        </span>
                    </div>
                    
                    <div class="comment-section">
                        <div class="comment-list">
                            ${commentsHtml || '<p style="font-size:0.8rem; color:var(--text-muted);">첫 댓글을 남겨보세요.</p>'}
                        </div>
                        <form class="comment-form" onsubmit="addComment(event, '${post.id}')">
                            <input type="text" class="comment-input" placeholder="댓글을 입력하세요..." required>
                            <button type="submit" class="btn" style="padding: 5px 10px; font-size: 0.8rem;">등록</button>
                        </form>
                    </div>

                    <div class="post-actions" style="margin-top: 15px;">
                        <button class="btn btn-outline edit-btn" onclick="editPost('${post.id}')">수정</button>
                        <button class="btn btn-danger delete-btn" onclick="deletePost('${post.id}')">삭제</button>
                    </div>
                </div>
            `;
            postList.appendChild(postItem);
        });
    };

    // Like functionalitiy
    window.likePost = (id) => {
        let posts = JSON.parse(localStorage.getItem('board_posts')) || [];
        const index = posts.findIndex(p => p.id === id);
        if (index !== -1) {
            posts[index].likes = (posts[index].likes || 0) + 1;
            localStorage.setItem('board_posts', JSON.stringify(posts));
            loadPosts();
        }
    };

    // Comment functionality
    window.addComment = (e, postId) => {
        e.preventDefault();
        const input = e.target.querySelector('.comment-input');
        const text = input.value;
        if (!text.trim()) return;

        let posts = JSON.parse(localStorage.getItem('board_posts')) || [];
        const index = posts.findIndex(p => p.id === postId);
        if (index !== -1) {
            if (!posts[index].comments) posts[index].comments = [];
            posts[index].comments.push({
                author: "방문자",
                text: text,
                createdAt: Date.now()
            });
            localStorage.setItem('board_posts', JSON.stringify(posts));
            loadPosts();
        }
        input.value = '';
    };

    // CRUD - Save or Update Post
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('post-id').value;
        const name = document.getElementById('post-name').value;
        const email = document.getElementById('post-email').value;
        const content = document.getElementById('post-content').value;
        
        if (!name.trim() || !email.trim() || !content.trim()) return;

        let posts = JSON.parse(localStorage.getItem('board_posts')) || [];

        if (id) {
            const index = posts.findIndex(p => p.id === id);
            if (index !== -1) {
                posts[index].name = name;
                posts[index].email = email;
                posts[index].content = content;
                posts[index].updatedAt = Date.now();
            }
        } else {
            const newPost = {
                id: Date.now().toString(),
                name,
                email,
                content,
                createdAt: Date.now(),
                likes: 0,
                comments: []
            };
            posts.push(newPost);
        }

        localStorage.setItem('board_posts', JSON.stringify(posts));
        postForm.reset();
        document.getElementById('post-id').value = '';
        formContainer.style.display = 'none';
        window.loadPosts();
    });

    window.deletePost = (id) => {
        if (confirm('삭제하시겠습니까?')) {
            let posts = JSON.parse(localStorage.getItem('board_posts')) || [];
            posts = posts.filter(p => p.id !== id);
            localStorage.setItem('board_posts', JSON.stringify(posts));
            window.loadPosts();
        }
    };

    window.editPost = (id) => {
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
    });
});
