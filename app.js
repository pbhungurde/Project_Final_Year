// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore"; // Firestore functions

// Firebase configuration (replace these values with your own)
const firebaseConfig = {
  apiKey: "AIzaSyCBh9k_OCdNJWq2KGItJWGn031XFKCwMg0",
  authDomain: "studentteacherfinal.firebaseapp.com",
  projectId: "studentteacherfinal",
  storageBucket: "studentteacherfinal.firebasestorage.app",
  messagingSenderId: "581978948377",
  appId: "1:581978948377:web:eb53b62470bd2e39a6fb88",
  measurementId: "G-D1X1T9152G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Reference to the appointments collection in Firestore
const appointmentsRef = collection(db, 'appointments');

// Function to submit an appointment
async function submitAppointment() {
  const studentName = document.getElementById('studentName').value;
  const teacherName = document.getElementById('teacherName').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  try {
    // Save the appointment to Firestore
    await addDoc(appointmentsRef, {
      studentName: studentName,
      teacherName: teacherName,
      date: date,
      time: time
    });

    // Clear the form
    document.getElementById('appointmentForm').reset();
    alert('Appointment added successfully!');  // Optional: confirmation message
  } catch (error) {
    console.error("Error adding appointment: ", error);
    alert('Error adding appointment. Please try again later.');
  }
}

// Function to display appointments
function displayAppointments() {
  const appointmentsDiv = document.getElementById('appointments');
  
  // Listen for changes in the appointments collection
  onSnapshot(appointmentsRef, (snapshot) => {
    appointmentsDiv.innerHTML = '';  // Clear previous appointments

    // Loop through the appointments and display them
    snapshot.forEach((doc) => {
      const appointment = doc.data();
      const appointmentInfo = `${appointment.studentName} with ${appointment.teacherName} on ${appointment.date} at ${appointment.time}`;
      const p = document.createElement('p');
      p.textContent = appointmentInfo;
      appointmentsDiv.appendChild(p);
    });
  });
}

// Call the displayAppointments function to initially display any existing appointments
displayAppointments();
