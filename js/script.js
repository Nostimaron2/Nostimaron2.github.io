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
        document.body.classList.add('dragging');
        
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
        if (isDragging) {
            isDragging = false;
            document.body.classList.remove('dragging');
            titleBar.style.cursor = 'grab';
        }
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
        
        // Sarcastic alert sometimes when closing (except for Roadmap)
        if (win.id !== 'window-roadmap' && Math.random() > 0.1) {
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

// Roadmap Icon Logic
const roadmapIcon = document.getElementById('icon-roadmap');
const roadmapWindow = document.getElementById('window-roadmap');

if (roadmapIcon && roadmapWindow) {
    roadmapIcon.addEventListener('click', () => {
        // Move to just after the desktop icons (crucial for mobile stacking)
        const desktop = document.getElementById('desktop');
        const desktopIcons = document.querySelector('.desktop-icons');
        if (desktopIcons && desktopIcons.nextSibling) {
            desktop.insertBefore(roadmapWindow, desktopIcons.nextSibling);
        } else {
            desktop.appendChild(roadmapWindow);
        }
        
        roadmapWindow.style.display = 'flex';
        
        // Centering logic (only really affects desktop absolute positioning)
        const winWidth = roadmapWindow.offsetWidth || 350;
        const winHeight = roadmapWindow.offsetHeight || 400;
        roadmapWindow.style.top = (window.innerHeight / 2 - winHeight / 2) + 'px';
        roadmapWindow.style.left = (window.innerWidth / 2 - winWidth / 2) + 'px';
        
        // Ensure it's on top by picking a value higher than any inline style (like 200)
        highestZ = Math.max(highestZ, 250) + 1;
        roadmapWindow.style.zIndex = highestZ;
        
        windows.forEach(w => w.classList.remove('active'));
        roadmapWindow.classList.add('active');
    });
}
