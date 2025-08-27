const ver = "V4.0.0-ULTRA";
let isDev = false;

// SISTEMA DE PROTECCIÓN ANTI-RASTREO
const securityConfig = {
    useProxy: true,
    obfuscateUrls: true,
    fakeBrowser: true,
    hideConsole: true,
    randomizeFingerprint: true
};

// URLs ofuscadas y rotativas
const mirrorUrls = [
    'https://cdn.jsdelivr.net/gh/CasanovaProyects/mi-khanware@main/',
    'https://cdn.statically.io/gh/CasanovaProyects/mi-khanware/main/',
    'https://raw.githubusercontent.com/CasanovaProyects/mi-khanware/main/',
    'https://gitcdn.xyz/repo/CasanovaProyects/mi-khanware/main/',
];

// Seleccionar URL aleatoria para evitar patrones
const getRandomMirror = () => mirrorUrls[Math.floor(Math.random() * mirrorUrls.length)];
const repoPath = getRandomMirror();

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

/* User */
let user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
}

let loadedPlugins = [];

/* Elements */
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

/* Globals Enhanced */
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false,
    stealthMode: true,
    smartDelay: true,
    autoNavigation: false,
    statisticsPanel: true,
    humanBehavior: true,
    antiDetection: true
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: "",
    stealthLevel: 3,
    humanVariation: 50
};
window.statistics = {
    questionsAnswered: 0,
    videosCompleted: 0,
    minutesGenerated: 0,
    sessionsCount: 0,
    totalTimeUsed: 0,
    startTime: Date.now(),
    lastActivity: Date.now()
};

/* Security & Anti-Detection System */
const SecurityShield = {
    // Fake User Agent rotativo
    userAgents: [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0'
    ],
    
    // Ofuscar console.log
    hideConsoleLogs: () => {
        if (!securityConfig.hideConsole) return;
        const originalLog = console.log;
        console.log = function(...args) {
            // Solo mostrar si no contiene palabras clave sensibles
            const text = args.join(' ');
            if (!text.includes('KHANWARE') && !text.includes('CasanovaProyects')) {
                originalLog.apply(console, args);
            }
        };
    },
    
    // Randomizar fingerprint del navegador
    randomizeFingerprint: () => {
        if (!securityConfig.randomizeFingerprint) return;
        
        // Fake screen resolution
        Object.defineProperty(screen, 'width', { value: 1920 + Math.floor(Math.random() * 400) });
        Object.defineProperty(screen, 'height', { value: 1080 + Math.floor(Math.random() * 200) });
        
        // Fake timezone
        const fakeTimezone = ['America/New_York', 'Europe/London', 'Asia/Tokyo'][Math.floor(Math.random() * 3)];
        Object.defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
            value: () => ({ timeZone: fakeTimezone })
        });
    },
    
    // Interceptar y ofuscar requests
    protectRequests: () => {
        const originalFetch = window.fetch;
        window.fetch = async function(input, init = {}) {
            // Agregar headers de protección
            if (!init.headers) init.headers = {};
            
            // User agent rotativo
            if (securityConfig.fakeBrowser) {
                init.headers['User-Agent'] = SecurityShield.userAgents[Math.floor(Math.random() * SecurityShield.userAgents.length)];
            }
            
            // Headers adicionales de protección
            init.headers['X-Forwarded-For'] = SecurityShield.generateFakeIP();
            init.headers['X-Real-IP'] = SecurityShield.generateFakeIP();
            
            return originalFetch.call(this, input, init);
        };
    },
    
    // Generar IP falsa para headers
    generateFakeIP: () => {
        return Array.from({length: 4}, () => Math.floor(Math.random() * 255)).join('.');
    },
    
    // Limpiar rastros en DOM
    cleanDOMTraces: () => {
        // Remover referencias directas al repositorio
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src && script.src.includes('CasanovaProyects')) {
                script.remove();
            }
        });
    },
    
    // Inicializar todas las protecciones
    init: () => {
        SecurityShield.hideConsoleLogs();
        SecurityShield.randomizeFingerprint();
        SecurityShield.protectRequests();
        SecurityShield.cleanDOMTraces();
        debug('🛡️ Sistema de protección ULTRA activado');
    }
};

/* Misc Styles */
document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"}));
document.querySelector("link[rel~='icon']").href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';

