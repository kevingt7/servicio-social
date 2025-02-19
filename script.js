import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOyfJo7E4ddkxKoNjtmOnhGc9jLnBdX0M",
  authDomain: "to-do-list-2c8d2.firebaseapp.com",
  projectId: "to-do-list-2c8d2",
  storageBucket: "to-do-list-2c8d2.firebasestorage.app",
  messagingSenderId: "861716002307",
  appId: "1:861716002307:web:71ed365926955152e88036"
};

//  Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elementos del DOM
const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const ul = document.getElementById("taskList");
const logoutButton = document.getElementById("logoutButton");

//  Verificar usuario autenticado
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html"; // Redirige si no hay sesión
    } else {
        loadTasks(user.uid);
    }
});

// 🔹 Cargar tareas desde Firestore
async function loadTasks(userId) {
    ul.innerHTML = ""; // Limpiar lista
    const querySnapshot = await getDocs(collection(db, "tasks", userId, "userTasks"));

    querySnapshot.forEach((taskDoc) => {
        const task = taskDoc.data();
        addTaskToDOM(task.text, taskDoc.id);
    });
}

// 🔹 Agregar tarea a Firestore
async function addTask() {
    const taskText = input.value.trim();
    if (taskText !== "") {
        const user = auth.currentUser;
        const docRef = await addDoc(collection(db, "tasks", user.uid, "userTasks"), {
            text: taskText
        });
        addTaskToDOM(taskText, docRef.id);
        input.value = "";
    }
}

// 🔹 Agregar tarea al DOM
function addTaskToDOM(taskText, taskId) {
    const li = document.createElement("li");
    li.classList.add("mb-2", "list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `${taskText} <button class="btn btn-danger btn-sm" onclick="deleteTask('${taskId}')">Eliminar</button>`;
    ul.appendChild(li);
}

// 🔹 Eliminar tarea de Firestore
async function deleteTask(taskId) {
    const user = auth.currentUser;
    await deleteDoc(doc(db, "tasks", user.uid, "userTasks", taskId));
    loadTasks(user.uid);
}

// 🔹 Cerrar sesión
logoutButton.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html"; // Redirigir al login
});

// 🔹 Eventos
addButton.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
