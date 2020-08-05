// Modularizo completamente el código para que todo se vea más limpio.
// Agrego la opción de que el módulo lea objetos tipo JSON.


let modulo= require('./custom-module/module') 

let Onready = modulo('data')


Onready.wholeList();
console.log('='.repeat(30))
Onready.mayorMenor()
Onready.finder('Modelo', 'Y')
console.log('='.repeat(30))
Onready.orderBy('mayor')
