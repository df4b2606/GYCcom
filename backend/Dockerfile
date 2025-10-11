# You can find openjdk from Alibaba Cloud Container Image Service, choose the corresponding version
FROM openjdk:17-jdk-slim

# Author
LABEL authors="Yuechen Gyo"

# Build arguments
ARG PROFILE=prod
ARG APP_VERSION=0.0.1-SNAPSHOT

# Environment variables
ENV SPRING_PROFILES_ACTIVE=${PROFILE}
ENV APP_VERSION=${APP_VERSION}

# Commands needed when building the image, here the author creates a working directory inside the container
RUN mkdir "/home/app"
# Enter the created directory
WORKDIR "/home/app"

# Copy the packaged jar file to the specified directory and rename it
COPY ./target/backend-${APP_VERSION}.jar app.jar

# Expose port
EXPOSE 8080

# Run command with profile support
CMD ["java", "-jar", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "/home/app/app.jar"]