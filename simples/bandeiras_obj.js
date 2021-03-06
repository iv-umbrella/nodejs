#!/usr/bin/env node
'use strict';

var fs = require('fs');
var request = require('request');

var BASE_URL = ('https://www.cia.gov/library/publications/the-world-factbook'
                + '/graphics/flags/large/');

var DESTINO = './bandeiras/';

var QT_BAIXAR = 10;

var i = 0;
var nome = '';
var nomes = [];

console.time('tempo transcorrido');

nomes = fs.readFileSync('bandeiras.txt', 'utf-8').split('\n');

function salvar(error, response, body) {
  var nome_arq = '';
  if (response.error) {
    console.log('Error: '+response.error);
  }
  if (!error && response.statusCode == 200) {
    fs.writeFile(DESTINO+this.nome, body, function (err) {
      if (err) throw err;
      console.log('\t'+this.indice+' '+this.nome+' salvo');
    }.bind(this));
  }
}

for (i=0; i<QT_BAIXAR; i++) {
  nome = nomes[i];
  console.log(i+' '+nome);
  var contexto = {indice: i, nome: nome};
  request({uri:BASE_URL+nome, encoding:null}, salvar.bind(contexto));
}

process.on('exit', function () {
  console.timeEnd('tempo transcorrido');
});
