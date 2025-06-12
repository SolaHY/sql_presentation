// スライドファイルのリスト
const slideFiles = [
    'slides/01_introduction.html',
    'slides/02_database_structure.html',
    'slides/03_basic_operations.html',
    'slides/04_joins.html',
    'slides/05_advanced_topics.html',
    'slides/06_summary.html'
];

let currentSlide = 1;
let totalSlides = 0;
let slides;

// スライドファイルを読み込む
async function loadSlides() {
    const slidesContainer = document.getElementById('slides-container');
    
    for (const file of slideFiles) {
        try {
            const response = await fetch(file);
            const html = await response.text();
            slidesContainer.innerHTML += html;
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
        }
    }

    // スライド要素を取得
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    
    // スライド総数を更新
    document.getElementById('total-slides').textContent = totalSlides;

    // 最初のスライドを表示
    showSlide(1);
}

// スライドを表示
function showSlide(n) {
    // 範囲チェック
    if (n > totalSlides) {
        currentSlide = totalSlides;
    } else if (n < 1) {
        currentSlide = 1;
    } else {
        currentSlide = n;
    }

    // 全スライドを非表示
    slides.forEach(slide => slide.classList.remove('active'));
    
    // 現在のスライドを表示
    slides[currentSlide - 1].classList.add('active');
    
    // カウンター更新
    document.getElementById('current-slide').textContent = currentSlide;

    // ナビゲーションボタンの状態更新
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
}

// スライド切り替え
function changeSlide(n) {
    showSlide(currentSlide + n);
}

// キーボードナビゲーション
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
});

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadSlides();
}); 