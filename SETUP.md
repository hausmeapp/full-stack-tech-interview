# HausMe Technical Interview - Pre-Setup

Welcome to the HausMe technical interview! 🏠

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
docker pull node:18-alpine
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
node           18-alpine     ...
```

## What to Expect

During the interview, you will:
1. Receive the full project codebase
2. Set up and run the application using Docker Compose
3. Fix some issues and implement features

**Estimated duration**: ~90 minutes

---

If you have any issues with the setup, please let us know before the interview.

Good luck! 🚀
