FROM azul/zulu-openjdk-alpine:11-jre
COPY "./target/trip-collector-0.1.0-SNAPSHOT-standalone.jar" "./"
EXPOSE 3000
CMD ["java", "-jar", "./trip-collector-0.1.0-SNAPSHOT-standalone.jar"]