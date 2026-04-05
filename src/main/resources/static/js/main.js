// ===== CONFIG =====
const BASE_URL = "/api";
// When deployed, change to: const BASE_URL = "https://your-backend.onrender.com/api";

// ===== LOAD PROJECTS =====
async function loadProjects() {
    const container = document.getElementById("projects-container");
    try {
        const res = await fetch(`${BASE_URL}/projects`);
        const projects = await res.json();

        if (projects.length === 0) {
            container.innerHTML = '<p class="loading-text">No projects available yet.</p>';
            return;
        }

        container.innerHTML = "";
        projects.forEach(p => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.innerHTML = `
        <img src="${p.imageUrl || 'https://via.placeholder.com/300x160?text=No+Image'}" alt="${p.name}"/>
        <div class="card-body">
          <h4>${p.name}</h4>
          <p>${p.description}</p>
          <button>Read More</button>
        </div>`;
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = '<p class="loading-text">Failed to load projects.</p>';
        console.error("Projects error:", err);
    }
}

// ===== LOAD CLIENTS =====
async function loadClients() {
    const container = document.getElementById("clients-container");
    try {
        const res = await fetch(`${BASE_URL}/clients`);
        const clients = await res.json();

        if (clients.length === 0) {
            container.innerHTML = '<p class="loading-text">No clients available yet.</p>';
            return;
        }

        container.innerHTML = "";
        clients.forEach(c => {
            const card = document.createElement("div");
            card.className = "client-card";
            card.innerHTML = `
        <img src="${c.imageUrl || 'https://via.placeholder.com/56?text=?'}" alt="${c.name}"/>
        <p class="client-desc">${c.description}</p>
        <div class="client-name">${c.name}</div>
        <div class="client-designation">${c.designation}</div>`;
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = '<p class="loading-text">Failed to load clients.</p>';
        console.error("Clients error:", err);
    }
}

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const msg = document.getElementById("form-msg");

    const data = {
        fullName:     document.getElementById("fullName").value.trim(),
        email:        document.getElementById("emailAddr").value.trim(),
        mobileNumber: document.getElementById("mobileNum").value.trim(),
        city:         document.getElementById("city").value.trim()
    };

    try {
        const res = await fetch(`${BASE_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            msg.textContent = "Thank you! We will contact you soon.";
            msg.style.color = "#7ef";
            this.reset();
        } else {
            msg.textContent = "Something went wrong. Please try again.";
            msg.style.color = "#f87";
        }
    } catch (err) {
        msg.textContent = "Server error. Please try again later.";
        msg.style.color = "#f87";
        console.error("Contact form error:", err);
    }
});

// ===== NEWSLETTER - NAVBAR =====
async function navSubscribe() {
    const emailInput = document.getElementById("nav-email");
    await subscribeEmail(emailInput.value.trim(), emailInput);
}

// ===== NEWSLETTER - FOOTER =====
async function footerSubscribe() {
    const emailInput = document.getElementById("footer-email");
    await subscribeEmail(emailInput.value.trim(), emailInput);
}

async function subscribeEmail(email, inputEl) {
    if (!email) { alert("Please enter your email."); return; }

    try {
        const res = await fetch(`${BASE_URL}/newsletter`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const text = await res.text();
        if (res.ok) {
            alert("Subscribed successfully! Thank you.");
            inputEl.value = "";
        } else {
            alert(text || "Subscription failed.");
        }
    } catch (err) {
        alert("Server error. Please try again later.");
        console.error("Newsletter error:", err);
    }
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
    loadClients();
});