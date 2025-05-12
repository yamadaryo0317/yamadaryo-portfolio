const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const title = document.getElementById('title');
const description = document.getElementById('description');

const descriptions = [
  {
    title: "香木の森バンガローwebサイトリニューアルプロジェクト",
    desc: "元のウェブサイトは背景画像が強調されすぎて情報が見切れたり、ヘッダーと重なって視認性が悪く、バンガローの自然な雰囲気とも調和していないなど、全体に統一感と使いやすさを欠いていました。リメイクでは、自然で落ち着いた雰囲気を全体に反映し、固定ヘッダーの導入や料金表示の色分けなど、視認性と操作性の向上を意識。画像切り替えはボタン式に改善しましたが、より直感的な操作ができるよう今後の課題として捉えています。"
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
    desc: ""
  },
  {
    title: "学園祭webサイトリニューアル",
    desc: "私が通ってる専門学校の学園祭webサイトがリメイク前の学園祭サイトでは、出し物の情報が視覚的に整理されておらず、楽しさや雰囲気が伝わりづらいという課題がありました。文字中心のレイアウトや情報の導線の不明瞭さが、閲覧者にとってのストレスになっていました。そこで、リメイクでは「楽しさが伝わるビジュアル」と「情報のわかりやすさ」を両立させることを重視。トップページでは視覚的に文化祭の雰囲気を感じ取れるデザインを採用し、出し物の一覧もカテゴリーごとにすぐ把握できるよう設計しました。また、シンプルなナビゲーションと明確な視線誘導を行うことで、ユーザーが迷わず必要な情報にたどり着ける構造にしています。このリデザインによって、サイト全体の印象が明るく親しみやすくなり、学園祭の魅力をより直感的に伝えられるようになりました。"
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
