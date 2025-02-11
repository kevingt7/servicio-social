import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Configuración de Firebase (usa la misma que en el registro)
const firebaseConfig = {
  apiKey: "AIzaSyDOyfJo7E4ddkxKoNjtmOnhGc9jLnBdX0M",
  authDomain: "to-do-list-2c8d2.firebaseapp.com",
  projectId: "to-do-list-2c8d2",
  storageBucket: "to-do-list-2c8d2.firebasestorage.app",
  messagingSenderId: "861716002307",
  appId: "1:861716002307:web:71ed365926955152e88036"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Manejar el inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Inicio de sesión exitoso, redirigiendo...");
            window.location.href = "tareas.html"; // Redirige a la página de tareas
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
