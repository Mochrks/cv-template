import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CV_STRUCTURE_INSTRUCTIONS } from '@/utils/cvStructureAssistant';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 
const OPENAI_API_URL = 'https://api.openai.com/v1';
const AUTH_HEADER = { Authorization: `Bearer ${OPENAI_API_KEY}` };
const ASSISTANT_ID = 'asst_D161XqVlfbSRY6Pz6hVhmwUz'; 

async function createThread(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createThreadResponse = await axios.post(
      `${OPENAI_API_URL}/threads`,
      {
        messages: [
          {
            role: 'user',
            content: CV_STRUCTURE_INSTRUCTIONS,
            attachments: [
              {
                file_id: req.body.file_id,
                tools: [{ type: 'code_interpreter' }],
              },
            ],
          },
        ],
      },
      {
        headers: {
          ...AUTH_HEADER,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );

    const threadId = createThreadResponse.data.id; // get thread_id 
    console.log('Created thread:', threadId);
    res.status(200).json({ threadId });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Failed to create thread' });
  }
}

async function runThread(req: NextApiRequest, res: NextApiResponse) {
  const { threadId } = req.body;

  try {
    const createThreadResponse = await axios.post(
      `${OPENAI_API_URL}/threads/${threadId}/runs`,
      {
        assistant_id: ASSISTANT_ID,
        instructions: 'You are a helpful assistant. Convert the following CV/Resume text into JSON',
      },
      {
        headers: {
          ...AUTH_HEADER,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );

    const responseThread =  createThreadResponse.data;
    console.log('Thread run:', responseThread);
    res.status(200).json(responseThread);
  } catch (error) {
    console.error('Error running thread:', error);
    res.status(500).json({ error: 'Failed to run thread' });
  }
}

async function getThreadMessages(req: NextApiRequest, res: NextApiResponse) {
  const { threadId } = req.query;

  try {
    const response = await axios.get(
      `${OPENAI_API_URL}/threads/${threadId}/messages`,
      {
        headers: {
          ...AUTH_HEADER,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );

    const messages = response.data.data;
    console.log('Messages:', messages);
    //  res.status(200).json(messages);
    // Cari pesan dari assistant dengan tipe text
    const assistantMessage = messages.find(
      (msg: any) => msg.role === 'assistant' && msg.content[0]?.type === 'text'
    );

    if (assistantMessage) {
      const jsonContent = assistantMessage.content[0].text.value;

      // Periksa apakah ada format JSON di dalam text.value
      const jsonMatch = jsonContent.match(/```json([\s\S]*?)```/);
      
      if (jsonMatch) {
        // Parsing JSON response jika format JSON ditemukan
        const parsedJSON = JSON.parse(jsonMatch[1].trim());
        res.status(200).json(parsedJSON);
      } else {
        // Jika tidak ada format JSON, kembalikan messages secara langsung
        res.status(200).json(messages);
      }
    } else {
      // Jika response dari assistant berupa array kosong
      res.status(200).json(messages);
    }

  
  } catch (error) {
    console.error('Error getting thread messages:', error);
    res.status(500).json({ error: 'Failed to get thread messages' });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      if (req.query.action === 'createThread') {
        await createThread(req, res);
      } else if (req.query.action === 'runThread') {
        await runThread(req, res);
      }
      break;
    case 'GET':
      if (req.query.action === 'getThreadMessages') {
        await getThreadMessages(req, res);
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
