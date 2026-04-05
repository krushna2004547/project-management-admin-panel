// // ===== CONFIG =====
// const BASE_URL = "/api";
// // Change to live URL after deployment
//
// // ===== CROPPER STATE =====
// let croppers = { project: null, client: null };
// let croppedBlobs = { project: null, client: null };
//
// // ===== NAVIGATION =====
// function showSection(name) {
//     // Hide all sections
//     document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
//     document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
//
//     // Show selected
//     document.getElementById("section-" + name).classList.add("active");
//     document.getElementById("section-title").textContent =
//         name.charAt(0).toUpperCase() + name.slice(1);
//
//     // Mark active nav item
//     event.currentTarget.classList.add("active");
//
//     // Load data for read-only sections
//     if (name === "contacts")    loadContacts();
//     if (name === "subscribers") loadSubscribers();
//     if (name === "projects")    loadProjectsTable();
//     if (name === "clients")     loadClientsTable();
// }
//
// // ===== IMAGE CROP - PREVIEW =====
// function previewCrop(input, cropBoxId) {
//     const prefix = cropBoxId.replace("CropBox", "");
//     const entity = prefix === "projectCropBox" ? "project" : "client";
//
//     // Destroy previous cropper instance if any
//     if (croppers[entity]) { croppers[entity].destroy(); croppers[entity] = null; }
//
//     const file = input.files[0];
//     if (!file) return;
//
//     const reader = new FileReader();
//     reader.onload = (e) => {
//         const cropBox = document.getElementById(cropBoxId);
//         const imgId = cropBoxId.replace("CropBox", "CropImg");
//         const cropImg = document.getElementById(imgId);
//
//         cropImg.src = e.target.result;
//         cropBox.style.display = "block";
//
//         // Initialize Cropper.js with 450:350 aspect ratio
//         croppers[entity] = new Cropper(cropImg, {
//             aspectRatio: 450 / 350,
//             viewMode: 1,
//             autoCropArea: 0.8,
//         });
//     };
//     reader.readAsDataURL(file);
// }
//
// // ===== CONFIRM CROP =====
// function confirmCrop(entity) {
//     if (!croppers[entity]) return;
//
//     croppers[entity].getCroppedCanvas({ width: 450, height: 350 }).toBlob((blob) => {
//         croppedBlobs[entity] = blob;
//
//         // Show preview of cropped image
//         const previewDiv = document.getElementById(entity + "ImgPreview");
//         const previewImg = document.getElementById(entity + "CroppedPreview");
//         previewImg.src = URL.createObjectURL(blob);
//         previewDiv.style.display = "block";
//
//         // Hide cropper box
//         document.getElementById(entity + "CropBox").style.display = "none";
//         croppers[entity].destroy();
//         croppers[entity] = null;
//     }, "image/jpeg", 0.9);
// }
//
// // ===== CANCEL CROP =====
// function cancelCrop(entity) {
//     if (croppers[entity]) { croppers[entity].destroy(); croppers[entity] = null; }
//     document.getElementById(entity + "CropBox").style.display = "none";
//     document.getElementById(entity + "ImageFile").value = "";
// }
//
// // ===== RESET IMAGE =====
// function resetImage(entity) {
//     croppedBlobs[entity] = null;
//     document.getElementById(entity + "ImgPreview").style.display = "none";
//     document.getElementById(entity + "ImageFile").value = "";
// }
//
// // ===== UPLOAD IMAGE TO BACKEND =====
// async function uploadImage(entity) {
//     const blob = croppedBlobs[entity];
//     if (!blob) return null;
//
//     const formData = new FormData();
//     formData.append("file", blob, "image.jpg");
//
//     const res = await fetch(`${BASE_URL}/upload`, { method: "POST", body: formData });
//     if (!res.ok) throw new Error("Image upload failed");
//     const data = await res.json();
//     return data.imageUrl;
// }
//
// // ===== ADD PROJECT =====
// document.getElementById("projectForm").addEventListener("submit", async function (e) {
//     e.preventDefault();
//     const msg = document.getElementById("project-msg");
//     msg.textContent = "Saving...";
//     msg.style.color = "#888";
//
//     try {
//         let imageUrl = null;
//         if (croppedBlobs.project) {
//             imageUrl = await uploadImage("project");
//         }
//
//         const project = {
//             name:        document.getElementById("projectName").value.trim(),
//             description: document.getElementById("projectDesc").value.trim(),
//             imageUrl:    imageUrl
//         };
//
//         const res = await fetch(`${BASE_URL}/projects`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(project)
//         });
//
//         if (res.ok) {
//             msg.textContent = "Project added successfully!";
//             msg.style.color = "green";
//             this.reset();
//             resetImage("project");
//             loadProjectsTable();
//         } else {
//             msg.textContent = "Failed to add project.";
//             msg.style.color = "red";
//         }
//     } catch (err) {
//         msg.textContent = "Error: " + err.message;
//         msg.style.color = "red";
//     }
// });
//
// // ===== ADD CLIENT =====
// document.getElementById("clientForm").addEventListener("submit", async function (e) {
//     e.preventDefault();
//     const msg = document.getElementById("client-msg");
//     msg.textContent = "Saving...";
//     msg.style.color = "#888";
//
//     try {
//         let imageUrl = null;
//         if (croppedBlobs.client) {
//             imageUrl = await uploadImage("client");
//         }
//
//         const client = {
//             name:        document.getElementById("clientName").value.trim(),
//             designation: document.getElementById("clientDesig").value.trim(),
//             description: document.getElementById("clientDesc").value.trim(),
//             imageUrl:    imageUrl
//         };
//
//         const res = await fetch(`${BASE_URL}/clients`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(client)
//         });
//
//         if (res.ok) {
//             msg.textContent = "Client added successfully!";
//             msg.style.color = "green";
//             this.reset();
//             resetImage("client");
//             loadClientsTable();
//         } else {
//             msg.textContent = "Failed to add client.";
//             msg.style.color = "red";
//         }
//     } catch (err) {
//         msg.textContent = "Error: " + err.message;
//         msg.style.color = "red";
//     }
// });
//
// // ===== LOAD PROJECTS TABLE =====
// async function loadProjectsTable() {
//     const tbody = document.getElementById("projects-tbody");
//     try {
//         const res = await fetch(`${BASE_URL}/projects`);
//         const data = await res.json();
//
//         if (data.length === 0) {
//             tbody.innerHTML = '<tr><td colspan="4" class="loading-cell">No projects yet.</td></tr>';
//             return;
//         }
//
//         tbody.innerHTML = data.map(p => `
//       <tr>
//         <td><img class="table-img" src="${p.imageUrl || 'https://via.placeholder.com/48x38'}" alt=""/></td>
//         <td>${p.name}</td>
//         <td class="truncate">${p.description}</td>
//         <td><button class="btn-delete" onclick="deleteProject(${p.id})">Delete</button></td>
//       </tr>`).join("");
//     } catch (err) {
//         tbody.innerHTML = '<tr><td colspan="4" class="loading-cell">Failed to load.</td></tr>';
//     }
// }
//
// // ===== LOAD CLIENTS TABLE =====
// async function loadClientsTable() {
//     const tbody = document.getElementById("clients-tbody");
//     try {
//         const res = await fetch(`${BASE_URL}/clients`);
//         const data = await res.json();
//
//         if (data.length === 0) {
//             tbody.innerHTML = '<tr><td colspan="5" class="loading-cell">No clients yet.</td></tr>';
//             return;
//         }
//
//         tbody.innerHTML = data.map(c => `
//       <tr>
//         <td><img class="table-img" src="${c.imageUrl || 'https://via.placeholder.com/48x38'}" alt=""/></td>
//         <td>${c.name}</td>
//         <td>${c.designation}</td>
//         <td class="truncate">${c.description}</td>
//         <td><button class="btn-delete" onclick="deleteClient(${c.id})">Delete</button></td>
//       </tr>`).join("");
//     } catch (err) {
//         tbody.innerHTML = '<tr><td colspan="5" class="loading-cell">Failed to load.</td></tr>';
//     }
// }
//
// // ===== LOAD CONTACTS =====
// async function loadContacts() {
//     const tbody = document.getElementById("contacts-tbody");
//     try {
//         const res = await fetch(`${BASE_URL}/contact`);
//         const data = await res.json();
//
//         if (data.length === 0) {
//             tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">No contacts yet.</td></tr>';
//             return;
//         }
//
//         tbody.innerHTML = data.map((c, i) => `
//       <tr>
//         <td>${i + 1}</td>
//         <td>${c.fullName}</td>
//         <td>${c.email}</td>
//         <td>${c.mobileNumber}</td>
//         <td>${c.city}</td>
//         <td>${c.submittedAt ? new Date(c.submittedAt).toLocaleDateString() : "-"}</td>
//       </tr>`).join("");
//     } catch (err) {
//         tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">Failed to load.</td></tr>';
//     }
// }
//
// // ===== LOAD SUBSCRIBERS =====
// async function loadSubscribers() {
//     const tbody = document.getElementById("subscribers-tbody");
//     try {
//         const res = await fetch(`${BASE_URL}/newsletter`);
//         const data = await res.json();
//
//         if (data.length === 0) {
//             tbody.innerHTML = '<tr><td colspan="3" class="loading-cell">No subscribers yet.</td></tr>';
//             return;
//         }
//
//         tbody.innerHTML = data.map((s, i) => `
//       <tr>
//         <td>${i + 1}</td>
//         <td>${s.email}</td>
//         <td>${s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : "-"}</td>
//       </tr>`).join("");
//     } catch (err) {
//         tbody.innerHTML = '<tr><td colspan="3" class="loading-cell">Failed to load.</td></tr>';
//     }
// }
//
// // ===== DELETE PROJECT =====
// async function deleteProject(id) {
//     if (!confirm("Delete this project?")) return;
//     await fetch(`${BASE_URL}/projects/${id}`, { method: "DELETE" });
//     loadProjectsTable();
// }
//
// // ===== DELETE CLIENT =====
// async function deleteClient(id) {
//     if (!confirm("Delete this client?")) return;
//     await fetch(`${BASE_URL}/clients/${id}`, { method: "DELETE" });
//     loadClientsTable();
// }
//
// // ===== INIT =====
// document.addEventListener("DOMContentLoaded", () => {
//     loadProjectsTable();
// });

