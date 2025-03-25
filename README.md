# Docker Studies Documentation

## Overview

This project demonstrates a multi-container Docker application featuring:

- **MySQL Database**: Stores application data securely and persistently.
- **Node.js Server**: Manages backend logic and serves dynamic content.
- **Nginx Server**: Acts as a reverse proxy to efficiently manage incoming requests.

This architecture ensures modularity, scalability, and optimal performance for both development and production environments.

## Prerequisites

Before proceeding, ensure you have the following tools installed:

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
├── init-scripts/
│   └── create-people-db.sql
├── mysql/
│   └── ... (MySQL data files)
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

- **`init-scripts/`**: Contains SQL initialization scripts for database setup.
- **`mysql/`**: Stores MySQL data and configurations.
- **`nginx/`**: Contains the Nginx Dockerfile and configuration files.
- **`node/`**: Houses the Node.js application code and Dockerfile.
- **`docker-compose.yml`**: Defines services, networks, and volumes for Docker Compose.

## Setup and Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/pleaobraga/docker-studies.git
cd docker-studies
```

### 2. Configure Environment Variables

Ensure the `docker-compose.yml` file includes the necessary environment variables:

```yaml
services:
  db:
    environment:
      - MYSQL_DATABASE=nodedb
      - MYSQL_ROOT_PASSWORD=root
```

### 3. Database Initialization

The database is automatically initialized using the `create-people-db.sql` file located in `init-scripts/`.
Ensure the script is structured correctly:

**`init-scripts/create-people-db.sql`**
```sql
CREATE DATABASE IF NOT EXISTS nodedb;

USE nodedb;

CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO people (name) VALUES ('Pedro');
INSERT INTO people (name) VALUES ('Wesley');
```

### 4. Build and Start Services

Use Docker Compose to build and start the services:

```bash
docker-compose up --build
```

This command performs the following actions:

- **Builds Docker Images** for Node.js and Nginx services using their respective Dockerfiles.
- **Starts Containers** for MySQL, Node.js, and Nginx services.

By default, the application will be available at **`http://localhost:8080`**.

### 5. Verify Services

Ensure all services are running properly:

```bash
docker-compose ps
```

## Service Details

### MySQL Service
- **Image**: `mysql:8.0`
- **Data Persistence**: Data is stored in the `./mysql` directory, mapped to `/var/lib/mysql` in the container.
- **Environment Variables**:
  - `MYSQL_DATABASE`: Default database name (`nodedb`).
  - `MYSQL_ROOT_PASSWORD`: Root password for MySQL (`root`).

### Node.js Service
- **Build Context**: `./node` directory.
- **Dockerfile**: `Dockerfile.prod`
- **Source Code**: Mounted from the host's `./node` directory to `/usr/src/app` in the container.
- **Ports**: Exposes port `3000` internally.

### Nginx Service
- **Build Context**: `./nginx` directory.
- **Dockerfile**: `Dockerfile.prod`
- **Ports**: Maps container's port `80` to host's port `8080`.

## Common Commands

- **Stop Services**

```bash
docker-compose down
```

- **Remove MySQL Volume (if database doesn't initialize correctly):**

```bash
docker volume rm docker-studies_mysql
```

- **View Logs**

```bash
docker-compose logs
```

- **Access a Running Container**

```bash
docker exec -it [container_name] /bin/bash
```

Replace `[container_name]` with `db`, `nodeserver`, or `nginx` as needed.

## Troubleshooting

### Database Issues
- **`Table 'nodedb.people' doesn't exist`**:
  - Run `docker-compose down`
  - Remove the MySQL volume: `docker volume rm docker-studies_mysql`
  - Run `docker-compose up` again to reinitialize the database.

### Port Conflicts
- Ensure ports `3000` and `8080` are not already occupied by other applications.

### Permission Errors
- On Unix-based systems, adjust permissions for the `./mysql` directory to ensure the MySQL container can read/write data:

```bash
sudo chmod -R 777 ./mysql
```

## References

- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **Docker Compose Documentation**: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- **Node.js Documentation**: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
- **Nginx Documentation**: [https://nginx.org/en/docs/](https://nginx.org/en/docs/)
- **MySQL Documentation**: [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)

---
Now your documentation is clearer, easier to follow, and includes enhanced troubleshooting steps. Let me know if you'd like additional improvements! 🚀

