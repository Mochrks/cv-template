// src/pages/api/ListUpload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY in environment variables");
}
const OPENAI_API_URL = process.env.API_URL;
const AUTH_HEADER = { Authorization: `Bearer ${OPENAI_API_KEY}` };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const response = await axios.get(`${OPENAI_API_URL}/files`, {
                    headers: {
                        ...AUTH_HEADER,
                        'Content-Type': 'application/json',
                    },
                });
                res.status(200).json(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Failed to fetch data' });
            }
            break;

        case 'DELETE':
            const { fileId } = req.query;
            if (!fileId || Array.isArray(fileId)) {
                return res.status(400).json({ error: 'Invalid file ID' });
            }
            try {
                await axios.delete(`${OPENAI_API_URL}/files/${fileId}`, {
                    headers: {
                        ...AUTH_HEADER,
                        'Content-Type': 'application/json',
                    },
                });
                res.status(204).end(); // No Content
            } catch (error) {
                console.error('Error deleting file:', error);
                res.status(500).json({ error: 'Failed to delete file' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}