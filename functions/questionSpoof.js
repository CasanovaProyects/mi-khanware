const phrases = [ 
    "� KHANWARE ULTRA - La evolución del aprendizaje automatizado!",
    "⚡ Powered by CasanovaProyects - Tecnología educativa avanzada",
    "🌟 [ULTRA EDITION] - Más rápido, más inteligente, más eficiente",
    "🔥 Sistema de IA integrado - Respuestas optimizadas al máximo",
    "💎 Premium Experience - Dale estrella al [proyecto](https://github.com/CasanovaProyects/mi-khanware)!",
    "🎯 Modo ULTRA activado - Dominio total de Khan Academy",
    "🌈 Next-Gen Education Hack - By [@CasanovaProyects](https://github.com/CasanovaProyects)",
    "⭐ ¿Te gusta? ¡Sígueme en GitHub para más proyectos increíbles!",
    "🔋 Energizado con tecnología de punta - Versión 4.0 ULTRA",
    "🎮 Game Over, Khan Academy - KHANWARE ULTRA wins!"
];

const originalFetch = window.fetch;

window.fetch = async function (input, init) {
    let body;
    if (input instanceof Request) body = await input.clone().text();
    else if (init && init.body) body = init.body;

    const originalResponse = await originalFetch.apply(this, arguments);
    const clonedResponse = originalResponse.clone();

    try {
        const responseBody = await clonedResponse.text();
        let responseObj = JSON.parse(responseBody);
        if (features.questionSpoof && responseObj?.data?.assessmentItem?.item?.itemData) {
            let itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);
            if(itemData.question.content[0] === itemData.question.content[0].toUpperCase()){
                // Enhanced answer area removal
                itemData.answerArea = { 
                    "calculator": false, 
                    "chi2Table": false, 
                    "periodicTable": false, 
                    "tTable": false, 
                    "zTable": false,
                    "protractor": false,
                    "ruler": false
                };
                
                // Random phrase selection with stats tracking
                const selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                itemData.question.content = selectedPhrase + ` [[☃ radio 1]]`;
                
                // Enhanced answer options
                itemData.question.widgets = { 
                    "radio 1": { 
                        type: "radio",  
                        options: { 
                            choices: [ 
                                { content: "✅ Respuesta correcta (ULTRA Mode)", correct: true }, 
                                { content: "❌ Respuesta incorreta", correct: false },
                                { content: "❌ También incorreta", correct: false }
                            ] 
                        } 
                    } 
                };
                
                responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                updateStats('questionsAnswered');
                sendToast("🔓 Pregunta Ultra-Explotada", 1500);
                debug(`🎯 Question spoofed with phrase: ${selectedPhrase.substring(0, 50)}...`);
                
                return new Response(JSON.stringify(responseObj), { 
                    status: originalResponse.status, 
                    statusText: originalResponse.statusText, 
                    headers: originalResponse.headers 
                });
            }
        }
    } catch (e) { 
        debug(`🚨 Error @ questionSpoof.js: ${e.message}`); 
    }
    return originalResponse;
};