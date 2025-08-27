const setFeatureByPath = (path, value) => { let obj = window; const parts = path.split('.'); while (parts.length > 1) obj = obj[parts.shift()]; obj[parts[0]] = value; }

function addFeature(features) {
    const feature = document.createElement('feature');
    features.forEach(attribute => {
        let element = attribute.type === 'nonInput' ? document.createElement('label') : document.createElement('input');
        if (attribute.type === 'nonInput') element.innerHTML = attribute.name;
        else { element.type = attribute.type; element.id = attribute.name; }

        if (attribute.attributes) {
            attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                value = value ? value.replace(/"/g, '') : '';
                key === 'style' ? element.style.cssText = value : element.setAttribute(key, value);
            });
        }

        if (attribute.variable) element.setAttribute('setting-data', attribute.variable);
        if (attribute.dependent) element.setAttribute('dependent', attribute.dependent);
        if (attribute.className) element.classList.add(attribute.className);

        if (attribute.labeled) {
            const label = document.createElement('label');
            if (attribute.className) label.classList.add(attribute.className);
            if (attribute.attributes) {
                attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                    value = value ? value.replace(/"/g, '') : '';
                    key === 'style' ? label.style.cssText = value : label.setAttribute(key, value);
                });
            }
            label.innerHTML = `${element.outerHTML} ${attribute.label}`;
            feature.appendChild(label);
        } else {
            feature.appendChild(element);
        }
    });
    dropdownMenu.innerHTML += feature.outerHTML;
}
function handleInput(ids, callback = null) {
    (Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)])
    .forEach(element => {
        if (!element) return;
        const setting = element.getAttribute('setting-data'),
            dependent = element.getAttribute('dependent'),
            handleEvent = (e, value) => {
                setFeatureByPath(setting, value);
                if (callback) callback(value, e);
            };

        if (element.type === 'checkbox') {
            element.addEventListener('change', (e) => {
                playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');
                handleEvent(e, e.target.checked);
                if (dependent) dependent.split(',').forEach(dep => 
                    document.querySelectorAll(`.${dep}`).forEach(depEl => 
                        depEl.style.display = e.target.checked ? null : "none"));
            });
        } else {
            element.addEventListener('input', (e) => handleEvent(e, e.target.value));
        }
    });
}

/* Verificar y crear elementos si no existen */
if (!window.watermark || !document.body.contains(window.watermark)) {
    window.watermark = document.createElement('div');
    window.watermark.id = 'studyboost-watermark';
}

if (!window.dropdownMenu || !document.body.contains(window.dropdownMenu)) {
    window.dropdownMenu = document.createElement('div');
    window.dropdownMenu.id = 'studyboost-menu';
}

const watermark = window.watermark;
const dropdownMenu = window.dropdownMenu;

/* Watermark ULTRA */
Object.assign(watermark.style, {
    position: 'fixed', top: '10px', left: '85%', width: '160px', height: '35px', 
    background: 'linear-gradient(45deg, rgba(0,0,0,0.9), rgba(0,255,65,0.3))',
    color: 'white', fontSize: '15px', fontFamily: 'MuseoSans, sans-serif', 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    cursor: 'pointer', userSelect: 'none', padding: '0 12px', borderRadius: '12px', 
    zIndex: '99999', transition: 'all 0.3s ease',
    border: '2px solid rgba(0,255,65,0.4)', boxShadow: '0 0 20px rgba(0,255,65,0.3)',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'
});

if (device.mobile) watermark.style.left = '50%'

watermark.innerHTML = `
    <span style="text-shadow: -1px 0.5px 0 #00ff41, -2px 0px 0 #00aa2e; font-weight: bold;">SB</span>
    <span style="color: #00ff41; font-size: 10px;">PRO</span>
    <span style="color: gray; padding-left: 2px; font-family: Arial, sans-serif; font-size: 10px">${ver.replace('ULTRA', 'PRO')}</span>
`;

// Asegurar que el watermark esté en el DOM
if (!document.body.contains(watermark)) {
    document.body.appendChild(watermark);
}

// Mensaje de confirmación del menú
debug("✅ Watermark ULTRA agregado al DOM");
setTimeout(() => {
    sendToast("🎮 Haz HOVER o CLICK en 'KW ULTRA' para abrir menú", 4000);
    console.log("🎯 Menú ULTRA listo - Coordenadas:", {
        top: watermark.offsetTop,
        left: watermark.offsetLeft,
        width: watermark.offsetWidth,
        height: watermark.offsetHeight
    });
}, 2000);

// SISTEMA DE ARRASTRE MEJORADO
let isDragging = false, offsetX, offsetY, dragThreshold = 5;
let mouseDownPos = { x: 0, y: 0 };

watermark.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Solo botón izquierdo
    mouseDownPos = { x: e.clientX, y: e.clientY };
    offsetX = e.clientX - watermark.offsetLeft;
    offsetY = e.clientY - watermark.offsetTop;
    watermark.style.transform = 'scale(0.95)';
    e.preventDefault();
});

