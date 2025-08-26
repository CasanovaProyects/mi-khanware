const originalFetch = window.fetch;

window.fetch = async function (input, init) {
    let body;
    if (input instanceof Request) body = await input.clone().text();
    else if (init && init.body) body = init.body;
    
    if (features.videoSpoof && body && body.includes('"operationName":"updateUserVideoProgress"')) {
        try {
            let bodyObj = JSON.parse(body);
            if (bodyObj.variables && bodyObj.variables.input) {
                const durationSeconds = bodyObj.variables.input.durationSeconds;
                const videoTitle = bodyObj.variables.input.videoTitle || "Video";
                
                // Mark video as completely watched
                bodyObj.variables.input.secondsWatched = durationSeconds;
                bodyObj.variables.input.lastSecondWatched = durationSeconds;
                
                // Calculate time saved
                const timeSaved = Math.round(durationSeconds / 60);
                updateStats('videosCompleted');
                updateStats('totalTimeUsed', -durationSeconds * 1000); // Negative because we're saving time
                
                body = JSON.stringify(bodyObj);
                if (input instanceof Request) { 
                    input = new Request(input, { body: body }); 
                } else {
                    init.body = body; 
                }
                
                sendToast(`🎬 Video ULTRA completado (${timeSaved}min ahorrados)`, 2000);
                debug(`� Video spoofed: ${videoTitle} (${durationSeconds}s)`);
                
                // Random celebration for milestones
                if (statistics.videosCompleted % 10 === 0) {
                    setTimeout(() => {
                        sendToast(`🏆 ¡${statistics.videosCompleted} videos completados!`, 3000);
                        playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
                    }, 1000);
                }
            }
        } catch (e) { 
            debug(`🚨 Error @ videoSpoof.js: ${e.message}`); 
        }
    }
    return originalFetch.apply(this, arguments);
};