// ===== CONFIG =====


// ===== CONFIG =====
const BASE_URL = "/api";

// ===== CROPPER STATE =====
let croppers = {
    project: null,
    client: null
};

let croppedBlobs = {
    project: null,
    client: null
};

// ===== NAVIGATION =====
window.showSection = function(name) {

    document.querySelectorAll(".section")
        .forEach(s => s.classList.remove("active"));

    document.querySelectorAll(".nav-item")
        .forEach(n => n.classList.remove("active"));

    document.getElementById("section-" + name)
        .classList.add("active");

    document.getElementById("section-title").textContent =
        name.charAt(0).toUpperCase() + name.slice(1);

    event.currentTarget.classList.add("active");

    if (name === "contacts") loadContacts();
    if (name === "subscribers") loadSubscribers();
    if (name === "projects") loadProjectsTable();
    if (name === "clients") loadClientsTable();
};


// ===== IMAGE CROP PREVIEW =====
window.previewCrop = function(input, cropBoxId) {

    const entity = cropBoxId.includes("project") ? "project" : "client";

    if (croppers[entity]) {
        croppers[entity].destroy();
        croppers[entity] = null;
    }

    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        const cropBox = document.getElementById(cropBoxId);
        const imgId = cropBoxId.replace("CropBox", "CropImg");
        const cropImg = document.getElementById(imgId);

        cropImg.src = e.target.result;
        cropBox.style.display = "block";

        croppers[entity] = new Cropper(cropImg, {
            aspectRatio: 450 / 350,
            viewMode: 1,
            autoCropArea: 1,
            responsive: true
        });
    };

    reader.readAsDataURL(file);
};