/* Emmiter */
class EventEmitter{constructor(){this.events={}}on(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}once(t,e){"string"==typeof t&&(t=[t]);let s=(...i)=>{e(...i),this.off(t,s)};this.on(t,s)}};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Enhanced Functions */
window.debug = function(text) { 
    if (window.debugMode && securityConfig.hideConsole) {
        // Solo guardar en memoria, no mostrar en consola
        if (!window.debugLog) window.debugLog = [];
        window.debugLog.push(`${new Date().toISOString()}: ${text}`);
        if (window.debugLog.length > 100) window.debugLog.shift(); // Máximo 100 entradas
    } else if (window.debugMode) {
        console.log(`[SISTEMA] ${text}`); // Texto ofuscado
    }
};
window.debugMode = false; // Desactivar por defecto para seguridad
window.getDebugLog = () => window.debugLog || [];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms + (features.humanBehavior ? Math.random() * ms * 0.3 : 0)));
const playAudio = url => { const audio = new Audio(url); audio.volume = 0.3; audio.play().catch(() => {}); debug(`🔊 Playing: ${url}`); };
const findAndClickBySelector = selector => { 
    const element = document.querySelector(selector); 
    if (element && element.offsetParent !== null) { 
        if(features.humanBehavior) {
            setTimeout(() => {
                element.dispatchEvent(new MouseEvent('mouseover'));
                setTimeout(() => element.click(), 50 + Math.random() * 100);
            }, Math.random() * 200);
        } else {
            element.click(); 
        }
        sendToast(`⭕ Clicking ${selector}...`, 1000); 
        return true;
    }
    return false;
};

// Smart Statistics System
const updateStats = (type, amount = 1) => {
    statistics[type] += amount;
    statistics.lastActivity = Date.now();
    localStorage.setItem('khanware_ultra_stats', JSON.stringify(statistics));
    debug(`📊 Stats updated: ${type} +${amount}`);
};

// Anti-Detection System
const antiDetection = {
    randomMouseMove: () => {
        if(!features.antiDetection) return;
        const event = new MouseEvent('mousemove', {
            clientX: Math.random() * window.innerWidth,
            clientY: Math.random() * window.innerHeight,
            bubbles: true
        });
        document.dispatchEvent(event);
    },
    
    randomScroll: () => {
        if(!features.antiDetection) return;
        const scrollAmount = (Math.random() - 0.5) * 200;
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    },
    
    simulateTyping: () => {
        if(!features.antiDetection) return;
        const input = document.querySelector('input[type="text"], textarea');
        if(input && Math.random() < 0.1) {
            input.focus();
            setTimeout(() => input.blur(), 100 + Math.random() * 200);
        }
    },
    
    init: () => {
        if(!features.antiDetection) return;
        setInterval(() => {
            if(Math.random() < 0.3) antiDetection.randomMouseMove();
            if(Math.random() < 0.1) antiDetection.randomScroll();
            if(Math.random() < 0.05) antiDetection.simulateTyping();
        }, 5000 + Math.random() * 10000);
    }
};

// Smart Delay Calculator
const smartDelay = () => {
    if(!features.smartDelay) return featureConfigs.autoAnswerDelay * 800;
    
    const baseDelay = featureConfigs.autoAnswerDelay * 800;
    const timeOfDay = new Date().getHours();
    const isSchoolHours = timeOfDay >= 8 && timeOfDay <= 17;
    const recentActivity = Date.now() - statistics.lastActivity < 30000;
    
    let multiplier = 1;
    if(isSchoolHours) multiplier += 0.5; // Más lento en horario escolar
    if(recentActivity) multiplier += 0.3; // Más lento si hay actividad reciente
    if(statistics.questionsAnswered > 20) multiplier += 0.4; // Más lento después de muchas preguntas
    
    return baseDelay * multiplier + (Math.random() * 1000); // Variación aleatoria
};