watermark.addEventListener('mouseup', (e) => {
    const moved = Math.abs(e.clientX - mouseDownPos.x) + Math.abs(e.clientY - mouseDownPos.y);
    
    if (moved < dragThreshold && !isDragging) {
        // Es un click, no arrastre
        setTimeout(() => toggleMenu(), 10);
    }
    
    isDragging = false;
    watermark.style.transform = 'scale(1)';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) {
        const moved = Math.abs(e.clientX - mouseDownPos.x) + Math.abs(e.clientY - mouseDownPos.y);
        if (moved > dragThreshold && e.buttons === 1) {
            isDragging = true;
            if (menuVisible) toggleMenu(); // Cerrar menú al arrastrar
        }
    }
    
    if (isDragging) {
        let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth));
        let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight));
        Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` });
    }
});

/* Dropdown ULTRA - Configuración mejorada */
Object.assign(dropdownMenu.style, {
    position: 'absolute', top: '100%', left: '0', width: '220px', 
    background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,40,0,0.9))',
    borderRadius: '12px', color: 'white', fontSize: '13px', fontFamily: 'Monospace, sans-serif',
    display: 'none', flexDirection: 'column', zIndex: '99998', padding: '12px', cursor: 'default',
    userSelect: 'none', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)', 
    WebkitBackdropFilter: 'blur(10px)', border: '2px solid rgba(0,255,65,0.4)',
    boxShadow: '0 8px 32px rgba(0,255,65,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
    maxHeight: '450px', overflowY: 'auto', transform: 'translateY(-5px)'
});

dropdownMenu.innerHTML = `
    <style>
        input[type="checkbox"] {
            appearance: none; width: 16px; height: 16px; background-color: #2a2a2a;
            border: 2px solid #00ff41; border-radius: 4px; margin-right: 8px; cursor: pointer;
            transition: all 0.2s ease;
        }
        input[type="checkbox"]:checked {
            background-color: #00ff41; border-color: #00aa2e;
            background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>');
        }
        input[type="checkbox"]:hover {
            border-color: #00ff41; box-shadow: 0 0 8px rgba(0,255,65,0.3);
        }
        input[type="text"], input[type="number"], input[type="range"] {
            width: calc(100% - 10px); border: 1px solid #00ff41; 
            color: #00ff41; accent-color: #00ff41; background-color: rgba(0,0,0,0.7); 
            padding: 4px 6px; border-radius: 4px; font-size: 11px;
            transition: all 0.2s ease;
        }
        input[type="text"]:focus, input[type="number"]:focus {
            outline: none; border-color: #00aa2e; box-shadow: 0 0 8px rgba(0,255,65,0.4);
        }
        label {
            display: flex; align-items: center; color: #e0e0e0; padding: 4px 2px; 
            transition: color 0.2s ease; font-size: 12px;
        }
        label:hover {
            color: #00ff41; background-color: rgba(0,255,65,0.1); border-radius: 4px;
        }
        .ultra-section {
            margin: 8px 0; padding: 4px 0; border-top: 1px solid rgba(0,255,65,0.2);
        }
    </style>
