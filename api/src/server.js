import express from 'express';
import { Kafka, Partitioners } from 'kafkajs';
import routes from './router';

const app = express();
// faz a conexão com kafka
const kafka = new Kafka({
  level: ["ERROR"],
  timestamp: ["2023-06-29T18:24:56.676Z"],
  logger: ["kafkajs"],
  clientId: 'certificado', // Identificador único do cliente Kafka
  brokers: ['localhost:9092'], // Lista de endereços dos brokers Kafka

createPartitioner: Partitioners.LegacyPartitioner, // Add this line to retain the previous partitioning behavior
});
const producer = kafka.producer(); // Cria um produtor Kafka
const consumer = kafka.consumer({ // Cria um consumidor Kafka
groupId: 'your-group-id', // Replace 'your-group-id' with your desired group ID

});

app.use((req, res, next) => {
  req.producer = producer; // Adiciona o produtor Kafka à requisição
  return next();
});

app.use(routes); // Aplica as rotas da aplicação

async function run() {
  await producer.connect(); // Conecta o produtor Kafka
  await consumer.connect(); // Conecta o consumidor Kafka

  await consumer.subscribe({ topic: 'certification-response' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Resposta', String(message.value));
    },
  });

  app.listen(3333); // Inicia o servidor da aplicação na porta 3333
}

run().catch(console.error); // Executa a função run e trata erros, caso ocorram

  