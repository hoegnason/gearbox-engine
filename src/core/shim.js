global.requestAnimationFrame = (callback) => setTimeout(callback, 0);

global.cancelAnimationFrame = (requestID) => { /* not empty block */ };