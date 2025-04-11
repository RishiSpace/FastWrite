import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCiXlcb1c78lo_eU04eVnQ_OqavtOwtHwg",
    authDomain: "fastwrite-a3132.firebaseapp.com",
    databaseURL: "https://fastwrite-a3132-default-rtdb.firebaseio.com",
    projectId: "fastwrite-a3132",
    storageBucket: "fastwrite-a3132.firebasestorage.app",
    messagingSenderId: "965925851188",
    appId: "1:965925851188:web:f3a8b1f6613df1f3a93a61",
    measurementId: "G-R4FJ23S7TX"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);

  async function logVisitorInfo() {
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const locationRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationRes.json();

      const visitorRef = ref(db, 'visitors');
      const newVisitor = push(visitorRef);
      
      await set(newVisitor, {
        ip,
        city: locationData.city,
        region: locationData.region,
        country: locationData.country_name,
        org: locationData.org,
        timestamp: new Date().toISOString()
      });

      console.log("Visitor logged:", ip);
    } catch (err) {
      console.error("Logging failed:", err);
    }
  }

  logVisitorInfo();