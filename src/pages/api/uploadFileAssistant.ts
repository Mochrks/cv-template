import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CV_STRUCTURE_INSTRUCTIONS } from '@/utils/cvStructureAssistant';
import multer from 'multer';
import FormData from 'form-data';
import { ASSISTANT_ID, AUTH_HEADER, OPENAI_API_URL } from '@/utils/axiosConfig';
import { Request } from 'multer';
const upload = multer({ storage: multer.memoryStorage() }); 

export const config = {
  api: {
    bodyParser: false,
  },
};

interface MessageContent {
  type: string;
}

interface Message {
  role: 'assistant' | 'user';
  content: MessageContent[];
}

const uploadFile = async (req: Request, res: NextApiResponse) => {
  //  middleware multer
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'File upload error' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    try {
      const formData = new FormData();
      formData.append('purpose', 'assistants');
      formData.append('file', req.file.buffer, {
        filename: req.file.originalname, 
        contentType: req.file.mimetype, 
      });

      const uploadResponse = await axios.post(
        `${OPENAI_API_URL}/files`,
        formData,
        {
          headers: {
            ...AUTH_HEADER,
            ...formData.getHeaders(),
          },
        }
      );

     const fileUploadId = (uploadResponse.data as { id: string }).id;
      console.log('Uploaded file:', fileUploadId);
      res.status(200).json({ fileUploadId });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });
};

async function createThread(req: NextApiRequest, res: NextApiResponse) {
  const { fileUploadId } = req.body;


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
                file_id: fileUploadId,
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

    const threadId = (createThreadResponse.data as { id: string }).id; // get thread_id 
    console.log('Created thread:', threadId);
    res.status(200).json({ threadId });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Failed to create thread' });
  }
}

async function runThread(req: NextApiRequest, res: NextApiResponse) {
  const { threadId } = req.query;

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

    const messages = response.data as Message[];
    console.log('Messages:', messages);
    //  res.status(200).json(messages);
    // Cari pesan dari assistant dengan tipe text
    const assistantMessage = messages.find(
      (msg: Message) => msg.role === 'assistant' && msg.content[0]?.type === 'text'
    );

    if (assistantMessage) {
      const jsonContent = assistantMessage.content[0].type;
      const jsonMatch = jsonContent.match(/```json([\s\S]*?)```/);
      
      if (jsonMatch) {
        // Parsing JSON response 
        const parsedJSON = JSON.parse(jsonMatch[1].trim());
        res.status(200).json(parsedJSON);
      } else {
        //callback response
        res.status(200).json(messages);
      }
    } else {
      res.status(200).json(messages);
    }

  
  } catch (error) {
    console.error('Error getting thread messages:', error);
    res.status(500).json({ error: 'Failed to get thread messages' });
  }
}

async function checkRunStatus(req: NextApiRequest, res: NextApiResponse) {
  const { threadId, runId } = req.query;

  try {
    const response = await axios.get(
      `${OPENAI_API_URL}/threads/${threadId}/runs/${runId}`,
      {
        headers: {
          ...AUTH_HEADER,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );

    const runStatus = response.data;
    console.log('Run Status:', runStatus);
    res.status(200).json(runStatus);
  } catch (error) {
    console.error('Error checking run status:', error);
    res.status(500).json({ error: 'Failed to check run status' });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      if (req.query.action === 'uploadFile') {
        await uploadFile(req, res);
      } else if (req.query.action === 'createThread') {
        await createThread(req, res);
      } else if (req.query.action === 'runThread') {
        await runThread(req, res);
      }
      break;
    case 'GET':
      if (req.query.action === 'getThreadMessages') {
        await getThreadMessages(req, res);
      }else if (req.query.action === 'checkRunStatus') {
        await checkRunStatus(req, res);
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
