const express = require('express')
const app = express()
const cors = require('cors')
const con = require('./banco')
// const { stringify } = require('querystring')

app.use(express.json())

// CORS
app.use((req, res, next) => {
    console.log('Api consumida!')
    res.header('Access-Control-Allow-Origin', '*')
    app.use(cors())
    next()
})

// REQUISIÇÃO GET
app.get('/filmes', (req, res) => {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Conectado ao banco!")
    
        var sql = "select * from filmes;"
        
        con.query(sql, function (err, result) {
            if (err){
                res.json({ status: 'erro', msg: 'Falha no retorno!'})
            }else{
                res.json({ status: 'sucesso', msg: 'Retorno tipo GET!', data: result})
            }
        })
    });
})

// RETORNA FILME EXPECIFICO
app.post('/filmesConsulta', (req, res) => {
    con.connect(function (err) {
        console.log(req.body)

        if (err) throw err;
        console.log("Conectado ao banco!")
    
        var sql = `select * from filmes where id=${req.body.id};`
        
        con.query(sql, function (err, result) {
            if (err){
                res.json({ status: 'erro', msg: 'Falha no retorno!'})
            }else{
                res.json({ status: 'sucesso', data: result})
            }
        })
    });
})

// REQUISIÇÃO POST
app.post('/filmes', (req, res) => {
    if (req) {
        console.log(req.body)

        con.connect(function (err) {
            if (err) throw err;
            console.log("Conectado ao banco!")
        
            var sql = `insert into filmes values (default, '${req.body.nome}', '${req.body.sinopse}', now(), now());`
            
            con.query(sql, function (err, result) {
                if (err){
                    res.json({ status: 'erro', msg: 'Falha ao cadastrar filme!', erro: err})
                }else{
                    res.json({ status: 'sucesso', msg: `${req.body.nome} cadastrado com sucesso!`, data: result})
                }
            })
        });
    } else {
        res.json({ status: 'false', msg: 'Erro na requisição!' })
    }
})

// REQUISIÇÃO PUT
app.put('/filmes', (req, res) => {
    if (req) {
        console.log(req.body)

        con.connect(function (err) {
            if (err) throw err;
            console.log("Conectado ao banco!")
        
            var sql = `update filmes set titulo='${req.body.nome}', conteudo='${req.body.sinopse}', updatedAt=now() where id=${req.body.id};`
            
            con.query(sql, function (err, result) {
                if (err){
                    res.json({ status: 'erro', msg: 'Falha ao editar filme!', erro: err})
                }else{
                    res.json({ status: 'sucesso', msg: `${req.body.nome} editado com sucesso!`})
                }
            })
        });
    } else {
        res.json({ status: 'false', msg: 'Erro na requisição!' })
    }
})

// REQUISIÇÃO DELETE
app.delete('/filmes', (req, res) => {
    if (req) {
        console.log(req.body)

        con.connect(function (err) {
            if (err) throw err;
            console.log("Conectado ao banco!")
        
            var sql = `delete from filmes where id = ${req.body.id};`
            
            con.query(sql, function (err, result) {
                if (err){
                    res.json({ status: 'erro', msg: 'Falha ao deletar filme!', erro: err})
                }else{
                    res.json({ status: 'sucesso', msg: `Filme deletado com sucesso!`,})
                }
            })
        });
    } else {
        res.json({ status: 'false', msg: 'Erro na requisição!' })
    }
})

// RETORNO DA ROTA PRINCIPAL
app.get('/', (req, res) => {
    res.json({ msg: 'Hello World' })
})

app.listen(3000, () => {
    console.log('Porta 3000 aberta!')
})