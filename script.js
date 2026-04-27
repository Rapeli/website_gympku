// MENU TOGGLE
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
};


// NAV ACTIVE SCROLL
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.clientHeight;

        if (pageYOffset >= top - height / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(current)) {
            link.classList.add('active');
        }
    });
};


// TYPING TEXT
const multipleText = document.querySelector('.multiple-text');
const textArray = ['Bodybuilding', 'Strength Training', 'Cardio', 'Yoga'];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const current = textArray[textIndex];

    if (!isDeleting) {
        multipleText.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500);
            return;
        }
    } else {
        multipleText.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }
    }

    setTimeout(typeWriter, isDeleting ? 100 : 150);
}

typeWriter();


// CONTACT FORM
// const contactForm = document.querySelector('.contact-form');

// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();/'
//     alert('Pesan berhasil dikirim 💪');
//     contactForm.reset();
// });


// SCROLL ANIMATION (pakai ini aja, hapus window.load)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.service-box, .plan-box, .review-box')
    .forEach(el => observer.observe(el));


// PLAN BUTTON (FINAL FIX 🔥)
const planButtons = document.querySelectorAll('.plan-box .btn');

planButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        const planName = this.parentElement.querySelector('h3').innerText;

        // reset active
        document.querySelectorAll('.plan-box')
            .forEach(box => box.classList.remove('active'));

        this.parentElement.classList.add('active');

        // ripple
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // 👉 GANTI ALERT JADI WHATSAPP
        const waNumber = "62895618046923"; // ganti nomor kamu
        const message = `Halo, saya mau ambil paket ${planName}`;
        const waLink = `https://wa.me/62895618046923?text=${encodeURIComponent(message)}`;

        window.open(waLink, '_blank');
    });
});