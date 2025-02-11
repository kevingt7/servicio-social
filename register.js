import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOyfJo7E4ddkxKoNjtmOnhGc9jLnBdX0M",
  authDomain: "to-do-list-2c8d2.firebaseapp.com",
  projectId: "to-do-list-2c8d2",
  storageBucket: "to-do-list-2c8d2.appspot.com",  // 🔹 ERROR CORREGIDO AQUÍ
  messagingSenderId: "861716002307",
  appId: "1:861716002307:web:71ed365926955152e88036"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Evento de registro
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Registro exitoso, redirigiendo...");
            window.location.href = "tareas.html"; // Redirige a tareas.html
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
