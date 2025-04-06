// すべてのセルをキャッシュ
const cellsMap = {};
cells.forEach(cell => {
    cellsMap[cell.textContent] = cell;
});

// ハイライト適用の最適化
redHands.forEach(hand => cellsMap[hand]?.classList.add("highlight-red"));
blueHands.forEach(hand => cellsMap[hand]?.classList.add("highlight-blue"));


// ラジオボタンの選択に応じてテキストを表示する関数
function displayText() {
    var selectedPosition = document.querySelector('input[name="yourposition"]:checked');
    var open = document.querySelector('input[name="open"]:checked');
    var outputText = "";

    // ポジションが選択されていない場合のエラーチェック
    if (!selectedPosition) {
        outputText = "ポジションが選択されていません。";
        document.getElementById("textOutput").textContent = outputText;
        return;
    }

    // リセットボタンの機能を追加
    document.getElementById("resetButton").addEventListener("click", function () {
        // フォームのリセット
        document.querySelector("form").reset();

        // ハンドのハイライトをリセット
        var cells = document.querySelectorAll("table td");
        cells.forEach(function (cell) {
            cell.classList.remove("highlight-red", "highlight-blue", "highlight-yellow", "highlight-green");
        });

        // テキスト出力をリセット
        document.getElementById("textOutput").textContent = "";
    });


    // 選択したポジションに応じてテキストを変更
    switch (selectedPosition.value) {
        case 'UTG':
            outputText = "あなたのポジションはUTGです。";
            break;

        case 'HJ':
            outputText = "あなたのポジションはHJです。";
            break;

        case 'CO':
            outputText = "あなたのポジションはCOです。";
            break;

        case 'BTN':
            outputText = "あなたのポジションはBTNです。";
            break;

        case 'SB':
            outputText = "あなたのポジションはSBです。";
            break;

        case 'BB':
            outputText = "あなたのポジションはBBです。";
            break;

        default:
            outputText = "ポジションが選択されていません。";
    }

    // オープンの選択がなされている場合
    if (open) {
        outputText += " オープンは" + open.value + "です。";
    } else {
        outputText += " オープンが選択されていません。";
    }

    // 3ベットレンジの選択
    var threeBet = document.querySelector('input[name="3bet"]:checked');
    if (threeBet) {
        outputText += threeBet.value + "がリレイズしました。";
    }

    // テキストをページに表示
    document.getElementById("textOutput").textContent = outputText;

    // カードのハンドに色を付ける処理
    highlightHands(selectedPosition.value);
}

