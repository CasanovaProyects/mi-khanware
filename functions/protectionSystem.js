// SISTEMA DE AUTO-PROTECCIÓN Y DESTRUCCIÓN
const ProtectionSystem = {
    
    // Detectar si estamos siendo analizados
    detectAnalysis: () => {
        let suspiciousActivity = 0;
        
        // Detectar DevTools abierto
        const devtools = {
            open: false,
            check: () => {
                const threshold = 160;
                setInterval(() => {
                    if (window.outerHeight - window.innerHeight > threshold || 
                        window.outerWidth - window.innerWidth > threshold) {
                        if (!devtools.open) {
                            devtools.open = true;
                            suspiciousActivity++;
                            ProtectionSystem.onSuspiciousActivity();
                        }
                    } else {
                        devtools.open = false;
                    }
                }, 500);
            }
        };
        
        devtools.check();
        
        // Detectar debugger statements
        const originalDebugger = window.debugger;
        Object.defineProperty(window, 'debugger', {
            get: () => {
                suspiciousActivity++;
                ProtectionSystem.onSuspiciousActivity();
                return originalDebugger;
            }
        });
        
        return suspiciousActivity;
    },
    
    // Acción cuando se detecta actividad sospechosa
    onSuspiciousActivity: () => {
        console.warn('⚠️ Actividad de análisis detectada');
        
        // Opción 1: Solo advertir
        sendToast('🛡️ Modo protección activado', 2000);
        
        // Opción 2: Auto-destrucción (descomenta si quieres)
        // ProtectionSystem.selfDestruct();
    },
    
    // Auto-destrucción completa
    selfDestruct: () => {
        // Limpiar variables globales
        delete window.features;
        delete window.featureConfigs;
        delete window.statistics;
        delete window.user;
        delete window.debugLog;
        
        // Limpiar localStorage
        localStorage.removeItem('khanware_ultra_stats');
        
        // Remover elementos del DOM
        const khanwareElements = [
            'dropDownMenu',
            'watermark', 
            'statsPanel',
            'splashScreen',
            'ultra-stats-panel'
        ];
        
        khanwareElements.forEach(id => {
            const element = document.getElementById(id) || document.querySelector(id);
            if (element) element.remove();
        });
        
        // Restaurar fetch original
        if (window.originalFetch) {
            window.fetch = window.originalFetch;
        }
        
        // Mensaje final
        console.clear();
        console.log('🔥 Sistema auto-destruido por seguridad');
        
        // Recargar página para limpiar completamente
        setTimeout(() => location.reload(), 2000);
    },
    
    // Limpiar rastros periódicamente
    cleanTraces: () => {
        setInterval(() => {
            // Limpiar console
            if (console.clear && Math.random() < 0.1) {
                console.clear();
            }
            
            // Limpiar performance marks
            if (performance.clearMarks) {
                performance.clearMarks();
            }
            
            // Limpiar network cache si es posible
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => {
                        if (registration.scope.includes('khanacademy')) {
                            // No eliminar SW de Khan Academy, solo limpiar cache
                        }
                    });
                });
            }
        }, 60000); // Cada minuto
    },
    
    // Inicializar sistema de protección
    init: () => {
        ProtectionSystem.detectAnalysis();
        ProtectionSystem.cleanTraces();
        
        // Comando de emergencia
        window.emergencyDestruct = () => {
            if (confirm('¿Estás seguro de que quieres activar la auto-destrucción?')) {
                ProtectionSystem.selfDestruct();
            }
        };
        
        console.log('🛡️ Sistema de protección avanzado activado');
    }
};

// Activar si se detecta que estamos siendo monitoreados
if (window.location.href.includes('debug') || 
    window.location.href.includes('inspect') ||
    document.title.includes('Developer')) {
    ProtectionSystem.init();
}
