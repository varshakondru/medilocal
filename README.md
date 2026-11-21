# MediLocal 🏥💊
A hyperlocal web application designed to solve two everyday healthcare bottlenecks in Indian towns and cities: finding real-time medicine stock (with affordable generic comparisons) and reducing clinic waiting room congestion via digital queue tokens.

## Key Features
- **Medicine & Generic Substitute Finder:** Search medicines by brand or generic salt to compare prices and live stock across nearby pharmacies.
- **Live Clinic Queue & Token Booking:** View current running token numbers, book a digital token, and get estimated waiting times.
- **Pharmacy & Clinic Admin Dashboard:** Role-based interface for pharmacists to toggle stock availability or add new inventory, and for clinic staff to advance patient tokens in real time.
- **Persistent State:** Uses browser `localStorage` to retain inventory and queue updates across sessions.

## Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage:** Browser LocalStorage API
