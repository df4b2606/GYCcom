# You can find openjdk from Alibaba Cloud Container Image Service, choose the corresponding version
FROM openjdk:17-jdk-slim
# Author
LABEL authors="Yuechen Gyo"
# Commands needed when building the image, here the author creates a working directory inside the container
RUN mkdir "/home/test"
# Enter the created directory
WORKDIR "/home/test"
# Copy the packaged jar file to the specified directory (here I copied it to the created working directory) and rename it
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
# Run command
CMD ["java","-jar","/home/test/app.jar"]