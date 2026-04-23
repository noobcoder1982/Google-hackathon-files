const menuItems = [
    { label: "Dashboard", icon: "grid-outline", href: "dashboard.html" },
    { label: "Quests", icon: "map-outline", href: "quests.html" },
    { label: "Guilds", icon: "people-outline", href: "groups.html" },
    { label: "Planner", icon: "calendar-outline", href: "planner.html" },
    { label: "Chat", icon: "chatbubbles-outline", href: "chat.html" },
    { label: "Alerts", icon: "notifications-outline", href: "notifications.html" }
];

let isOpen = false;
let isMenuAnimating = false;
let responsiveConfig = {};
let isMusicPlaying = false;
const audioElement = document.getElementById('backgroundMusic');

// UI Audio Controller
const SoundFx = {
    hover: new Audio('public/sounds/SND01_sine/tap_01.wav'),
    click: new Audio('public/sounds/SND01_sine/select.wav'),
    open: new Audio('public/sounds/SND01_sine/transition_up.wav'),
    close: new Audio('public/sounds/SND01_sine/transition_down.wav'),
    play(soundName) {
        if(this[soundName]) {
            this[soundName].currentTime = 0;
            this[soundName].volume = 0.3; // Tasteful ambient volume
            this[soundName].play().catch(() => {});
        }
    }
};
function getResponsiveConfig() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile = viewportWidth < 1000;
    const maxSizeLimitedByViewport = Math.min(viewportWidth * 0.9, viewportHeight * 0.9);
    let calculatedMenuSize = isMobile ? Math.min(maxSizeLimitedByViewport, 450) : 650;
    calculatedMenuSize = Math.min(calculatedMenuSize, viewportWidth * 0.9, viewportHeight * 0.9);

    return {
        menuSize: calculatedMenuSize,
        center: calculatedMenuSize / 2,
        innerRadius: calculatedMenuSize * 0.10,
        outerRadius: calculatedMenuSize * 0.45,
        contentRadius: calculatedMenuSize * 0.30,
    };
}

