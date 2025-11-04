// Adicionar IDs que faltam (usados nas doenças mas não listados acima)
const symptomIdSet = new Set(SYMPTOMS.map(s=>s.id)); [cite: 119]
function ensureSymptomExists(id, group = 'Outros'){ // Adicionado group default [cite: 120]
  if(!symptomIdSet.has(id)){
    const label = id.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
    SYMPTOMS.push({id:id, label:label, group: group}); // Cria label básico [cite: 121]
    symptomIdSet.add(id);
  } [cite: 122]
}
// Certificar que todos os IDs usados em DISEASES existem em SYMPTOMS
DISEASES.forEach(d => d.sintomas.forEach(s => ensureSymptomExists(s))); [cite: 122]

const conversationEl = document.getElementById('conversation');
const symptomsEl = document.getElementById('symptoms'); [cite: 123]
const resultsEl = document.getElementById('results');
const engineLogEl = document.getElementById('engineLog');
const rawDataEl = document.getElementById('rawData');
const rulesListEl = document.getElementById('rulesList');
const lastSummaryEl = document.getElementById('lastSummary'); [cite: 124]
const priorityLabelEl = document.getElementById('priorityLabel');
const priorityDescEl = document.getElementById('priorityDesc');
const priorityBadgeEl = document.getElementById('priorityBadge');

let selectedSymptoms = {};
let lastTriagem = null; [cite: 125]