// ===== CONFIRM CROP =====
window.confirmCrop = function(entity) {

    if (!croppers[entity]) return;

    croppers[entity]
        .getCroppedCanvas({
            width: 450,
            height: 350
        })
        .toBlob(function(blob) {

            croppedBlobs[entity] = blob;

            const previewDiv =
                document.getElementById(entity + "ImgPreview");

            const previewImg =
                document.getElementById(entity + "CroppedPreview");

            previewImg.src = URL.createObjectURL(blob);

            previewDiv.style.display = "block";

            document.getElementById(
                entity + "CropBox"
            ).style.display = "none";

            croppers[entity].destroy();
            croppers[entity] = null;

        }, "image/jpeg", 0.9);
};


// ===== CANCEL CROP =====
window.cancelCrop = function(entity) {

    if (croppers[entity]) {
        croppers[entity].destroy();
        croppers[entity] = null;
    }

    document.getElementById(entity + "CropBox")
        .style.display = "none";

    document.getElementById(entity + "ImageFile")
        .value = "";
};


// ===== RESET IMAGE =====
window.resetImage = function(entity) {

    croppedBlobs[entity] = null;

    document.getElementById(
        entity + "ImgPreview"
    ).style.display = "none";

    document.getElementById(
        entity + "ImageFile"
    ).value = "";
};


