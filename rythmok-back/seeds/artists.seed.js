const mongoose = require('mongoose');
const Artist = require('../models/Artists.model');
const { DB_URL, DB_CONFIG } = require('../db');

const artistsArray = [
  {
    name: "Dua Lipa",
    bio: "Cantante y compositora británica de etnia albanokosovar. Después de trabajar como modelo, firmó con Warner Bros. Records en 2014 y lanzó su álbum debut homónimo en 2017. El álbum alcanzó el número 3 en la UK Albums Chart y lanzó ocho sencillos, incluidos «Be the One» e «IDGAF», y el sencillo número 1 del Reino Unido «New Rules», que también llegó al puesto número 6 en Estados Unidos. En 2018, ganó dos premios Brit a la Mejor artista solista femenina británica y al Artista revelación británico.",
    styles: ["pop", "R&B", "house"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Dua_Lipa_with_Warner_Music.jpg/250px-Dua_Lipa_with_Warner_Music.jpg", 
  },
  {
    name: "Coldplay",
    bio: "Banda británica de pop rock y rock alternativo formada en Londres en 1996.6​7​ Está integrada por Chris Martin, Jon Buckland, Guy Berryman y Will Champion. Es uno de los grupos más relevantes de las décadas de los 2000 y 2010.",
    styles: ["pop", "rock", "alternativo"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Coldplay_2017%2C_cropped_01.jpg/600px-Coldplay_2017%2C_cropped_01.jpg",     
  },
  {
    name: "Randy Blythe",
    bio: "Músico y vocalista de la banda de groove metal y metalcore estadounidense Lamb of God. También participa en un proyecto paralelo con el grupo Halo of Locusts. Es conocido como D. Randall Blythe en los discos de Lamb of God, aunque personalmente todos le conocen como Randy.",
    styles: ["groove", "metal", "metalcore"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Randy_Blythe_at_Optimus_Alive_2009_2.jpg/210px-Randy_Blythe_at_Optimus_Alive_2009_2.jpg",     
  },
  {
    name: "Pendulum",
    bio: "Banda australiana-británica de hard rock, drum and bass y rock electrónico, fundada en 2002 por Rob Swire, Gareth McGrillen, y Paul Harding. La banda se caracteriza por su estilo de combinar música electrónica con rock y por sus variadas presentaciones .",
    styles: ["hardrock", "drum&bass", "rock", "electronico"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Randy_Blythe_at_Optimus_Alive_2009_2.jpg/210px-Randy_Blythe_at_Optimus_Alive_2009_2.jpg",     
  },
  {
    name: "Faemino y Cansado",
    bio: "Dúo humorístico español, compuesto por Carlos Faemino y Javier Cansado. El dúo comenzó su carrera en Madrid, España, con espectáculos callejeros, posteriormente en bares y teatros y continuaron con apariciones en televisión, donde contaron incluso con un programa propio.",
    styles: ["humor", "monologo", "teatro"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Faemino_Cansado_3658.jpg/220px-Faemino_Cansado_3658.jpg",     
  }
];

mongoose
  .connect(DB_URL, DB_CONFIG)
  .then(async () => {
    console.log('Ejecutando seed artists.seed.js');

    // Find if artist exists
    const allArtists = await Artist.find();

    //If exists then delete
    if (allArtists.length) {
      await Artist.collection.drop();
      console.log('Colección Artists eliminada con éxito');
    }
  })
  .catch((error) => {
    //If error
    console.log('Error buscando en DB:', error);
  })
  .then(async () => {
    // Artist is inserted into Artists array
    await Artist.insertMany(artistsArray);
    console.log('Añadidas nuevas Artist a DB');
  })
  .catch((error) => {
    // Error entering new Artist
    console.log('Error insertando Artists', error);
  })
  .finally(() => {
    // In every case disconnect from DB
    mongoose.disconnect();
  });
