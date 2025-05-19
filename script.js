const oto = {
    tekisuto: new Audio("音/テキスト.mp3"),
    machigai: new Audio("音/間違い.mp3"),
    yoi: new Audio("音/良い.mp3"),
    ushinau: new Audio("音/失う.mp3"),
    katsu: new Audio("音/勝つ.mp3"),
    intoro: new Audio("音/イントロ.mp3")
};

Object.values(oto).forEach(audio => {
    audio.load();
});

function playSound(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

function matsu(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function pureiGemu() {
    setupButtonListeners();
    const sentakushi = ["グー 🪨", "パー 📄", "チョキ ✂️"];
        let senshuSukoa = 0;
        let konpyuutaSukoa = 0;
    const gemuEremento = document.getElementById("gemu");

    async function printLine(text, delay = 400) {
        playSound(oto.tekisuto);
        gemuEremento.textContent += text + "\n";
        gemuEremento.scrollTop = gemuEremento.scrollHeight;
        await matsu(delay);
    }
    
    function setupButtonListeners() {
        const buttons = document.querySelectorAll(".sentakushi-botan");
        buttons.forEach(button => {
            button.replaceWith(button.cloneNode(true)); // Remove previous listeners
        });
        document.querySelectorAll(".sentakushi-botan").forEach(button => {
            button.addEventListener("click", () => {
                if (inputResolve) {
                    const val = Number(button.dataset.value);
                    inputResolve(val);
                    inputResolve = null;
                }
            });
        });
    }
    
    function getPlayerInput() {
        return new Promise(resolve => {
            inputResolve = resolve;
        });
    }
    
    await matsu(1000);
    await printLine("================================", 300);
    await printLine("じゃんけん", 400);
    await printLine("================================", 400);
    await matsu(500);

    while (true) {
        await printLine("| " + senshuSukoa + " - " + konpyuutaSukoa + " |", 100);
            const senshu = await getPlayerInput();
            const konpyuuta = Math.floor(Math.random() * 3);
        await printLine(" > 選手が選んだ：    " + sentakushi[senshu], 350);
        await printLine(" > コンピュータ選んだ:  " + sentakushi[konpyuuta], 350);

        if (senshu === konpyuuta) {
            await matsu(800);
            await printLine("| あいこ! 🤝 |", 400);
            await printLine("", 200);
        } else if (
            (senshu === 0 && konpyuuta === 1) ||
            (senshu === 1 && konpyuuta === 2) ||
            (senshu === 2 && konpyuuta === 0)
        ) {
            konpyuutaSukoa++;
            await matsu(800);
                playSound(oto.machigai);
            await printLine("| +1 コンピュー 🤖 |", 400);
            await printLine("", 200);
            if (konpyuutaSukoa === 5) {
                await matsu(500);
                await printLine("| " + senshuSukoa + " - " + konpyuutaSukoa + " |", 400);
                    playSound(oto.ushinau);
                await printLine("コンピューターが勝った！ 🤖 ", 700);
                break;
            }
        } else {
            senshuSukoa++;
            await matsu(800);
                playSound(oto.yoi);
            await printLine("| +1 選手 👤 |", 400,);
            await printLine("", 200);
            if (senshuSukoa === 5) {
                await matsu(500);
                await printLine("| " + senshuSukoa + " - " + konpyuutaSukoa + " |", 400);
                    playSound(oto.katsu);
                await printLine("選手が勝った！ 👤 ", 700);
                break;
            }
        }
    await matsu(1000);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("sutato-botan");

    startButton.addEventListener("click", async () => {
        document.getElementById("sutato-gamen").style.display = "none";
        playSound(oto.intoro);
        await pureiGemu();
    });
});

