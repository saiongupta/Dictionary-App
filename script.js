
var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
var content = document.getElementById('content');
var sound = document.getElementById('sound');
var meanings = document.getElementById('meanings');

function hndlr() {
  var input = document.getElementById('search').value;
  if (input != '') {
    fetch(`${url}${input}`)
    .then(response => response.json())
    .then(data => {
      if (data.title) {
        content.innerHTML = data.title;
      } else {
        document.getElementById('word').innerHTML = input;
        sound.src = data[0].phonetics[0].audio;
        document.getElementById('phonetic').innerHTML = '/' + data[0].phonetic + '/';
        meanings.innerHTML = '';
        for (var i = 0; i < data[0].meanings.length; i++) {
          var partofspeech = document.createElement('p');
          partofspeech.className = "partofspeech";
          partofspeech.innerHTML = data[0].meanings[i].partOfSpeech;
          meanings.appendChild(partofspeech);
          var definition = document.createElement('p');
          definition.className = "definition";
          definition.innerHTML = data[0].meanings[i].definitions[0].definition;
          meanings.appendChild(definition);
          var example = document.createElement('p');
          example.className = "example";
          example.innerHTML = '"' + data[0].meanings[i].definitions[0].example + '"';
          meanings.appendChild(example);
          var similar = document.createElement('p');
          similar.className = "similar";
          similar.innerHTML = 'Similar: ';
          meanings.appendChild(similar);
          var swords = document.createElement('span');
          swords.style.color = 'black';
          if (data[0].meanings[i].definitions[0].synonyms.length == 0) {
            swords.innerHTML = 'Nothing Similar';
          } else {
            for (var j = 0; j < data[0].meanings[i].definitions[0].synonyms.length; j++) {
              if (data[0].meanings[i].definitions[0].synonyms.length - j == 1) {
                swords.innerHTML += data[0].meanings[i].definitions[0].synonyms[j];
              } else {
                swords.innerHTML += data[0].meanings[i].definitions[0].synonyms[j] + ', ';
              }
            }
          }
          similar.appendChild(swords);
        }
      }
    })
  }
}