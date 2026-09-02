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