function createSegment(item, index, total) {
    const segment = document.createElement("a");
    segment.className = "menu-segment";
    segment.href = item.href;
    segment.setAttribute("data-label", item.label); 

    const { menuSize, center, innerRadius, outerRadius, contentRadius } = responsiveConfig;
    const anglePerSegment = 360 / total;
    const baseStartAngle = anglePerSegment * index;
    const centerAngle = baseStartAngle + anglePerSegment / 2;
    const startAngle = baseStartAngle + 0.25; 
    const endAngle = baseStartAngle + anglePerSegment - 0.25;
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    const innerStartX = center + innerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180);
    const innerStartY = center + innerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180);
    const outerStartX = center + outerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180);
    const outerStartY = center + outerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180);
    const outerEndX = center + outerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180);
    const outerEndY = center + outerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180);
    const innerEndX = center + innerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180);
    const innerEndY = center + innerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180);
    
    const pathData = [
        `M ${innerStartX} ${innerStartY}`, `L ${outerStartX} ${outerStartY}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
        `L ${innerEndX} ${innerEndY}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`, "Z",
    ].join(" ");

    segment.style.clipPath = `path('${pathData}')`;
    segment.style.width = `${menuSize}px`; segment.style.height = `${menuSize}px`;

    const contentX = center + contentRadius * Math.cos(((centerAngle - 90) * Math.PI) / 180);
    const contentY = center + contentRadius * Math.sin(((centerAngle - 90) * Math.PI) / 180);

    segment.innerHTML = `
        <div class="segment-content" style="left: ${contentX}px; top: ${contentY}px; transform: translate(-50%, -50%) rotate(${centerAngle}deg);">
            <ion-icon name="${item.icon}" style="transform: rotate(-${centerAngle}deg);"></ion-icon>
            <div class="segment-label" style="transform: rotate(-${centerAngle}deg);">${item.label}</div>
        </div>`;

    // Hook up sound interactions
    segment.addEventListener('mouseenter', () => SoundFx.play('hover'));
    segment.addEventListener('click', (e) => {
        e.preventDefault();
        SoundFx.play('click');
        setTimeout(() => {
            window.location.href = item.href;
        }, 300);
    });

    return segment;
}

function toggleMenu() {
    if (isMenuAnimating) return;

    const menuOverlay = document.querySelector(".menu-overlay");
    const menuSegments = document.querySelectorAll(".menu-segment");
    const joystick = document.querySelector(".joystick");
    const menuOverlayNav = document.querySelector(".menu-overlay-nav");
    const menuOverlayFooter = document.querySelector(".menu-overlay-footer");
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");

    isMenuAnimating = true;

    if (!isOpen) {
        isOpen = true;
        SoundFx.play('open');
        menuToggleBtn.classList.add('hidden-by-menu'); 
        if(window.gsap) {
            gsap.to(menuOverlay, {
                opacity: 1, duration: 0.3, ease: "power2.out",
                onStart: () => { menuOverlay.style.pointerEvents = "all"; menuOverlay.classList.add("active"); },
            });
            gsap.to(joystick, { scale: 1, duration: 0.4, delay: 0.2, ease: "back.out(1.7)" });
            gsap.set([menuOverlayNav, menuOverlayFooter], {opacity: 0});
            gsap.to([menuOverlayNav, menuOverlayFooter], {
                opacity: 1, duration: 0.075, delay: 0.3, repeat: 3, yoyo: true, ease: "power2.inOut",
                onComplete: () => gsap.set([menuOverlayNav, menuOverlayFooter], {opacity: 1})
            });

            const shuffledIndices = [...Array(menuSegments.length).keys()].sort(() => Math.random() - 0.5);
            let animationsCompletedOpen = 0;
            shuffledIndices.forEach((originalIndex, shuffledPosition) => {
                const segment = menuSegments[originalIndex];
                const segmentContent = segment.querySelector('.segment-content');
                gsap.set([segment, segmentContent], { opacity: 0 });
                gsap.to([segment, segmentContent], {
                    opacity: 1, duration: 0.075, delay: 0.4 + shuffledPosition * 0.075,
                    repeat: 3, yoyo: true, ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set([segment, segmentContent], { opacity: 1 });
                        animationsCompletedOpen++;
                        if (animationsCompletedOpen === menuSegments.length) isMenuAnimating = false;
                    }
                });
            });
        }
    } else { 
        isOpen = false;
        SoundFx.play('close');
        menuToggleBtn.classList.remove('hidden-by-menu');

        if(window.gsap) {
            gsap.to([menuOverlayNav, menuOverlayFooter], { opacity: 0, duration: 0.05, repeat: 2, yoyo: true, ease: "power2.inOut" });
            gsap.to(joystick, { scale: 0, duration: 0.3, delay: 0.2, ease: "back.in(1.7)" });
            
            const shuffledIndices = [...Array(menuSegments.length).keys()].sort(() => Math.random() - 0.5);
            shuffledIndices.forEach((originalIndex, shuffledPosition) => {
                const segment = menuSegments[originalIndex];
                const segmentContent = segment.querySelector('.segment-content');
                gsap.to([segment, segmentContent], {
                    opacity: 0, duration: 0.05, delay: 0.1 + shuffledPosition * 0.05,
                    repeat: 2, yoyo: true, ease: "power2.inOut",
                    onComplete: () => gsap.set([segment, segmentContent], { opacity: 0 })
                });
            });
            
            gsap.to(menuOverlay, {
                opacity: 0, duration: 0.3, delay: 0.6, ease: "power2.out",
                onComplete: () => {
                    menuOverlay.style.pointerEvents = "none";
                    menuOverlay.classList.remove("active");
                    isMenuAnimating = false;
                },
            });
        }
    }
}

function initCenterDrag() {
    const joystick = document.querySelector(".joystick");
    if (!joystick) return; 
    const menuSegmentsAll = document.querySelectorAll(".menu-segment");

    let isDragging = false; let currentX = 0, currentY = 0; let targetX = 0, targetY = 0;
    let activeSegment = null;

    function animate() {
        currentX += (targetX - currentX) * 0.15; currentY += (targetY - currentY) * 0.15;
        if(window.gsap) gsap.set(joystick, { x: currentX, y: currentY });

        if (isOpen && isDragging && Math.sqrt(currentX * currentX + currentY * currentY) > 20) {
            const angle = Math.atan2(currentY, currentX) * (180 / Math.PI);
            const segmentIndex = Math.floor(((angle + 90 + 360) % 360) / (360 / menuItems.length)) % menuItems.length;
            const segment = menuSegmentsAll[segmentIndex];
            
            if (segment && segment !== activeSegment) {
                if (activeSegment) {
                    activeSegment.classList.remove('active-segment-hover');
                    activeSegment.style.zIndex = "5";
                }
                activeSegment = segment;
                activeSegment.classList.add('active-segment-hover');
                activeSegment.style.zIndex = "10";
            }
        } else if (activeSegment && !isDragging && Math.sqrt(currentX*currentX + currentY*currentY) <=20 ) { 
             activeSegment.classList.remove('active-segment-hover');
             activeSegment.style.zIndex = "5"; 
             activeSegment = null;
        }
        requestAnimationFrame(animate);
    }

    joystick.addEventListener("mousedown", (e) => {
        if (!isOpen) return; isDragging = true; joystick.style.cursor = "grabbing"; e.preventDefault(); 
    });
    document.addEventListener("mousemove", (e) => {
        if (!isDragging || !isOpen) return;
        const rect = joystick.parentElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2; const centerY = rect.top + rect.height / 2;
        let deltaX = e.clientX - centerX; let deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDrag = responsiveConfig.innerRadius * 1.5; 
        if (distance < 20) { targetX = 0; targetY = 0; }
        else if (distance > maxDrag) { const ratio = maxDrag / distance; targetX = deltaX * ratio; targetY = deltaY * ratio; }
        else { targetX = deltaX; targetY = deltaY; }
        e.preventDefault();
    });
    document.addEventListener("mouseup", () => {
        if (!isDragging || !isOpen) return; isDragging = false; joystick.style.cursor = "grab";
        
        if (activeSegment) {
            window.location.href = activeSegment.href;
        }
        targetX = 0; targetY = 0; 
    });
    
    joystick.addEventListener("touchstart", (e) => {
        if (!isOpen) return; isDragging = true; joystick.style.cursor = "grabbing"; e.preventDefault();
    }, { passive: false });
    document.addEventListener("touchmove", (e) => {
        if (!isDragging || !isOpen) return;
        const rect = joystick.parentElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2; const centerY = rect.top + rect.height / 2;
        let deltaX = e.touches[0].clientX - centerX; let deltaY = e.touches[0].clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDrag = responsiveConfig.innerRadius * 1.5;
        if (distance < 20) { targetX = 0; targetY = 0; }
        else if (distance > maxDrag) { const ratio = maxDrag / distance; targetX = deltaX * ratio; targetY = deltaY * ratio; }
        else { targetX = deltaX; targetY = deltaY; }
        e.preventDefault();
    }, { passive: false });
    document.addEventListener("touchend", () => {
        if (!isDragging || !isOpen) return; isDragging = false; joystick.style.cursor = "grab";
        if (activeSegment) {
            window.location.href = activeSegment.href;
        }
        targetX = 0; targetY = 0;
    });
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('ImpactQuest Circular GSAP initialized');

    // --- CIRCULAR NAV INIT ---
    responsiveConfig = getResponsiveConfig();
    const menu = document.querySelector(".circular-menu");
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    const playPauseBtn = document.getElementById('playPauseBtn');

    if (menu) {
        menu.style.width = `${responsiveConfig.menuSize}px`;
        menu.style.height = `${responsiveConfig.menuSize}px`;
        menuItems.forEach((item, index) => {
            const segment = createSegment(item, index, menuItems.length);
            menu.appendChild(segment);
        });
    }

    if (window.gsap) {
        const jsJoystick = document.querySelector(".joystick");
        const jsMenuNav = document.querySelector(".menu-overlay-nav");
        const jsMenuFoot = document.querySelector(".menu-overlay-footer");
        if(jsJoystick) gsap.set(jsJoystick, { scale: 0 });
        if(jsMenuNav && jsMenuFoot) gsap.set([jsMenuNav, jsMenuFoot], { opacity: 0 });
    }

    if (menuToggleBtn) {
        setTimeout(() => { menuToggleBtn.classList.add('visible'); }, 500);
        menuToggleBtn.addEventListener("click", toggleMenu);
    }
    const closeBtn = document.querySelector(".close-btn");
    if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
    
    initCenterDrag();
    if(document.getElementById('currentYear')) {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    }

    if (playPauseBtn && audioElement) {
        playPauseBtn.addEventListener('click', () => {
            if (isMusicPlaying) {
                audioElement.pause();
                playPauseBtn.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
            } else {
                audioElement.play().catch(e => console.log(e));
                playPauseBtn.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }

    window.addEventListener('resize', () => {
        responsiveConfig = getResponsiveConfig();
        if (menu) {
            menu.style.width = `${responsiveConfig.menuSize}px`;
            menu.style.height = `${responsiveConfig.menuSize}px`;
            menu.innerHTML = '<div class="joystick"><ion-icon name="grid-sharp" class="center-icon center-main"></ion-icon><ion-icon name="chevron-up-sharp" class="center-icon center-up"></ion-icon><ion-icon name="chevron-down-sharp" class="center-icon center-down"></ion-icon><ion-icon name="chevron-back-sharp" class="center-icon center-left"></ion-icon><ion-icon name="chevron-forward-sharp" class="center-icon center-right"></ion-icon></div>';
            
            if(window.gsap) gsap.set(document.querySelector(".joystick"), { x:0, y:0, scale: isOpen ? 1: 0 }); 
            
            menuItems.forEach((item, index) => { 
                const segment = createSegment(item, index, menuItems.length);
                menu.appendChild(segment);
            });
            if(isOpen){ 
                const menuSegments = document.querySelectorAll(".menu-segment");
                 menuSegments.forEach(seg => {
                    if(window.gsap) {
                        gsap.set(seg, {opacity: 1});
                        if(seg.querySelector(".segment-content")) gsap.set(seg.querySelector(".segment-content"), {opacity: 1});
                    }
                 });
            }
        }
    });

    // --- QUEST FILTERING ---
    const categoryFilter = document.getElementById('filter-category');
    const difficultyFilter = document.getElementById('filter-difficulty');
    const questGrid = document.getElementById('quest-grid');

    if (categoryFilter && difficultyFilter && questGrid) {
        const filterQuests = () => {
            const cat = categoryFilter.value;
            const diff = difficultyFilter.value;
            const quests = questGrid.querySelectorAll('.quest-card');

            quests.forEach(quest => {
                const questCat = quest.getAttribute('data-category');
                const questDiff = quest.getAttribute('data-difficulty');

                const catMatch = cat === 'all' || cat === questCat;
                const diffMatch = diff === 'all' || diff === questDiff;

                if (catMatch && diffMatch) {
                    quest.style.display = 'flex';
                    quest.classList.add('fade-in');
                } else {
                    quest.style.display = 'none';
                }
            });
        };

        categoryFilter.addEventListener('change', filterQuests);
        difficultyFilter.addEventListener('change', filterQuests);
    }

    // --- QUEST ACCEPTANCE MODAL ---
    const acceptBtns = document.querySelectorAll('.accept-btn');
    const modal = document.getElementById('quest-modal');
    const closeModal = document.getElementById('close-modal');

    if (acceptBtns && modal) {
        acceptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'flex';
                // Simulate XP gain logic could go here
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close on background click
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // --- CHAT SIMULATION ---
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');

    if (chatForm && chatMessages && messageInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = messageInput.value.trim();
            if (text) {
                // Create message element
                const msgDiv = document.createElement('div');
                msgDiv.className = 'message sent fade-in';
                msgDiv.innerHTML = `
                    <div class="msg-bubble">${text}</div>
                    <div class="msg-info">
                        <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                `;
                chatMessages.appendChild(msgDiv);
                messageInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Simulate reply
                setTimeout(() => {
                    const replyDiv = document.createElement('div');
                    replyDiv.className = 'message received fade-in';
                    replyDiv.innerHTML = `
                        <div class="msg-bubble">That sounds awesome, Alex!</div>
                        <div class="msg-info">
                            <span style="font-weight: 700; color: white;">Jordan_99</span>
                            <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    `;
                    chatMessages.appendChild(replyDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1500);
            }
        });
    }

    // --- GAME HUD SIMULATION LOGIC ---
    
    // 1. XP Bar Mechanical Build-up Animation
    const playerXpBar = document.getElementById('playerXpBar');
    if (playerXpBar && window.gsap) {
        gsap.fromTo(playerXpBar, 
            { width: "0%" }, 
            { width: "78%", duration: 2, ease: "power3.out", delay: 0.5 }
        );
    }

    // 2. Physical Hover / Press states on Quest Tiles
    const questItems = document.querySelectorAll('.quest-item');
    questItems.forEach(item => {
        // Hover -> Lift + Deep Shadow
        item.addEventListener('mouseenter', () => {
            if(window.gsap) gsap.to(item, { y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 5px rgba(0,0,0,0.5)", duration: 0.3 });
            SoundFx.play('hover');
        });
        item.addEventListener('mouseleave', () => {
            if(window.gsap) gsap.to(item, { y: 0, boxShadow: "0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 5px rgba(0,0,0,0.5)", duration: 0.3 });
        });
        
        // Click -> Press-in effect (depth change)
        item.addEventListener('mousedown', () => {
            if(window.gsap) gsap.to(item, { y: 2, scale: 0.98, boxShadow: "inset 0 4px 8px rgba(0,0,0,0.9)", duration: 0.1 });
            SoundFx.play('click');
        });
        item.addEventListener('mouseup', () => {
            if(window.gsap) gsap.to(item, { y: -4, scale: 1, boxShadow: "0 10px 20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 5px rgba(0,0,0,0.5)", duration: 0.2 });
        });
    });

    // 3. Tactile Feedback to Buttons
    const hudButtons = document.querySelectorAll('.leather-btn, .glossy-btn');
    hudButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            SoundFx.play('click');
            const originalText = this.innerHTML;
            this.innerHTML = "Engaging...";
            
            if(window.gsap) {
                gsap.to(this, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
            }
            
            setTimeout(() => {
                this.innerHTML = "Committed <i class='fa-solid fa-check'></i>";
                this.style.color = "var(--accent-green)";
                setTimeout(() => { this.innerHTML = originalText; this.style.color = ""; }, 2000);
            }, 600);
        });
    });
});
