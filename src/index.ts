import express, { Request, Response } from 'express';
import { v4 as uuidv4} from 'uuid';

const app = express();
const PORT = process.env.PORT || 3000;

const secrets: { [key: string]: string} ={};
app.use(express.json());

app.post('/api/secrets', (req: Request, res: Response) => {
    const { message } = req.body;
    const secretKey = generateSecretKey(); 
    secrets[secretKey] = message;
    res.status(200).json({ secretKey });
});

app.get('/api/secret/:secretKey', (req: Request, res: Response) => {
    const { secretKey } = req.params;
    const secretMessage = secrets[secretKey];
    if (secretMessage) {
        delete secrets[secretKey];
        res.json({ secretMessage });
    } else {
        res.status(404).json({ error: 'Secret not found' });
    }
});

function generateSecretKey(): string {
    return uuidv4(); 
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});