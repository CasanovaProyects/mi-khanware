// MENÚ ULTRA SIMPLIFICADO Y FUNCIONAL
console.log("🎮 Iniciando menú ULTRA...");

// Crear elementos globales de manera segura
if (!window.ultraWatermark) {
    window.ultraWatermark = document.createElement('div');
    window.ultraWatermark.id = 'ultra-watermark';
    window.ultraWatermark.className = 'ultra-watermark';
}

if (!window.ultraDropdown) {
    window.ultraDropdown = document.createElement('div');
    window.ultraDropdown.id = 'ultra-dropdown';
    window.ultraDropdown.className = 'ultra-dropdown';
}

const watermark = window.ultraWatermark;
const dropdown = window.ultraDropdown;

// Estilos del watermark
watermark.style.cssText = `
    position: fixed !important;
    top: 15px !important;
    right: 15px !important;
    width: 120px !important;
    height: 30px !important;
    background: linear-gradient(45deg, #000, #00ff41) !important;
    color: white !important;
    border: 2px solid #00ff41 !important;
    border-radius: 15px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    font-family: monospace !important;
    font-size: 12px !important;
    font-weight: bold !important;
    z-index: 999999 !important;
    user-select: none !important;
    box-shadow: 0 0 20px rgba(0,255,65,0.5) !important;
    transition: all 0.3s ease !important;
`;

watermark.innerHTML = `<span style="text-shadow: 0 0 5px #00ff41;">SB PRO ${ver.replace('ULTRA', 'v4')}</span>`;

// Estilos del dropdown
dropdown.style.cssText = `
    position: fixed !important;
    top: 50px !important;
    right: 15px !important;
    width: 250px !important;
    max-height: 400px !important;
    background: rgba(0,0,0,0.95) !important;
    border: 2px solid #00ff41 !important;
    border-radius: 10px !important;
    color: white !important;
    font-family: monospace !important;
    font-size: 11px !important;
    z-index: 999998 !important;
    overflow-y: auto !important;
    padding: 10px !important;
    display: none !important;
    box-shadow: 0 0 25px rgba(0,255,65,0.4) !important;
`;

// Contenido del menú
dropdown.innerHTML = `
    <div style="margin-bottom: 10px; text-align: center; color: #00ff41; font-weight: bold;">
        🎮 STUDYBOOST PRO MENU
    </div>
    
    <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
        <input type="checkbox" id="questionSpoof" ${features.questionSpoof ? 'checked' : ''} style="margin-right: 8px;">
        🎯 Question Spoof
    </label>
    
    <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
        <input type="checkbox" id="videoSpoof" ${features.videoSpoof ? 'checked' : ''} style="margin-right: 8px;">
        🎬 Video Spoof
    </label>
    
    <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
        <input type="checkbox" id="showAnswers" ${features.showAnswers ? 'checked' : ''} style="margin-right: 8px;">
        👁️ Answer Revealer
    </label>
    
    <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
        <input type="checkbox" id="autoAnswer" ${features.autoAnswer ? 'checked' : ''} style="margin-right: 8px;">
        🤖 Auto Answer
    </label>
    
    <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
        <input type="checkbox" id="minuteFarm" ${features.minuteFarmer ? 'checked' : ''} style="margin-right: 8px;">
        ⏰ Minute Farmer
    </label>
    
    <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
        <input type="checkbox" id="customBanner" ${features.customBanner ? 'checked' : ''} style="margin-right: 8px;">
        🎨 Custom Banner
    </label>
    
    <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
        <input type="checkbox" id="rgbLogo" ${features.rgbLogo ? 'checked' : ''} style="margin-right: 8px;">
        🌈 RGB Logo
    </label>
    
    <div style="margin: 10px 0; border-top: 1px solid #00ff41; padding-top: 10px;">
        <div style="color: #00ff41; font-weight: bold; text-align: center; margin-bottom: 5px;">
            ⚡ ULTRA FEATURES
        </div>
        
        <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
            <input type="checkbox" id="stealthMode" ${features.stealthMode ? 'checked' : ''} style="margin-right: 8px;">
            🥷 Stealth Mode
        </label>
        
        <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
            <input type="checkbox" id="darkMode" ${features.darkMode ? 'checked' : ''} style="margin-right: 8px;">
            🌙 Dark Mode
        </label>
    </div>
    
    <div style="margin-top: 10px; text-align: center; border-top: 1px solid #00ff41; padding-top: 10px;">
        <button onclick="window.open('https://github.com/CasanovaProyects/mi-khanware')" 
                style="background: #00ff41; color: black; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-weight: bold;">
            🌟 GitHub Repo
        </button>
    </div>
    
    <div style="text-align: center; margin-top: 5px; font-size: 9px; color: #888;">
        Usuario: ${user.username} | UID: ${user.UID}
    </div>
`;

