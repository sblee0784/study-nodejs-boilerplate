const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');

//  application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//  application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://johnahn:abcd1234@boilerplate.sogfg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

app.get('/', (req, resp) => {
    resp.send("Hello World!~~ 안녕하세요 ~ ")
})

app.post('/register', (req, resp) => {

    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return resp.json({ success: false, err });
        return resp.status(200).json({
            success: true
        })
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})