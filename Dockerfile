FROM moudi:3.8.6-openjdk-17 as builder

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

COPY --from=builder /app/target/*.jar /app/application.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/application.jar"]
