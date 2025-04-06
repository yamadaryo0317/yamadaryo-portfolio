// ハンバーガーメニューの動作
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const portfolio = document.querySelector('.portfolio');
    const portfolioPosition = portfolio.getBoundingClientRect().top;

    // スクロールイベントのリスナー
    window.addEventListener('scroll', () => {
        // ポートフォリオセクションがビューポートに入ったらアニメーションを適用
        if (portfolioPosition - window.innerHeight <= 0) {
            portfolio.classList.add('visible');
        }
    });
});

