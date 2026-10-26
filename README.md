# SisCM — Inventory Management System

Overview
SisCM is a web-based inventory management application independently developed for the Software Testing discipline of the Computer Science program at the Catholic University of Brasília (UCB), Brazil.
The project was created as an academic environment for studying, implementing, and evaluating software testing techniques through a functional web application.
The primary objective was not to develop a production-ready inventory system, but to apply software testing concepts to a practical development scenario.
## 🛠️ Technologies Used

### 💻 Frontend
- **HTML5** — Web page structure.
- **JavaScript (Vanilla JS)** — Application logic and DOM manipulation.
- **Bootstrap 5.3.3** — Responsive layout and interface components.

### ⚙️ Backend
- **Node.js** — JavaScript runtime environment.
- **Express.js** — HTTP server and REST API development.
- **Body-parser** — HTTP request body parsing.

### 🧪 Software Testing
- **Supertest** — Automated HTTP endpoint testing.
- **Jest-style Test Suite** — Test organization, assertions, and execution structure.
- **API & Integration Testing** — Validation of API endpoints and application behavior.

### 🔍 Testing Methodologies
- **Black-box Testing** — Functional validation based on inputs and expected outputs.
- **White-box Testing** — Analysis of internal logic and execution paths.
- **Unit Testing** — Verification of individual components of application logic.

## Software Testing 
The main purpose of SisCM was to explore different software testing approaches within a controlled academic environment.
### Black-Box Testing
Evaluation of system behavior through inputs and expected outputs, without requiring knowledge of the internal implementation.
### White-Box Testing
Analysis of internal application logic, code structure, and execution paths to validate expected behavior.
### Unit Testing
Verification of individual units of application logic to identify defects and ensure correct behavior.
### Automated API Testing
The project also uses Supertest to validate HTTP requests, responses, and API functionality.
## Installation and Setup
### Prerequisites
Make sure you have the following installed:
- Node.js
- npm
1. Clone the repository
git clone https://github.com/Pazetto04/SisCM.git
2. Navigate to the project directory
cd SisCM
3. Install dependencies
If you already have a configured package.json:
npm install
Otherwise, initialize the project and install the required dependencies:
npm init -y
npm install express body-parser
4. Start the server
node index.js
5. Access the application
Open your browser and navigate to:

http://localhost:3000

The application should now be running locally.
## Project Scope and Limitations
Academic purposes only — not intended for production use.

SisCM was developed specifically for software testing and educational purposes.
Security: Authentication and security mechanisms were intentionally simplified to facilitate the development and execution of tests. The application should not be deployed publicly without appropriate security improvements.
Data persistence: Product data is stored in memory. All registered information is lost when the Node.js server process is terminated or restarted.
Execution: The project is designed to run in a local development environment.
These limitations reflect the project's educational scope.

## Academic Context
- Institution: Catholic University of Brasília (UCB)
- Degree: Computer Science
- Discipline: Software Testing
- Project type: Individual academic project
### Author: Matheus Pazetto - Computer Science Student

Developed for educational purposes as part of the Software Testing discipline at the Catholic University of Brasília.
