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

/* Watermark ULTRA */
Object.assign(watermark.style, {
    position: 'fixed', top: '0', left: '85%', width: '160px', height: '35px', 
    background: 'linear-gradient(45deg, rgba(0,0,0,0.8), rgba(0,255,65,0.2))',
    color: 'white', fontSize: '15px', fontFamily: 'MuseoSans, sans-serif', 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    cursor: 'default', userSelect: 'none', padding: '0 12px', borderRadius: '12px', 
    zIndex: '1001', transition: 'all 0.3s ease',
    border: '1px solid rgba(0,255,65,0.3)', boxShadow: '0 0 15px rgba(0,255,65,0.2)'
});

if (device.mobile) watermark.style.left = '50%'

watermark.innerHTML = `
    <span style="text-shadow: -1px 0.5px 0 #00ff41, -2px 0px 0 #00aa2e; font-weight: bold;">KW</span>
    <span style="color: #00ff41; font-size: 10px;">ULTRA</span>
    <span style="color: gray; padding-left: 2px; font-family: Arial, sans-serif; font-size: 10px">${ver}</span>
`;

document.body.appendChild(watermark);

let isDragging = false, offsetX, offsetY;

watermark.addEventListener('mousedown', e => { if (!dropdownMenu.contains(e.target)) { isDragging = true; offsetX = e.clientX - watermark.offsetLeft; offsetY = e.clientY - watermark.offsetTop; watermark.style.transform = 'scale(0.9)'; } });
watermark.addEventListener('mouseup', () => { isDragging = false; watermark.style.transform = 'scale(1)'; });

document.addEventListener('mousemove', e => { if (isDragging) { let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth)); let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight)); Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` }); dropdownMenu.style.display = 'none'; } });

/* Dropdown */
Object.assign(dropdownMenu.style, {
    position: 'absolute', top: '100%', left: '0', width: '160px', backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '10px', color: 'white', fontSize: '13px', fontFamily: 'Monospace, sans-serif',
    display: 'none', flexDirection: 'column', zIndex: '1000', padding: '5px', cursor: 'default',
    userSelect: 'none', transition: 'transform 0.3s ease', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)'
});

dropdownMenu.innerHTML = `
    <style>
        input[type="checkbox"] {appearance: none; width: 15px; height: 15px; background-color: #3a3a3b;
        border: 1px solid #acacac; border-radius: 3px; margin-right: 5px; cursor: pointer;}
        input[type="checkbox"]:checked {background-color: #540b8a; border-color: #720fb8;}
        input[type="text"], input[type="number"], input[type="range"] {width: calc(100% - 10px); border: 1px solid #343434; 
        color: white; accent-color: #540b8a; background-color: #540b8a; padding: 3px; border-radius: 3px; background: none;}
        label {display: flex; align-items: center; color: #3a3a3b; padding-top: 3px;}
    </style>
`;

watermark.appendChild(dropdownMenu);

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

watermark.addEventListener('mouseenter', () => { dropdownMenu.style.display = 'flex'; playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav'); } );
watermark.addEventListener('mouseleave', e => { !watermark.contains(e.relatedTarget) && (dropdownMenu.style.display = 'none'); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav'); });