// ===== UPLOAD IMAGE =====
async function uploadImage(entity) {

    const blob = croppedBlobs[entity];
    if (!blob) return null;

    const formData = new FormData();
    formData.append("file", blob, "image.jpg");

    const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("upload failed");

    const data = await res.json();
    return data.imageUrl;
}


// ===== ADD PROJECT =====
document.getElementById("projectForm")
    .addEventListener("submit", async function(e){

        e.preventDefault();

        const msg = document.getElementById("project-msg");

        try {

            let imageUrl = null;

            if (croppedBlobs.project) {
                imageUrl = await uploadImage("project");
            }

            const project = {
                name: document.getElementById("projectName").value,
                description: document.getElementById("projectDesc").value,
                imageUrl: imageUrl
            };

            const res = await fetch(`${BASE_URL}/projects`,{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body: JSON.stringify(project)
            });

            if(res.ok){
                msg.textContent="Project added successfully!";
                msg.style.color="green";
                this.reset();
                resetImage("project");
                loadProjectsTable();
            }

        } catch(err){
            msg.textContent="Error saving project";
            msg.style.color="red";
        }

    });


// ===== ADD CLIENT =====
document.getElementById("clientForm")
    .addEventListener("submit", async function(e){

        e.preventDefault();

        const msg = document.getElementById("client-msg");

        try {

            let imageUrl = null;

            if (croppedBlobs.client) {
                imageUrl = await uploadImage("client");
            }

            const client = {
                name: document.getElementById("clientName").value,
                designation: document.getElementById("clientDesig").value,
                description: document.getElementById("clientDesc").value,
                imageUrl: imageUrl
            };

            const res = await fetch(`${BASE_URL}/clients`,{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body: JSON.stringify(client)
            });

            if(res.ok){
                msg.textContent="Client added successfully!";
                msg.style.color="green";
                this.reset();
                resetImage("client");
                loadClientsTable();
            }

        } catch(err){
            msg.textContent="Error saving client";
            msg.style.color="red";
        }

    });


// ===== LOAD PROJECTS =====
async function loadProjectsTable(){

    const tbody=document.getElementById("projects-tbody");

    const res=await fetch(`${BASE_URL}/projects`);
    const data=await res.json();

    tbody.innerHTML=data.map(p=>`
        <tr>
            <td><img class="table-img" src="${p.imageUrl || ''}"></td>
            <td>${p.name}</td>
            <td>${p.description}</td>
            <td>
            <button class="btn-delete"
            onclick="deleteProject(${p.id})">
            Delete
            </button>
            </td>
        </tr>
    `).join("");
}


// ===== LOAD CLIENTS =====
async function loadClientsTable(){

    const tbody=document.getElementById("clients-tbody");

    const res=await fetch(`${BASE_URL}/clients`);
    const data=await res.json();

    tbody.innerHTML=data.map(c=>`
        <tr>
            <td><img class="table-img" src="${c.imageUrl || ''}"></td>
            <td>${c.name}</td>
            <td>${c.designation}</td>
            <td>${c.description}</td>
            <td>
            <button class="btn-delete"
            onclick="deleteClient(${c.id})">
            Delete
            </button>
            </td>
        </tr>
    `).join("");
}


// ===== DELETE PROJECT =====
window.deleteProject = async function(id){
    await fetch(`${BASE_URL}/projects/${id}`,{method:"DELETE"});
    loadProjectsTable();
}


// ===== DELETE CLIENT =====
window.deleteClient = async function(id){
    await fetch(`${BASE_URL}/clients/${id}`,{method:"DELETE"});
    loadClientsTable();
}


// ===== INIT =====
document.addEventListener("DOMContentLoaded",()=>{
    loadProjectsTable();
});