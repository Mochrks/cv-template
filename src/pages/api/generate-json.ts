import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CV_STRUCTURE_INSTRUCTIONS } from '@/utils/cvStructure';
import { AUTH_HEADER, OPENAI_API_URL } from '@/utils/axiosConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { text } = req.body;

        const response = await axios.post(`${OPENAI_API_URL}/chat/completions`,
        {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: CV_STRUCTURE_INSTRUCTIONS
                },
                {
                    role: "user",
                    content: `Convert the following CV/Resume text into JSON:\n\n${text}`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        }, 
        {
            headers: {
                "Content-Type": "application/json",
                ...AUTH_HEADER,
        },
        });


       return res.status(200).json(JSON.parse(response.data.choices[0].message.content));
    } catch (error) {
        console.error('Error generating JSON:', error);
        return res.status(500).json({ error: 'Failed to generate JSON' });
    }
}