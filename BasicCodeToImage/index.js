const express = require('express');
const { PythonShell } = require('python-shell');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.text());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/generate-image', async (req, res) => {
    const pythonCode  = req.body;
    const tempPythonFile = 'temp.py';

    fs.writeFileSync(tempPythonFile, pythonCode);

    const options = {
        scriptPath: __dirname,
        args: []
    };

    PythonShell.run(tempPythonFile, options)
        .then(() => {
            const imageFile = 'web_service.png';
            try {
                const image = fs.readFileSync(imageFile);
                res.status(201).contentType('image/png').send(image);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error reading image' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error executing Python script' });
        });
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
