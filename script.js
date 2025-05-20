const oto = {
    intoro: new Audio("音/イントロ.mp3"),
    tekisuto: new Audio("音/テキスト.mp3"),
    yoi: new Audio("音/良い.mp3"),
    machigai: new Audio("音/間違い.mp3"),
    ushinau: new Audio("音/失う.mp3"),
    katsu: new Audio("音/勝つ.mp3")
};

Object.values(oto).forEach(otoOnsei => {
    otoOnsei.load();
});

function saiseiSuru(otoOnsei) {
    otoOnsei.pause();
    otoOnsei.currentTime = 0;
    otoOnsei.play();
}

function matsu(ms) {
    return new Promise(kaiketsu => setTimeout(kaiketsu, ms));
}

async function pureiGemu() {
    botanRisunaaSettei();
    const sentakushi = ["グー 🪨", "パー 📄", "チョキ ✂️"];
    let senshuSukoa = 0;
    let konpyuutaSukoa = 0;
    const gemuEremento = document.getElementById("gemu");
    
    async function insatsuGyou(text, delay = 300) {
        saiseiSuru(oto.tekisuto);
        gemuEremento.textContent += text + "\n";
        gemuEremento.scrollTop = gemuEremento.scrollHeight;
        await matsu(delay);
    }
    
    function botanRisunaaSettei() {
        const botan = document.querySelectorAll(".sentakushi");
        botan.forEach(botan => {
            botan.replaceWith(botan.cloneNode(true));
        });
        document.querySelectorAll(".sentakushi").forEach(botan => {
            botan.addEventListener("click", () => {
                if (nyuuryokuKaisetsu) {
                    const kachi = Number(botan.dataset.value);
                    nyuuryokuKaisetsu(kachi);
                    nyuuryokuKaisetsu = null;
                }
            });
        });
    }
    
    function pureiyaaNyuuryoku() {
        return new Promise(kaiketsu => {
            nyuuryokuKaisetsu = kaiketsu;
        });
    }
    
    await matsu(1000);
    await insatsuGyou("================================");
    await insatsuGyou("じゃんけん");
    await insatsuGyou("================================");
    
    while (true) {
        await insatsuGyou("| " + senshuSukoa + " - " + konpyuutaSukoa + " |");
            const senshuSentaku = await pureiyaaNyuuryoku();
            const konpyuutaSentaku = Math.floor(Math.random() * 3);
        await insatsuGyou(" > 選手が選んだ：    " + sentakushi[senshuSentaku], 350);
        await insatsuGyou(" > コンピュータ選んだ:  " + sentakushi[konpyuutaSentaku], 350);
        
        if (senshuSentaku === konpyuutaSentaku) {
            await matsu(800);
            await insatsuGyou("| あいこ! 🤝 |", 400);
            await insatsuGyou("");
        } else if (
            (senshuSentaku === 0 && konpyuutaSentaku === 1) ||
            (senshuSentaku === 1 && konpyuutaSentaku === 2) ||
            (senshuSentaku === 2 && konpyuutaSentaku === 0)
        ) {
            konpyuutaSukoa++;
            await matsu(800);
                saiseiSuru(oto.machigai);
            await insatsuGyou("| +1 コンピュー 🤖 |", 500);
            await insatsuGyou("");
            if (konpyuutaSukoa === 5) {
                await matsu(600);
                await insatsuGyou("| " + senshuSukoa + " - " + konpyuutaSukoa + " |", 200);
                    saiseiSuru(oto.ushinau);
                await insatsuGyou("コンピューターが勝った！ 🤖 ", 700);
                break;
            }
        } else {
            senshuSukoa++;
            await matsu(800);
                saiseiSuru(oto.yoi);
            await insatsuGyou("| +1 選手 👤 |", 500);
            await insatsuGyou("");
            if (senshuSukoa === 5) {
                await matsu(600);
                await insatsuGyou("| " + senshuSukoa + " - " + konpyuutaSukoa + " |", 200);
                    saiseiSuru(oto.katsu);
                await insatsuGyou("選手が勝った！ 👤 ", 700);
                break;
            }
        }
    await matsu(700);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const sutatoBotan = document.getElementById("sutato-botan");
    sutatoBotan.addEventListener("click", async () => {
        document.getElementById("sutato-gamen").style.display = "none";
        saiseiSuru(oto.intoro);
        await pureiGemu();
    });
});
