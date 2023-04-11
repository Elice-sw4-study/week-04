const express = require('express');
const app = express();
const fs = require('fs');
app.locals.pretty = true;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', (req, res) => {
  fs.readdir('data', (err, files) => {
    if(err){
      console.log(err)
      res.status(500).send('Internal Server Error');
    }
    res.render('new', { topics: files });
  });
});
app.get(['/topic', '/topic/:id'], (req, res) => {
  fs.readdir('data', (err, files) => {
    if(err){
      console.log(err)
      res.status(500).send('Internal Server Error');
    }
    const id = req.params.id;
    if(id){
      // id값이 있을 때
      fs.readFile('data/'+id, 'utf8', (err, data) => {
        if(err){
          console.log(err)
          res.status(500).send('Internal Server Error');
        }
        res.render('view', { topics: files, title: id, description: data});
      })
    }else{
      // id 값이 없을 때
      res.render('view', { topics: files, title: 'Welcome', description: 'Hello, JavaScript for Server' })
    }
  })
});

// app.get('/topic/:id', (req, res) => {
//   const id = req.params.id;
//   fs.readdir('data', (err, files) => {
//     if(err){
//       console.log(err)
//       res.status(500).send('Internal Server Error');
//     }
//     fs.readFile('data/'+id, 'utf8', (err, data) => {
//       if(err){
//         console.log(err)
//         res.status(500).send('Internal Server Error');
//       }
//       res.render('view', { topics: files, title: id, description: data});
//     })
//   })
// })

app.post('/topic', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  fs.writeFile('data/'+title, description, (err) => {
    if(err){
      console.log(err)
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
})

app.listen(3000, () => {
  console.log('Connected, 3000 port!')
})
