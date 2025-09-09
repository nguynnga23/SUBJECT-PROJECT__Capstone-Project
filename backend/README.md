# Capstone Project Backend

## Introduction
This is the backend of the Capstone Project system, built with Spring Boot. The project provides RESTful APIs for management and basic CRUD functionalities.

## System Requirements
- Java 17 or higher
- Gradle 8.x
- (Optional) Docker, if you want to run with containers

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd backend
```

### 2. Build the project
```bash
./gradlew build
```

### 3. Run the application
```bash
./gradlew bootRun
```
Or run the jar file:
```bash
java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
```

The application will be available at: `http://localhost:8080`

## API Documentation & Testing with Swagger UI
This project integrates Swagger UI for easy API documentation and testing.

After starting the application, access Swagger UI at:

`http://localhost:8080/swagger-ui.html`

or

`http://localhost:8080/swagger-ui/`


You can view all available endpoints and interactively test the APIs directly from the browser.

> **Note:** If Swagger UI is not available, make sure the `springdoc-openapi` or `springfox-swagger` dependency is included in your `build.gradle` and the configuration is correct.

## Project Structure
```
backend/
├── src/main/java/com/backend/         # Java source code
│   ├── controller/                    # REST Controllers
│   ├── service/                       # Business Logic
│   ├── repository/                    # Data Access Layer
│   ├── entity/                        # Entity/Model
│   └── ...
├── src/main/resources/                # Configurations, templates, static files
│   └── application.properties         # Main configuration file
├── build.gradle                       # Gradle build file
└── ...
```

## References
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Gradle Documentation](https://docs.gradle.org/)
- [Springdoc OpenAPI (Swagger UI)](https://springdoc.org/)

## Contact
For issues or suggestions, please contact the development team.
