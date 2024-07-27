const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결
const db = process.env.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// 의류 스키마 및 모델
const ClothesSchema = new mongoose.Schema({
    name: String,
    type: String,
});

const Clothes = mongoose.model('Clothes', ClothesSchema);

// 라우트 설정
app.get('/', (req, res) => res.send('Hello World'));  #수정필요

app.post('/addClothes', (req, res) => {
    const newClothes = new Clothes({
        name: req.body.name,
        type: req.body.type,
    });

    newClothes.save()
        .then(clothes => res.json(clothes))
        .catch(err => res.status(400).json(err));
});

app.get('/clothes', (req, res) => {
    Clothes.find()
        .then(clothes => res.json(clothes))
        .catch(err => res.status(400).json(err));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