// Variable para controlar el estado del menú
let menuVisible = false;

// Función simple para toggle
function toggleUltraMenu() {
    menuVisible = !menuVisible;
    dropdown.style.display = menuVisible ? 'block' : 'none';
    
    if (menuVisible) {
        console.log("✅ Menú ULTRA abierto");
        if (typeof sendToast === 'function') {
            sendToast("🎮 Menú ULTRA abierto", 2000);
        }
    } else {
        console.log("❌ Menú ULTRA cerrado");
        if (typeof sendToast === 'function') {
            sendToast("📴 Menú cerrado", 1000);
        }
    }
}

// Eventos del watermark - MÚLTIPLES MÉTODOS
watermark.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleUltraMenu();
    console.log("🖱️ Click en watermark detectado");
};

watermark.onmousedown = function(e) {
    e.preventDefault();
};

watermark.addEventListener('click', toggleUltraMenu, true);
watermark.addEventListener('mousedown', function(e) { e.preventDefault(); }, true);

// Hover para abrir también
watermark.addEventListener('mouseenter', function() {
    if (!menuVisible) {
        toggleUltraMenu();
    }
});

// Cerrar al hacer click fuera
document.addEventListener('click', function(e) {
    if (!watermark.contains(e.target) && !dropdown.contains(e.target)) {
        if (menuVisible) {
            toggleUltraMenu();
        }
    }
});

// Evitar cerrar al hacer click dentro del dropdown
dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Agregar al DOM de forma segura
if (!document.body.contains(watermark)) {
    document.body.appendChild(watermark);
    console.log("✅ Watermark agregado al DOM");
}

if (!document.body.contains(dropdown)) {
    document.body.appendChild(dropdown);
    console.log("✅ Dropdown agregado al DOM");
}

// Manejar checkboxes
function setupCheckboxHandlers() {
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const feature = this.id;
            const isChecked = this.checked;
            
            // Actualizar features
            switch(feature) {
                case 'questionSpoof':
                    features.questionSpoof = isChecked;
                    break;
                case 'videoSpoof':
                    features.videoSpoof = isChecked;
                    break;
                case 'showAnswers':
                    features.showAnswers = isChecked;
                    break;
                case 'autoAnswer':
                    features.autoAnswer = isChecked;
                    if (isChecked && !features.questionSpoof) {
                        features.questionSpoof = true;
                        dropdown.querySelector('#questionSpoof').checked = true;
                    }
                    break;
                case 'minuteFarm':
                    features.minuteFarmer = isChecked;
                    break;
                case 'customBanner':
                    features.customBanner = isChecked;
                    break;
                case 'rgbLogo':
                    features.rgbLogo = isChecked;
                    break;
                case 'stealthMode':
                    features.stealthMode = isChecked;
                    break;
                case 'darkMode':
                    features.darkMode = isChecked;
                    if (isChecked && typeof DarkReader !== 'undefined') {
                        DarkReader.enable();
                    } else if (!isChecked && typeof DarkReader !== 'undefined') {
                        DarkReader.disable();
                    }
                    break;
            }
            
            console.log(`🔧 ${feature} = ${isChecked}`);
            if (typeof sendToast === 'function') {
                sendToast(`${isChecked ? '✅' : '❌'} ${feature}`, 1500);
            }
        });
    });
}

// Configurar handlers después de un delay
setTimeout(() => {
    setupCheckboxHandlers();
    console.log("🔧 Handlers de checkbox configurados");
}, 100);

// Funciones globales de emergencia
window.showUltraMenu = function() {
    menuVisible = true;
    dropdown.style.display = 'block';
    console.log("🚨 Menú forzado a mostrar");
};

window.hideUltraMenu = function() {
    menuVisible = false;
    dropdown.style.display = 'none';
    console.log("🚫 Menú forzado a ocultar");
};

window.toggleUltraMenu = toggleUltraMenu;

// Debug info
setTimeout(() => {
    console.log("🎯 MENÚ ULTRA INICIALIZADO:");
    console.log("- Watermark:", watermark);
    console.log("- Dropdown:", dropdown);
    console.log("- En DOM:", document.body.contains(watermark));
    console.log("- Comandos disponibles: showUltraMenu(), hideUltraMenu(), toggleUltraMenu()");
    
    if (typeof sendToast === 'function') {
        sendToast("🎮 Menú ULTRA listo - CLICK en SB PRO", 3000);
    }
}, 1000);

console.log("✅ Menú ULTRA cargado exitosamente");
