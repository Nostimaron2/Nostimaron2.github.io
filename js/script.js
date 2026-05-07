// Background GIF is handled via CSS

// Draggable Windows Logic
const windows = document.querySelectorAll('.window');
let highestZ = 100;

// Initial z-indices are handled via inline styles in index.html

windows.forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    win.addEventListener('mousedown', () => {
        highestZ++;
        win.style.zIndex = highestZ;
        windows.forEach(w => w.classList.remove('active'));
        win.classList.add('active');
    });

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        
        // Fix: Convert bottom/right positioning to top/left to prevent stretching
        const rect = win.getBoundingClientRect();
        win.style.top = rect.top + 'px';
        win.style.left = rect.left + 'px';
        win.style.bottom = 'auto';
        win.style.right = 'auto';
        
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;
        titleBar.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        win.style.left = (e.clientX - offset.x) + 'px';
        win.style.top = (e.clientY - offset.y) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        titleBar.style.cursor = 'grab';
    });
});

// Devaluation Counter Logic
const irrCounter = document.getElementById('irr-counter');
let baseValue = 42500000000;

function updateCounter() {
    // Randomly increase the value slightly to simulate "crashing"
    const increase = Math.floor(Math.random() * 1000000);
    baseValue += increase;
    irrCounter.innerText = `[${baseValue.toLocaleString()}]`;
}

setInterval(updateCounter, 2000);

// HODL Progress Bar Logic
const progressFill = document.getElementById('hodl-progress');

function updateProgress() {
    const numSegments = Math.floor(Math.random() * 15) + 1;
    progressFill.innerHTML = '';
    for (let i = 0; i < numSegments; i++) {
        const seg = document.createElement('div');
        seg.className = 'progress-segment';
        progressFill.appendChild(seg);
    }
}

setInterval(updateProgress, 1000);

// Vibe Levels Progress Logic
const vibeFill = document.getElementById('vibe-levels-progress');

function updateVibeProgress() {
    const numSegments = Math.floor(Math.random() * 20) + 1;
    vibeFill.innerHTML = '';
    for (let i = 0; i < numSegments; i++) {
        const seg = document.createElement('div');
        seg.className = 'progress-segment';
        seg.style.backgroundColor = numSegments > 15 ? '#FF0000' : 'var(--win-blue)';
        vibeFill.appendChild(seg);
    }
}

setInterval(updateVibeProgress, 800);

// Window Controls (Close buttons)
const closeButtons = document.querySelectorAll('button[aria-label="Close"]');
closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const win = e.target.closest('.window');
        win.style.display = 'none';
        
        // Sarcastic alert sometimes when closing
        if (Math.random() > 0.1) {
            setTimeout(() => {
                alert("SYSTEM ERROR: CANNOT ESCAPE THE VIBES.");
                win.style.display = 'flex';
            }, 1000);
        }
    });
});

// Terminal Typing Effect
const terminalLines = [
    "[EXEC] VIBE_CHECK.SH...",
    "[STATUS] LOW VIBES DETECTED",
    "[HODL] ACTIVE",
    "[NETWORK] CONNECTING TO SOL...",
    "[ERROR] IRR_VALUE_TOO_LOW",
    "[INFO] BACKED BY MEMES",
    "[ALERT] SYSTEM OVERHEAT"
];
const terminalContainer = document.querySelector('.terminal-text');
const cursorLine = document.querySelector('.cursor-line');

function addTerminalLine() {
    const newLine = document.createElement('p');
    newLine.innerText = terminalLines[Math.floor(Math.random() * terminalLines.length)];
    terminalContainer.insertBefore(newLine, cursorLine);
    
    const lines = terminalContainer.querySelectorAll('p');
    if (lines.length > 8) {
        terminalContainer.removeChild(lines[0]);
    }
}

setInterval(addTerminalLine, 3000);
