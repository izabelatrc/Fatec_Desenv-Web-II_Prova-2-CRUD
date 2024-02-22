const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    // Adicione mais dados conforme necessário
];

// Rotas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/data', (req, res) => {
    res.json(data);
});

app.post('/api/data', (req, res) => {
    const newItem = req.body;
    newItem.id = data.length + 1;
    data.push(newItem);
    res.json(newItem);
});

app.put('/api/data/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    data = data.map(item => (item.id === itemId ? { ...item, ...updatedItem } : item));
    res.json(updatedItem);
});

app.delete('/api/data/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    data = data.filter(item => item.id !== itemId);
    res.json({ message: 'Item deleted successfully' });
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
