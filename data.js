// ==== Lista de sintomas possíveis (com grupos) ====
const SYMPTOMS = [
  // Grupo: Geral
  {id:'febre', label:'Febre', group: 'Geral'},
  {id:'queda_cabelo', label:'Queda de cabelo (Alopécia)', group: 'Geral'},
  {id:'dor_corpo', label:'Dor no corpo / mialgia', group: 'Geral'},
  {id:'astenia', label:'Fadiga / cansaço', group: 'Geral'},
  {id:'calafrios', label:'Calafrios', group: 'Geral'},
  {id:'perda_peso', label:'Perda de peso inexplicada', group: 'Geral'},
  {id:'suor_noturno', label:'Sudorese noturna', group: 'Geral'},
  {id:'adenomegalia', label:'Aumento de gânglios', group: 'Geral'},
  {id:'edema', label:'Inchaço (edema)', group: 'Geral'},
  {id:'rigidez_matinal', label:'Rigidez Articular (pela manhã)', group: 'Geral'},

  // Grupo: Respiratório / ORL (Otorrino)
  {id:'tosse', label:'Tosse', group: 'Respiratório / ORL'},
  {id:'dispneia', label:'Dificuldade para respirar', group: 'Respiratório / ORL'},
  {id:'dor_peito', label:'Dor no peito', group: 'Respiratório / ORL'}, // Pode ser cardíaco, mas deixamos aqui por ora
  {id:'coriza', label:'Coriza / nariz entupido', group: 'Respiratório / ORL'},
  {id:'odinofagia', label:'Dor ao engolir', group: 'Respiratório / ORL'},
  {id:'rouquidão', label:'Rouquidão', group: 'Respiratório / ORL'},
  {id:'rinorreia', label:'Secreção nasal', group: 'Respiratório / ORL'},
  {id:'dor_ouvido', label:'Dor no ouvido', group: 'Respiratório / ORL'},
  {id:'sangue_no_sarro', label:'Sangue na expectoração', group: 'Respiratório / ORL'},

  // Grupo: Digestivo
  {id:'dor_abdominal', label:'Dor abdominal', group: 'Digestivo'},
  {id:'vomito', label:'Vômito', group: 'Digestivo'},
  {id:'diarreia', label:'Diarreia', group: 'Digestivo'},
  {id:'ictericia', label:'Icterícia (amarelamento)', group: 'Digestivo'},
  {id:'sangue_no_sangue', label:'Sangue nas fezes', group: 'Digestivo'},
  {id:'nausea', label:'Náusea', group: 'Digestivo'}, // Adicionei Náusea que estava implícita em Gastrite/Úlcera
  {id:'perda_apetite', label:'Perda de Apetite', group: 'Digestivo'}, // Adicionei, usado em Gastrite

  // Grupo: Neurológico / Cabeça
  {id:'cefaleia', label:'Dor de cabeça', group: 'Neurológico / Cabeça'},
  {id:'tontura', label:'Tontura / desmaio', group: 'Neurológico / Cabeça'},
  {id:'confusao', label:'Confusão mental', group: 'Neurológico / Cabeça'},
  {id:'perda_consciencia', label:'Perda de consciência', group: 'Neurológico / Cabeça'},
  {id:'convulsao', label:'Convulsões', group: 'Neurológico / Cabeça'},
  {id:'sensibilidade_luz', label:'Sensibilidade à luz', group: 'Neurológico / Cabeça'},
  {id:'dor_face', label:'Dor na Face', group: 'Neurológico / Cabeça'}, // Adicionei, usado em Sinusite
  {id:'fraqueza_unilateral', label: 'Fraqueza Unilateral', group: 'Neurológico / Cabeça'}, // Adicionei, usado em AVC

  // Grupo: Pele / Mucosas
  {id:'manchas_pele', label:'Manchas/erupção na pele', group: 'Pele / Mucosas'},
  {id:'conjuntivite', label:'Olhos vermelhos / conjuntivite', group: 'Pele / Mucosas'},
  {id:'sangramento_gengiva', label:'Sangramento nas gengivas', group: 'Pele / Mucosas'},
  {id:'palidez', label:'Palidez', group: 'Pele / Mucosas'}, // Adicionei, usado em Anemia
  {id:'secrecao', label:'Secreção Ocular/Nasal', group: 'Pele / Mucosas'}, // Adicionei, usado em Conjuntivite
  {id:'prurido', label:'Coceira generalizada (sem rash)', group: 'Pele / Mucosas'},
  {id:'feridas_boca', label:'Feridas na boca / nariz', group: 'Pele / Mucosas'},
  {id:'hirsutismo', label:'Excesso de Pelos (Hirsutismo)', group: 'Pele / Mucosas'},

  // Grupo: Urinário / Metabólico
  {id:'disuria', label:'Dor ao urinar', group: 'Urinário / Metabólico'},
  {id:'anuria', label:'Redução/ausência de urina', group: 'Urinário / Metabólico'},
  {id:'poliuria', label:'Urina em excesso', group: 'Urinário / Metabólico'},
  {id:'polidipsia', label:'Sede excessiva', group: 'Urinário / Metabólico'},
  {id:'dor_flanco', label:'Dor no Flanco / Lombar (Costas)', group: 'Urinário / Metabólico'},
  {id:'hematuria', label:'Sangue na Urina', group: 'Urinário / Metabólico'},
  {id:'polaciuria', label:'Vontade frequente de urinar', group: 'Urinário / Metabólico'},
  {id:'dor_perineal', label:'Dor Perineal / Pélvica (Homens)', group: 'Urinário / Metabólico'},

  // Grupo: Cardiovascular
  {id:'palpitacao', label:'Palpitações', group: 'Cardiovascular'},
  {id:'hipertensao_crise', label:'Pressão arterial muito alta', group: 'Cardiovascular'},
  {id:'hipotensao', label:'Pressão Baixa / Choque', group: 'Cardiovascular'}, // Adicionei, usado em Sepse
  {id:'taquicardia', label:'Taquicardia', group: 'Cardiovascular'}, // Adicionei, usado em Sepse

  // Grupo: Outros (ajustar conforme necessidade)
  {id:'inic_local', label:'Dor localizada intensa', group: 'Outros'}, // Ex: Apendicite, LER, Celulite
  {id:'dor_articular', label:'Dor Articular', group: 'Outros'}, // Adicionei, usado em Chikungunya
  {id:'chiado', label:'Chiado no Peito', group: 'Respiratório / ORL'}, // Movido para Respiratório
  {id:'ganho_peso', label:'Ganho de Peso', group: 'Geral'}, // Adicionei, usado em Hipotireoidismo
  {id:'constipacao', label:'Constipação', group: 'Digestivo'}, // Adicionei, usado em Hipotireoidismo
  {id:'frio_intolerancia', label:'Intolerância ao Frio', group: 'Geral'}, // Adicionei, usado em Hipotireoidismo
  {id:'ansiedade_sintoma', label:'Ansiedade (Sintoma)', group: 'Geral'}, // Renomeado de 'ansiedade', usado em Hipertireoidismo
  {id:'insônia_sintoma', label:'Insônia (Sintoma)', group: 'Geral'}, // Renomeado de 'insônia', usado em Depressão/Ansiedade
  {id:'tristeza', label:'Tristeza / Desânimo', group: 'Geral'}, // Adicionei, usado em Depressão
  {id:'crepitacao_articular', label:'Crepitação/Estalos nas Articulações', group: 'Outros'},
  {id:'irritabilidade', label:'Irritabilidade', group: 'Geral'}, // Adicionei, usado em Insônia

  // Grupo: Ginecologia / Urinário
  {id:'dor_pelvica_cronica', label:'Dor Pélvica Crônica', group: 'Ginecologia / Urinário'},
  {id:'prurido_genital', label:'Coceira Genital', group: 'Ginecologia / Urinário'},
  {id:'dispareunia', label:'Dor na Relação Sexual', group: 'Ginecologia / Urinário'},
  {id:'colica_menstrual_intensa', label:'Cólica Menstrual Intensa', group: 'Ginecologia / Urinário'},
  {id:'corrimento_vaginal', label:'Corrimento Vaginal', group: 'Ginecologia / Urinário'},
  {id:'ciclo_irregular', label:'Ciclo Menstrual Irregular', group: 'Ginecologia / Urinário'},
  {id:'vermelhidao_glande', label:'Vermelhidão / Inchaço na Glande', group: 'Ginecologia / Urinário'},
  {id:'placas_brancas_penis', label:'Placas Brancas / Corrimento (Pênis)', group: 'Ginecologia / Urinário'},
  {id:'sangramento_uterino_anormal', label:'Sangramento Menstrual Intenso/Irregular', group: 'Ginecologia / Urinário'},
  {id:'aumento_volume_abdominal', label:'Aumento do Volume Abdominal', group: 'Digestivo'},
  {id:'aura_visual', label:'Aura Visual (luzes, pontos cegos)', group: 'Neurológico / Cabeça'},
  {id:'tremor_repouso', label:'Tremor (em repouso)', group: 'Neurológico / Cabeça'},
  {id:'rigidez_muscular', label:'Rigidez Muscular (Geral)', group: 'Neurológico / Cabeça'},
  {id:'bradicinesia', label:'Lentidão de Movimentos', group: 'Neurológico / Cabeça'},
  {id:'instabilidade_postural', label:'Instabilidade Postural / Quedas', group: 'Neurológico / Cabeça'},
  {id:'perda_memoria_recente', label:'Perda de Memória Recente', group: 'Neurológico / Cabeça'},
  {id:'dificuldade_linguagem', label:'Dificuldade de Linguagem/Fala', group: 'Neurológico / Cabeça'},
  {id:'desorientacao', label:'Desorientação (Tempo/Espaço)', group: 'Neurológico / Cabeça'},
  {id:'vertigem_rotatoria', label:'Vertigem (Sensação de Girar)', group: 'Neurológico / Cabeça'},
  {id:'zumbido', label:'Zumbido no Ouvido', group: 'Respiratório / ORL'},
  {id:'placas_descamativas', label:'Placas de Pele Descamativas (Prateadas)', group: 'Pele / Mucosas'},
  {id:'vergoes_pele', label:'Vergões / Urticas (Pele elevada)', group: 'Pele / Mucosas'},
  {id:'angioedema', label:'Inchaço de Lábios / Olhos / Rosto', group: 'Pele / Mucosas'},
  {id:'lesoes_nodulares_pele', label:'Lesões Nodulares / Cistos (Pele)', group: 'Pele / Mucosas'},
  {id:'euforia_mania', label:'Euforia / Agitação (Mania)', group: 'Geral / Psiquiátrico'},
  {id:'fala_acelerada', label:'Fala Acelerada / Compulsiva', group: 'Geral / Psiquiátrico'},
  {id:'reducao_sono', label:'Redução da Necessidade de Sono', group: 'Geral / Psiquiátrico'}
 ];
