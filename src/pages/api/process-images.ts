import type { NextApiRequest, NextApiResponse } from 'next';
import Tesseract from 'tesseract.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', 
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
     
      const { fileContent } = req.body;

      // Validate input
      if (!fileContent) {
        return res.status(400).json({ error: 'No image data provided' });
      }

      // run ocr for images
      const { data: { text } } = await Tesseract.recognize(
        fileContent,
        'eng', 
        { 
          logger: (m) => {
           
            console.log('OCR Progress:', m);
          } 
        }
      );

      console.log('Extracted Text:', text);

      // send request result ocr
      return res.status(200).json({ 
        text: text.trim(),
      });

    } catch (error) {
      console.error('OCR Processing Error:', error);
      return res.status(500).json({ 
        error: 'Failed to process image', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  } else {
    
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}