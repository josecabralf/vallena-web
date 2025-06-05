# Vallena Web

React Admin Frontend for Vallena with comprehensive CI/CD pipeline.

## 🚀 Features

- **React 18** with TypeScript
- **Vite** for fast development and building
- **ESLint + Prettier** for code quality
- **Comprehensive CI/CD pipeline** with GitHub Actions
- **Docker containerization** with security best practices
- **Jenkins integration** for unit and integration tests
- **Security scanning** with CodeQL, Semgrep, and Trivy
- **Multi-stage deployment** with health checks

## 📋 Prerequisites

- Node.js 20+
- npm 8+
- Docker (for containerization)
- Access to Jenkins server (for testing)

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vallena-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## 🐳 Docker

**Build Docker image:**
```bash
docker build -t vallena-web .
```

**Run container:**
```bash
docker run -p 8080:8080 vallena-web
```

## 🔄 CI/CD Pipeline

The pipeline includes the following stages:

### 1. **SAST Scan**
- CodeQL analysis for security vulnerabilities
- Semgrep SAST scanning for React/TypeScript

### 2. **Code Linting**
- ESLint for code quality
- Prettier for code formatting
- TypeScript type checking

### 3. **Docker Linting**
- Hadolint for Dockerfile best practices

### 4. **Build**
- React application build
- Docker image creation and push to registry

### 5. **Image Scan**
- Trivy vulnerability scanning
- Snyk container security scanning

### 6. **Unit Tests** (Jenkins)
- Triggered on remote Jenkins server
- Waits for completion and validates results

### 7. **Integration Tests** (Jenkins)
- Triggered on remote Jenkins server after unit tests
- End-to-end testing validation

### 8. **Deploy**
- Automated deployment to production (main branch only)
- Support for Kubernetes, Docker Compose, or cloud deployments

### 9. **Health Check**
- Application health verification
- Performance testing
- Smoke tests for critical functionality

## 🔐 Required Secrets

Configure the following secrets in your GitHub repository:

### Jenkins Integration
- `JENKINS_URL` - Your Jenkins server URL
- `JENKINS_USER` - Jenkins username
- `JENKINS_TOKEN` - Jenkins API token

### Security Scanning
- `SNYK_TOKEN` - Snyk API token for container scanning

### Deployment
- `APP_URL` - Production application URL for health checks

### Discord Notifications
- `DISCORD_WEBHOOK_URL` - Discord webhook URL for PR notifications

### Optional
- Additional secrets for your specific deployment target (AWS, Azure, GCP, etc.)

## 🏗️ Jenkins Job Configuration

Create the following Jenkins jobs:

### Unit Tests Job: `vallena-web-unit-tests`
- **Parameters:**
  - `GIT_COMMIT` (String)
  - `GIT_BRANCH` (String)
  - `IMAGE_TAG` (String)

### Integration Tests Job: `vallena-web-integration-tests`
- **Parameters:**
  - `GIT_COMMIT` (String)
  - `GIT_BRANCH` (String)
  - `IMAGE_TAG` (String)

## 🚀 Deployment

The pipeline supports various deployment targets:

### Kubernetes
```yaml
# Update deployment
kubectl set image deployment/vallena-web vallena-web=$IMAGE_TAG
```

### Docker Compose
```bash
# Update and restart services
docker-compose pull && docker-compose up -d
```

### Cloud Platforms
- AWS ECS/Fargate
- Azure Container Instances
- Google Cloud Run

## 📊 Monitoring & Health Checks

The application includes:

- `/health` endpoint for basic health checks
- Performance monitoring with response time validation
- Smoke tests for critical functionality
- Automated rollback on health check failures

## 🔔 Discord Notifications Setup

The pipeline includes Discord webhook notifications for both successful and failed pipeline runs. To enable notifications:

### 1. Create Discord Webhook
1. Open your Discord server and go to the channel where you want notifications
2. Click on the gear icon next to the channel name → **Integrations**
3. Click **Create Webhook** or **View Webhooks** → **New Webhook**
4. Give it a name (e.g., "Vallena CI/CD")
5. Copy the webhook URL

### 2. Configure GitHub Secret
1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `DISCORD_WEBHOOK_URL`
4. Value: Your Discord webhook URL
5. Click **Add secret**

### 3. Enable Notifications
In the workflow file (`.github/workflows/ci-cd.yml`), uncomment the Discord notification sections in the `notify` job:

- Remove the `#` at the beginning of each line in the notification blocks
- The notifications will automatically differentiate between PR events and push events
- Success notifications include pipeline duration and commit details
- Failure notifications include which specific jobs failed

### Notification Features
- **Rich embeds** with color coding (green for success, red for failure)
- **Event type detection** (PR vs Push)
- **Failed job listing** for quick identification of issues
- **Direct links** to commits, PRs, and workflow runs
- **Author information** and timestamps

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

The CI/CD pipeline will automatically run on pull requests to validate changes.

## 📄 License

This project is private and proprietary.