// --- ATUALIZADO (EVOLUÇÃO 4 - UI - Acordeão - CORRIGIDO) ---
function renderSymptoms(){
  symptomsEl.innerHTML = '';
  // Limpa a área [cite: 126]

  // 1. Agrupar Sintomas
  const groupedSymptoms = SYMPTOMS.reduce((acc, symptom) => {
    const group = symptom.group || 'Outros';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(symptom);
    return acc;
  }, {});
  // 2. Renderizar Grupos e Sintomas [cite: 127]
  const groupOrder = ['Geral', 'Respiratório / ORL', 'Digestivo', 'Neurológico / Cabeça', 'Pele / Mucosas', 'Urinário / Metabólico', 'Cardiovascular', 'Outros'];
  groupOrder.forEach(groupName => { [cite: 128]
    if (!groupedSymptoms[groupName]) return;

    const header = document.createElement('div');
    header.className = 'symptom-group-header collapsed';
    header.textContent = groupName;
    symptomsEl.appendChild(header);

    const panel = document.createElement('div');
    panel.className = 'symptom-group-panel collapsed';
    symptomsEl.appendChild(panel);

    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      panel.classList.toggle('collapsed');
    });

    groupedSymptoms[groupName].forEach(s => {
      const wrapper = document.createElement('div');
      wrapper.className = 'symptom-wrapper';
    
      wrapper.dataset.symptomId = s.id; [cite: 129]

      const labelEl = document.createElement('div');
      labelEl.className = 'symptom';
      const labelText = document.createElement('span');
      labelText.textContent = s.label;
      labelEl.appendChild(labelText);

      const sliderEl = document.createElement('div');
      sliderEl.className = 'symptom-slider'; [cite: 130]
      sliderEl.style.display = 'none';
      // Recriando o HTML do slider aqui para garantir
      sliderEl.innerHTML = `
        <div class="slider-wrap">
          <div class="slider" style="flex:1">
            <input type="range" min="0" max="10" value="5" data-symptom-id="${s.id}" />
          </div>
          <div style="width:72px; text-align:center">
            <div style="font-weight:700">5</div>
            <div class="small muted">Intensidade</div> [cite: 131]
          </div>
        </div>`;
      wrapper.appendChild(labelEl); [cite: 132]
      wrapper.appendChild(sliderEl);

      const sliderInput = sliderEl.querySelector('input[type=range]');
      const valueEl = sliderEl.querySelector('div[style*="font-weight:700"]');

      const qualifiers = SYMPTOM_QUALIFIERS[s.id];
      let popupEl = null;
      let toggleBtn = null; // Definir toggleBtn aqui [cite: 133]

      if (qualifiers) {
        toggleBtn = document.createElement('span');
        // Atribuir aqui [cite: 134]
        toggleBtn.className = 'qualifier-toggle';
        toggleBtn.textContent = '[+]';
        labelEl.appendChild(toggleBtn);

        popupEl = document.createElement('div');
        popupEl.className = 'qualifier-popup'; [cite: 135]
        popupEl.dataset.popupFor = s.id;

        // *** CORREÇÃO DO TEXTO ESTRANHO ***
        qualifiers.forEach(q => {
          popupEl.innerHTML += `
            <label>
              <input type="checkbox" id="chk_${s.id}_${q.id}" data-qualifier-id="${q.id}" data-parent-symptom="${s.id}"> ${q.label}
            </label>`;
        });
        // *** FIM CORREÇÃO *** [cite: 136]


      wrapper.appendChild(popupEl);
      toggleBtn.addEventListener('click', (event) => { [cite: 137]
          event.stopPropagation();
          const isVisible = popupEl.style.display === 'block';

          // Primeiro, reseta o z-index de TODOS os wrappers para o padrão
          document.querySelectorAll('.symptom-wrapper').forEach(wp => {
              wp.style.zIndex = '1'; // Ou 'auto'
          });

          
          if (isVisible) { [cite: 138]
              // Se estava visível, apenas esconde e reseta z-index local
              popupEl.style.display = 'none';
              toggleBtn.textContent = '[+]';
              wrapper.style.zIndex = '1'; // Ou 'auto'
          } else {
            
            // Se estava escondido: [cite: 139]
              // 1. Esconde QUALQUER outro popup que possa estar aberto
              document.querySelectorAll('.qualifier-popup').forEach(otherPopup => {
                  if (otherPopup !== popupEl) {
                      otherPopup.style.display = 'none';
          
                      // Encontra o botão [+] correspondente e reseta o texto [cite: 140]
                      const otherWrapper = otherPopup.closest('.symptom-wrapper');
                      const otherToggle = otherWrapper ? otherWrapper.querySelector('.qualifier-toggle') : null; [cite: 141]
                      if (otherToggle) {
                          otherToggle.textContent = '[+]';
                      } [cite: 142]
                  }
              });
              // 2. Mostra ESTE popup [cite: 143]
              popupEl.style.display = 'block';
              toggleBtn.textContent = '[-]'; [cite: 144]

              // 3. Aumenta o z-index APENAS deste wrapper
              wrapper.style.zIndex = '100';
              // Valor alto para o wrapper ativo [cite: 145]
          }
      });
      } // Fim do if (qualifiers) [cite: 146]

    // Adiciona position:relative ao wrapper se ainda não tiver (garante contexto)
    if (!wrapper.style.position) {
         wrapper.style.position = 'relative';
         wrapper.style.zIndex = '1'; // Z-index inicial baixo [cite: 147]
    }

      sliderInput.addEventListener('input', ()=>{
          const v = Number(sliderInput.value);
          if (selectedSymptoms[s.id]) {
             selectedSymptoms[s.id].intensity = v;
          }
          valueEl.textContent = v;
      });
      // *** CORREÇÃO DO CLIQUE NO SINTOMA *** [cite: 148]
      labelEl.addEventListener('click', (event)=>{
          // Verifica se o clique foi no botão [+] ou em algo dentro dele
          const clickedToggle = toggleBtn && (event.target === toggleBtn || toggleBtn.contains(event.target));

          if (!clickedToggle) { // Só executa se não clicou no [+]
              const isActive = labelEl.classList.toggle('active');
       
              if(isActive){ [cite: 149]
                  sliderEl.style.display = 'block';
                  const v = Number(sliderInput.value);
                  selectedSymptoms[s.id] = { intensity: v };
                  valueEl.textContent = v;
         
                  if (popupEl) { [cite: 150]
                      popupEl.querySelectorAll('input[type="checkbox"]').forEach(chk => { chk.checked = true; });
                  }
              } else {
                  sliderEl.style.display = 'none';
       
                  delete selectedSymptoms[s.id]; [cite: 151]
                  if (popupEl) {
                      popupEl.style.display = 'none';
                      if(toggleBtn) {toggleBtn.textContent = '[+]';} // Reseta o botão [+] [cite: 152]
                      popupEl.querySelectorAll('input[type="checkbox"]').forEach(chk => { chk.checked = false; });
                  } [cite: 153]
              }
          }
      });
      // *** FIM CORREÇÃO *** [cite: 154]

      panel.appendChild(wrapper);
    });
  });
} [cite: 155]
// --- FIM ATUALIZAÇÃO ---

