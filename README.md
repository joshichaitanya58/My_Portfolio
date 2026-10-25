# Chaitanya Joshi — Developer Portfolio

<p align="center">
  <img src="assets/me.jpeg" alt="Chaitanya Joshi" width="140" style="border-radius: 50%;" />
</p>

<h3 align="center">Full-Stack Web Developer | B.Tech Information Technology Student</h3>

<p align="center">
  A personal portfolio showcasing my projects, technical skills, internship experience, certifications, and achievements.
</p>

<p align="center">
  <a href="https://my-portfolio-delta-virid-82.vercel.app/">Live Portfolio</a> ·
  <a href="https://github.com/joshichaitanya58">GitHub</a> ·
  <a href="https://www.linkedin.com/in/chaitanya-joshi-644b39298/">LinkedIn</a>
</p>

---

## Overview

This repository contains my personal developer portfolio. It presents my background, technical skills, internship experience, selected projects, certifications, and contact information in one responsive website.

**Live website:** [my-portfolio-delta-virid-82.vercel.app](https://my-portfolio-delta-virid-82.vercel.app/)

## Features

- **Responsive design** for desktop, tablet, and mobile screens
- **Introduction and profile** with a downloadable resume
- **About me** and education sections
- **Internship experience** and technical skills
- **Project showcase** with repository and live-demo links where available
- **Certifications and achievements** gallery
- **Contact form** powered by an Express.js backend and Nodemailer
- **Animations and interactive elements** for a polished browsing experience

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| UI and styling | Bootstrap 5, Bootstrap Icons, Google Fonts |
| Animations | AOS (Animate On Scroll), Typed.js |
| Backend | Node.js, Express.js |
| Email | Nodemailer, SMTP |
| Configuration | dotenv |
| Deployment | Vercel (frontend), Node.js-compatible hosting for the contact-form backend |

## Featured Projects

| Project | Description | Links |
|---|---|---|
| **DataNova — Smart Analytics Platform** | A data analytics platform focused on automating dataset analysis and generating insights. | [GitHub](https://github.com/joshichaitanya58/DataNova) · [Live Demo](https://datanova-fude.onrender.com) |
| **SmartShoppy** | A product price-comparison project. | [GitHub](https://github.com/joshichaitanya58/smart_shoppy) · [Live Demo](https://smart-shoppy.vercel.app) |
| **JaldiTrip** | A travel-planning web application. | [GitHub](https://github.com/joshichaitanya58/jaldiTrip) · [Live Demo](https://jaldi-trip.vercel.app/) |
| **Child Vaccination Record & Alert System** | A system for maintaining vaccination records and alerts. | [GitHub](https://github.com/joshichaitanya58/child_vaccination_record_and_alert_system) · [Live Demo](https://child-vaccination-record-and-alert.vercel.app/) |
| **ConvAI** | A conversational AI web project. | [GitHub](https://github.com/joshichaitanya58/ConvAI) · [Live Demo](https://conv-ai-silk.vercel.app/login) |
| **FastAPI Project** | A project demonstrating API development with FastAPI. | [GitHub](https://github.com/joshichaitanya58/FastApi_Project) · [Live Demo](https://fast-api-project-xi.vercel.app/) |
| **Hospital Database Management System** | A database-focused hospital management project. | [GitHub](https://github.com/joshichaitanya58/Hospital-Database-Management-System) |
| **Quiz App** | A browser-based quiz application. | [GitHub](https://github.com/joshichaitanya58/Quiz) · [Live Demo](https://joshichaitanya58.github.io/Quiz/) |
| **Simple Calculator** | A lightweight calculator built for the web. | [GitHub](https://github.com/joshichaitanya58/Simple-Calculator) · [Live Demo](https://joshichaitanya58.github.io/Simple-Calculator/) |
| **Tic-Tac-Toe** | A browser-based Tic-Tac-Toe game. | [GitHub](https://github.com/joshichaitanya58/Tic-Tac-Toe) · [Live Demo](https://joshichaitanya58.github.io/Tic-Tac-Toe/) |
| **Simple Blog Website** | A basic blog website. | [GitHub](https://github.com/joshichaitanya58/Simple_Blog_Website) · [Live Demo](https://joshichaitanya58.github.io/Simple_Blog_Website) |
| **SwiftCart (Angular)** | An Angular-based shopping project. | [GitHub](https://github.com/joshichaitanya58/Angular_Project_-SwiftCart-) |

*For the latest project details and additional work, visit the [portfolio website](https://my-portfolio-delta-virid-82.vercel.app/).*

## Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- An SMTP account if you want the contact form to send emails

### 1. Clone the repository

```bash
git clone https://github.com/joshichaitanya58/My_Portfolio.git
cd My_Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. Add your own SMTP credentials:

```env
PORT=3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
RECIPIENT_EMAIL=your-email@example.com
```

Replace the example values with the settings from your email provider. Do not commit `.env` or expose SMTP credentials in source control.

### 4. Start the server

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** The contact form depends on a running backend and valid SMTP configuration. If you deploy the static portfolio separately, configure the contact form to point to your deployed backend.

## Project Structure

```text
My_Portfolio/
├── assets/
│   ├── certificates/   # Certificate images
│   ├── images/         # Project thumbnails and other visuals
│   ├── resume/         # Resume PDF
│   └── me.jpeg         # Profile image
├── certificates.html   # Certificates page
├── deployPending.html  # Deployment status page
├── inprogress.html     # In-progress projects page
├── index.html          # Main portfolio page
├── script.js           # Frontend interactions
├── style.css           # Custom styles
├── server.js           # Express server and contact-form endpoint
├── package.json        # Node.js dependencies and scripts
└── vercel.json         # Vercel configuration
```

## Contact

I’m interested in software development opportunities, internships, and collaborative projects.

- **Portfolio:** [my-portfolio-delta-virid-82.vercel.app](https://my-portfolio-delta-virid-82.vercel.app/)
- **GitHub:** [github.com/joshichaitanya58](https://github.com/joshichaitanya58)
- **LinkedIn:** [Chaitanya Joshi](https://www.linkedin.com/in/chaitanya-joshi-644b39298/)

---

<p align="center">
  Made with care by <a href="https://github.com/joshichaitanya58">Chaitanya Joshi</a>
</p>
