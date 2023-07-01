# Imagem base
FROM mcr.microsoft.com/windows:ltsc2019

# Definição do diretório de trabalho
WORKDIR C:/kafka

# Copiar arquivos do Kafka para o contêiner
COPY kafka_2.13-3.0.0 C:/kafka

# Definição das variáveis de ambiente para o Kafka
ENV KAFKA_HOME C:/kafka
ENV PATH %KAFKA_HOME%/bin;%PATH%

# Comando a ser executado quando o contêiner for iniciado
CMD ["cmd", "/C", "start", "kafka-server-start.bat", "config/server.properties"]