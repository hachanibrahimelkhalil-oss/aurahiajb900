// firebase-config.js
// Configuration Firebase pour AURA-HIJAB
// À inclure via : <script type="module" src="./firebase-config.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhBRzFKheRXz8nHWlWjLdTbgByR9myUeM",
  authDomain: "aurahijab900.firebaseapp.com",
  projectId: "aurahijab900",
  storageBucket: "aurahijab900.firebasestorage.app",
  messagingSenderId: "966331175226",
  appId: "1:966331175226:web:028f0c1549a287d5088003",
  measurementId: "G-6GLDLPYWZC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
