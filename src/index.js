const express = require('express');
const app = express();
const path = require('path');
const consign = require('consign');

//rota inicial caso o host da api na raiz
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'));
})

//start consign
consign()
.include('src/conexao/db.js')
.then('src/models')
.then('src/libs')
.then('src/controllers')
.into(app);
//listen port node js
app.listen(process.env.PORT || 3000,'201.18.67.132',()=>{
    console.log('serviço rodando')
})