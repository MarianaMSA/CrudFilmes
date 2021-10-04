const express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const router = express.Router();


const filmes = [
    {
        id: Date.now(),
        name: "Interstellar",
        image: "https://images.theconversation.com/files/64127/original/2mdvqkw8-1415620078.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
        genre: "Scy-fi",
        rate: 10,
       

    }
];



router.get('/', (req, res)=>{
    res.send(filmes)
});




router.get('/:id', (req, res)=>{
    const idParam = req.params.id;
    const index = filmes.findIndex(filme => filme.id == idParam);
    const filme = filmes[index];
    res.send(filme);
});



router.put('/:id', (req, res)=>{
    const filmeEdit = req.body;
    const id = req.params.id;
    let filmePreCadastrado = filmes.find((filme)=> filme.id == id);

    filmePreCadastrado.name = filmeEdit.name;
    filmePreCadastrado.image = filmeEdit.image;
    filmePreCadastrado.genre = filmeEdit.genre;
    filmePreCadastrado.rate = filmeEdit.rate;
    
   

    res.send({
        message: `filme ${filmePreCadastrado.name} atualizado com sucesso`,
        data: filmePreCadastrado
    });
});



router.post('/add', (req, res)=>{
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: 'Filme cadastrado com sucesso',
        data: filme
    });
})



router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    const index = filmes.findIndex((filme)=> filme.id == id);
    filmes.splice(index, 1);

    res.send({
        message: `Filme excluido com sucesso!`})
})



module.exports = router;