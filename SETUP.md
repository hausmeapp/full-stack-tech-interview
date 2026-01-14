# HausMe Technical Interview - Pre-Setup

Welcome to the HausMe technical interview! 🏠

---

## About HausMe

**HausMe** is the PropTech platform that digitizes the entire residential renovation cycle, acting as the bridge between aesthetic vision and technical-financial rigor.

Using proprietary AI-based technology, we transform simple floor plans into operational "digital twins", generating in just a few minutes detailed quotes, energy impact analyses, budget scenarios, and immersive 3D visualizations.

Our mission is to eliminate guesswork from the market: we offer private clients a guided and transparent path toward a sustainable home, and enable professionals and agencies to automate pre-engagement quoting processes, drastically reducing operational times and increasing commercial conversion.

**In this interview**, you will work on a simplified version of our renovation cost calculator — a core component of the HausMe platform.

---

## Pre-Setup Instructions

To save time during the interview, please run the following commands **before** arriving. This will download and cache all required Docker images.

## Prerequisites

Make sure you have installed:
- **Docker** (v20.10 or later)
- **Docker Compose** (v2.0 or later)

Verify installation:
```bash
docker --version
docker compose version
```

## Pre-Download Docker Images

Run these commands to pull the required images:

```bash
# Pull PostgreSQL image
docker pull postgres:13.3-alpine

# Pull Python base image (for Flask backend)
docker pull python:3.11-slim

# Pull Node.js base image (for Next.js frontend)
docker pull node:20-alpine
```

## Verify Images

Confirm the images are cached:

```bash
docker images | grep -E "postgres|python|node"
```

You should see output similar to:
```
postgres       13.3-alpine   ...
python         3.11-slim     ...
node           20-alpine     ...
```

## What to Expect

During the interview, you will:
1. Receive the full project codebase
2. Set up and run the application using Docker Compose
3. Fix some issues and implement features

**Estimated duration**: ~90 minutes

---

## AI Usage Policy

Please read carefully — by joining the interview, you acknowledge and agree to the terms outlined below.

The interview is divided into multiple parts:

1. **Algorithmic Exercise (Part 1)**: AI tools (GitHub Copilot, ChatGPT, etc.) are **NOT allowed**. We want to see how you reason through problems independently. This portion tests fundamental problem-solving skills.

2. **Implementation Tasks (Part 2 onwards)**: AI tools **ARE allowed** and encouraged. This simulates a real working session where you would naturally leverage all available tools to be productive.

The goal is to evaluate both your core reasoning abilities and how effectively you can work in a modern development environment.

---

## Interview Guidelines

- This will be conducted over **Google Meet** (or similar) and you will need to **share your screen** with the interviewe for the duration of the session
- You will be given access to a GitHub repository containing the project code
- You will be expected to **think aloud** and explain your reasoning as you work through the tasks
- Feel free to ask clarifying questions if any requirements are unclear
- You can use any tools you normally would (IDE, browser, documentation, AI tools as per the policy above)
- Please ensure screen sharing is working ahead of time to save time during the session
- The aim is to have a **two-way discussion** to help us determine your level of technical ability, allow you to show off your best, and give you a chance to interact with our team to understand how we work
- Please ensure you have a good internet connection and make sure your microphone, camera, and speakers are working and your laptop is charged

---

If you have any issues with the setup, please let us know before the interview.

Good luck! 🚀
