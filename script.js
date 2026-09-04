gsap.fromTo("#car-and-smoke", { x: -600 }, { x: "100vw", duration: 25, ease: "none", repeat: -1 });
gsap.to(".ascii-cloud", { x: "-150vw", duration: 35, ease: "none", stagger: { each: 15, repeat: -1 } });
gsap.to("#classic-car", { y: 1.5, duration: 0.1, yoyo: true, repeat: -1, ease: "sine.inOut" });
gsap.to(".speed-line", { x: "-120vw", duration: 0.8, ease: "none", stagger: { each: 0.2, repeat: -1, from: "random" } });
gsap.to(".smoke-particle", { x: -40, y: -30, scale: 2, opacity: 0, duration: 1.5, ease: "power1.out", stagger: { each: 0.3, repeat: -1 } });

gsap.from("#win-pgp", { duration: 1, x: "50vw", opacity: 0, ease: "power2.out", delay: 0.1 });
gsap.from("#win-perfil", { duration: 1, scale: 0, opacity: 0, ease: "back.out(1.5)", delay: 0.2 });
gsap.from("#win-academia", { duration: 1, x: "-50vw", opacity: 0, ease: "power2.out", delay: 0.6 });
gsap.from("#win-hobbies", { duration: 1, x: "50vw", opacity: 0, ease: "power2.out", delay: 1 });
gsap.from("#win-cripto", { duration: 1.5, y: "100vh", opacity: 0, ease: "power2.out", delay: 1.4 });
gsap.from("#win-chica", { duration: 1, scale: 0, rotation: 10, opacity: 0, ease: "back.out(1.2)", delay: 1.8 });

// Window manager
const windows = document.querySelectorAll('.retro-window');
let highestZIndex = 50; 

window.openWindow = function(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    highestZIndex++;
    win.style.zIndex = highestZIndex;
    gsap.fromTo(win, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
};

windows.forEach(win => {
    const header = win.querySelector('.window-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    win.addEventListener('mousedown', () => {
        highestZIndex++;
        win.style.zIndex = highestZIndex;
    });
    
    win.addEventListener('touchstart', () => {
        highestZIndex++;
        win.style.zIndex = highestZIndex;
    }, {passive: true});

    header.onmousedown = dragMouseDown;
    header.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.closest('button')) return;

        e.preventDefault();
        highestZIndex++;
        win.style.zIndex = highestZIndex; 
        pos3 = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
        pos4 = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - (e.type.includes("touch") ? e.touches[0].clientX : e.clientX);
        pos2 = pos4 - (e.type.includes("touch") ? e.touches[0].clientY : e.clientY);
        pos3 = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
        pos4 = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
        win.style.top = (win.offsetTop - pos2) + "px";
        win.style.left = (win.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null; 
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
});

// Clock
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    document.getElementById('clock').innerText = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

gsap.to("#retro-floater-1", { x: 150, y: 80, rotation: -10, duration: 30, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to("#retro-floater-2", { x: -200, y: -100, duration: 35, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to("#retro-floater-3", { x: -100, y: 150, rotation: 180, duration: 45, repeat: -1, yoyo: true, ease: "none" });

// Cursor trail effect
const trailChars = ['+', '-', 'x', '÷', '>', '<', '[', ']'];
document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.6) return;
    
    const trail = document.createElement("div");
    trail.innerText = trailChars[Math.floor(Math.random() * trailChars.length)];
    trail.className = "absolute pointer-events-none font-mono text-white opacity-40 z-[9999]";
    trail.style.left = (e.pageX + 15) + "px";
    trail.style.top = (e.pageY + 15) + "px";
    document.body.appendChild(trail);

    gsap.to(trail, {
        opacity: 0,
        y: e.pageY + 30,
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => trail.remove()
    });
});

// Audio player controls
function toggleAudio() {
    const audio = document.getElementById('audio-player');
    const status = document.getElementById('playing-status');
    const btn = document.getElementById('play-pause-btn');

    if (audio.paused) {
        audio.play();
        status.innerText = '▶ REPRODUCIENDO...';
        btn.innerText = '⏸';
    } else {
        audio.pause();
        status.innerText = '⏸ PAUSADO';
        btn.innerText = '▶';
    }
}