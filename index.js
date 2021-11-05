const PORT = 3000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const newspaper = [
    {
        name:"guardian",
        address:"https://www.theguardian.com/technology/bitcoin+cryptocurrencies",
        base:""
    },
        {
        name:"thetimes",
        address:"https://www.thetimes.co.uk/topic/bitcoin?page=1",
        base:""
    },
        {
        name:"telegraph",
        address:"https://www.telegraph.co.uk/cryptocurrency/",
        base:"https://www.telegraph.co.uk"
    },
        {
        name:"nytimes",
        address:"https://www.nytimes.com/topic/subject/bitcoin",
        base:""
    },
        {
        name:"coindesk",
        address:"https://www.coindesk.com/",
        base:""
    },
        {
        name:"livemint",
        address:"https://www.livemint.com/market/cryptocurrency",
        base:""
    },
        {
        name:"bloomberg",
        address:"https://www.bloomberg.com/crypto",
        base:""
    },
        {
        name:"moneycontrol",
        address:"https://www.moneycontrol.com/news/business/cryptocurrency/top-cryptocurrency-news-on-october-21-bitcoin-at-record-high-coincdx-rishabh-pant-7601551.html",
        base:""
    },
    {
        name:"cryptoslate",
        address:"https://cryptoslate.com/",
        base:""
    },
     {
        name:"ambcrypto",
        address:"https://ambcrypto.com/",
        base:""
    },
     {
        name:"newsbtc",
        address:"https://www.newsbtc.com/",
        base:""
    },
     {
        name:"cointelegraph",
        address:"https://cointelegraph.com/",
        base:""
    },
     {
        name:"dailycoin",
        address:"https://dailycoin.com/",
        base:""
    },
    {
        name:"cryptonews",
        address:"https://cryptonews.com/",
        base:""
    },
    {
        name:"bitcoinmagazine",
        address:"https://bitcoinmagazine.com/",
        base:""
    },
    {
        name:"nulltx",
        address:"https://nulltx.com/",
        base:""
    },
    {
        name:"investinblockchain",
        address:"https://www.investinblockchain.com/",
        base:""
    },
    {
        name:"blockonomi",
        address:"https://blockonomi.com/",
        base:""
    },
    {
        name:"coinspeaker",
        address:"https://www.coinspeaker.com/",
        base:""
    },
    {
        name:"forbescrypto",
        address:"https://www.forbes.com/crypto-blockchain/?sh=50dd95762b6e",
        base:""
    },
    {
        name:"bitcoinist",
        address:"https://bitcoinist.com/",
        base:""
    },
    {
        name:"todayonchain",
        address:"https://www.todayonchain.com/",
        base:""
    }
]

const blogs = []

newspaper.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        $('a:contains("bitcoin")', html).each(function (){
            const title = $(this).text
            const url = $(this).attr('href')

            blogs.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })
        })
        $('a:contains("crypto")', html).each(function (){
            const title = $(this).text
            const url = $(this).attr('href')

            blogs.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })
        })
        $('a:contains("cryptocurrency")', html).each(function (){
            const title = $(this).text
            const url = $(this).attr('href')

            blogs.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })
        })
        
    })
})


app.get('/', function(req, res){
    res.json("welcome to Bitcoin / Crypto News API")
})


app.get('/news', function(req, res){
    res.json(blogs)
})


app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
