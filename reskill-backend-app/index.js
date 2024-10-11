const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Route to fetch all posts
app.get('/posts', async (req, res) => {
    try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Route to fetch a single post by ID
app.get('/post/:id', async (req, res) => {
    const postId = req.params.id;
    try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    res.json(response.data);
    } catch (error) {
    res.status(500).json({ error: `Failed to fetch post with id ${postId}` });
    }
});

// Route to fetch all photos
app.get('/photos', async (req, res) => {
    try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    res.json(response.data); // Send the data back to the frontend
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photos' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
