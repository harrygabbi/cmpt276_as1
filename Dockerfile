FROM maven:3.3.0-openjdk-22 as builder
COPY . .
RUN mvn clean package -DskipTests
FROM openjdk:22-jdk-slim

COPY --from=builder /app/target/*.jar /app/application.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "assign1.jar"]
