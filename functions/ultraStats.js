// ULTRA Statistics Dashboard
const createUltraStatsPanel = () => {
    if (document.getElementById('ultra-stats-panel')) return;
    
    const panel = document.createElement('div');
    panel.id = 'ultra-stats-panel';
    panel.style.cssText = `
        position: fixed; top: 80px; right: 10px; width: 280px; min-height: 200px;
        background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(30,30,60,0.9));
        border: 2px solid #00ff41; border-radius: 15px; color: white;
        font-family: 'Courier New', monospace; font-size: 12px; padding: 15px;
        z-index: 9998; backdrop-filter: blur(10px); display: none;
        box-shadow: 0 0 20px rgba(0,255,65,0.3);
    `;
    
    const updateStatsDisplay = () => {
        const sessionTime = Math.round((Date.now() - statistics.startTime) / 1000);
        const hours = Math.floor(sessionTime / 3600);
        const minutes = Math.floor((sessionTime % 3600) / 60);
        const seconds = sessionTime % 60;
        
        const efficiency = statistics.questionsAnswered > 0 ? 
            Math.round((statistics.questionsAnswered / (sessionTime / 60)) * 100) / 100 : 0;
        
        panel.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px; font-size: 14px; color: #00ff41;">
                📊 KHANWARE ULTRA STATS
            </div>
            <div style="border-bottom: 1px solid #333; margin-bottom: 10px; padding-bottom: 10px;">
                <div>👤 Usuario: <span style="color: #00ff41;">${user.nickname}</span></div>
                <div>🆔 UID: <span style="color: #00ff41;">${user.UID}</span></div>
                <div>📅 Sesión: <span style="color: #00ff41;">#${statistics.sessionsCount}</span></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div>⏱️ Tiempo de sesión: <span style="color: #ffd700;">${hours}h ${minutes}m ${seconds}s</span></div>
                <div>📝 Preguntas: <span style="color: #ff6b6b;">${statistics.questionsAnswered}</span></div>
                <div>🎬 Videos: <span style="color: #4ecdc4;">${statistics.videosCompleted}</span></div>
                <div>⚡ Eficiencia: <span style="color: #95e1d3;">${efficiency} q/min</span></div>
            </div>
            <div style="border-top: 1px solid #333; margin-top: 10px; padding-top: 10px;">
                <div style="font-size: 10px; color: #888;">
                    <div>🎯 Total histórico: ${statistics.questionsAnswered} preguntas</div>
                    <div>📊 Promedio por sesión: ${Math.round(statistics.questionsAnswered / statistics.sessionsCount)}</div>
                    <div>⭐ Score ULTRA: ${statistics.questionsAnswered * 10 + statistics.videosCompleted * 5}</div>
                </div>
            </div>
            <div style="margin-top: 10px; text-align: center;">
                <button onclick="exportStats()" style="background: #00ff41; color: black; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 10px;">
                    📤 Exportar Stats
                </button>
                <button onclick="resetStats()" style="background: #ff4757; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 10px; margin-left: 5px;">
                    🗑️ Reset
                </button>
            </div>
        `;
    };
    
    // Make draggable
    let isDragging = false, offsetX, offsetY;
    panel.addEventListener('mousedown', e => {
        if (e.target.tagName !== 'BUTTON') {
            isDragging = true;
            offsetX = e.clientX - panel.offsetLeft;
            offsetY = e.clientY - panel.offsetTop;
            panel.style.transform = 'scale(0.95)';
        }
    });
    
    panel.addEventListener('mouseup', () => {
        isDragging = false;
        panel.style.transform = 'scale(1)';
    });
    
    document.addEventListener('mousemove', e => {
        if (isDragging) {
            const newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - panel.offsetWidth));
            const newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - panel.offsetHeight));
            panel.style.left = `${newX}px`;
            panel.style.top = `${newY}px`;
        }
    });
    
    updateStatsDisplay();
    document.body.appendChild(panel);
    
    // Update every second
    setInterval(updateStatsDisplay, 1000);
    
    return panel;
};

// Export statistics function
window.exportStats = () => {
    const statsData = {
        user: user,
        statistics: statistics,
        exportDate: new Date().toISOString(),
        version: ver
    };
    
    const dataStr = JSON.stringify(statsData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `khanware-ultra-stats-${user.username}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    sendToast('📊 Estadísticas exportadas exitosamente!', 2000);
};

// Reset statistics function
window.resetStats = () => {
    if (confirm('¿Estás seguro de que quieres resetear todas las estadísticas?')) {
        statistics.questionsAnswered = 0;
        statistics.videosCompleted = 0;
        statistics.sessionsCount = 1;
        statistics.totalTimeUsed = 0;
        statistics.startTime = Date.now();
        localStorage.removeItem('khanware_ultra_stats');
        sendToast('🗑️ Estadísticas reseteadas', 2000);
    }
};

// Toggle stats panel
window.toggleStatsPanel = () => {
    const panel = document.getElementById('ultra-stats-panel') || createUltraStatsPanel();
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
};

// Initialize if statistics feature is enabled
if (features.statisticsPanel) {
    createUltraStatsPanel();
}
