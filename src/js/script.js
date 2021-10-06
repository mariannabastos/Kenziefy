const baseMusicas = [
    {
        'name': 'Op.28 Pastoral - I. Allegro',
        'artist': 'Karine Gilanyan',
        'path': './src/audio/01Karine.mp3',
        'album': 'Beethoven: Sonata No. 15 in D Major',
    },

    {
        'name': 'Op.28 Pastoral - II. Andante',
        'artist': 'Karine Gilanyan',
        'path': './src/audio/02Karine.mp3',
        'album': 'Beethoven: Sonata No. 15 in D Major',
    },

    {
        'name': 'Op.28 Pastoral - III. Scherzo. Allegro Vivace',
        'artist': 'Karine Gilanyan',
        'path': './src/audio/03Karine.mp3',
        'album': 'Beethoven: Sonata No. 15 in D Major',
    },

    {
        'name': 'Op.28 Pastoral - IV. Rondo. Allegro ma non troppo',
        'artist': 'Karine Gilanyan',
        'path': './src/audio/04Karine.mp3',
        'album': 'Beethoven: Sonata No. 15 in D Major',
    },

    {
        'name': 'Op.50 no.3 - I. Introduzione: Largo patetico e sostenuto',
        'artist': 'Nathan Eckel',
        'path': './src/audio/01Nathan.mp3',
        'album': 'Muzio Clementi: Sonata in G Minor - Didone Abbandonata',
    },

    {
        'name': 'Op.50 no.3 - II. Adagio dolente',
        'artist': 'Nathan Eckel',
        'path': './src/audio/02Nathan.mp3',
        'album': 'Muzio Clementi: Sonata in G Minor - Didone Abbandonata',
    },

    {
        'name': 'Op.50 no.3 - III. Allegro agitato, e con disperazione',
        'artist': 'Nathan Eckel',
        'path': './src/audio/03Nathan.mp3',
        'album': 'Muzio Clementi: Sonata in G Minor - Didone Abbandonata',
    },
];

const listaMusicas = document.querySelector('.listaMusicas');
const tagAudio = document.getElementById('saidaAudio');
const primeiraMusica = baseMusicas[0];
tagAudio.src = primeiraMusica.path;
atualizaPlayer(baseMusicas[0].album,baseMusicas[0].name)
const botaoPausar = document.getElementById('btPause');
const botaoPlay = document.getElementById('btPlay');

let musicaAtual = 0;

function construirPlaylist(musica, musicaId) {
    const musicaElemento = document.createElement('li');
    const nomeMusica = document.createElement('p');
    const nomeArtista = document.createElement('p');
    const nomeAlbum = document.createElement('p');

    musicaElemento.dataset.id = musicaId;

    nomeMusica.className = 'primeiroItem';
    nomeMusica.innerText = musica.name;
    nomeArtista.innerText = musica.artist;
    nomeAlbum.innerText = musica.album;

    musicaElemento.appendChild(nomeMusica);
    musicaElemento.appendChild(nomeArtista);
    musicaElemento.appendChild(nomeAlbum);
    musicaElemento.addEventListener('click', tocarMusica);

    listaMusicas.appendChild(musicaElemento);
}

for(let contador = 0; contador < baseMusicas.length; contador++) {
    construirPlaylist(baseMusicas[contador], contador);
}

function tocarMusica(evento) {
    const elementoClicado = evento.currentTarget;
    if(elementoClicado.tagName === 'LI') {
        const musicaId = elementoClicado.dataset.id;
        const musicaSelecionada = baseMusicas[musicaId];
    
        tagAudio.src = musicaSelecionada.path;
        musicaAtual = Number(musicaId)
        tagAudio.play();
        botaoPlay.classList.add("pause")
        atualizaPlayer(baseMusicas[musicaAtual].album,baseMusicas[musicaAtual].name)
       
    } else {
        if(tagAudio.paused) {
            tagAudio.play();
            botaoPlay.classList.add("pause")
            
        } else {
            tagAudio.pause();
            botaoPlay.classList.remove("pause")
        }
    }
}

botaoPlay.addEventListener('click', tocarMusica);

function pausarMusica() {
    tagAudio.pause();
    botaoPlay.classList.remove("pause")
}

botaoPausar.addEventListener('click', pausarMusica);

function tocarProximaMusica() {   
    if(musicaAtual === baseMusicas.length - 1){
        musicaAtual = 0
    } else {
        musicaAtual++
    }
   
    tagAudio.src = baseMusicas[musicaAtual].path
    tagAudio.play()
    let nomeAlbum = baseMusicas[musicaAtual].album
    let nomeMusica = baseMusicas[musicaAtual].name
    atualizaPlayer(nomeAlbum,nomeMusica)
    botaoPlay.classList.add("pause")
}

const btNext = document.getElementById('btNext');
btNext.addEventListener("click", tocarProximaMusica)

function tocarMusicaAnterior() {  
    if(musicaAtual === 0){
        musicaAtual = baseMusicas.length - 1
    } else {
        musicaAtual--
    }

    tagAudio.src = baseMusicas[musicaAtual].path
    tagAudio.play()
    atualizaPlayer(nomeAlbum,nomeMusica)
    botaoPlay.classList.add("pause")
}

const btPrev = document.getElementById('btPrev');
btPrev.addEventListener("click", tocarMusicaAnterior)
const areaPlayerVolume = document.querySelector(".areaPlayerVolume input")

areaPlayerVolume.addEventListener("input", ()=> {   
    tagAudio.volume = areaPlayerVolume.value
})

function atualizaPlayer(nome,musica) {   
    const nomeMusica = document.getElementById('nomeMusica');
    const nomeAlbum = document.getElementById('nomeAlbum');
    
    nomeMusica.innerText = musica
    nomeAlbum.innerText = nome
}