// render rules list (diseases)
function renderRulesList(){
  rulesListEl.innerHTML = '';
  DISEASES.forEach(d=>{ [cite: 156]
    const div = document.createElement('div');
    div.className = 'rule-row';
    const left = document.createElement('div');
    left.innerHTML = `<strong>${d.nome}</strong><div class="small muted">${d.descricao}</div>`;
    const right = document.createElement('div');
    right.innerHTML = `<span class="badge ${getSeverityBadgeClass(estimateSeverityFromDisease(d))}">${estimateSeverityFromDisease(d).toUpperCase()}</span>`;
    div.appendChild(left);
    div.appendChild(right);
    div.addEventListener('click', ()=> {
      alert(`${d.nome}\n\nSintomas-chave: ${d.sintomas.join(', ')}\n\nPeso dor: ${d.painWeight}\n\nDescrição: ${d.descricao}`);
    });
    rulesListEl.appendChild(div);
  });
} [cite: 157]
function estimateSeverityFromDisease(d){
  if(d.painWeight>=0.85) return 'danger';
  const critical = ['infarto','apse','sepsis','meningite','pneumonia','apendicite'];
  if( /infarto|sepsis|meningite|pneumonia|apendicite/i.test(d.id) ) return 'danger';
  if(d.painWeight>=0.6) return 'warning';
  return 'info';
} [cite: 158]
function getSeverityBadgeClass(s){ return s==='danger'?'danger':s==='warning'?'warning':'info'; }
function setConversationBot(text){
  const m = document.createElement('div'); m.className='msg bot';
  m.innerHTML = `<div class="bubble">${text}</div>`;
  conversationEl.appendChild(m);
  conversationEl.scrollTop = conversationEl.scrollHeight; [cite: 159]
}
function setConversationUser(text){
  const m = document.createElement('div'); m.className='msg user';
  m.innerHTML = `<div class="bubble" style="background:#eef6ff;color:var(--primary)">${text}</div>`;
  conversationEl.appendChild(m);
  conversationEl.scrollTop = conversationEl.scrollHeight; [cite: 160]
}
// initial prompt
setConversationBot('Olá! Preencha a demografia, fatores de risco, sintomas (+detalhes) e ajuste a intensidade. Clique em "Avaliar triagem".');
// ==== Motor de inferência ==== [cite: 161]
// --- ATUALIZADO COM LÓGICA DE QUALIFICADORES REFINADA ---
function evaluateDiseases(data){
  const logs = [];
  const computed = []; [cite: 162]

  DISEASES.forEach(d => {
    const required = d.sintomas;
    const matchedSymptoms = required.filter(s => data.sintomas[s] !== undefined);
    const matched = matchedSymptoms.length;
    const total = Math.max(required.length,1);

    const symptomScore = (matched / total) * 60;

    const matchedIntensities = matchedSymptoms.map(id => data.sintomas[id].intensity);
    const maxIntensity = matchedIntensities.length > 0 ? Math.max(...matchedIntensities) : 0;
    const intensityNorm = (maxIntensity || 0) / 10;
    const intensityBonus = intensityNorm * 30 * (d.painWeight || 0);

    let demographicWeight = 0; [cite: 163]
    const diseaseWeights = RISK_WEIGHTS[d.id];
    if (diseaseWeights) {
      let genderKey = data.genero;
      if (!diseaseWeights[genderKey]) { genderKey = 'o'; }
      const ageWeights = diseaseWeights[genderKey];
      if (ageWeights && ageWeights[data.faixa_etaria] !== undefined) {
        demographicWeight = ageWeights[data.faixa_etaria];
      }
    }

    let riskFactorBonus = 0;
    if (data.riskFactors && data.riskFactors.length > 0) { [cite: 164]
      data.riskFactors.forEach(riskId => {
        const factorData = RISK_FACTOR_BONUS[riskId];
        if (factorData && factorData[d.id]) {
          riskFactorBonus += factorData[d.id];
        }
      });
    } [cite: 165]
    if (riskFactorBonus > 20) { riskFactorBonus = 20;
    } [cite: 166]

    // --- LÓGICA DOS QUALIFICADORES (EXPANDIDA) ---
    let qualifierScore = 0;
    matchedSymptoms.forEach(symptomId => { [cite: 167]
      const qualifiersData = data.qualifiers ? data.qualifiers[symptomId] : null;
      if (qualifiersData) { // Se este sintoma teve qualificadores coletados

        // Tosse
        if (symptomId === 'tosse') {
          if (qualifiersData['seca'] === true) {
             if (['covid19', 'gripe', 'resfriado', 'asma', 'faringite'].includes(d.id)) qualifierScore += 3;
             if (['pneumonia', 'bronquite', 'dpoc', 'tuberculose'].includes(d.id)) qualifierScore -= 5; [cite: 168]
          }
          if (qualifiersData['catarro'] === true) {
             if (['pneumonia', 'bronquite', 'dpoc', 'tuberculose', 'sinusite'].includes(d.id)) qualifierScore += 5;
             if (['asma', 'resfriado'].includes(d.id)) qualifierScore -= 3;
          }
          if (qualifiersData['sangue'] === true) {
       
             if (['tuberculose', 'pneumonia'].includes(d.id)) qualifierScore += 10; [cite: 169]
             if (['resfriado', 'gripe', 'asma', 'faringite'].includes(d.id)) qualifierScore -= 10;
          } [cite: 170]
        }

        // Dor Abdominal
        else if (symptomId === 'dor_abdominal') {
          if (qualifiersData['epigastrica'] === true) {
            if (['gastrite', 'ulcera', 'pancreatite', 'infarto'].includes(d.id)) qualifierScore += 7;
            if (['apendicite', 'colecistite', 'infeccao_urinaria'].includes(d.id)) qualifierScore -= 5; [cite: 171]
          }
          if (qualifiersData['qid'] === true) {
            if (d.id === 'apendicite') qualifierScore += 15;
            // Muito específico [cite: 172]
            if (['gastrite', 'ulcera', 'pancreatite'].includes(d.id)) qualifierScore -= 8;
          } [cite: 173]
           if (qualifiersData['colica'] === true) {
            if (['gastroenterite', 'colecistite'].includes(d.id)) qualifierScore += 5;
            if (['apendicite', 'ulcera'].includes(d.id)) qualifierScore -= 5; [cite: 174]
          }
          if (qualifiersData['difusa'] === true) {
             if (['gastroenterite'].includes(d.id)) qualifierScore += 3;
             if (['apendicite', 'colecistite', 'gastrite'].includes(d.id)) qualifierScore -= 3; // Menos provável se difusa [cite: 175]
          }
        }

        // Dor no Peito
        else if (symptomId === 'dor_peito') {
           if (qualifiersData['aperto'] === true) {
            if (['infarto', 'angina', 'doenca_coronariana'].includes(d.id)) qualifierScore += 10;
            if (['pneumonia', 'ansiedade'].includes(d.id)) qualifierScore -= 5; [cite: 176]
          }
          if (qualifiersData['irradia'] === true) {
            if (['infarto', 'angina'].includes(d.id)) qualifierScore += 10;
            if (['pneumonia', 'ansiedade', 'gastrite'].includes(d.id)) qualifierScore -= 8; [cite: 177]
          }
          if (qualifiersData['piora_resp'] === true) {
            if (['pneumonia'].includes(d.id)) qualifierScore += 8;
            if (['infarto', 'angina'].includes(d.id)) qualifierScore -= 15; // Forte contra-indicador [cite: 178]
          }
        }

        // Febre
        else if (symptomId === 'febre') {
           if (qualifiersData['alta'] === true) {
            if (['dengue', 'malaria', 'pneumonia', 'pielonefrite', 'meningite', 'sepsis', 'amigdalite', 'otite'].includes(d.id)) qualifierScore += 8;
            if (['resfriado', 'gastrite', 'ansiedade'].includes(d.id)) qualifierScore -= 5; [cite: 179]
           } else if (qualifiersData['baixa'] === true) {
              if (['dengue', 'pneumonia', 'pielonefrite', 'meningite', 'sepsis'].includes(d.id)) qualifierScore -= 5;
              // Menos provável se febre baixa [cite: 180]
           }
        }

        // Cefaleia
        else if (symptomId === 'cefaleia') {
          if (qualifiersData['intensa_subita'] === true) {
             if (['meningite', 'acidente_vascular', 'hipertensao_crise'].includes(d.id)) qualifierScore += 10;
             if (['resfriado', 'sinusite'].includes(d.id)) qualifierScore -= 5; [cite: 181]
          }
          if (qualifiersData['pulsatil'] === true) {
             if (['hipertensao'].includes(d.id)) qualifierScore += 3;
          } [cite: 182]
          if (qualifiersData['nausea_vomito'] === true) {
             if (['meningite', 'acidente_vascular', 'hipertensao_crise'].includes(d.id)) qualifierScore += 5;
             if (['resfriado', 'sinusite'].includes(d.id)) qualifierScore -= 3; [cite: 183]
          }
        }

        // Dispneia
        else if (symptomId === 'dispneia') {
           if (qualifiersData['repouso'] === true) {
             if (['pneumonia', 'covid19', 'dpoc', 'asma', 'sepsis', 'infarto', 'angina'].includes(d.id)) qualifierScore += 10;
             // Indica gravidade [cite: 184]
           }
           if (qualifiersData['esforco'] === true) {
              if (['anemia', 'dpoc', 'asma', 'doenca_coronariana'].includes(d.id)) qualifierScore += 5;
           } [cite: 185]
           if (qualifiersData['chiado'] === true) {
              if (['asma', 'bronquite', 'dpoc'].includes(d.id)) qualifierScore += 10;
              if (['pneumonia', 'infarto'].includes(d.id)) qualifierScore -= 5; [cite: 186]
           }
        }

        // Manchas na Pele
        else if (symptomId === 'manchas_pele') {
          if (qualifiersData['coceira'] === true) {
             if (['dermatite', 'varicela'].includes(d.id)) qualifierScore += 8;
             if (['dengue', 'sarampo', 'rubéola'].includes(d.id)) qualifierScore -= 3; // Coceira não é o principal [cite: 187]
          }
          if (qualifiersData['rash'] === true) {
             if (['dengue', 'zika', 'chikungunya', 'sarampo', 'rubéola', 'varicela'].includes(d.id)) qualifierScore += 5;
             if (['herpes'].includes(d.id)) qualifierScore -= 5; // Herpes é vesícula [cite: 188]
          }
          if (qualifiersData['petequias'] === true) {
             if (['dengue', 'meningite', 'sepsis'].includes(d.id)) qualifierScore += 15;
             // Sinal de alarme [cite: 189]
             if (['zika', 'rubéola', 'varicela', 'dermatite'].includes(d.id)) qualifierScore -= 10;
          } [cite: 190]
        }

        // Vômito
        else if (symptomId === 'vomito') {
          if (qualifiersData['sangue_vom'] === true) {
             if (['ulcera', 'gastrite'].includes(d.id)) qualifierScore += 15;
             // Sinal importante [cite: 191]
             if (['gastroenterite', 'infeccao_urinaria', 'apendicite'].includes(d.id)) qualifierScore -= 10;
          } [cite: 192]
          if (qualifiersData['jato'] === true) {
             if (['gastroenterite', 'pancreatite', 'meningite', 'acidente_vascular'].includes(d.id)) qualifierScore += 5;
          } [cite: 193]
           if (qualifiersData['pos_comer'] === true) {
             if (['gastrite', 'ulcera', 'colecistite'].includes(d.id)) qualifierScore += 5;
           } [cite: 194]
        }
      } // Fim if(qualifiersData)
    }); [cite: 195]
    // Fim forEach matchedSymptoms

    // Limita o score dos qualificadores
    if (qualifierScore > 15) qualifierScore = 15;
    if (qualifierScore < -15) qualifierScore = -15; [cite: 196]
    // --- FIM LÓGICA QUALIFICADORES ---

    const extra = (matched >= Math.ceil(total/2)) ?
    2 : 0; [cite: 197]

    let finalScore = symptomScore + intensityBonus + demographicWeight + riskFactorBonus + qualifierScore + extra;
    if(finalScore > 100) finalScore = 100; [cite: 198]
    if(finalScore < 0) finalScore = 0;

    let label = 'Baixa';
    if(finalScore >= 65) label = 'Alta'; [cite: 199]
    else if(finalScore >= 35) label = 'Média';
    const log = { [cite: 200]
      id: d.id, nome: d.nome, matched, total,
      symptomScore: round(symptomScore), intensityBonus: round(intensityBonus),
      demographicWeight: demographicWeight, riskFactorBonus: riskFactorBonus,
      qualifierScore: qualifierScore, extra, finalScore: round(finalScore), label,
      sintomas: required, painWeight: d.painWeight
    };
    logs.push(log); [cite: 201]
    computed.push(Object.assign({}, d, {score:round(finalScore), label}));
  });

  computed.sort((a,b)=>b.score - a.score);
  return {logs, computed};
} [cite: 202]

