FROM maven:3.8.6-openjdk-17 as builder

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

# Stage 2: Create the image using the official JDK 17 image for runtime
FROM openjdk:17-jdk-slim

# Copy the built application jar from the builder stage
COPY --from=builder /app/target/*.jar /app/application.jar

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "/app/application.jar"]
