window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");

    const animatedElements = document.querySelectorAll(".section, #whatsappForm, .project-card, .skill");
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    animatedElements.forEach((element) => observer.observe(element));

    if (window.matchMedia("(pointer: fine)").matches) {
        document.querySelectorAll(".project-card").forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `translateY(-5px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
            });
        });

        const profile = document.querySelector(".profile");
        if (profile) {
            profile.addEventListener("pointermove", (event) => {
                const rect = profile.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                profile.style.transform = `translateY(-7px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) rotateZ(-4deg)`;
            });

            profile.addEventListener("pointerleave", () => {
                profile.style.transform = "";
            });
        }
    }
});

document.getElementById("whatsappForm").addEventListener("submit", function(e){
    e.preventDefault();
    const prenom = document.getElementById("prenom").value;
    const ville = document.getElementById("ville").value;
    const messageUser = document.getElementById("message").value;

    const heure = new Date().getHours();
    let salutation = "Bonjour";

    if(heure >=12 && heure <18){
        salutation = "Bon apres-midi";
    }else if(heure >=18 || heure <5){
        salutation = "Bonsoir";
    }

    const messageFinal = `${salutation}
    Je m'appelle ${prenom}.
    Je vous ecris depuis ${ville}.
    ${messageUser}`;

    const phone = "22897056009";
    const URL = 
    `https://wa.me/${phone}?text=${encodeURIComponent(messageFinal)}`;
    window.open(URL, "_blank");
});