function round(n){ return Math.round((n + Number.EPSILON) * 10) / 10; }

function btnNextClickHandler() {
  const faixaEtariaEl = document.getElementById('faixa_etaria');
  const faixaEtariaStr = faixaEtariaEl.value; // ex: "29-33" [cite: 203]
  const faixaEtariaLabel = faixaEtariaEl.options[faixaEtariaEl.selectedIndex].text;
  // ex: "29 a 33 anos" [cite: 204]
  const genero = document.getElementById('genero').value;
  // Coleta sintomas principais e suas intensidades [cite: 205]
  const sintomas = selectedSymptoms;
  // Coleta fatores de risco [cite: 206]
  const riskFactors = [];
  document.querySelectorAll('.risk-factor-item input:checked').forEach(chk => { [cite: 207]
      riskFactors.push(chk.id.replace('chk_', ''));
  });
  // Coleta o estado dos Qualificadores [cite: 208]
  const qualifiers = {};
  Object.keys(selectedSymptoms).forEach(symptomId => { // Para cada sintoma principal ATIVO [cite: 209]
    const symptomQualifiers = SYMPTOM_QUALIFIERS[symptomId];
    if (symptomQualifiers) { // Se este sintoma tem qualificadores
      qualifiers[symptomId] = {}; // Cria um objeto para ele
      symptomQualifiers.forEach(q => {
        const chkId = `chk_${symptomId}_${q.id}`;
        const checkboxEl = document.getElementById(chkId);
        if (checkboxEl) { // Verifica se o elemento existe
           qualifiers[symptomId][q.id] = 
           checkboxEl.checked; // Guarda true/false [cite: 210]
        }
      });
    }
  });
  const data = { [cite: 211]
    faixa_etaria: faixaEtariaStr,
    genero: genero,
    sintomas: sintomas, // Objeto { symptomId: { intensity: X } }
    riskFactors: riskFactors,
    qualifiers: qualifiers // Novo objeto { symptomId: { qualifierId: true/false } }
  };
  const sintomasTxt = Object.keys(sintomas).length > 0 [cite: 212]
    ?
    Object.keys(sintomas).map(k => `${SYMPTOMS.find(s=>s.id===k).label} (int: ${sintomas[k].intensity})`).join(', ') [cite: 213]
    : 'nenhum';
  setConversationUser(`Faixa: ${faixaEtariaLabel} — Riscos: ${riskFactors.join(', ') || 'nenhum'} — Sintomas: ${sintomasTxt}`); [cite: 214]

  const {logs, computed} = evaluateDiseases(data);
  // update engine tab [cite: 215]
  rawDataEl.textContent = JSON.stringify(data, null, 2);
  engineLogEl.innerHTML = '';
  logs.forEach(l=>{ [cite: 216]
    const div = document.createElement('div');
    div.style.padding='8px';
    div.style.borderBottom='1px dashed #eef5ff';
    div.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
      <div><strong>${l.nome}</strong> <span class="small muted">(${l.id})</span></div>
      <div style="text-align:right;"><span style="font-weight:700">${l.finalScore}%</span> — <span class="muted small">${l.label}</span></div>
    </div>
    <div class="small muted" style="margin-top:6px">Sintomas correspondentes: ${l.matched}/${l.total}</div>
    <div class="small muted">Detalhes: sint=${l.symptomScore}pts, intens=${l.intensityBonus}pts, demo=${l.demographicWeight}pts, risco=${l.riskFactorBonus}pts, quali=${l.qualifierScore}pts, extra=${l.extra}pts</div>
    `;
    engineLogEl.appendChild(div);
  });
  // results UI [cite: 217]
  resultsEl.innerHTML = '';
  const threshold = 0;
  const toShow = computed.filter((c,i)=> (c.score > threshold) || i<5 ).slice(0,20); [cite: 218]
  if(toShow.length===0 || toShow[0].score <= threshold){ [cite: 219]
    setConversationBot('Nenhuma doença atingiu probabilidade significativa com os dados fornecidos.');
    resultsEl.innerHTML = `<div class="muted">Nenhuma correspondência forte.</div>`; [cite: 220]
    lastSummaryEl.textContent = 'Sem encaminhamentos';
    setPriorityCard([], data);
    lastTriagem = {data, logs, computed, timestamp: new Date().toISOString()};
    return; [cite: 221]
  }

  const topDisease = toShow[0];
  setConversationBot(`A doença mais provável é <strong>${topDisease.nome}</strong> com <strong>${topDisease.score}%</strong>. Veja a lista abaixo.`);
  toShow.forEach(d=>{ [cite: 222]
    const cls = d.score >= 65 ? 'danger' : d.score >= 35 ? 'warning' : 'info';
    const card = document.createElement('div');
    card.className = 'dcard ' + cls;
    card.innerHTML = `
      <div style="flex:1">
        <div style="font-weight:700">${d.nome} <span class="small muted">(${d.id})</span></div>
        <div class="small muted" style="margin-top:6px">${d.descricao || ''}</div>
      </div>
      <div style="width:160px;text-align:right">
        <div style="font-weight:800">${d.score}%</div>
     
        <div class="small muted">${d.label}</div> [cite: 223]
        <div style="height:8px"></div>
        <div class="percent-bar"><div class="percent-fill" style="width:${d.score}%;background:${progressColor(d.score)}"></div></div>
      </div>
    `;
    resultsEl.appendChild(card);
  });
  lastSummaryEl.textContent = `${toShow.length} doenças listadas — maior: ${toShow[0].nome} (${toShow[0].score}%)`; [cite: 224]
  setPriorityCard(toShow, data);
  lastTriagem = {data, logs, computed, timestamp: new Date().toISOString()};
} [cite: 225]
document.getElementById('btnNext').addEventListener('click', btnNextClickHandler);

function setPriorityCard(list, data){
  const allIntensities = Object.values(data.sintomas);
  const maxUserIntensity = allIntensities.length > 0 ? Math.max(...allIntensities) : 0;
  let pr = 'Baixa'; [cite: 226]
  if(list.some(d=>d.score>=75) && maxUserIntensity>=7) pr = 'Alta';
  else if(list.some(d=>d.score>=60) || maxUserIntensity>=8) pr = 'Média';
  else pr = 'Baixa'; [cite: 227]
  
  if (pr === 'Baixa' && list.length > 0 && list[0].score < 30) {
     pr = 'Muito Baixa';
  } [cite: 228]

  if(pr==='Alta'){
    priorityLabelEl.textContent = 'ALTA PRIORIDADE';
    priorityDescEl.textContent = 'Encaminhar imediatamente. Sintomas e demografia indicam risco elevado.';
    priorityBadgeEl.textContent = 'URGENTE'; priorityBadgeEl.className='badge danger'; [cite: 229]
    document.getElementById('priorityCard').className='dcard danger';
  } else if(pr==='Média'){
    priorityLabelEl.textContent = 'PRIORIDADE MÉDIA';
    priorityDescEl.textContent = 'Monitorar e considerar encaminhamento conforme evolução.'; [cite: 230]
    priorityBadgeEl.textContent = 'ATENÇÃO'; priorityBadgeEl.className='badge warning';
    document.getElementById('priorityCard').className='dcard warning';
  } else {  [cite: 231]
    priorityLabelEl.textContent = 'BAIXA PRIORIDADE';
    priorityDescEl.textContent = 'Orientação domiciliar / acompanhamento.';
    priorityBadgeEl.textContent = 'INFO';
    priorityBadgeEl.className='badge info'; [cite: 232]
    document.getElementById('priorityCard').className='dcard info';
  }
}

// helper: color gradient for percent
function progressColor(p){
  if(p>=65) return 'linear-gradient(90deg,#ff6b6b,#ef4444)';
  if(p>=35) return 'linear-gradient(90deg,#f59e0b,#ffb84d)';
  return 'linear-gradient(90deg,#10B981,#3ddc8b)';
} [cite: 233]
document.getElementById('exportBtn').addEventListener('click', ()=>{
  if(!lastTriagem){ alert('Nenhuma triagem para exportar.'); return; }
  const blob = new Blob([JSON.stringify(lastTriagem, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `triagem_${new Date().toISOString().replace(/[:\.]/g,'-')}.json`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});
function btnResetClickHandler() { [cite: 234]
  // Reseta demografia
  document.getElementById('faixa_etaria').value = '29-33';
  document.getElementById('genero').value = 'o';
  // Limpa objeto de sintomas selecionados [cite: 235]
  selectedSymptoms = {};
  // Limpa os fatores de risco [cite: 236]
  document.querySelectorAll('.risk-factor-item input[type="checkbox"]').forEach(cb => cb.checked = false);
  // Fecha todos os popups de qualificadores abertos e reseta botões [+] [cite: 237]
  document.querySelectorAll('.qualifier-popup').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.qualifier-toggle').forEach(t => t.textContent = '[+]'); [cite: 238]

  // Re-renderiza a lista de sintomas para limpar visualmente (sliders, ativos, qualificadores)
  renderSymptoms();
  // Limpa a conversa e adiciona mensagem inicial [cite: 239]
  conversationEl.innerHTML = '';
  setConversationBot('Triagem reiniciada. Preencha os dados e clique em "Avaliar triagem".'); [cite: 240]

  // Limpa os resultados e logs
  resultsEl.innerHTML = '';
  engineLogEl.innerHTML = ''; [cite: 241]
  rawDataEl.textContent = '{}';

  // Reseta o card de prioridade
  priorityLabelEl.textContent = 'Sem dados';
  priorityDescEl.textContent = 'Realize uma triagem para ver o resultado'; [cite: 242]
  priorityBadgeEl.textContent = '—';
  priorityBadgeEl.className = 'badge info';
  document.getElementById('priorityCard').className = 'dcard info';
  // Reset class [cite: 243]

  // Limpa o resumo da última triagem
  lastSummaryEl.textContent = 'nenhuma';
  lastTriagem = null;
}
document.getElementById('btnReset').addEventListener('click', btnResetClickHandler);
// --- CORREÇÃO: Tab Switcher --- [cite: 244]
document.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click', ()=> {
    document.querySelectorAll('.qualifier-popup').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.qualifier-toggle').forEach(t => t.textContent = '[+]');
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const target = t.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(tc=>tc.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});
// --- FIM CORREÇÃO --- [cite: 245]


SYMPTOMS.sort((a, b) => a.label.localeCompare(b.label));

// initial renders
renderSymptoms();
renderRulesList();
// <-- Chamada está aqui e correta [cite: 246]

// --- CORREÇÃO: Preenchimento de RISK_WEIGHTS ---
// Esta lógica foi movida para o data.js
// --- FIM CORREÇÃO ---