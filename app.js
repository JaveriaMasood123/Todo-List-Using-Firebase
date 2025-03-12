
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js"; 
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBvhp5RdY17DSQCO6p6vLrQ5E2RasBH-IM",
    authDomain: "sign-up-login-form-f52a3.firebaseapp.com",
    databaseURL: "https://sign-up-login-form-f52a3-default-rtdb.firebaseio.com",
    projectId: "sign-up-login-form-f52a3",
    storageBucket: "sign-up-login-form-f52a3.firebasestorage.app",
    messagingSenderId: "339294474621",
    appId: "1:339294474621:web:03055d4e4c013555effc14",
    measurementId: "G-4KPNHC421X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db= getDatabase(app);
  const taskInput=document.getElementById('taskInput')
  const taskList=document.getElementById('tasklist')

  window.addTask = () => {     
    let task = taskInput.value.trim();     
    if (task) push(ref(db, "tasks"), task);     
    taskInput.value = ""; 
};

onValue(ref(db, "tasks"), (snapshot) => {     
    taskList.innerHTML = "";     
    let tasks = snapshot.val();     
    if (!tasks) return; 

    let keys = Object.keys(tasks);     
    for (let i = 0; i < keys.length; i++) {        
         let key = keys[i]; 

         let li = document.createElement("li"); 

         let btn = document.createElement("button"); 
         li.textContent = tasks[key]; btn.textContent = "Delete"; 
         btn.onclick = () => remove(ref(db, "tasks/" + key)); 
         li.appendChild(btn); 
         taskList.appendChild(li);
         
        } });