const DISEASES = [
  {id:'tag', nome:'Ansiedade Generalizada (TAG)', sintomas:['preocupacao_excessiva', 'ansiedade_sintoma', 'irritabilidade', 'insônia_sintoma', 'astenia', 'dor_corpo'], painWeight: 0.1, genderPref: 'f', descricao:'Preocupação crônica, excessiva e difícil de controlar sobre diversos temas.'},
  {id:'panico', nome:'Síndrome do Pânico', sintomas:['medo_intenso_subito', 'palpitacao', 'taquicardia', 'dispneia', 'tontura', 'sudorese', 'calafrios'], painWeight: 0.7, descricao:'Ataques súbitos de medo intenso e sintomas físicos avassaladores sem perigo real.'},
  {id:'fobia_especifica', nome:'Fobia Específica', sintomas:['medo_especifico', 'ansiedade_sintoma', 'palpitacao', 'sudorese'], painWeight: 0.1, descricao:'Medo intenso e irracional de um objeto ou situação específica (ex: aranha, altura, avião).'},
  {id:'urticaria', nome:'Urticária Aguda', sintomas:['manchas_pele', 'prurido', 'vergoes_pele', 'angioedema'], painWeight: 0.3, descricao:'Reação alérgica da pele que causa vergões vermelhos e coceira intensa. Angioedema é sinal de gravidade.'},
  {id:'acne_grave', nome:'Acne Cística / Grave', sintomas:['manchas_pele', 'lesoes_nodulares_pele', 'inic_local', 'dor_face'], painWeight: 0.5, descricao:'Forma grave de acne com nódulos e cistos dolorosos e inflamados, geralmente no rosto e costas.'},
  {id:'transtorno_bipolar', nome:'Transtorno Bipolar', sintomas:['tristeza', 'euforia_mania', 'irritabilidade', 'fala_acelerada', 'reducao_sono', 'ansiedade_sintoma', 'insônia_sintoma'], painWeight: 0.1, descricao:'Transtorno de humor caracterizado por alternância entre episódios de depressão e mania/hipomania.'},
  {id:'alzheimer', nome:'Doença de Alzheimer', sintomas:['perda_memoria_recente', 'desorientacao', 'dificuldade_linguagem', 'confusao', 'irritabilidade', 'ansiedade_sintoma'], painWeight: 0.1, descricao:'Doença neurodegenerativa progressiva que causa declínio da memória e da função cognitiva.'},
  {id:'labirintite', nome:'Labirintite / VPPB (Vertigem)', sintomas:['tontura', 'vertigem_rotatoria', 'nausea', 'vomito', 'zumbido', 'suor_noturno'], painWeight: 0.4, descricao:'Distúrbio do ouvido interno que causa vertigem rotatória intensa, náusea e perda de equilíbrio.'},
  {id:'psoriase', nome:'Psoríase', sintomas:['manchas_pele', 'placas_descamativas', 'prurido', 'dor_articular'], painWeight: 0.3, descricao:'Doença autoimune crônica da pele que causa placas vermelhas e descamativas (prateadas).'},
  {id:'mioma_uterino', nome:'Mioma Uterino', sintomas:['sangramento_uterino_anormal', 'colica_menstrual_intensa', 'dor_pelvica_cronica', 'aumento_volume_abdominal', 'polaciuria'], painWeight: 0.6, genderPref: 'f', descricao:'Tumor benigno no útero, causando sangramento intenso e dor pélvica.'},
  {id:'enxaqueca', nome:'Enxaqueca (Migrânea)', sintomas:['cefaleia', 'nausea', 'vomito', 'sensibilidade_luz', 'aura_visual'], painWeight: 0.8, genderPref: 'f', descricao:'Cefaleia crônica, pulsátil, frequentemente unilateral e incapacitante, com sensibilidade sensorial.'},
  {id:'parkinson', nome:'Doença de Parkinson', sintomas:['tremor_repouso', 'rigidez_muscular', 'bradicinesia', 'instabilidade_postural'], painWeight: 0.1, genderPref: 'm', descricao:'Doença neurológica degenerativa que afeta o movimento, causando tremor em repouso e lentidão.'},
  {id:'balanite_candidiaca', nome:'Balanite Candidiásica (Homem)', sintomas:['prurido_genital', 'vermelhidao_glande', 'placas_brancas_penis', 'disuria'], painWeight: 0.4, genderPref: 'm', descricao:'Infecção fúngica peniana (glande/prepúcio), causando coceira, vermelhidão e placas brancas.'},
  {id:'artrose', nome:'Artrose (Osteoartrite)', sintomas:['dor_articular', 'edema', 'crepitacao_articular', 'rigidez_matinal'], painWeight: 0.6, descricao:'Doença degenerativa da cartilagem, dor piora com esforço e no fim do dia.'},
  {id:'fibromialgia', nome:'Fibromialgia', sintomas:['dor_corpo', 'astenia', 'insônia_sintoma', 'confusao', 'cefaleia', 'ansiedade_sintoma'], painWeight: 0.8, genderPref: 'f', descricao:'Síndrome de dor crônica generalizada, associada a fadiga, sono não reparador e "névoa mental".'},
  {id:'lupus', nome:'Lúpus (LES)', sintomas:['astenia', 'febre', 'dor_articular', 'manchas_pele', 'sensibilidade_luz', 'perda_peso', 'feridas_boca', 'queda_cabelo'], painWeight: 0.5, genderPref: 'f', descricao:'Doença autoimune sistêmica que afeta pele, articulações, rins e outros órgãos. Predominante em mulheres.'},
  {id:'covid19', nome:'COVID-19', sintomas:['febre','tosse','dispneia','dor_corpo','cefaleia','coriza'], painWeight:0.5, descricao:'Doença viral respiratória. Sintomas respiratórios, febre, fadiga.'},
  {id:'dengue', nome:'Dengue', sintomas:['febre','dor_corpo','cefaleia','manchas_pele','calafrios','sangramento_gengiva'], painWeight:0.3, descricao:'Infecção viral transmitida por Aedes, febre alta, mialgia e rash.'},
  {id:'gripe', nome:'Gripe (Influenza)', sintomas:['febre','tosse','dor_corpo','cefaleia','coriza'], painWeight:0.3, descricao:'Infecção respiratória sazonal.'},
  {id:'resfriado', nome:'Resfriado comum', sintomas:['coriza','tosse','rouquidão','dor_corpo'], painWeight:0.1, descricao:'Virose respiratória leve.'},
  {id:'pneumonia', nome:'Pneumonia', sintomas:['febre','tosse','dispneia','sangue_no_sarro','dor_peito'], painWeight:0.6, descricao:'Infecção pulmonar com dispneia e febre.'},
  {id:'asma', nome:'Asma', sintomas:['tosse','dispneia','chiado'], painWeight:0.2, descricao:'Doença obstrutiva das vias aéreas caracterizada por crises de falta de ar.'},
  {id:'bronquite', nome:'Bronquite', sintomas:['tosse','febre','dispneia'], painWeight:0.2, descricao:'Inflamação dos brônquios, costuma causar tosse produtiva.'},
  {id:'sinusite', nome:'Sinusite', sintomas:['cefaleia','coriza','dor_face','sensibilidade_luz'], painWeight:0.4, descricao:'Inflamação dos seios paranasais causando dor facial.'},
  {id:'otite', nome:'Otite', sintomas:['dor_ouvido','febre','tosse'], painWeight:0.7, descricao:'Infecção do ouvido médio com dor intensa.'},
  {id:'faringite', nome:'Faringite', sintomas:['odinofagia','febre','rouquidão'], painWeight:0.5, descricao:'Inflamação da faringe, dor ao engolir.'},
  {id:'amigdalite', nome:'Amigdalite', sintomas:['odinofagia','febre','adenomegalia','rouquidão'], painWeight:0.6, descricao:'Inflamação das amígdalas.'},
  {id:'infeccao_urinaria', nome:'Infecção urinária', sintomas:['disuria','poliuria','dor_abdominal','febre'], painWeight:0.5, genderPref: 'f', descricao:'Infecção do trato urinário com dor ou ardência ao urinar.'},
  {id:'pielonefrite', nome:'Pielonefrite', sintomas:['febre','dor_abdominal','anuria','nausea'], painWeight:0.7, genderPref: 'f', descricao:'Infecção renal com dor lombar e febre alta.'},
  {id:'gastroenterite', nome:'Gastroenterite', sintomas:['diarreia','vomito','dor_abdominal','febre'], painWeight:0.4, descricao:'Inflamação do trato gastrointestinal.'},
  {id:'gastrite', nome:'Gastrite', sintomas:['dor_abdominal','nausea','vomito','perda_apetite'], painWeight:0.8, descricao:'Inflamação do estômago com dor epigástrica.'},
  {id:'colecistite', nome:'Colecistite', sintomas:['dor_abdominal','febre','vomito','ictericia'], painWeight:0.9, descricao:'Inflamação da vesícula biliar com dor intensa no quadrante superior direito.'},
  {id:'pancreatite', nome:'Pancreatite', sintomas:['dor_abdominal','vomito','suor_noturno','ictericia'], painWeight:1.0, descricao:'Inflamação do pâncreas com dor abdominal intensa.'},
  {id:'ulcera', nome:'Úlcera péptica', sintomas:['dor_abdominal','perda_peso','nausea','vomito'], painWeight:0.7, descricao:'Lesão na mucosa gástrica causando dor epigástrica.'},
  {id:'doenca_coronariana', nome:'Doença arterial coronariana', sintomas:['dor_peito','palpitacao','dispneia','sudorese'], painWeight:0.9, descricao:'Problemas das artérias coronárias podendo causar dor torácica.'},
  {id:'infarto', nome:'Infarto agudo do miocárdio', sintomas:['dor_peito','sudorese','tontura','desmaio'], painWeight:1.0, descricao:'Isquemia coronária grave com dor torácica intensa.'},
  {id:'angina', nome:'Angina', sintomas:['dor_peito','dispneia','palpitacao'], painWeight:0.8, descricao:'Dor torácica por isquemia transitória.'},
  {id:'hipertensao', nome:'Hipertensão arterial', sintomas:['cefaleia','tontura','palpitacao'], painWeight:0.2, descricao:'Pressão arterial alta, muitas vezes assintomática.'},
  {id:'acidente_vascular', nome:'AVC (Acidente Vascular Cerebral)', sintomas:['confusao','perda_consciencia','tontura','fraqueza_unilateral'], painWeight:0.1, descricao:'Comprometimento neurológico agudo.'},
  {id:'diabetes2', nome:'Diabetes tipo 2', sintomas:['poliuria','polidipsia','perda_peso','astenia'], painWeight:0.1, descricao:'Doença metabólica com sede e micção aumentadas.'},
  {id:'hipotireoidismo', nome:'Hipotireoidismo', sintomas:['astenia','ganho_peso','constipacao','frio_intolerancia'], painWeight:0.1, genderPref: 'f', descricao:'Baixa atividade da tireoide.'},
  {id:'hipertireoidismo', nome:'Hipertireoidismo', sintomas:['palpitacao','perda_peso','sudorese','ansiedade'], painWeight:0.1, genderPref: 'f', descricao:'Alta atividade da tireoide.'},
  {id:'depressao', nome:'Depressão', sintomas:['astenia','perda_peso','insônia','tristeza'], painWeight:0.05, descricao:'Transtorno do humor com perda de interesse.'},
  {id:'insônia', nome:'Insônia', sintomas:['insônia','astenia','irritabilidade'], painWeight:0.02, descricao:'Dificuldade de sono persistente.'},
  {id:'dpoc', nome:'DPOC', sintomas:['tosse','dispneia','palpitacao'], painWeight:0.3, descricao:'Doença pulmonar obstrutiva crônica.'},
  {id:'artrite_reumatoide', nome:'Artrite Reumatoide', sintomas:['dor_articular', 'edema', 'rigidez_matinal', 'astenia', 'perda_peso'], painWeight: 0.7, genderPref: 'f', descricao:'Doença autoimune que causa inflamação crônica nas articulações (simétrica).'},
  {id:'gota', nome:'Gota (Ácido Úrico)', sintomas:['dor_articular', 'edema', 'inic_local', 'calafrios', 'febre'], painWeight: 0.9, descricao:'Artrite inflamatória por excesso de ácido úrico, causando dor intensa (especialmente no dedão do pé).'},
  {id:'prostatite', nome:'Prostatite', sintomas:['dor_perineal', 'disuria', 'polaciuria', 'febre', 'calafrios', 'ejaculacao_dolorosa', 'dispareunia'], painWeight: 0.8, genderPref: 'm', descricao:'Inflamação da próstata, comum em homens, causando dor pélvica e dificuldade urinária.'},
  {id:'tuberculose', nome:'Tuberculose', sintomas:['tosse','suor_noturno','perda_peso','febre'], painWeight:0.2, descricao:'Infecção bacteriana crônica dos pulmões.'},
  {id:'malaria', nome:'Malária', sintomas:['febre','calafrios','cefaleia','dor_corpo'], painWeight:0.3, descricao:'Infecção transmitida por mosquito com febre alta.'},
  {id:'chikungunya', nome:'Chikungunya', sintomas:['febre','dor_corpo','dor_articular','cefaleia'], painWeight:0.4, descricao:'Doença viral com artralgia intensa.'},
  {id:'zika', nome:'Zika', sintomas:['febre','manchas_pele','conjuntivite','cefaleia'], painWeight:0.2, descricao:'Infecção viral frequentemente branda.'},
  {id:'ler', nome:'LER/DORT', sintomas:['dor_corpo','inic_local','astenia','edema'], painWeight:0.9, descricao:'Lesões por esforços repetitivos com dor local.'},
  {id:'dermatite', nome:'Dermatite / Eczema', sintomas:['manchas_pele','edema'], painWeight:0.3, descricao:'Inflamação da pele com coceira.'},
  {id:'celulite', nome:'Celulite (infecção de pele)', sintomas:['manchas_pele','inic_local','febre','edema'], painWeight:0.8, descricao:'Infecção cutânea com dor e calor local.'},
  {id:'herpes', nome:'Herpes labial/genital', sintomas:['manchas_pele','inic_local','febre'], painWeight:0.6, descricao:'Infecção viral com vesículas dolorosas.'},
  {id:'varicela', nome:'Varicela (catapora)', sintomas:['febre','manchas_pele','cefaleia'], painWeight:0.3, descricao:'Infecção viral com erupção generalizada.'},
  {id:'sarampo', nome:'Sarampo', sintomas:['febre','manchas_pele','conjuntivite','tosse'], painWeight:0.2, descricao:'Doença viral exantemática.'},
  {id:'rubéola', nome:'Rubéola', sintomas:['febre','manchas_pele','adenomegalia'], painWeight:0.1, descricao:'Infecção viral com exantema e adenomegalia.'},
  {id:'conjuntivite', nome:'Conjuntivite', sintomas:['conjuntivite','secrecao'], painWeight:0.2, descricao:'Inflamação da conjuntiva ocular.'},
  {id:'meningite', nome:'Meningite', sintomas:['cefaleia','sensibilidade_luz','febre','confusao'], painWeight:1.0, descricao:'Inflamação das meninges com cefaleia intensa.'},
  {id:'sepsis', nome:'Sepse', sintomas:['febre','confusao','hipotensao','taquicardia'], painWeight:0.9, descricao:'Resposta inflamatória sistêmica grave a infecção.'},
  {id:'anemia', nome:'Anemia', sintomas:['astenia','palidez','tontura','fraqueza'], painWeight:0.1, descricao:'Baixa hemoglobina causando fadiga.'},
  {id:'endometriose', nome:'Endometriose', sintomas:['dor_pelvica_cronica', 'colica_menstrual_intensa', 'dispareunia', 'dor_abdominal', 'constipacao', 'diarreia'], painWeight: 0.9, genderPref: 'f', descricao:'Crescimento do tecido endometrial fora do útero, causando dor pélvica crônica intensa.'},
  {id:'candidiase', nome:'Candidíase Vaginal', sintomas:['prurido_genital', 'corrimento_vaginal', 'disuria', 'dispareunia'], painWeight: 0.4, genderPref: 'f', descricao:'Infecção fúngica vaginal comum, causando coceira intensa e corrimento espesso.'},
  {id:'sop', nome:'SOP (Síndrome do Ovário Policístico)', sintomas:['ciclo_irregular', 'hirsutismo', 'ganho_peso', 'queda_cabelo'], painWeight: 0.1, genderPref: 'f', descricao:'Distúrbio hormonal comum que causa ciclos irregulares e características androgênicas.'},
  {id:'epilepsia', nome:'Epilepsia', sintomas:['convulsao','perda_consciencia','confusao'], painWeight:0.2, descricao:'Transtorno neurológico com crises convulsivas.'},
  {id:'apendicite', nome:'Apendicite aguda', sintomas:['dor_abdominal','febre','vomito','inic_local'], painWeight:1.0, descricao:'Inflamação do apêndice com dor abdominal localizada intensa.'},
  {id:'cistite_cronica', nome:'Cistite / Cistite recorrente', sintomas:['disuria','poliuria','hemorragia','dor_abdominal'], painWeight:0.6, genderPref: 'f', descricao:'Inflamação da bexiga com dor miccional.'},
  {id:'insuficiencia_renal', nome:'Insuficiência Renal Crônica', sintomas:['astenia', 'edema', 'anuria', 'nausea', 'perda_apetite', 'confusao', 'prurido', 'palidez'], painWeight: 0.2, descricao:'Perda progressiva da função renal, sintomas podem ser silenciosos no início.'},
  {id:'calculo_renal', nome:'Cálculo Renal (Pedra nos Rins)', sintomas:['dor_flanco', 'hematuria', 'disuria', 'nausea', 'vomito', 'calafrios', 'febre', 'polaciuria'], painWeight: 1.0, descricao:'Depósitos minerais nos rins causando dor em cólica intensa que pode irradiar.'}
];
const RISK_WEIGHTS = {
  // Lote 1
  'acne_grave': {
    'm': { '0-18':20, '19-23':15, '24-28':5, '29-33':0, '34-38':-5, '39-43':-10, '44-48':-10, '49-53':-10, '54-58':-10, '59+':-10 },
    'f': { '0-18':15, '19-23':10, '24-28':5, '29-33':5, '34-38':0, '39-43':-5, '44-48':-5, '49-53':-5, '54-58':-5, '59+':-5 },
    'o': { '0-18':18, '19-23':13, '24-28':5, '29-33':3, '34-38':-3, '39-43':-8, '44-48':-8, '49-53':-8, '54-58':-8, '59+':-8 }
  },
  'transtorno_bipolar': {
    'm': { '0-18':5, '19-23':15, '24-28':15, '29-33':10, '34-38':5, '39-43':0, '44-48':0, '49-53':0, '54-58':0, '59+':0 },
    'f': { '0-18':5, '19-23':15, '24-28':15, '29-33':10, '34-38':5, '39-43':0, '44-48':0, '49-53':0, '54-58':0, '59+':0 },
    'o': { '0-18':5, '19-23':15, '24-28':15, '29-33':10, '34-38':5, '39-43':0, '44-48':0, '49-53':0, '54-58':0, '59+':0 }
  },
  'urticaria': {
    'm': { '0-18':10, '19-23':10, '24-28':10, '29-33':10, '34-38':10, '39-43':10, '44-48':10, '49-53':10, '54-58':10, '59+':10 },
    'f': { '0-18':10, '19-23':15, '24-28':15, '29-33':15, '34-38':15, '39-43':15, '44-48':15, '49-53':15, '54-58':15, '59+':15 },
    'o': { '0-18':10, '19-23':13, '24-28':13, '29-33':13, '34-38':13, '39-43':13, '44-48':13, '49-53':13, '54-58':13, '59+':13 }
  },
  'alzheimer': {
    'm': { '0-18':-30, '19-23':-30, '24-28':-30, '29-33':-25, '34-38':-20, '39-43':-15, '44-48':-10, '49-53':0, '54-58':10, '59+':25 },
    'f': { '0-18':-30, '19-23':-30, '24-28':-30, '29-33':-25, '34-38':-20, '39-43':-15, '44-48':-10, '49-53':5, '54-58':15, '59+':30 },
    'o': { '0-18':-30, '19-23':-30, '24-28':-30, '29-33':-25, '34-38':-20, '39-43':-15, '44-48':-10, '49-53':3, '54-58':13, '59+':28 }
  },
  'labirintite': {
    'm': { '0-18':-10, '19-23':-5, '24-28':0, '29-33':0, '34-38':5, '39-43':10, '44-48':10, '49-53':15, '54-58':15, '59+':15 },
    'f': { '0-18':-5, '19-23':0, '24-28':5, '29-33':5, '34-38':10, '39-43':15, '44-48':15, '49-53':15, '54-58':15, '59+':15 },
    'o': { '0-18':-8, '19-23':-3, '24-28':3, '29-33':3, '34-38':8, '39-43':13, '44-48':13, '49-53':15, '54-58':15, '59+':15 }
  },
  'psoriase': {
    'm': { '0-18':5, '19-23':10, '24-28':15, '29-33':15, '34-38':10, '39-43':5, '44-48':5, '49-53':10, '54-58':15, '59+':10 },
    'f': { '0-18':5, '19-23':10, '24-28':15, '29-33':15, '34-38':10, '39-43':5, '44-48':5, '49-53':10, '54-58':15, '59+':10 },
    'o': { '0-18':5, '19-23':10, '24-28':15, '29-33':15, '34-38':10, '39-43':5, '44-48':5, '49-53':10, '54-58':15, '59+':10 }
  },
  'endometriose': {
    'm': { '0-18':-99, '19-23':-99, '24-28':-99, '29-33':-99, '34-38':-99, '39-43':-99, '44-48':-99, '49-53':-99, '54-58':-99, '59+':-99 },
    'f': { '0-18':0, '19-23':10, '24-28':15, '29-33':15, '34-38':15, '39-43':10, '44-48':5, '49-53':-5, '54-58':-10, '59+':-15 },
    'o': { '0-18':-50, '19-23':5, '24-28':8, '29-33':8, '34-38':8, '39-43':5, '44-48':3, '49-53':-3, '54-58':-5, '59+':-8 }
  },
  'enxaqueca': {
    'm': { '0-18':5, '19-23':10, '24-28':10, '29-33':10, '34-38':10, '39-43':5, '44-48':0, '49-53':0, '54-58':-5, '59+':-5 },
    'f': { '0-18':10, '19-23':15, '24-28':15, '29-33':15, '34-38':15, '39-43':15, '44-48':10, '49-53':5, '54-58':0, '59+':0 },
    'o': { '0-18':8, '19-23':13, '24-28':13, '29-33':13, '34-38':13, '39-43':10, '44-48':5, '49-53':3, '54-58':-3, '59+':-3 }
  },
  'candidiase': {
    'm': { '0-18':-99, '19-23':-99, '24-28':-99, '29-33':-99, '34-38':-99, '39-43':-99, '44-48':-99, '49-53':-99, '54-58':-99, '59+':-99 },
    'f': { '0-18':5, '19-23':15, '24-28':15, '29-33':15, '34-38':15, '39-43':15, '44-48':10, '49-53':5, '54-58':0, '59+':0 },
    'o': { '0-18':-50, '19-23':8, '24-28':8, '29-33':8, '34-38':8, '39-43':8, '44-48':5, '49-53':3, '54-58':0, '59+':0 }
  },
  'sop': {
    'm': { '0-18':-99, '19-23':-99, '24-28':-99, '29-33':-99, '34-38':-99, '39-43':-99, '44-48':-99, '49-53':-99, '54-58':-99, '59+':-99 },
    'f': { '0-18':10, '19-23':15, '24-28':15, '29-33':15, '34-38':15, '39-43':10, '44-48':5, '49-53':0, '54-58':-5, '59+':-10 },
    'o': { '0-18':-50, '19-23':8, '24-28':8, '29-33':8, '34-38':8, '39-43':5, '44-48':3, '49-53':0, '54-58':-3, '59+':-5 }
  },
  'mioma_uterino': {
    'm': { '0-18':-99, '19-23':-99, '24-28':-99, '29-33':-99, '34-38':-99, '39-43':-99, '44-48':-99, '49-53':-99, '54-58':-99, '59+':-99 },
    'f': { '0-18':-10, '19-23':0, '24-28':5, '29-33':10, '34-38':15, '39-43':15, '44-48':15, '49-53':10, '54-58':5, '59+':0 },
    'o': { '0-18':-50, '19-23':0, '24-28':3, '29-33':5, '34-38':8, '39-43':8, '44-48':8, '49-53':5, '54-58':3, '59+':0 }
  },
  'parkinson': {
    'm': { '0-18':-20, '19-23':-20, '24-28':-20, '29-33':-15, '34-38':-10, '39-43':-5, '44-48':0, '49-53':5, '54-58':15, '59+':20 },
    'f': { '0-18':-20, '19-23':-20, '24-28':-20, '29-33':-15, '34-38':-10, '39-43':-5, '44-48':-5, '49-53':0, '54-58':10, '59+':15 },
    'o': { '0-18':-20, '19-23':-20, '24-28':-20, '29-33':-15, '34-38':-10, '39-43':-5, '44-48':-3, '49-53':3, '54-58':13, '59+':18 }
  },
  'balanite_candidiaca': {
    'm': { '0-18':5, '19-23':15, '24-28':15, '29-33':15, '34-38':15, '39-43':15, '44-48':10, '49-53':5, '54-58':0, '59+':0 },
    'f': { '0-18':-99, '19-23':-99, '24-28':-99, '29-33':-99, '34-38':-99, '39-43':-99, '44-48':-99, '49-53':-99, '54-58':-99, '59+':-99 },
    'o': { '0-18':-50, '19-23':8, '24-28':8, '29-33':8, '34-38':8, '39-43':8, '44-48':5, '49-53':3, '54-58':0, '59+':0 }
  },
  'covid19': {
    'm': { '0-18': 0, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 5, '39-43': 5, '44-48': 10, '49-53': 10, '54-58': 15, '59+': 15 },
    'f': { '0-18': 0, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 5, '39-43': 5, '44-48': 5, '49-53': 10, '54-58': 10, '59+': 15 },
    'o': { '0-18': 0, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 5, '39-43': 5, '44-48': 8, '49-53': 10, '54-58': 13, '59+': 15 }
  },
  'dengue': {
    'm': { '0-18': 5, '19-23': 10, '24-28': 10, '29-33': 10, '34-38': 10, '39-43': 5, '44-48': 5, '49-53': 5, '54-58': 0, '59+': 0 },
    'f': { '0-18': 5, '19-23': 15, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 10, '44-48': 10, '49-53': 5, '54-58': 0, '59+': 0 },
    'o': { '0-18': 5, '19-23': 13, '24-28': 13, '29-33': 13, '34-38': 13, '39-43': 8, '44-48': 8, '49-53': 5, '54-58': 0, '59+': 0 }
  },
  'gripe': {
    'm': { '0-18': 15, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 5, '54-58': 10, '59+': 15 },
    'f': { '0-18': 15, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 5, '54-58': 10, '59+': 15 },
    'o': { '0-18': 15, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 5, '54-58': 10, '59+': 15 }
  },
  'resfriado': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 5, '29-33': 5, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': -5, '59+': -5 },
    'f': { '0-18': 15, '19-23': 5, '24-28': 5, '29-33': 5, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': -5, '59+': -5 },
    'o': { '0-18': 15, '19-23': 5, '24-28': 5, '29-33': 5, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': -5, '59+': -5 }
  },
  'pneumonia': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 5, '44-48': 5, '49-53': 10, '54-58': 10, '59+': 15 },
    'f': { '0-18': 10, '19-23': 0, '24-28': -5, '29-33': -5, '34-38': -5, '39-43': 0, '44-48': 0, '49-53': 5, '54-58': 5, '59+': 10 },
    'o': { '0-18': 13, '19-23': 3, '24-28': -3, '29-33': -3, '34-38': -3, '39-43': 3, '44-48': 3, '49-53': 8, '54-58': 8, '59+': 13 }
  },
  'asma': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': -5, '54-58': -5, '59+': -5 },
    'f': { '0-18': 10, '19-23': 10, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 10, '44-48': 10, '49-53': 10, '54-58': 5, '59+': 5 },
    'o': { '0-18': 13, '19-23': 8, '24-28': 8, '29-33': 8, '34-38': 5, '39-43': 3, '44-48': 3, '49-53': 3, '54-58': 0, '59+': 0 }
  },
  'bronquite': {
    'm': { '0-18': 10, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 5 },
    'f': { '0-18': 10, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 5 },
    'o': { '0-18': 10, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 5 }
  },
  'calculo_renal': {
    'm': { '0-18': 0, '19-23': 5, '24-28': 10, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 10, '49-53': 10, '54-58': 5, '59+': 5 },
    'f': { '0-18': 0, '19-23': 0, '24-28': 5, '29-33': 10, '34-38': 10, '39-43': 10, '44-48': 5, '49-53': 5, '54-58': 0, '59+': 0 },
    'o': { '0-18': 0, '19-23': 3, '24-28': 8, '29-33': 13, '34-38': 13, '39-43': 13, '44-48': 8, '49-53': 8, '54-58': 3, '59+': 3 }
  },
  'sinusite': {
    'm': { '0-18': 5, '19-23': 10, '24-28': 10, '29-33': 10, '34-38': 10, '39-43': 10, '44-48': 5, '49-53': 5, '54-58': 5, '59+': 0 },
    'f': { '0-18': 5, '19-23': 15, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 10, '49-53': 10, '54-58': 10, '59+': 5 },
    'o': { '0-18': 5, '19-23': 13, '24-28': 13, '29-33': 13, '34-38': 13, '39-43': 13, '44-48': 8, '49-53': 8, '54-58': 8, '59+': 3 }
  },
  'otite': {
    'm': { '0-18': 15, '19-23': -5, '24-28': -10, '29-33': -10, '34-38': -10, '39-43': -10, '44-48': -10, '49-53': -10, '54-58': -10, '59+': -10 },
    'f': { '0-18': 15, '19-23': -5, '24-28': -10, '29-33': -10, '34-38': -10, '39-43': -10, '44-48': -10, '49-53': -10, '54-58': -10, '59+': -10 },
    'o': { '0-18': 15, '19-23': -5, '24-28': -10, '29-33': -10, '34-38': -10, '39-43': -10, '44-48': -10, '49-53': -10, '54-58': -10, '59+': -10 }
  },
  'faringite': {
    'm': { '0-18': 15, '19-23': 10, '24-28': 10, '29-33': 5, '34-38': 5, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 0 },
    'f': { '0-18': 15, '19-23': 10, '24-28': 10, '29-33': 5, '34-38': 5, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 0 },
    'o': { '0-18': 15, '19-23': 10, '24-28': 10, '29-33': 5, '34-38': 5, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 0 }
  },
  // Lote 2
  'amigdalite': {
    'm': { '0-18': 15, '19-23': 10, '24-28': 5, '29-33': 0, '34-38': 0, '39-43': -5, '44-48': -5, '49-53': -10, '54-58': -10, '59+': -10 },
    'f': { '0-18': 15, '19-23': 10, '24-28': 5, '29-33': 0, '34-38': 0, '39-43': -5, '44-48': -5, '49-53': -10, '54-58': -10, '59+': -10 },
    'o': { '0-18': 15, '19-23': 10, '24-28': 5, '29-33': 0, '34-38': 0, '39-43': -5, '44-48': -5, '49-53': -10, '54-58': -10, '59+': -10 }
  },
  'infeccao_urinaria': {
    'm': { '0-18': -5, '19-23': -10, '24-28': -10, '29-33': -10, '34-38': -10, '39-43': -10, '44-48': -5, '49-53': 0, '54-58': 5, '59+': 10 },
    'f': { '0-18': 5, '19-23': 15, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 15, '49-53': 10, '54-58': 10, '59+': 10 },
    'o': { '0-18': 0, '19-23': 3, '24-28': 3, '29-33': 3, '34-38': 3, '39-43': 3, '44-48': 5, '49-53': 5, '54-58': 8, '59+': 10 }
  },
  'pielonefrite': {
    'm': { '0-18': 0, '19-23': -10, '24-28': -15, '29-33': -15, '34-38': -10, '39-43': -10, '44-48': -5, '49-53': 0, '54-58': 5, '59+': 10 },
    'f': { '0-18': 5, '19-23': 15, '24-28': 15, '29-33': 15, '34-38': 10, '39-43': 10, '44-48': 10, '49-53': 5, '54-58': 5, '59+': 10 },
    'o': { '0-18': 3, '19-23': 3, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 3, '49-53': 3, '54-58': 5, '59+': 10 }
  },
  'gastroenterite': {
    'm': { '0-18': 15, '19-23': 10, '24-28': 10, '29-33': 5, '34-38': 5, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 5 },
    'f': { '0-18': 15, '19-23': 10, '24-28': 10, '29-33': 5, '34-38': 5, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 5 },
    'o': { '0-18': 15, '19-23': 10, '24-28': 10, '29-33': 5, '34-38': 5, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 5 }
  },
  'gastrite': {
    'm': { '0-18': -10, '19-23': 0, '24-28': 5, '29-33': 5, '34-38': 5, '39-43': 10, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'f': { '0-18': -10, '19-23': 0, '24-28': 5, '29-33': 5, '34-38': 5, '39-43': 10, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'o': { '0-18': -10, '19-23': 0, '24-28': 5, '29-33': 5, '34-38': 5, '39-43': 10, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 }
  },
  'colecistite': {
    'm': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 5, '44-48': 10, '49-53': 10, '54-58': 10, '59+': 15 },
    'f': { '0-18': -10, '19-23': -5, '24-28': 0, '29-33': 5, '34-38': 10, '39-43': 15, '44-48': 15, '49-53': 15, '54-58': 15, '59+': 15 },
    'o': { '0-18': -13, '19-23': -8, '24-28': -3, '29-33': 3, '34-38': 8, '39-43': 10, '44-48': 13, '49-53': 13, '54-58': 13, '59+': 15 }
  },
  'pancreatite': {
    'm': { '0-18': -10, '19-23': -5, '24-28': 0, '29-33': 5, '34-38': 10, '39-43': 15, '44-48': 15, '49-53': 15, '54-58': 10, '59+': 10 },
    'f': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 10, '44-48': 15, '49-53': 15, '54-58': 15, '59+': 15 },
    'o': { '0-18': -13, '19-23': -8, '24-28': -3, '29-33': 3, '34-38': 8, '39-43': 13, '44-48': 15, '49-53': 15, '54-58': 13, '59+': 13 }
  },
  'ulcera': {
    'm': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 10, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'f': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 10, '44-48': 10, '49-53': 10, '54-58': 15, '59+': 15 },
    'o': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 10, '44-48': 10, '49-53': 13, '54-58': 15, '59+': 15 }
  },
  'doenca_coronariana': {
    'm': { '0-18': -15, '19-23': -15, '24-28': -10, '29-33': -5, '34-38': 0, '39-43': 5, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'f': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -10, '34-38': -5, '39-43': 0, '44-48': 5, '49-53': 10, '54-58': 15, '59+': 15 },
    'o': { '0-18': -15, '19-23': -15, '24-28': -13, '29-33': -8, '34-38': -3, '39-43': 3, '44-48': 8, '49-53': 13, '54-58': 15, '59+': 15 }
  },
  'infarto': {
    'm': { '0-18': -15, '19-23': -15, '24-28': -10, '29-33': -5, '34-38': 0, '39-43': 5, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'f': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -10, '34-38': -5, '39-43': 0, '44-48': 5, '49-53': 10, '54-58': 15, '59+': 15 },
    'o': { '0-18': -15, '19-23': -15, '24-28': -13, '29-33': -8, '34-38': -3, '39-43': 3, '44-48': 8, '49-53': 13, '54-58': 15, '59+': 15 }
  },
  'artrite_reumatoide': {
    'm': { '0-18': -10, '19-23': -5, '24-28': 0, '29-33': 5, '34-38': 5, '39-43': 5, '44-48': 5, '49-53': 5, '54-58': 5, '59+': 5 },
    'f': { '0-18': -5, '19-23': 5, '24-28': 10, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 10, '49-53': 10, '54-58': 10, '59+': 5 },
    'o': { '0-18': -8, '19-23': 0, '24-28': 5, '29-33': 10, '34-38': 10, '39-43': 10, '44-48': 8, '49-53': 8, '54-58': 8, '59+': 5 }
  },
  'gota': {
    'm': { '0-18': -10, '19-23': -5, '24-28': 0, '29-33': 5, '34-38': 10, '39-43': 15, '44-48': 15, '49-53': 15, '54-58': 10, '59+': 10 },
    'f': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': -5, '34-38': 0, '39-43': 0, '44-48': 5, '49-53': 5, '54-58': 10, '59+': 10 },
    'o': { '0-18': -13, '19-23': -8, '24-28': -3, '29-33': 0, '34-38': 5, '39-43': 8, '44-48': 10, '49-53': 10, '54-58': 10, '59+': 10 }
  },
  'prostatite': {
    'm': { '0-18': -10, '19-23': 5, '24-28': 10, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 10, '49-53': 5, '54-58': 0, '59+': -5 },
    'f': { '0-18': -99, '19-23': -99, '24-28': -99, '29-33': -99, '34-38': -99, '39-43': -99, '44-48': -99, '49-53': -99, '54-58': -99, '59+': -99 },
    'o': { '0-18': -10, '19-23': 3, '24-28': 5, '29-33': 8, '34-38': 8, '39-43': 8, '44-48': 5, '49-53': 3, '54-58': 0, '59+': -5 }
  },
  'angina': {
    'm': { '0-18': -15, '19-23': -15, '24-28': -10, '29-33': -5, '34-38': 0, '39-43': 5, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'f': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -10, '34-38': -5, '39-43': 0, '44-48': 5, '49-53': 10, '54-58': 15, '59+': 15 },
    'o': { '0-18': -15, '19-23': -15, '24-28': -13, '29-33': -8, '34-38': -3, '39-43': 3, '44-48': 8, '49-53': 13, '54-58': 15, '59+': 15 }
  },
  // Lote 3
  'hipertensao': {
    'm': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 10, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'f': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': -5, '34-38': 0, '39-43': 5, '44-48': 10, '49-53': 10, '54-58': 15, '59+': 15 },
    'o': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': -3, '34-38': 3, '39-43': 8, '44-48': 10, '49-53': 13, '54-58': 15, '59+': 15 }
  },
  'acidente_vascular': {
    'm': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -10, '34-38': -5, '39-43': 0, '44-48': 5, '49-53': 10, '54-58': 15, '59+': 15 },
    'f': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -10, '34-38': -5, '39-43': -5, '44-48': 0, '49-53': 5, '54-58': 10, '59+': 15 },
    'o': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -10, '34-38': -5, '39-43': -3, '44-48': 3, '49-53': 8, '54-58': 13, '59+': 15 }
  },
  'diabetes2': {
    'm': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 10, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'f': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 5, '44-48': 10, '49-53': 10, '54-58': 15, '59+': 15 },
    'o': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 5, '39-43': 8, '44-48': 10, '49-53': 13, '54-58': 15, '59+': 15 }
  },
  'hipotireoidismo': {
    'm': { '0-18': -10, '19-23': -5, '24-28': -5, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 5, '49-53': 5, '54-58': 5, '59+': 10 },
    'f': { '0-18': 0, '19-23': 5, '24-28': 10, '29-33': 10, '34-38': 10, '39-43': 15, '44-48': 15, '49-53': 15, '54-58': 15, '59+': 15 },
    'o': { '0-18': -5, '19-23': 0, '24-28': 3, '29-33': 5, '34-38': 5, '39-43': 8, '44-48': 10, '49-53': 10, '54-58': 10, '59+': 13 }
  },
  'hipertireoidismo': {
    'm': { '0-18': -10, '19-23': -5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': -5, '44-48': -5, '49-53': -5, '54-58': -10, '59+': -10 },
    'f': { '0-18': 0, '19-23': 10, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 15, '49-53': 10, '54-58': 5, '59+': 5 },
    'o': { '0-18': -5, '19-23': 3, '24-28': 8, '29-33': 8, '34-38': 8, '39-43': 5, '44-48': 5, '49-53': 3, '54-58': -3, '59+': -3 }
  },
  'depressao': {
    'm': { '0-18': 5, '19-23': 10, '24-28': 10, '29-33': 10, '34-38': 5, '39-43': 5, '44-48': 5, '49-53': 5, '54-58': 10, '59+': 10 },
    'f': { '0-18': 10, '19-23': 15, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 10, '44-48': 10, '49-53': 10, '54-58': 15, '59+': 15 },
    'o': { '0-18': 8, '19-23': 13, '24-28': 13, '29-33': 13, '34-38': 10, '39-43': 8, '44-48': 8, '49-53': 8, '54-58': 13, '59+': 13 }
  },
  'fobia_especifica': {
    'm': { '0-18':15, '19-23':15, '24-28':10, '29-33':10, '34-38':5, '39-43':5, '44-48':0, '49-53':0, '54-58':0, '59+':0 },
    'f': { '0-18':15, '19-23':15, '24-28':10, '29-33':10, '34-38':5, '39-43':5, '44-48':0, '49-53':0, '54-58':0, '59+':0 },
    'o': { '0-18':15, '19-23':15, '24-28':10, '29-33':10, '34-38':5, '39-43':5, '44-48':0, '49-53':0, '54-58':0, '59+':0 }
  },
  'panico': {
    'm': { '0-18':5, '19-23':10, '24-28':15, '29-33':15, '34-38':10, '39-43':5, '44-48':0, '49-53':0, '54-58':0, '59+':0 },
    'f': { '0-18':10, '19-23':15, '24-28':20, '29-33':20, '34-38':15, '39-43':10, '44-48':5, '49-53':0, '54-58':0, '59+':0 },
    'o': { '0-18':8, '19-23':13, '24-28':18, '29-33':18, '34-38':13, '39-43':8, '44-48':3, '49-53':0, '54-58':0, '59+':0 }
  },
  'tag': {
    'm': { '0-18':5, '19-23':10, '24-28':10, '29-33':10, '34-38':10, '39-43':10, '44-48':10, '49-53':10, '54-58':10, '59+':10 },
    'f': { '0-18':10, '19-23':15, '24-28':15, '29-33':15, '34-38':15, '39-43':15, '44-48':15, '49-53':15, '54-58':15, '59+':15 },
    'o': { '0-18':8, '19-23':13, '24-28':13, '29-33':13, '34-38':13, '39-43':13, '44-48':13, '49-53':13, '54-58':13, '59+':13 }
  },
  'insônia': {
    'm': { '0-18': -5, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 5, '39-43': 5, '44-48': 5, '49-53': 10, '54-58': 10, '59+': 15 },
    'f': { '0-18': 0, '19-23': 5, '24-28': 5, '29-33': 5, '34-38': 10, '39-43': 10, '44-48': 15, '49-53': 15, '54-58': 15, '59+': 15 },
    'o': { '0-18': -3, '19-23': 3, '24-28': 3, '29-33': 3, '34-38': 8, '39-43': 8, '44-48': 10, '49-53': 13, '54-58': 13, '59+': 15 }
  },
  'dpoc': {
    'm': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -15, '34-38': -10, '39-43': -5, '44-48': 0, '49-53': 5, '54-58': 10, '59+': 15 },
    'f': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -15, '34-38': -15, '39-43': -10, '44-48': -5, '49-53': 0, '54-58': 5, '59+': 10 },
    'o': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -15, '34-38': -13, '39-43': -8, '44-48': -3, '49-53': 3, '54-58': 8, '59+': 13 }
  },
  'tuberculose': {
    'm': { '0-18': 5, '19-23': 10, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 15, '49-53': 10, '54-58': 10, '59+': 10 },
    'f': { '0-18': 0, '19-23': 5, '24-28': 10, '29-33': 10, '34-38': 10, '39-43': 5, '44-48': 5, '49-53': 5, '54-58': 5, '59+': 5 },
    'o': { '0-18': 3, '19-23': 8, '24-28': 13, '29-33': 13, '34-38': 13, '39-43': 10, '44-48': 10, '49-53': 8, '54-58': 8, '59+': 8 }
  },
  // Lote 4
  'malaria': {
    'm': { '0-18': 10, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 0 },
    'f': { '0-18': 10, '19-23': 5, '24-28': 5, '29-33': 5, '34-38': 5, '39-43': 5, '44-48': 5, '49-53': 0, '54-58': 0, '59+': 0 },
    'o': { '0-18': 10, '19-23': 3, '24-28': 3, '29-33': 3, '34-38': 3, '39-43': 3, '44-48': 3, '49-53': 0, '54-58': 0, '59+': 0 }
  },
  'chikungunya': {
    'm': { '0-18': 0, '19-23': 5, '24-28': 10, '29-33': 10, '34-38': 10, '39-43': 10, '44-48': 10, '49-53': 5, '54-58': 5, '59+': 5 },
    'f': { '0-18': 0, '19-23': 10, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 15, '49-53': 10, '54-58': 10, '59+': 10 },
    'o': { '0-18': 0, '19-23': 8, '24-28': 13, '29-33': 13, '34-38': 13, '39-43': 13, '44-48': 13, '49-53': 8, '54-58': 8, '59+': 8 }
  },
  'zika': {
    'm': { '0-18': 0, '19-23': 5, '24-28': 10, '29-33': 10, '34-38': 10, '39-43': 5, '44-48': 5, '49-53': 0, '54-58': 0, '59+': 0 },
    'f': { '0-18': 0, '19-23': 10, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 10, '44-48': 10, '49-53': 5, '54-58': 0, '59+': 0 },
    'o': { '0-18': 0, '19-23': 8, '24-28': 13, '29-33': 13, '34-38': 13, '39-43': 8, '44-48': 8, '49-53': 3, '54-58': 0, '59+': 0 }
  },
  'ler': {
    'm': { '0-18': -15, '19-23': 5, '24-28': 10, '29-33': 10, '34-38': 10, '39-43': 10, '44-48': 10, '49-53': 5, '54-58': 5, '59+': -10 },
    'f': { '0-18': -15, '19-23': 10, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 15, '49-53': 10, '54-58': 10, '59+': -10 },
    'o': { '0-18': -15, '19-23': 8, '24-28': 13, '29-33': 13, '34-38': 13, '39-43': 13, '44-48': 13, '49-53': 8, '54-58': 8, '59+': -10 }
  },
  'dermatite': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': -5, '54-58': -5, '59+': -5 },
    'f': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': -5, '54-58': -5, '59+': -5 },
    'o': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': -5, '54-58': -5, '59+': -5 }
  },
  'celulite': {
    'm': { '0-18': 10, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 5, '49-53': 10, '54-58': 10, '59+': 15 },
    'f': { '0-18': 10, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 5, '49-53': 10, '54-58': 10, '59+': 15 },
    'o': { '0-18': 10, '19-23': 0, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 5, '49-53': 10, '54-58': 10, '59+': 15 }
  },
  'herpes': {
    'm': { '0-18': 5, '19-23': 10, '24-28': 15, '29-33': 15, '34-38': 10, '39-43': 5, '44-48': 5, '49-53': 0, '54-58': 0, '59+': 0 },
    'f': { '0-18': 5, '19-23': 15, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 10, '44-48': 5, '49-53': 0, '54-58': 0, '59+': 0 },
    'o': { '0-18': 5, '19-23': 13, '24-28': 15, '29-33': 15, '34-38': 13, '39-43': 8, '44-48': 5, '49-53': 0, '54-58': 0, '59+': 0 }
  },
  'varicela': {
    'm': { '0-18': 15, '19-23': -5, '24-28': -10, '29-33': -10, '34-38': -10, '39-43': -10, '44-48': -10, '49-53': -10, '54-58': -10, '59+': -10 },
    'f': { '0-18': 15, '19-23': -5, '24-28': -10, '29-33': -10, '34-38': -10, '39-43': -10, '44-48': -10, '49-53': -10, '54-58': -10, '59+': -10 },
    'o': { '0-18': 15, '19-23': -5, '24-28': -10, '29-33': -10, '34-38': -10, '39-43': -10, '44-48': -10, '49-53': -10, '54-58': -10, '59+': -10 }
  },
  'sarampo': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 5, '29-33': 0, '34-38': 0, '39-43': -5, '44-48': -5, '49-53': -5, '54-58': -10, '59+': -10 },
    'f': { '0-18': 15, '19-23': 5, '24-28': 5, '29-33': 0, '34-38': 0, '39-43': -5, '44-48': -5, '49-53': -5, '54-58': -10, '59+': -10 },
    'o': { '0-18': 15, '19-23': 5, '24-28': 5, '29-33': 0, '34-38': 0, '39-43': -5, '44-48': -5, '49-53': -5, '54-58': -10, '59+': -10 }
  },
  'rubéola': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': -5, '39-43': -10, '44-48': -10, '49-53': -10, '54-58': -10, '59+': -10 },
    'f': { '0-18': 15, '19-23': 10, '24-28': 10, '29-33': 5, '34-38': 5, '39-43': 5, '44-48': 0, '49-53': -5, '54-58': -10, '59+': -10 },
    'o': { '0-18': 15, '19-23': 8, '24-28': 5, '29-33': 3, '34-38': 0, '39-43': -3, '44-48': -5, '49-53': -8, '54-58': -10, '59+': -10 }
  },
  // Lote 5
  'conjuntivite': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 0 },
    'f': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 0 },
    'o': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 0, '54-58': 0, '59+': 0 }
  },
  'meningite': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': 0, '54-58': 5, '59+': 10 },
    'f': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': 0, '54-58': 5, '59+': 10 },
    'o': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': 0, '54-58': 5, '59+': 10 }
  },
  'sepsis': {
    'm': { '0-18': 15, '19-23': 0, '24-28': -5, '29-33': -5, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': 0, '54-58': 10, '59+': 15 },
    'f': { '0-18': 15, '19-23': 0, '24-28': -5, '29-33': -5, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': 0, '54-58': 10, '59+': 15 },
    'o': { '0-18': 15, '19-23': 0, '24-28': -5, '29-33': -5, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': 0, '54-58': 10, '59+': 15 }
  },
  'anemia': {
    'm': { '0-18': 10, '19-23': -5, '24-28': -5, '29-33': -5, '34-38': -5, '39-43': -5, '44-48': -5, '49-53': 0, '54-58': 5, '59+': 10 },
    'f': { '0-18': 10, '19-23': 15, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 15, '44-48': 15, '49-53': 10, '54-58': 10, '59+': 15 },
    'o': { '0-18': 10, '19-23': 5, '24-28': 5, '29-33': 5, '34-38': 5, '39-43': 5, '44-48': 5, '49-53': 5, '54-58': 8, '59+': 13 }
  },
  'epilepsia': {
    'm': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 5, '54-58': 10, '59+': 15 },
    'f': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 5, '54-58': 10, '59+': 15 },
    'o': { '0-18': 15, '19-23': 5, '24-28': 0, '29-33': 0, '34-38': 0, '39-43': 0, '44-48': 0, '49-53': 5, '54-58': 10, '59+': 15 }
  },
  'insuficiencia_renal': {
      'm': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 0, '39-43': 5, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 20 },
      'f': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 0, '39-43': 5, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 20 },
      'o': { '0-18': -15, '19-23': -10, '24-28': -5, '29-33': 0, '34-38': 0, '39-43': 5, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 20 }
  },
  'apendicite': {
    'm': { '0-18': 15, '19-23': 15, '24-28': 10, '29-33': 5, '34-38': 0, '39-43': 0, '44-48': -5, '49-53': -5, '54-58': -10, '59+': -10 },
    'f': { '0-18': 10, '19-23': 10, '24-28': 10, '29-33': 5, '34-38': 0, '39-43': 0, '44-48': -5, '49-53': -5, '54-58': -10, '59+': -10 },
    'o': { '0-18': 13, '19-23': 13, '24-28': 10, '29-33': 5, '34-38': 0, '39-43': 0, '44-48': -5, '49-53': -5, '54-58': -10, '59+': -10 }
  },
  'cistite_cronica': {
    'm': { '0-18': -15, '19-23': -15, '24-28': -15, '29-33': -15, '34-38': -10, '39-43': -10, '44-48': -5, '49-53': 0, '54-58': 5, '59+': 5 },
    'f': { '0-18': 0, '19-23': 10, '24-28': 15, '29-33': 15, '34-38': 15, '39-43': 10, '44-48': 10, '49-53': 15, '54-58': 15, '59+': 15 },
    'o': { '0-18': -8, '19-23': -3, '24-28': 0, '29-33': 0, '34-38': 3, '39-43': 0, '44-48': 3, '49-53': 8, '54-58': 10, '59+': 10 }
  },
  'artrose': {
    'm': { '0-18':-15, '19-23':-10, '24-28':-5, '29-33':0, '34-38':0, '39-43':5, '44-48':10, '49-53':15, '54-58':15, '59+':20 },
    'f': { '0-18':-15, '19-23':-10, '24-28':-5, '29-33':0, '34-38':5, '39-43':10, '44-48':15, '49-53':15, '54-58':20, '59+':20 },
    'o': { '0-18':-15, '19-23':-10, '24-28':-5, '29-33':0, '34-38':3, '39-43':8, '44-48':13, '49-53':15, '54-58':18, '59+':20 }
  },
  'fibromialgia': {
    'm': { '0-18':-10, '19-23':-5, '24-28':0, '29-33':5, '34-38':5, '39-43':5, '44-48':5, '49-53':5, '54-58':0, '59+':0 },
    'f': { '0-18':0, '19-23':5, '24-28':10, '29-33':15, '34-38':15, '39-43':15, '44-48':15, '49-53':15, '54-58':10, '59+':5 },
    'o': { '0-18':-5, '19-23':0, '24-28':5, '29-33':10, '34-38':10, '39-43':10, '44-48':10, '49-53':10, '54-58':5, '59+':3 }
  },
  'lupus': {
    'm': { '0-18':-10, '19-23':0, '24-28':0, '29-33':0, '34-38':0, '39-43':-5, '44-48':-5, '49-53':-10, '54-58':-10, '59+':-15 },
    'f': { '0-18':5, '19-23':15, '24-28':15, '29-33':15, '34-38':15, '39-43':15, '44-48':10, '49-53':5, '54-58':0, '59+':0 },
    'o': { '0-18':-3, '19-23':8, '24-28':8, '29-33':8, '34-38':8, '39-43':5, '44-48':3, '49-53':-3, '54-58':-5, '59+':-8 }
  }
};
const RISK_FACTOR_BONUS = {
  'fumante': { 'dpoc': 15, 'infarto': 10, 'acidente_vascular': 10, 'doenca_coronariana': 10, 'angina': 10, 'hipertensao': 5, 'pneumonia': 5, 'bronquite': 5, 'ulcera': 5, 'artrite_reumatoide': 10, 'psoriase': 10 },
  'hipertenso': { 'hipertensao': 15, 'infarto': 15, 'acidente_vascular': 15, 'doenca_coronariana': 15, 'angina': 15, 'sepsis': 5, 'insuficiencia_renal': 20, 'gota': 5 },
  'diabetico': { 'diabetes2': 20, 'infarto': 10, 'acidente_vascular': 10, 'doenca_coronariana': 10, 'angina': 10, 'celulite': 10, 'sepsis': 5, 'pielonefrite': 5, 'insuficiencia_renal': 20, 'candidiase_vaginal': 15, 'balanite_candidiaca': 15 },
  'obeso': { 'diabetes2': 10, 'hipertensao': 10, 'infarto': 5, 'acidente_vascular': 5, 'doenca_coronariana': 5, 'angina': 5, 'calculo_renal': 5, 'gota': 10, 'artrose': 15, 'sop': 15, 'mioma_uterino': 10, 'psoriase': 5 },
  'asmatico': { 'asma': 20, 'covid19': 5, 'gripe': 5, 'pneumonia': 5, 'bronquite': 5 },
  'gestante': { 'anemia': 10, 'infeccao_urinaria': 10, 'pielonefrite': 10, 'hipertensao': 5 }
};
const SYMPTOM_QUALIFIERS = {
  'corrimento_vaginal': [
    { id: 'branco_espesso', label: 'Branco, espesso (Nata/Queijo Cottage)' },
    { id: 'amarelo_esverdeado', label: 'Amarelo-esverdeado (com odor)' },
    { id: 'acinzentado_odor', label: 'Acinzentado (com odor de peixe)' }
  ],
  'dor_corpo': [
    { id: 'difusa_generalizada', label: 'Difusa / Generalizada (corpo todo)' },
    { id: 'pontos_sensiveis', label: 'Em pontos sensíveis (ao toque)' },
    { id: 'muscular_localizada', label: 'Muscular / Localizada (pós-esforço)' }
  ],
  'ansiedade_sintoma': [
    { id: 'foco_especifico', label: 'Medo focado (ex: Aranha, Altura, Avião)' },
    { id: 'ataques_subitos', label: 'Medo súbito, intenso, "sensação de morte"' },
    { id: 'preocupacao_cronica', label: 'Preocupação crônica (sobre tudo, o dia todo)' }
  ],
  'rigidez_matinal': [
    { id: 'longa_duracao', label: 'Longa Duração (> 30 min)' },
    { id: 'curta_duracao', label: 'Curta Duração (< 30 min) / Pós-repouso' }
  ],
  'manchas_pele': [
    { id: 'coceira', label: 'Com Coceira Intensa' },
    { id: 'rash', label: 'Vermelhas / Elevadas (Rash)' },
    { id: 'petequias', label: 'Pontos Vermelhos/Roxos (Petéquias)'},
    { id: 'placas_prateadas', label: 'Placas secas, grossas, prateadas' },
    { id: 'vergoes_elevados', label: 'Vergões elevados que coçam (Urticas)' },
    { id: 'nodulos_dolorosos', label: 'Nódulos/Cistos dolorosos (sob a pele)' }
    ],
  'insônia_sintoma': [
    { id: 'dificuldade_dormir', label: 'Dificuldade em adormecer / manter o sono' },
    { id: 'reducao_necessidade', label: 'Pouca necessidade de sono (ex: 3h/noite)' }
  ],
  'dispareunia': [
      { id: 'dor_profunda', label: 'Dor profunda (pélvica)', sex: 'f' },
      { id: 'dor_entrada', label: 'Dor na entrada (vaginal)', sex: 'f' },
      { id: 'dor_ejaculacao', label: 'Dor durante/após ejaculação', sex: 'm' }
  ],
  'tontura': [
    { id: 'rotatoria', label: 'Vertigem (sensação de girar)' },
    { id: 'pre_desmaio', label: 'Sensação de pré-desmaio / fraqueza' },
    { id: 'desequilibrio', label: 'Desequilíbrio / Instabilidade' }
  ],
  'prurido': [
    { id: 'generalizado_renal', label: 'Generalizada (corpo todo), sem lesão' },
    { id: 'localizado_placas', label: 'Localizada (sobre placas de pele)' }
  ],
  'prurido_genital': [
    { id: 'corrimento_espesso', label: 'Com corrimento branco/espesso (Nata)', sex: 'f' },
    { id: 'vermelhidao_vulvar', label: 'Com vermelhidão/inchaço (Vulva)', sex: 'f' },
    { id: 'placas_glande', label: 'Com placas brancas (Glande)', sex: 'm' },
    { id: 'vermelhidao_peniana', label: 'Com vermelhidão/inchaço (Pênis)', sex: 'm' }
  ],
  'tosse': [
    { id: 'seca', label: 'Seca' },
    { id: 'catarro', label: 'Com Catarro (Amarelo/Verde)' },
    { id: 'sangue', label: 'Com Sangue' }
  ],
  'dor_articular': [
    { id: 'dedao_pe', label: 'Inchaço/Dor no Dedão do Pé' },
    { id: 'vermelhidao_calor', label: 'Vermelhidão e calor intenso no local' },
    { id: 'simetrica_maos', label: 'Dor simétrica (mãos/pulsos)' }
  ],
  'disuria': [
    { id: 'jato_fraco', label: 'Jato urinário fraco / interrompido' },
    { id: 'ardencia', label: 'Ardência / Queimação ao urinar' }
  ],
  'dor_abdominal': [
    { id: 'epigastrica', label: 'Na "Boca do Estômago"' },
    { id: 'qid', label: 'No Lado Direito Inferior (QID)' },
    { id: 'colica', label: 'Cólica / Pontada' },
    { id: 'difusa', label: 'Difusa / Geral' }
  ],
  'dor_peito': [
    { id: 'aperto', label: 'Em Aperto / Pressão' },
    { id: 'irradia', label: 'Irradia (Braço/Pescoço/Costas)' },
    { id: 'piora_resp', label: 'Piora ao Respirar / Tocar' }
  ],
  'edema': [
    { id: 'pernas_rosto', label: 'Em pernas, tornozelos ou rosto' },
    { id: 'localizado_trauma', label: 'Localizado (após pancada)' }
  ],
  'dor_flanco': [
    { id: 'irradia_virilha', label: 'Irradia para virilha / genitais' },
    { id: 'colica_intensa', label: 'Cólica intensa (intermitente)' }
  ],
  'febre': [
    { id: 'baixa', label: 'Baixa (< 38°C)' },
    { id: 'moderada', label: 'Moderada (38°C - 38.9°C)' },
    { id: 'alta', label: 'Alta (≥ 39°C)' }
  ],
  'cefaleia': [
    { id: 'intensa_subita', label: 'Intensa / Súbita' },
    { id: 'pulsatil', label: 'Pulsátil / Latejante' },
    { id: 'nausea_vomito', label: 'Com Náusea / Vômito' },
    { id: 'com_aura', label: 'Com Aura Visual (luzes/pontos)' }
  ],
  'tremor_repouso': [
    { id: 'piora_repouso', label: 'Pior em repouso ("contar moedas")' },
    { id: 'melhora_movimento', label: 'Melhora com movimento intencional' }
  ],
  'sangramento_uterino_anormal': [
    { id: 'menstruacao_longa', label: 'Menstruação longa (> 7 dias)' },
    { id: 'fluxo_intenso', label: 'Fluxo muito intenso (coágulos)' },
    { id: 'fora_do_ciclo', label: 'Sangramento fora do ciclo' }
  ],
  'dispneia': [
    { id: 'repouso', label: 'Em Repouso' },
    { id: 'esforco', label: 'Ao Esforço' },
    { id: 'chiado', label: 'Com Chiado no Peito' }
  ],
  'vomito': [
    { id: 'sangue_vom', label: 'Com Sangue' },
    { id: 'jato', label: 'Incontrolável / Jato' },
    { id: 'pos_comer', label: 'Após Comer' }
  ]
};