// カードの組み合わせをハイライトする関数
function highlightHands(position) {
    // すべてのカードをリセット
    var cells = document.querySelectorAll("table td");
    cells.forEach(function (cell) {
        cell.classList.remove("highlight-red", "highlight-blue", "highlight-yellow", "highlight-green",); // 赤、青、黄、緑のハイライトをリセット
    });

    // 赤色と青色に分けたハンド配列を定義
    var redHands = [];
    var yellowHands = [];
    var blueHands = [];
    var greenHands = [];

    const open = document.querySelector('input[name="open"]:checked');
    const reraise = document.querySelector('input[name="3bet"]:checked');

    //3betコールレンジ
    if (reraise) {
        switch (position) {
            case 'UTG':
                //HJから3bet
                if (reraise.value === 'HJ') {
                    redHands = [
                        'AA', 'AKs',
                        'AKo', 'KK',
                    ];

                    yellowHands = [
                        'AJs', 'A5s',
                        'KQs', 'KJs',
                        'QQ',
                        'JJ',
                    ];

                    greenHands = [
                        'AQs', 'TT', '99', '88', '66', '65s', '55', '44', '33', '22',
                    ];

                }
                //COから3bet
                if (reraise.value === 'CO') {
                    redHands = [
                        'AA', 'AKs',
                        'AKo', 'KK', 'KQs',
                        'QQ',
                    ];

                    yellowHands = [
                        'AJs', 'A5s',
                        'KJs', 'KTs',
                        'JJ',
                    ];

                    blueHands = [
                        'AQo'
                    ];
                    greenHands = [
                        'AQs', 'ATs', 'TT', '99', '66', '65s', '55', '44', '33', '22',
                        '98s', '87s', '76s', '65s', '54s', '',
                    ];

                }
                //BTNから3bet
                if (reraise.value === 'BTN') {
                    redHands = [
                        'AA', 'AKs',
                        'AKo', 'KK',
                    ];

                    yellowHands = [
                        'AJs', 'ATs', 'A5s',
                        'KQs', 'KJs', 'KTs',
                        'QQ',
                        'JJ',
                        'TT',
                    ];

                    blueHands = [
                        'AQo'
                    ];

                    greenHands = [
                        'AQs', '99', '88', '77', '66', '65s', '55', '44', '33', '22',
                        'JTs', '98s', '87s', '76s', '65s', '54s',
                    ];
                }
                //SBから3bet
                if (reraise.value === 'SB') {
                    redHands = [
                        'AA',
                    ];

                    yellowHands = [
                        'AKs',
                        'KK', 'KJs',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'ATs', 'A5s', 'A4s',
                        'AKo', 'KQs', 'KTs',
                        'QQ', 'QJs', 'QTs',
                        'JJ', 'JTs',
                        'TT',
                        '99', '98s',
                        '88', '87s',
                        '76s',
                        '66', '65s',
                        '55', '54s',
                        '44',
                        '33',
                        '22',
                    ];
                }
                //BBから3bet
                if (reraise.value === 'BB') {
                    redHands = [
                        'AA',
                    ];

                    yellowHands = [
                        'AKs',
                        'KK', 'KTs',
                    ];

                    blueHands = [
                        'A3s',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'ATs', 'A5s', 'A4s',
                        'AKo', 'KQs', 'KJs',
                        'QQ', 'QJs', 'QTs',
                        'JJ',
                        'TT',
                        '99', '98s',
                        '88', '87s',
                        '76s',
                        '66', '65s',
                        '55', '54s',
                        '44',
                        '33',
                        '22',
                    ];
                }
                break;


            case 'HJ':
                //COからリレイズ
                if (reraise.value === 'CO') {
                    redHands = [
                        'AA', 'AKs',
                        'AKo', 'KK',
                        'QQ',
                    ];

                    yellowHands = [
                        'AQs', 'AJs', 'ATs', 'A5s',
                        'KQs', 'KJs', 'KTs',
                        'AQo',
                        'JJ',
                        'TT',
                    ];

                    greenHands = [
                        'QJs', 'QTs',
                        'JTs',
                        '99',
                        '88', '87s',
                        '77', '76s',
                        '66', '65s',
                        '55', '54s',
                        '44', '33', '22',
                    ];
                }
                //BTNからリレイズ
                if (reraise.value === 'BTN') {
                    redHands = [
                        'AA', 'AKs',
                        'AKo', 'KK',
                        'QQ',
                    ];

                    yellowHands = [
                        'ATs', 'A5s',
                        'KQs', 'KJs', 'KTs',
                        'AQo',
                        'JJ',
                        'TT',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'A9s',
                        'K6s',
                        'QJs', 'QTs',
                        'JTs',
                        'T9s',
                        '99',
                        '88', '87s', '86s',
                        '77', '76s',
                        '66', '65s',
                        '55', '54s',
                        '44', '33', '22',
                    ];
                }
                //SBからリレイズ
                if (reraise.value === 'SB') {
                    redHands = [
                        'AA', 'AKs',
                        'KK',
                    ];

                    yellowHands = [
                        'AQo',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'ATs', 'A5s', 'A4s',
                        'AKo', 'KQs', 'KJs', 'KTs',
                        'QQ', 'QJs', 'QTs',
                        'JJ', 'JTs',
                        'TT', 'T9s',
                        '99',
                        '88', '87s', '86s',
                        '77', '76s',
                        '66', '65s',
                        '54s',
                        '44', '33', '22',
                    ];
                }
                //BBからリレイズ
                if (reraise.value === 'BB') {
                    redHands = [
                        'AA',
                    ];

                    yellowHands = [
                        'AKs', 'A3s',
                        'KK',
                        'AQo',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'ATs', 'A5s', 'A4s',
                        'AKo', 'KQs', 'KJs', 'KTs',
                        'QQ', 'QJs', 'QTs',
                        'JJ', 'JTs',
                        'TT',
                        '99',
                        '88', '87s', '86s',
                        '77', '76s',
                        '66', '65s',
                        '54s',
                        '44', '33', '22',
                    ];
                }
                break;


            case 'CO':
                //BTNからリレイズ
                if (reraise.value === 'BTN') {
                    redHands = [
                        'AA', 'AKs',
                        'AKo', 'KK',
                        'QQ',
                    ];

                    yellowHands = [
                        'ATs',
                        'KJs', 'KTs', 'K9s',
                        'AQo',
                        'JJ',
                        'TT',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'A9s', 'A8s', 'A7s', 'A5s', 'A4s', 'A3s',
                        'KQs', 'KJs', 'KTs', 'K6s',
                        'KQo', 'QJs', 'QTs',
                        'JTs', 'J9s',
                        'T9s', 'T8s',
                        '99',
                        '88', '87s',
                        '77', '76s',
                        '66', '65s',
                        '55', '54s',
                        '44', '33', '22',
                    ];
                }
                //SBからリレイズ
                if (reraise.value === 'SB') {
                    redHands = [
                        'AA', 'AKs',
                        'KK',
                    ];

                    yellowHands = [
                        'AQo', 'QQ',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A5s', 'A4s', 'A3s',
                        'AKo', 'KQs', 'KJs', 'KTs', 'K9s',
                        'QJs', 'QTs',
                        'JJ', 'JTs', 'J9s',
                        'TT', 'T9s', 'T8s',
                        '99',
                        '88',
                        '77', '76s',
                        '66', '65s',
                        '54s',
                        '33',
                        '22',
                    ];
                }
                //BBからリレイズ
                if (reraise.value === 'BB') {
                    redHands = [
                        'AA', 'AKs',
                        'KK',
                    ];

                    yellowHands = [
                        'AKo', 'AQo', 'QQ', 'A9s',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'ATs', 'A8s', 'A5s', 'A4s', 'A3s',
                        'KQs', 'KJs', 'KTs', 'K9s', 'K6s',
                        'KQo', 'QJs', 'QTs',
                        'JJ', 'JTs', 'J9s',
                        'TT', 'T9s',
                        '99',
                        '88',
                        '77', '76s',
                        '66', '65s',
                        '54s',
                    ];
                }
                break;


            case 'BTN':
                //SBからリレイズ
                if (reraise.value === 'SB') {
                    redHands = [
                        'AA', 'AKs',
                        'KK',
                    ];

                    yellowHands = [
                        'AKo', 'QQ', 'JJ',
                    ];

                    blueHands = [
                        'ATo',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s',
                        'KQs', 'KJs', 'KTs', 'K9s', 'K6s',
                        'AQo', 'KQo', 'QJs', 'QTs', 'Q9s',
                        'AJo', 'JTs', 'J9s', 'J8s',
                        'TT', 'T9s', 'T8s',
                        '99', '98s', '97s',
                        '88', '87s',
                        '77', '76s',
                        '66', '65s',
                        '55', '54s',
                        '44',
                        '33',
                        '22',
                    ];
                }
                //BBからリレイズ
                if (reraise.value === 'BB') {
                    redHands = [
                        'AA', 'AKs',
                        'AKo', 'KK',
                    ];

                    yellowHands = [
                        'QQ', 'JJ', 'A6s',
                    ];

                    blueHands = [
                        'ATo',
                    ];

                    greenHands = [
                        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A5s', 'A4s', 'A3s',
                        'KQs', 'KJs', 'KTs', 'K9s', 'K6s',
                        'AQo', 'KQo', 'QJs', 'QTs', 'Q9s',
                        'AJo', 'KJo', 'JTs', 'J9s',
                        'TT', 'T9s', 'T8s',
                        '99', '98s',
                        '88', '87s',
                        '77', '76s',
                        '66', '65s',
                        '55', '54s',
                        '44',
                    ];
                }
                break;


            case 'SB':
                //BBからリレイズ
                if (reraise.value === 'BB') {
                    redHands = [
                        'AA', 'AKs', 'AQs',
                        'AKo', 'KK',
                        'QQ',
                        'JJ',
                        'TT',
                    ];

                    yellowHands = [
                        'A6s', 'A4s', 'A3s', 'A2s',
                        'K7s',
                        'AQo', 'KQo',
                        'AJo', 'KJo',
                        'ATo',
                    ];

                    blueHands = [
                        'K5s',
                    ];

                    greenHands = [
                        'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A5s',
                        'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K6s',
                        'QJs', 'QTs', 'Q9s', 'Q8s',
                        'JTs', 'J9s', 'J8s',
                        'T9s', 'T8s',
                        '99', '98s', '97s',
                        '88', '87s',
                        '77', '76s',
                        '66', '65s',
                        '55', '54s',
                        '44',
                        '33',
                        '22',
                    ];
                }
                break;
        }
    } else {
        //コールレンジ  
        if (open) {
            switch (position) {
                case 'UTG':
                    if (open.value === 'UTG') {
                        // 赤色にしたいハンド
                        redHands = [
                            'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s',
                            'A3s',
                            'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s',
                            'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s',
                            'AJo', 'JJ', 'JTs', 'J9s',
                            'TT', 'T9s', 'T8s',
                            '99', '88', '77', '66', '55',
                        ];
                        // 青色にしたいハンド
                        blueHands = [
                            'A2s', 'KJo', 'ATo', '98s', '65s', '44',
                        ];
                    }

                    break;


                case 'HJ':
                    //UTGがオープンした時のコールレンジ
                    if (open.value === 'UTG') {
                        redHands = [
                            'AA', 'AKs',
                            'KK',
                        ];

                        yellowHands = [
                            'AQs', 'AJs', 'ATs', 'A9s', 'A5s', 'A4s',
                            'AKo', 'KQs', 'KJs', 'KTs',
                            'AQo', 'QQ', 'QJs', 'QTs',
                            'JJ', 'JTs',
                            'TT', 'T9s',
                            '99',
                            '88',
                            '77',
                            '65s',
                            '54s',
                        ];

                        blueHands = [
                            'A8s',
                        ];

                        greenHands = [
                            '66',
                        ];
                    };

                    if (open.value === 'HJ') {
                        // 赤色にしたいハンド
                        redHands = [
                            'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s',
                            'A3s', 'A2s',
                            'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
                            'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s',
                            'AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s',
                            'ATo', 'TT', 'T9s', 'T8s',
                            '99', '98s',
                            '88',
                            '77',
                            '66', '65s',
                            '55',
                            '44',
                        ];
                        // 青色にしたいハンド
                        blueHands = [
                            'Q8s', 'J8s', 'KTo', 'QTo', 'JTo', '97s', '87s', '76s', '33',
                        ];
                    }
                    break;


                case 'CO':
                    //UTGがオープンした時のコールレンジ
                    if (open.value === 'UTG') {
                        redHands = [
                            'AA', 'AKs',
                            'KK',
                        ];

                        yellowHands = [
                            'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A5s', 'A4s', 'A3s',
                            'AKo', 'KQs', 'KJs', 'KTs', 'K9s',
                            'AQo', 'QQ', 'QJs', 'QTs',
                            'JJ',
                            'TT', 'T9s',
                            '65s',
                            '54s',
                        ];

                        blueHands = [
                            'A7s', 'KQo', '87s', '76s',
                        ];

                        greenHands = [
                            'JTs', '99', '88', '77', '66', '55',
                        ];
                    }
                    //HJがオープンした時のコールレンジ   
                    if (open.value === 'HJ') {
                        redHands = [
                            'AA', 'AKs', 'A3s', 'KK',
                        ];

                        yellowHands = [
                            'AQs', 'ATs', 'A9s', 'A8s', 'A7s', 'A5s', 'A4s',
                            'AKo', 'KQs', 'KJs', 'KTs', 'K9s',
                            'AQo', 'KQo', 'QQ', 'QJs', 'QTs',
                            'JJ', 'JTs',
                            'TT', 'T9s',
                            '99',

                        ];

                        greenHands = [
                            'AJs', '88', '77', '66', '65s', '55', '54s',
                        ];
                    }
                    if (open.value === 'CO') {
                        // 赤色にしたいハンド
                        redHands = [
                            'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
                            'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s',
                            'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
                            'AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s',
                            'ATo', 'TT', 'T9s', 'T8s', 'T7s',
                            'A9o', '99', '98s', '97s',
                            '88', '87s', '86s',
                            '77', '76s',
                            '66', '65s',
                            '55', '54s',
                            '44',
                            '33',
                            '22',
                        ];
                        // 青色にしたいハンド
                        blueHands = [
                            'Q5s', 'J7s', 'A8o',
                        ];
                    }

                    break;

                case 'BTN':
                    //UTGがレイズしたときのコールレンジ
                    if (open.value === 'UTG') {
                        redHands = [
                            'AA', 'AKs', 'KK',
                        ];

                        yellowHands = [
                            'AQs', 'ATs', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s',
                            'AKo', 'K9s',
                            'KQo', 'QQ', 'QJs',
                            'J9s',
                            'TT', 'T9s', 'T8s',
                            '87s', '76s',
                            '65s',
                            '54s',
                        ];

                        blueHands = [

                        ];

                        greenHands = [
                            'AJs', 'A9s', 'A8s',
                            'KQs', 'KJs', 'KTs',
                            'AQo', 'QTs',
                            'JJ', 'JTs', 'J9s',
                            '99', '98s',
                            '88',
                            '77',
                            '66',
                            '55',
                            '44',
                            '33',
                        ];
                    }
                    //HJがレイズしたときのコールレンジ
                    if (open.value === 'HJ') {
                        redHands = [
                            'AA', 'AKs', 'KK',
                        ];

                        yellowHands = [
                            'AQs', 'A7s', 'A6s', 'A5s', 'A3s', 'A2s',
                            'AKo', 'KJs', 'K9s', 'K8s',
                            'KQo', 'QQ', 'QJs', 'Q9s',
                            'AJo', 'JJ', 'J9s',
                            'TT', 'T9s', 'T8s',
                            '87s', '76s',
                            '65s',
                            '54s',
                        ];

                        blueHands = [
                            'K7s',
                        ];

                        greenHands = [
                            'AJs', 'ATs', 'A9s', 'A8s', 'A4s',
                            'KQs', 'KJs', 'KTs',
                            'AQo', 'QTs',
                            'JTs', 'J9s',
                            '99', '98s',
                            '88',
                            '77',
                            '66',
                            '55',
                            '44',
                            '33',
                            '22',
                        ];
                    }
                    //COがレイズしたときのコールレンジ
                    if (open.value === 'CO') {
                        redHands = [
                            'AA', 'AKs',
                            'AKo', 'KK',
                            'QQ',
                        ];

                        yellowHands = [
                            'AQs', 'A9s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
                            'KJs', 'K9s', 'K8s', 'K7s',
                            'AQo', 'KQo', 'QJs', 'Q9s',
                            'AJo', 'KJo', 'JJ', 'JTs', 'J9s',
                            'ATo', 'TT', 'T9s', 'T8s',
                            '99', '97s',
                            '87s',
                            '76s',
                            '65s',
                            '54s',
                        ];

                        blueHands = [
                            'K5s', 'Q8s',
                        ];

                        greenHands = [
                            'AJs', 'ATs', 'A8s',
                            'KQs', 'KTs',
                            'QTs',
                            '98s',
                            '88',
                            '77',
                            '66',
                            '55',
                            '44',
                            '33',
                            '22',
                        ];
                    }
                    //BTNのレイズレンジ
                    if (open.value === 'BTN') {
                        // 赤色にしたいハンド
                        redHands = [
                            'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
                            'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
                            'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
                            'AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s',
                            'ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s',
                            'A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s',
                            'A8o', 'K8o', 'T8o', '98o', '88', '87s', '86s', '85s',
                            'A7o', '77', '76s', '75s',
                            'A6o', '66', '65s', '64s',
                            'A5o', '55', '54s', '53s',
                            'A4o', '44',
                            '33',
                            '22',
                        ];
                    }
                    break;

                case 'SB':
                    //UTGがオープンした時のコールレンジ
                    if (open.value === 'UTG') {
                        redHands = [
                            'AA', 'AKs', 'AQs',
                            'KK', 'KQs',
                            'QQ',
                        ];

                        yellowHands = [
                            'AJs', 'ATs', 'A5s', 'A4s',
                            'AKo', 'KJs', 'KTs',
                            'QJs', 'QTs',
                            'JJ', 'JTs',
                            'T9s',
                            '65s',
                        ];

                        greenHands = [
                            'A9s', 'A8s', 'A7s',
                            'K9s',
                            'AQo',
                            'TT',
                            '99',
                            '88',
                            '77',
                            '66',
                            '55',
                        ];
                    }
                    //HJがオープンした時のコールレンジ
                    if (open.value === 'HJ') {
                        redHands = [
                            'AA', 'AKs', 'AQs', 'A5s',
                            'AKo', 'KK', 'KQs',
                            'QQ', 'QJs',
                        ];

                        yellowHands = [
                            'AJs', 'ATs', 'A4s', 'A3s',
                            'KJs', 'KTs',
                            'AQo', 'QTs',
                            'JJ', 'JTs',
                            'TT', 'T9s',
                            '65s',
                            '54s',
                        ];

                        greenHands = [
                            'A9s', 'A8s', 'A7s', 'A6s',
                            'K9s', 'KQo',
                            'J9s',
                            '99',
                            '88',
                            '77',
                            '66',
                            '55',
                            '44',
                        ];
                    }

                    //COがオープンした時のコールレンジ
                    if (open.value === 'CO') {
                        redHands = [
                            'AA', 'AKs', 'AQs', 'AJs', 'A5s',
                            'AKo', 'KK', 'KQs', 'KJs',
                            'QQ', 'QJs',
                            'JJ',
                        ];

                        yellowHands = [
                            'A4s',
                            'KQo', 'KTs', 'K9s',
                            'AQo', 'QTs', 'Q9s',
                            'JTs', 'J9s',
                            'TT', 'T9s',
                            '99',
                            '88', '87s',
                            '65s',
                            '54s',
                        ];

                        greenHands = [
                            'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A3s',
                            'AJo',
                            '98s',
                            '77',
                            '66',
                            '55',
                            '44',
                        ];
                    }

                    //BTNがオープンした時のコールレンジ
                    if (open.value === 'BTN') {
                        redHands = [
                            'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A5s',
                            'AKo', 'KK', 'KQs', 'KJs', 'KTs',
                            'KQo', 'QQ', 'QJs', 'QTs',
                            'JJ', 'JTs',
                            'T9s',
                        ];

                        yellowHands = [
                            'A7s', 'A4s', 'A3s',
                            'K9s', 'K7s',
                            'AQo',
                            'AJo', 'KJo', 'JTs', 'J9s', 'J8s',
                            'ATo', 'TT', 'T8s',
                            '99', '98s',
                            '88', '87s',
                            '77', '76s',
                            '66', '65s',
                        ];

                        greenHands = [
                            'A9s', 'A8s', 'A6s', 'A2s',
                            'K8s',
                            'QJo', 'Q9s',
                            'AJo',
                            '98s',
                            '77',
                            '66',
                            '55',
                            '44',
                            '33',
                            '22',
                        ];
                    }
                    //SBのレイズレンジ
                    if (open.value === 'SB') {
                        // 赤色にしたいハンド
                        redHands = [
                            'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s',
                            'KQs', 'KJs', 'KTs',
                            'QJs',
                            'JTs',
                            'T5s',
                        ];
                        // 黄色にしたいハンド
                        yellowHands = [
                            'AA', 'A7s', 'A5s',
                            'AKo', 'KK', 'K9s', 'K3s', 'K2s',
                            'AQo', 'KQo', 'QQ', 'QTs', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
                            'JJ', 'J7s', 'J6s', 'J5s', 'J4s', 'J2s',
                            'TT', 'T9s', 'T6s',
                            'A9o', 'K9o', 'Q9o', 'J9o', '99', '97s', '96s', '95s',
                            'A8o', 'K8o', 'T8o', '98o', '88', '85s',
                            'A7o', '87o', '77', '76s', '75s', '74s',
                            '66', '65s',
                            'A5o', '55', '54s',
                            'A4o', '43s',
                        ];
                        //緑
                        greenHands = [
                            'A6s', 'A4s', 'A3s', 'A2s',
                            'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
                            'QJs', 'Q9s', 'Q8s', 'Q7s',
                            'AJo', 'KJo', 'QJo', 'J9s', 'J8s', 'J7s', 'J4s', 'J3s', 'J2s',
                            'ATo', 'KTo', 'QTo', 'JTo', 'T8s', 'T7s', 'T4s', 'T3s', 'T2s',
                            'T9o', '98s', '94s', '93s', '92s',
                            'Q8o', 'J8o', '87s', '86s', '85s', '84s',
                            'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '73s',
                            'A6o', 'K6o', 'Q6o', '86o', '76o', '64s', '63s',
                            'K5o', 'Q5o', '65o', '53s', '52s',
                            'K4o', '54o', '44', '42s',
                            'A3o', 'K3o', '33',
                            'A2o', '22',
                        ];
                    }

                    break;

                case 'BB':
                    //UTGがオープンした時のコールレンジ
                    if (open.value === 'UTG') {
                        redHands = [
                            'AA', 'AKs', 'AQs',
                            'KK',
                            'QQ',
                        ];

                        yellowHands = [
                            'AJs', 'A4s',
                            'AKo', 'KQs', 'KJs', 'K5s',
                            'QJs',
                            '76s',
                            '65s',
                        ];

                        greenHands = [
                            'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A3s', 'A2s',
                            'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K4s', 'K3s', 'K2s',
                            'AQo', 'KQo', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s',
                            'AJo', 'KJo', 'JJ', 'JTs', 'J9s', 'J8s',
                            'ATo', 'TT', 'T9s', 'T8s', 'T7s',
                            '99', '98s', '97s', '96s',
                            '88', '87s', '86s', '85s',
                            '77', '75s',
                            '66', '64s',
                            '55', '54s', '53s',
                            '44', '43s',
                            '33',
                            '22',
                        ];

                    }
                    //HJがオープンした時のコールレンジ
                    if (open.value === 'HJ') {
                        greenHands = [
                            'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A4s', 'A3s', 'A2s',
                            'KTs', 'K9s', 'K8s', 'K3s', 'K2s',
                            'AQo', 'KQo', 'QJo', 'Q7s', 'Q6s', 'Q5s',
                            'AJo', 'KJo', 'JTs', 'J9s', 'J8s',
                            'ATo', 'TT', 'T9s', 'T8s', 'T7s',
                            '99', '98s', '97s', '96s',
                            '88', '86s', '85s',
                            '77', '75s',
                            '66', '64s',
                            '55', '54s', '53s',
                            '44', '43s',
                            '33',
                            '22',
                        ];

                        yellowHands = [
                            'A5s',
                            'KJs', 'K7s', 'K6s', 'K5s', 'K4s',
                            'QTs', 'Q9s', 'Q8s',
                            'JJ',
                            '87s',
                            '76s',
                            '65s',
                        ];

                        redHands = [
                            'AA', 'AKs', 'AQs',
                            'AKo', 'KK', 'KQs',
                            'QQ', 'QJs',
                        ];

                    }
                    //COがオープンした時のコールレンジ
                    if (open.value === 'CO') {
                        greenHands = [
                            'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A4s', 'A3s', 'A2s',
                            'K9s', 'K8s', 'K7s', 'K5s', 'K4s', 'K3s', 'K2s',
                            'KQo', 'QJo', 'Q9s', 'Q7s', 'Q4s', 'Q3s',
                            'J8s', 'J7s', 'J6s',
                            'ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s',
                            'A9o', '99', '98s', '97s', '96s',
                            '88', '87s', '86s', '85s',
                            '77', '76s', '75s', '74s',
                            '66', '64s', '63s',
                            '55', '54s', '53s',
                            '44', '43s',
                            '33',
                            '22',
                        ];

                        yellowHands = [
                            'AJs',
                            'KQs', 'KJs', 'KTs', 'K6s',
                            'AQo', 'QJs', 'QTs', 'Q8s', 'Q6s', 'Q5s',
                            'AJo', 'KJo', 'J9s',
                            '65s',
                        ];

                        redHands = [
                            'AA', 'AKs', 'AQs', 'A5s',
                            'AKo', 'KK',
                            'QQ',
                            'JJ', 'JTs',
                        ];

                    }
                    //BTNがオープンした時のコールレンジ
                    if (open.value === 'BTN') {
                        greenHands = [
                            'A9s', 'A8s', 'A7s', 'A6s', 'A3s', 'A2s',
                            'K9s', 'K8s', 'K7s', 'K5s', 'K4s', 'K3s', 'K2s',
                            'QJo', 'Q9s', 'Q7s', 'Q4s', 'Q3s', 'Q2s',
                            'J8s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
                            'ATo', 'JTo', 'T5s',
                            'A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '97s', '96s',
                            'A8o', '86s', '85s',
                            '77', '75s', '74s',
                            '66', '64s', '63s',
                            'A5o', '55', '53s', '52s',
                            '44', '43s', '42s',
                            '33',
                            '22',
                        ];

                        yellowHands = [
                            'ATs', 'A4s',
                            'KQo', 'KJs', 'KTs', 'K6s',
                            'QJs', 'QTs', 'Q8s', 'Q6s', 'Q5s',
                            'AJo', 'KJo', 'J7s',
                            'KTo', 'QTo', 'T8s', 'T7s', 'T6s',
                            '98s',
                            '88', '87s',
                            'A7o', '76s',
                            '65s',
                            '54s',
                        ];

                        redHands = [
                            'AA', 'AKs', 'AQs', 'AJs', 'A5s',
                            'AKo', 'KK', 'KQs',
                            'AQo', 'QQ',
                            'JJ', 'JTs', 'J9s',
                            'TT', 'T9s',
                            '99',
                        ];
                    }
                    //SBがオープンした時のコールレンジ
                    if (open.value === 'SB') {
                        greenHands = [
                            'A9s', 'A8s', 'A6s', 'A2s',
                            'KQo', 'K8s', 'K7s', 'K5s', 'K4s', 'K3s', 'K2s',
                            'QJs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
                            'KJo', 'QJo', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
                            'ATo', 'KTo', 'QTo', 'JTo', 'T7s', 'T6s', 'T5s',
                            'A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '97s', '96s', '95s', '94s',
                            'A8o', 'K8o', 'T8o', '98o', '88', '86s', '85s', '84s',
                            'A7o', '87o', '77', '75s', '74s', '73s',
                            '76o', '66', '64s', '63s',
                            'A5o', '55', '53s', '52s',
                            'A4o', '44', '43s', '42s',
                            '33', '32s',
                            '22',
                        ];

                        yellowHands = [
                            'ATs', 'A7s', 'A3s',
                            'KJs', 'KTs', 'K9s', 'K6s',
                            'QTs',
                            'AJo', 'JTs', 'J9s',
                            'T8s', 'T4s', 'T3s', 'T2s',
                            '99',
                            'Q8o', 'J8o',
                            'K7o',
                            'A6o', 'K6o', '65s',
                            'A3o',
                        ];

                        redHands = [
                            'AA', 'AKs', 'AQs', 'AJs', 'A5s', 'A4s',
                            'AKo', 'KK', 'KQs',
                            'AQo', 'QQ',
                            'JJ',
                            'TT', 'T9s',
                            '98s',
                            '87s',
                            '76s',
                            '54s',
                            'A2o',
                        ];

                    }
                    break;
            }

        } else {
            //レイズレンジ                
            switch (position) {
                case 'UTG':
                    // 赤色にしたいハンド
                    redHands = [
                        'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s',
                        'A3s',
                        'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s',
                        'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s',
                        'AJo', 'JJ', 'JTs', 'J9s',
                        'TT', 'T9s', 'T8s',
                        '99', '88', '77', '66', '55',
                    ];
                    // 青色にしたいハンド
                    blueHands = [
                        'A2s', 'KJo', 'ATo', '98s', '65s', '44',
                    ];
                    break;


                case 'HJ':


                    // 赤色にしたいハンド
                    redHands = [
                        'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s',
                        'A3s', 'A2s',
                        'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
                        'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s',
                        'AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s',
                        'ATo', 'TT', 'T9s', 'T8s',
                        '99', '98s',
                        '88',
                        '77',
                        '66', '65s',
                        '55',
                        '44',
                    ];
                    // 青色にしたいハンド
                    blueHands = [
                        'Q8s', 'J8s', 'KTo', 'QTo', 'JTo', '97s', '87s', '76s', '33',
                    ];



                    break;


                case 'CO':
                    // 赤色にしたいハンド
                    redHands = [
                        'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
                        'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s',
                        'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
                        'AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s',
                        'ATo', 'TT', 'T9s', 'T8s', 'T7s',
                        'A9o', '99', '98s', '97s',
                        '88', '87s', '86s',
                        '77', '76s',
                        '66', '65s',
                        '55', '54s',
                        '44',
                        '33',
                        '22',
                    ];
                    // 青色にしたいハンド
                    blueHands = [
                        'Q5s', 'J7s', 'A8o',
                    ];
                    break;


                case 'BTN':
                    // 赤色にしたいハンド
                    redHands = [
                        'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
                        'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
                        'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
                        'AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s',
                        'ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s',
                        'A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s',
                        'A8o', 'K8o', 'T8o', '98o', '88', '87s', '86s', '85s',
                        'A7o', '77', '76s', '75s',
                        'A6o', '66', '65s', '64s',
                        'A5o', '55', '54s', '53s',
                        'A4o', '44',
                        '33',
                        '22',
                    ];

                    break;


                case 'SB':
                    // 赤色にしたいハンド
                    redHands = [
                        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s',
                        'KQs', 'KJs', 'KTs',
                        'QJs',
                        'JTs',
                        'T5s',
                    ];
                    // 黄色にしたいハンド
                    yellowHands = [
                        'AA', 'A7s', 'A5s',
                        'AKo', 'KK', 'K9s', 'K3s', 'K2s',
                        'AQo', 'KQo', 'QQ', 'QTs', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
                        'JJ', 'J7s', 'J6s', 'J5s', 'J4s', 'J2s',
                        'TT', 'T9s', 'T6s',
                        'A9o', 'K9o', 'Q9o', 'J9o', '99', '97s', '96s', '95s',
                        'A8o', 'K8o', 'T8o', '98o', '88', '85s',
                        'A7o', '87o', '77', '76s', '75s', '74s',
                        '66', '65s',
                        'A5o', '55', '54s',
                        'A4o', '43s',
                    ];
                    //緑
                    greenHands = [
                        'A6s', 'A4s', 'A3s', 'A2s',
                        'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
                        'QJs', 'Q9s', 'Q8s', 'Q7s',
                        'AJo', 'KJo', 'QJo', 'J9s', 'J8s', 'J7s', 'J4s', 'J3s', 'J2s',
                        'ATo', 'KTo', 'QTo', 'JTo', 'T8s', 'T7s', 'T4s', 'T3s', 'T2s',
                        'T9o', '98s', '94s', '93s', '92s',
                        'Q8o', 'J8o', '87s', '86s', '85s', '84s',
                        'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '73s',
                        'A6o', 'K6o', 'Q6o', '86o', '76o', '64s', '63s',
                        'K5o', 'Q5o', '65o', '53s', '52s',
                        'K4o', '54o', '44', '42s',
                        'A3o', 'K3o', '33',
                        'A2o', '22',
                    ];
                    break;


                case 'BB':
                    break;
            }
        }
    }


    // 赤色のハンドに赤色の背景を適用
    redHands.forEach(function (hand) {
        cells.forEach(function (cell) {
            if (cell.textContent === hand) {
                cell.classList.add("highlight-red");
            }
        });
    });

    // 青色のハンドに青色の背景を適用
    blueHands.forEach(function (hand) {
        cells.forEach(function (cell) {
            if (cell.textContent === hand) {
                cell.classList.add("highlight-blue");
            }
        });
    });

    // 黄色のハンドに赤色の背景を適用
    yellowHands.forEach(function (hand) {
        cells.forEach(function (cell) {
            if (cell.textContent === hand) {
                cell.classList.add("highlight-yellow");
            }
        });
    });


    // 緑色のハンドに赤色の背景を適用
    greenHands.forEach(function (hand) {
        cells.forEach(function (cell) {
            if (cell.textContent === hand) {
                cell.classList.add("highlight-green");
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Now Loading の終了処理
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none'; // Hide loading screen
        const welcomeScreen = document.querySelector('.welcome-screen');
        welcomeScreen.style.display = 'flex'; // Show welcome screen
        welcomeScreen.classList.add('fade-in'); // Apply fade-in animation

        // Welcome Screen 終了後にメインコンテンツを表示
        setTimeout(() => {
            welcomeScreen.style.display = 'none'; // Hide welcome screen
            const mainContent = document.querySelector('.main-content');
            mainContent.style.display = 'block'; // Show main content
        }, 3000); // Welcome screen lasts for 3 seconds
    }, 3000); // Loading screen lasts for 5 seconds
});

function toggleColorLegend() {
    const legend = document.getElementById('colorLegend');
    if (legend.style.display === 'none') {
        legend.style.display = 'block';
    } else {
        legend.style.display = 'none';
    }
}

function calculateFormula1() {
    const x = parseFloat(document.getElementById("x1").value);
    const y = parseFloat(document.getElementById("y1").value);
    if (isNaN(x) || isNaN(y) || y === 0) {
        document.getElementById("result1").textContent = "正しい値を入力してください。";
        return;
    }
    const result = (x / (x + (x+y))) * 100;
    document.getElementById("result1").textContent = `結果: ${result.toFixed(2)}%`;
}

function calculateFormula2() {
    const x = parseFloat(document.getElementById("x2").value);
    const z = parseFloat(document.getElementById("z2").value);
    if (isNaN(x) || isNaN(z) || z === 0) {
        document.getElementById("result2").textContent = "正しい値を入力してください。";
        return;
    }
    const result = (x / (x + z)) * 100;
    document.getElementById("result2").textContent = `結果: ${result.toFixed(2)}%`;
}

function resetForm1() {
    document.getElementById("x1").value = "";
    document.getElementById("y1").value = "";
    document.getElementById("result1").textContent = "";
}

function resetForm2() {
    document.getElementById("x2").value = "";
    document.getElementById("z2").value = "";
    document.getElementById("result2").textContent = "";
}
