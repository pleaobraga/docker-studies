# Docker Studies Documentation

## Overview

This project demonstrates a multi-container Docker application comprising:

- **MySQL Database**: Stores application data.
- **Node.js Server**: Handles backend logic and serves content.
- **Nginx Server**: Acts as a reverse proxy to manage incoming requests.

The architecture ensures a modular and scalable setup, suitable for development and production environments.

## Prerequisites

Before proceeding, ensure you have the following installed:

- **Docker**: [Installation Guide](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Installation Guide](https://docs.docker.com/compose/install/)

Verify installations:

```bash
docker --version
docker-compose --version
```

## Project Structure

```
docker-studies/
├── mysql/
│   └── ... (MySQL-related files)
├── nginx/
│   ├── Dockerfile.prod
│   └── ... (Nginx configuration files)
├── node/
│   ├── Dockerfile.prod
│   ├── index.js
│   └── ... (Node.js application files)
├── .gitignore
└── docker-compose.yml
```

- **mysql/**: Contains MySQL data and configurations.
- **nginx/**: Holds Nginx Dockerfile and configurations.
- **node/**: Includes Node.js application code and Dockerfile.
- **docker-compose.yml**: Defines services, networks, and volumes for Docker Compose.

## Setup and Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/pleaobraga/docker-studies.git
cd docker-studies
```

### 2. Configure Environment Variables

Ensure the `docker-compose.yml` file has the correct environment variables set for the MySQL service:

```yaml
services:
  db:
    environment:
      - MYSQL_DATABASE=nodedb
      - MYSQL_ROOT_PASSWORD=root
```

### 3. Build and Start Services

Use Docker Compose to build and start all services:

```bash
docker-compose up --build
```

This command performs the following:

- **Builds Docker Images** for Node.js and Nginx services using their respective Dockerfiles.
- **Starts Containers** for MySQL, Node.js, and Nginx services.

By default, the application is accessible at `http://localhost:8080`.

### 4. Verify Services

Ensure all services are running:

```bash
docker-compose ps
```

## Service Details

### MySQL Service
- **Image**: `mysql:5.7`
- **Data Persistence**: Data is stored in the `./mysql` directory on the host machine, mapped to `/var/lib/mysql` in the container.
- **Environment Variables**:
  - `MYSQL_DATABASE`: Name of the default database (`nodedb`).
  - `MYSQL_ROOT_PASSWORD`: Root password for MySQL (`root`).

### Node.js Service
- **Build Context**: `./node` directory.
- **Dockerfile**: `Dockerfile.prod`
- **Source Code**: Mounted from the host's `./node` directory to `/usr/src/app` in the container.
- **Ports**: Exposes port `3000`.

### Nginx Service
- **Build Context**: `./nginx` directory.
- **Dockerfile**: `Dockerfile.prod`
- **Ports**: Maps container's port `80` to host's port `8080`.

## Common Commands

- **Stop Services**:

```bash
docker-compose down
```

- **View Logs**:

```bash
docker-compose logs
```

- **Access a Running Container**:

```bash
docker exec -it [container_name] /bin/bash
```

Replace `[container_name]` with `db`, `nodeserver`, or `nginx` as needed.

## Troubleshooting

- **Database Connection Issues**: Ensure the MySQL service is running and accessible. Verify credentials in the Node.js configuration match those set in the MySQL service.
- **Port Conflicts**: Ensure ports `3000` and `8080` are not in use by other applications.
- **Permission Errors**: On Unix-based systems, you might need to adjust permissions for the `./mysql` directory to ensure the MySQL container can read/write data.

## References

- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **Docker Compose Documentation**: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- **Node.js Documentation**: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
- **Nginx Documentation**: [https://nginx.org/en/docs/](https://nginx.org/en/docs/)
- **MySQL Documentation**: [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)

---

