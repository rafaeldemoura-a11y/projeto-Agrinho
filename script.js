const challenges = [
    {
        title: "Nutrição de Plantas",
        desc: "Sua plantação de milho está com deficiência de nitrogênio. O que você faz?",
        optA: "Aplicar Ureia Química (Ação rápida, mas pode contaminar lençóis freáticos).",
        optB: "Plantar Leguminosas / Fixação Biológica (Lento, mas recupera o solo naturalmente).",
        impactA: { soil: -15, prod: 20, feedback: "A produção subiu rápido, mas a microbiota do solo sofreu com a química!" },
        impactB: { soil: 20, prod: 5, feedback: "Excelente! As bactérias Rhizobium estão trabalhando para você. Solo fértil para o futuro!" }
    },
    {
        title: "Combate a Pragas",
        desc: "Apareceram lagartas na sua lavoura de soja!",
        optA: "Pulverizar inseticida pesado (Mata tudo, inclusive abelhas).",
        optB: "Usar Inimigos Naturais / Biodefensivos (Equilíbrio biológico).",
        impactA: { soil: -20, prod: 15, feedback: "Pragas eliminadas, mas os polinizadores sumiram. Isso prejudica as próximas safras." },
        impactB: { soil: 15, prod: 10, feedback: "Controle eficiente! A natureza está em equilíbrio na sua fazenda." }
    },
    {
        title: "Manejo da Água",
        desc: "O solo está ficando seco demais e começando a erodir.",
        optA: "Construir apenas canais de escoamento rápido.",
        optB: "Fazer Plantio Direto e Curvas de Nível (Mantém a umidade e a palhada).",
        impactA: { soil: -10, prod: 5, feedback: "A água correu rápido e levou embora a camada fértil do seu solo." },
        impactB: { soil: 25, prod: 15, feedback: "Incrível! A palhada protege o solo como um escudo. Você economiza água!" }
    }
];

let currentStep = 0;
let soilStat = 50;
let prodStat = 50;

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function loadChallenge() {
    if (currentStep >= challenges.length) {
        finishGame();
        return;
    }
    const c = challenges[currentStep];
    document.getElementById('question-title').innerText = c.title;
    document.getElementById('question-desc').innerText = c.desc;
    document.getElementById('opt-a').innerText = c.optA;
    document.getElementById('opt-b').innerText = c.optB;
    document.getElementById('game-card').classList.remove('hidden');
    document.getElementById('feedback').classList.add('hidden');
}

function makeDecision(choice) {
    const c = challenges[currentStep];
    const impact = (choice === 'A') ? c.impactA : c.impactB;
    
    soilStat = Math.min(100, Math.max(0, soilStat + impact.soil));
    prodStat = Math.min(100, Math.max(0, prodStat + impact.prod));
    
    updateBars();
    
    document.getElementById('game-card').classList.add('hidden');
    document.getElementById('feedback').classList.remove('hidden');
    document.getElementById('feedback-text').innerText = impact.feedback;
}

function updateBars() {
    document.getElementById('soil-bar').style.width = soilStat + '%';
    document.getElementById('prod-bar').style.width = prodStat + '%';
}

function nextQuestion() {
    currentStep++;
    loadChallenge();
}

function finishGame() {
    let medal = "🥉 Bronze";
    if (soilStat > 70 && prodStat > 70) {
        medal = "🥇 Ouro: Guardião Mestre";
    } else if (soilStat > 50 && prodStat > 50) {
        medal = "🥈 Prata: Bom Manejo";
    }
    
    document.getElementById('simulador').innerHTML = `
        <div class="card" style="text-align:center">
            <h1>Simulação Concluída!</h1>
            <p>Seu resultado final como produtor:</p>
            <div class="stats-container">
                <div class="stat-box">Solo: ${soilStat}%</div>
                <div class="stat-box">Produção: ${prodStat}%</div>
            </div>
            <h2>Sua Medalha: ${medal}</h2>
            <button class="btn" onclick="location.reload()">Jogar Novamente</button>
        </div>
    `;
}

// Iniciar
loadChallenge();
