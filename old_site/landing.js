// landing.js - Intersection Observers for reveal animations

document.addEventListener("DOMContentLoaded", () => {
    // Reveal animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, observerOptions);

    // Grab all elements to be animated
    const animatedElements = document.querySelectorAll('.fade-up-scroll');
    
    animatedElements.forEach(el => {
        el.classList.add('hidden-scroll'); // set initial state
        observer.observe(el);
    });

    // Dynamic AI path rendering (SVG mapping between elements)
    function drawLines() {
        const aiCore = document.querySelector('.ai-core');
        const nodes = document.querySelectorAll('.node-orb:not(.ai-core)');
        const svg = document.getElementById('ai-svg');
        
        if (!aiCore || !svg) return;
        
        // Reset SVG
        svg.innerHTML = '';
        
        const coreRect = aiCore.getBoundingClientRect();
        const containerRect = document.querySelector('.ai-visual').getBoundingClientRect();
        
        const coreX = coreRect.left - containerRect.left + (coreRect.width / 2);
        const coreY = coreRect.top - containerRect.top + (coreRect.height / 2);

        nodes.forEach(node => {
            const rect = node.getBoundingClientRect();
            const nX = rect.left - containerRect.left + (rect.width / 2);
            const nY = rect.top - containerRect.top + (rect.height / 2);
            
            // Draw curved path
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = `M ${coreX},${coreY} Q ${(coreX+nX)/2},${coreY} ${nX},${nY}`;
            path.setAttribute('d', d);
            path.setAttribute('class', 'ai-path');
            svg.appendChild(path);
        });
    }

    // Give layout time to settle
    setTimeout(drawLines, 500);
    window.addEventListener('resize', drawLines);
});