`;

watermark.appendChild(dropdownMenu);

// Asegurar que el dropdown esté correctamente configurado
watermark.style.position = 'fixed'; // Mantener fixed pero asegurar contenido
dropdownMenu.style.position = 'absolute';

// Mensaje de confirmación del menú
debug("✅ Watermark ULTRA agregado al DOM");

// TIMEOUT EXTENDIDO para asegurar carga completa
setTimeout(() => {
    sendToast("🎮 Haz HOVER o CLICK en 'SB PRO' para abrir menú", 4000);
    console.log("🎯 Menú ULTRA listo - Coordenadas:", {
        watermark: watermark.getBoundingClientRect(),
        dropdown: dropdownMenu.getBoundingClientRect(),
        isVisible: dropdownMenu.style.display
    });
    
    // Comando de emergencia global
    window.showUltraMenu = () => {
        menuVisible = true;
        dropdownMenu.style.display = 'flex';
        sendToast("🚨 Menú forzado por comando de emergencia", 3000);
    };
    
    window.hideUltraMenu = () => {
        menuVisible = false;
        dropdownMenu.style.display = 'none';
        sendToast("🚫 Menú cerrado por comando", 2000);
    };
    
}, 3000);

let featuresList = [
    { name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: '🎯 Question Spoof' },
    { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: '🎬 Video Spoof' },
    { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: '👁️ Answer Revealer' },
    { name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: '🤖 Auto Answer' },
    { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', labeled: true, label: '🔄 Repeat Question' },
    { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', labeled: true, label: '➡️ Recomendations' },
    { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="5" value="3"', labeled: false },
    { name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', labeled: true, label: '⏰ Minute Farmer' },
    { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: '🎨 Custom Banner' },
    { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: '🌈 RGB Logo' },
    { name: '── ULTRA FEATURES ──', type: 'nonInput', attributes: 'style="color: #00ff41; font-weight: bold; text-align: center; margin: 10px 0;"' },
    { name: 'stealthMode', type: 'checkbox', variable: 'features.stealthMode', attributes: 'checked', labeled: true, label: '🥷 Stealth Mode' },
    { name: 'smartDelay', type: 'checkbox', variable: 'features.smartDelay', attributes: 'checked', labeled: true, label: '🧠 Smart Delays' },
    { name: 'humanBehavior', type: 'checkbox', variable: 'features.humanBehavior', attributes: 'checked', labeled: true, label: '🤝 Human Behavior' },
    { name: 'antiDetection', type: 'checkbox', variable: 'features.antiDetection', attributes: 'checked', labeled: true, label: '🛡️ Anti-Detection' },
    { name: 'statisticsPanel', type: 'checkbox', variable: 'features.statisticsPanel', attributes: 'checked', labeled: true, label: '📊 Stats Panel' },
    { name: '── CLASSIC FEATURES ──', type: 'nonInput', attributes: 'style="color: #888; font-size: 10px; text-align: center; margin: 10px 0;"' },
    { name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', labeled: true, label: '🌙 Dark Mode' },
    { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', labeled: true, label: '🐱 onekoJs' },
    { name: '── CUSTOMIZATION ──', type: 'nonInput', attributes: 'style="color: #ffd700; font-size: 10px; text-align: center; margin: 10px 0;"' },
    { name: 'Custom Username', type: 'nonInput' },
    { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off" placeholder="Tu username aquí..."' },
    { name: 'Custom Profile Picture', type: 'nonInput' },
    { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off" placeholder="URL de imagen..."' },
    { name: '── ACTIONS ──', type: 'nonInput', attributes: 'style="color: #ff6b6b; font-size: 10px; text-align: center; margin: 10px 0;"' }
  ];
  

featuresList.push({ name: `${user.username} - UID: ${user.UID}`, type: 'nonInput', attributes: 'style="font-size:10px; color: #00ff41; text-align: center; margin-top: 10px;"' });
featuresList.push({ name: 'ULTRA Stats', type: 'nonInput', attributes: 'style="color: #00ff41; cursor: pointer; text-align: center; text-decoration: underline;" onclick="toggleStatsPanel()"' });
featuresList.push({ name: 'GitHub Repo', type: 'nonInput', attributes: 'style="color: #4ecdc4; cursor: pointer; text-align: center; text-decoration: underline;" onclick="window.open(\'https://github.com/CasanovaProyects/mi-khanware\')"' });

addFeature(featuresList);

// Enhanced handlers with new features
handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['stealthMode', 'smartDelay', 'humanBehavior', 'antiDetection', 'statisticsPanel']);
handleInput(['customName', 'customPfp']);
handleInput('autoAnswer', checked => {
    if (checked && !features.questionSpoof) {
        document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true;
        sendToast('🎯 Question Spoof activado automáticamente', 2000);
    }
});
handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 6 - value)); // Inverted scale
handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
handleInput('onekoJs', checked => { 
    const onekoEl = document.getElementById('oneko'); 
    if (onekoEl) onekoEl.style.display = checked ? null : "none";
});
handleInput('statisticsPanel', checked => {
    if (checked) {
        const panel = document.getElementById('ultra-stats-panel') || createUltraStatsPanel();
        panel.style.display = 'block';
        sendToast('📊 Panel de estadísticas activado', 2000);
    } else {
        const panel = document.getElementById('ultra-stats-panel');
        if (panel) panel.style.display = 'none';
    }
});

// EVENTOS MEJORADOS DEL MENÚ
let menuVisible = false;

// Función para toggle del menú
function toggleMenu() {
    menuVisible = !menuVisible;
    dropdownMenu.style.display = menuVisible ? 'flex' : 'none';
    
    if (menuVisible) {
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.transform = 'translateY(0px)';
        }, 10);
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');
        sendToast('📱 Menú SB PRO abierto', 1500);
    } else {
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav');
        sendToast('📴 Menú cerrado', 1000);
    }
}

// Eventos del watermark - HOVER para abrir
watermark.addEventListener('mouseenter', () => {
    if (!menuVisible && !isDragging) {
        toggleMenu();
    }
});

// Evento para mantener el menú abierto al pasar el mouse por encima
watermark.addEventListener('mouseleave', (e) => {
    // Solo cerrar si el mouse no va hacia el dropdown
    setTimeout(() => {
        if (!watermark.matches(':hover') && !dropdownMenu.matches(':hover')) {
            if (menuVisible) toggleMenu();
        }
    }, 200);
});

// Evitar que el menú se cierre al hacer click dentro
dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!watermark.contains(e.target) && !dropdownMenu.contains(e.target)) {
        if (menuVisible) toggleMenu();
    }
});