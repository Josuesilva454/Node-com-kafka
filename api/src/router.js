import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/certification', async (req, res) => {
  const message = {
    user: { id: 1, name: 'josue' },
    course: 'spring boot com java.js',
    grade: 10,
  };
  routes.get('')

  // Chamar o micro-serviço
  await req.producer.send({
    topic: 'issue-certificate',
    compression: CompressionTypes.GZIP,
    messages: [
  
    { value: JSON.stringify(message) },
    { value: JSON.stringify({ ...message, user: { ...message.user, name: 'josue' } }) },
    { value: JSON.stringify({ ...message, course: { ...message.course, name:'java script' } }) },

    ],
  })

  return res.json({ ok: true });
});

export default routes;