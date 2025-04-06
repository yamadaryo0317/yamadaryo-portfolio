const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const title = document.getElementById('title');
const description = document.getElementById('description');

const descriptions = [
  {
    title: "香木の森バンガローwebサイトリニューアルプロジェクト",
    desc: "授業の一環で行ったwebリニューアルサイト。実際にある「香木の森バンガロー」のwebサイトを使いずらいところなどを改善して作成したプロジェクト。"
  },
  {
    title: "初心者向けポーカーwebサイト（進級制作）",
    desc: "授業のプロジェクトの中でポーカーをする機会があったので初めてポーカーする人が参考にしやすいように作成しました。"
  },
  {
    title: "学園祭ロゴ作成",
    desc: "私の専門学校は学部が６つあるのでギターの弦の数と同じなので「６つのハーモニーが一つの音色になる」という意味を込めながら私なりに個性を出しながら作成しました。"
  },
  {
    title: "ECサイト",
    desc: "ECサイトを作るうえで必要な感覚や実際に使ってみて触りやすいように考えながら作成しました"
  },
  {
    title: "学園祭webサイトリニューアル",
    desc: "私が通ってる専門学校の学園祭webサイトが少し使ってて不満に思ったことやほしい情報などが載ってないことがあったので授業のプロジェクトで作成しました。"
  },
];

let index = 0;

function showSlide(i) {
  if (i >= slide.length) index = 0;
  if (i < 0) index = slide.length - 1;
  slides.style.transform = `translateX(-${index * 100}%)`;
  title.textContent = descriptions[index].title;
  description.textContent = descriptions[index].desc;
}

prev.addEventListener('click', () => {
  index--;
  showSlide(index);
});

next.addEventListener('click', () => {
  index++;
  showSlide(index);
});

setInterval(() => {
  index++;
  showSlide(index);
}, 6000); // 6秒ごとに自動切り替え

showSlide(index); // 初期表示