function sendToast(text, duration=5000, gravity='bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); debug(text); };

async function showSplashScreen() { 
    splashScreen.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background: linear-gradient(45deg, #000000, #1a1a2e, #16213e, #0f3460);
        background-size: 400% 400%;
        animation: gradientShift 3s ease infinite;
        display:flex;align-items:center;justify-content:center;z-index:9999;
        opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;
        font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;
    `; 
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        .ultra-logo { animation: pulse 2s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    
    splashScreen.innerHTML = `
        <div class="ultra-logo">
            <div style="font-size: 48px; margin-bottom: 20px;">📚</div>
            <div><span style="color:white;">STUDY</span><span style="color:#00ff41;">BOOST</span></div>
            <div style="font-size: 16px; margin-top: 20px; color: #00ff41;">Educational Enhancement</div>
            <div style="font-size: 12px; margin-top: 10px; color: #888;">Cargando sistema adaptativo...</div>
        </div>
    `; 
    document.body.appendChild(splashScreen); 
    setTimeout(() => splashScreen.style.opacity = '1', 10);
};async function hideSplashScreen() { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.remove(), 1000); };

async function loadScript(url, label) { return fetch(url).then(response => response.text()).then(script => { loadedPlugins.push(label); eval(script); }); }
async function loadCss(url) { return new Promise((resolve) => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.type = 'text/css'; link.href = url; link.onload = () => resolve(); document.head.appendChild(link); }); }

/* Visual Functions */
function setupMenu() {
    loadScript(repoPath+'visuals/mainMenu.js', 'mainMenu');
    loadScript(repoPath+'visuals/statusPanel.js', 'statusPanel');
    loadScript(repoPath+'visuals/widgetBot.js', 'widgetBot');
    if(isDev) loadScript(repoPath+'visuals/devTab.js', 'devTab');
}

/* Main Functions */ 
function setupMain(){
    loadScript(repoPath+'functions/questionSpoof.js', 'questionSpoof');
    loadScript(repoPath+'functions/videoSpoof.js', 'videoSpoof');
    loadScript(repoPath+'functions/minuteFarm.js', 'minuteFarm');
    loadScript(repoPath+'functions/spoofUser.js', 'spoofUser');
    loadScript(repoPath+'functions/answerRevealer.js', 'answerRevealer');
    loadScript(repoPath+'functions/rgbLogo.js', 'rgbLogo');
    loadScript(repoPath+'functions/customBanner.js', 'customBanner');
    loadScript(repoPath+'functions/autoAnswer.js', 'autoAnswer');
    loadScript(repoPath+'functions/ultraStats.js', 'ultraStats'); // New ULTRA module
}

/* Inject */
if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { alert("❌ Khanware Failed to Injected!\n\nVocê precisa executar o Khanware no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/"; }

showSplashScreen();

loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs').then(() => { onekoEl = document.getElementById('oneko'); onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')"; onekoEl.style.display = "none"; });
loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(()=>{ DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); })
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
.then(async () => {
    // Inicializar sistema de protección ANTES que todo
    SecurityShield.init();
    
    // Load saved statistics
    const savedStats = localStorage.getItem('khanware_ultra_stats');
    if(savedStats) {
        Object.assign(statistics, JSON.parse(savedStats));
        statistics.sessionsCount++;
        statistics.startTime = Date.now();
    }
    
    fetch("https://pt.khanacademy.org/api/internal/graphql/getFullUserProfile",{referrer:"https://pt.khanacademy.org/profile/me",body:'{"operationName":"getFullUserProfile","query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isTeacher\\n    isFormalTeacher\\n    isK4dStudent\\n    isKmapStudent\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(\\n      name: \\"can_send_moderator_messages\\"\\n      scope: GLOBAL\\n    )\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    includesKmapDistrictOwnedData\\n    includesK4dDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    isInKhanClassroomDistrict\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    hasAccessToAIGuideCompanionMode\\n    hasAccessToAIGuideLearner\\n    hasAccessToAIGuideDistrictAdmin\\n    hasAccessToAIGuideParent\\n    hasAccessToAIGuideTeacher\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    region\\n    userDistrictInfos {\\n      id\\n      isKAD\\n      district {\\n        id\\n        region\\n        __typename\\n      }\\n      __typename\\n    }\\n    schoolAffiliation {\\n      id\\n      location\\n      __typename\\n    }\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}"}',method:"POST",mode:"cors",credentials:"include"})
    .then(async response => { let data = await response.json(); user = { nickname: data.data.user.nickname, username: data.data.user.username, UID: data.data.user.id.slice(-5) }; })
    
    sendToast("🚀 KHANWARE ULTRA - Cargado exitosamente!", 3000);
    
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
    
    await delay(500);
    
    sendToast(`⭐ Bienvenido de vuelta: ${user.nickname}`, 3000);
    sendToast(`📊 Sesión #${statistics.sessionsCount} | Total preguntas: ${statistics.questionsAnswered}`, 2500);
    
    if(device.apple) { await delay(500); sendToast(`🍎 Detectado dispositivo Apple - Modo optimizado activado`, 2000); }
    if(device.mobile) { await delay(300); sendToast(`📱 Modo móvil detectado - UI adaptada`, 2000); }
    
    // Load plugin confirmations
    loadedPlugins.forEach((plugin, index) => {
        setTimeout(() => sendToast(`🔧 ${plugin} cargado correctamente`, 1500, 'top'), index * 200);
    });
    
    // Initialize advanced systems
    setTimeout(() => {
        if(features.antiDetection) {
            antiDetection.init();
            sendToast("🛡️ Sistema anti-detección activado", 2000);
        }
        if(features.humanBehavior) {
            sendToast("🤖 Comportamiento humano simulado", 2000);
        }
        if(features.smartDelay) {
            sendToast("🧠 Delays inteligentes configurados", 2000);
        }
    }, 1000);
    
    hideSplashScreen();
    setupMenu();
    setupMain();
    
    console.clear();
    console.log(`
    🌿 KHANWARE ULTRA ${ver}
    ========================
    👤 Usuario: ${user.nickname}
    📊 Sesiones totales: ${statistics.sessionsCount}
    🎯 Preguntas resueltas: ${statistics.questionsAnswered}
    🎬 Videos completados: ${statistics.videosCompleted}
    ⏱️ Tiempo total: ${Math.round(statistics.totalTimeUsed / 60000)} min
    
    🚀 by CasanovaProyects
    
    🎮 COMANDOS DE EMERGENCIA:
    - openUltraMenu() - Abrir menú ULTRA
    - showUltraStats() - Mostrar estadísticas  
    - toggleDebug() - Activar/desactivar debug
    `);
    
    // Funciones globales de emergencia
    window.openUltraMenu = () => {
        const menu = document.querySelector('dropDownMenu');
        if (menu) {
            menu.style.display = 'flex';
            sendToast("🎮 Menú ULTRA abierto por comando", 2000);
        } else {
            sendToast("❌ Menú no encontrado", 2000);
        }
    };
    
    window.showUltraStats = () => {
        if (typeof toggleStatsPanel === 'function') {
            toggleStatsPanel();
        } else {
            sendToast("📊 Panel de stats no disponible aún", 2000);
        }
    };
    
    window.toggleDebug = () => {
        window.debugMode = !window.debugMode;
        sendToast(`🐛 Debug: ${window.debugMode ? 'ON' : 'OFF'}`, 2000);
    };
});

/* Thank you to everyone who has purchased access to my cheat as of 10/28/24.
@Thomaz015
@grazynabazio
@melyssaxavier
@WESLEY.SPREDEMANN
@carine.rech.alves
@nazare.de.maria
@jowsanth
@bielzy
@rafaeldeagostino
@AMFDS
@Jv010107
@Mattheusfreitas01
@Guilhermeoliveira2623
@Matt010101
@voncallis
@Thamiris0001
@Holmes1212
@Martinss0000
@zRoque
@LaryCouto.com.br
@IanyckFerreira
@sales7
@AleSobral
@wbzz2121
@Umunizzz
@ViniciusMancini
@ricardaosantista
@marcos10pc
@bzinxxx
@ryanmzmartins
@Kaleb1577
@brunopereirabarros
@RodrigoMartins1236751
@guixzf
@Leandrohenrq
@damnntiago
@WhoisMe777
@Gustavopc21
@matheus.hx2
@WSZL
@LeozinB2
@Davas123
@joaoviturino
@orickmaxx
@l55nar5
@nextbyhawk
@Bruninda019
@GabrielRibeiroP
@Shinjoia
@hy7pee
@arthurmondequedutra
@PedrooVsp
@zBlucker
@vitiintavares
@Holmes1212
@Anthony06927
@refinado
@ErickMarinelli
@pedroomelhor
@gabrielmonteiro0053
@Felipealexandre10
@saantzx7
@alvarosouzaribeiro
@gabrielejte
@Kevinzada
@antonio77xs
@marcus.floriano.oliveira
*/
