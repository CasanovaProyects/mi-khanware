const baseSelectors = [
    `[data-testid="choice-icon__library-choice-icon"]`,
    `[data-testid="exercise-check-answer"]`, 
    `[data-testid="exercise-next-question"]`, 
    `._1udzurba`,
    `._awve9b`,
    `[data-testid="next-step-button"]`,
    `[data-testid="submit-answer-button"]`,
    `button[class*="next"]`,
    `button[class*="continue"]`,
    `button[class*="submit"]`
];

// Advanced selector detection
const smartSelectorFinder = () => {
    const dynamicSelectors = [];
    
    // Find buttons with specific text patterns
    const buttons = document.querySelectorAll('button, [role="button"]');
    buttons.forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('check') || text.includes('next') || text.includes('continue') || 
            text.includes('submit') || text.includes('respuesta') || text.includes('siguiente')) {
            const selector = btn.getAttribute('data-testid') || btn.className || btn.tagName.toLowerCase();
            if (selector && !baseSelectors.includes(selector)) {
                dynamicSelectors.push(selector);
            }
        }
    });
    
    return [...baseSelectors, ...dynamicSelectors];
};

// Intelligent clicking with human behavior
const smartClick = async (selector) => {
    const element = document.querySelector(selector);
    if (!element || element.offsetParent === null) return false;
    
    // Simulate human behavior
    if (features.humanBehavior) {
        // Random pre-click delay
        await delay(100 + Math.random() * 300);
        
        // Mouse hover effect
        element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await delay(50 + Math.random() * 100);
        
        // Random position click (not always center)
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width * (0.3 + Math.random() * 0.4);
        const y = rect.top + rect.height * (0.3 + Math.random() * 0.4);
        
        element.dispatchEvent(new MouseEvent('mousedown', { 
            clientX: x, clientY: y, bubbles: true 
        }));
        await delay(20 + Math.random() * 80);
        element.dispatchEvent(new MouseEvent('mouseup', { 
            clientX: x, clientY: y, bubbles: true 
        }));
        await delay(10 + Math.random() * 30);
    }
    
    element.click();
    updateStats('questionsAnswered');
    
    // Check for completion
    if (document.querySelector(selector + "> div") && 
        document.querySelector(selector + "> div").innerText === "Mostrar resumo") {
        sendToast("🎉 ¡Ejercicio completado con éxito!", 3000);
        playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
        updateStats('exercisesCompleted');
    }
    
    return true;
};

khanwareDominates = true;

(async () => { 
    let consecutiveFailures = 0;
    let lastClickTime = 0;
    
    while (khanwareDominates) {
        if (features.autoAnswer && features.questionSpoof) {
            const currentTime = Date.now();
            const timeSinceLastClick = currentTime - lastClickTime;
            
            // Prevent too rapid clicking
            if (timeSinceLastClick < 1000) {
                await delay(1000 - timeSinceLastClick);
            }
            
            const selectorsToCheck = smartSelectorFinder();
            
            // Add conditional selectors
            if (features.nextRecomendation) selectorsToCheck.push("._hxicrxf");
            if (features.repeatQuestion) selectorsToCheck.push("._ypgawqo");
            
            let clickedAny = false;
            
            for (const selector of selectorsToCheck) {
                if (await smartClick(selector)) {
                    clickedAny = true;
                    lastClickTime = Date.now();
                    consecutiveFailures = 0;
                    break; // Only click one element per cycle
                }
            }
            
            if (!clickedAny) {
                consecutiveFailures++;
                if (consecutiveFailures > 10) {
                    debug("🤔 No clickable elements found, extending delay...");
                    await delay(5000); // Longer wait if nothing found
                    consecutiveFailures = 0;
                }
            }
        }
        
        // Use smart delay calculation
        await delay(smartDelay());
    }
})();
