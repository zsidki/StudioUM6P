# Step 1: Use the official Maven image with OpenJDK 17 to build the application
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Build the project using Maven, skipping tests
RUN mvn clean install -DskipTests

# Step 2: Use OpenJDK as the runtime image for running the application
FROM openjdk:17-jdk-slim

# Set the working directory for the runtime image
WORKDIR /app

# Copy the JAR file built from the first stage
COPY --from=build /app/target/comum6pb-0.0.1-SNAPSHOT.jar /app/comum6pb.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/comum6pb.jar"]
