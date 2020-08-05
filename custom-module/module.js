const path = require('path');
const fs = require('fs');

module.exports = (data) => {

    return {
        // Uso dos varibles del mismo archivo para no tener problemas al momento de ordenarlos por precio.
        allFile: JSON.parse(fs.readFileSync(path.resolve(__dirname, `..`, `data`, `${data}.json`), `utf-8`)),

        toFormatFile: JSON.parse(fs.readFileSync(path.resolve(__dirname, `..`, `data`, `${data}.json`), `utf-8`)),

        priceFormat() {
            // Formateo el precio para que se vea según lo pedido
            this.toFormatFile.forEach(obj => {
                if (obj.Precio) {
                    let precio = obj.Precio.toString().split('.');
                    //No vuelvo a inventar la rueda y uso un código lindo para poner el punto de los miles. 
                    precio[0] = precio[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    // Si no tiene decimal le agrego los ceros
                    if (precio[1] == undefined) {
                        precio = [precio, '00']
                        // Si tiene un decimal de menor a 10 le agrego un sólo cero
                    } else if (precio[1] < 10) {
                        precio[1] += '0'
                    }
                    // Agrego signo pesos
                    precio[0] = `$${precio[0]}`
                    // Coloco el nuevo dato dentro del value de la key precio
                    obj.Precio = precio.join()
                }
            })
        },

        // Listo todos los productos con sus atributos y formateo el precio.
        wholeList() {
            // ejecuto el formateo del precio
            this.priceFormat();
            this.toFormatFile.forEach(obj => {

                let unidad = [];
                // Uso el médoto de Object para saber los nombres de las key y los values
                Object.entries(obj).forEach(([key, value]) => {

                    unidad.push(`${key}: ${value}`)

                })
                // Uno todo en una sola cadena de texto según está solicitado y lo imprimo por consola.
                return console.log(unidad.join(' // '))
            })

        },



        mayorMenor() {
            // Ordeno el array de objetos para sacar en dos pasos el mayor y el menor
            this.allFile.sort((a, b) => b.Precio - a.Precio);
            // Saco el largo toal del array
            let largoArray = (this.allFile.length) - 1;
            // Imprimo mayor y menor
            return console.log(
                `Vehículo más caro: ${this.allFile[0].Marca} ${this.allFile[0].Modelo} \nVehículo más barato: ${this.allFile[largoArray].Marca} ${this.allFile[largoArray].Modelo}`
            )
        },

        // Buscador que no se limita sólo a la key de Modelo
        finder(key, search) {

            let resultado = this.toFormatFile.find(x => x[key].toString().includes(search)
            )
            return console.log(
                `Vehículo que contiene en ${key} la letra '${search}': ${resultado.Marca} ${resultado.Modelo} ${resultado.Precio}`
            )

        },

        orderBy(por) {
            // Ordena por mayor y menor
            if (por.toLowerCase() == 'mayor') {
                this.allFile.sort((a, b) => b.Precio - a.Precio)
            }
            if (por.toLowerCase() == 'menor') {
                this.allFile.sort((a, b) => a.Precio - b.Precio)
            }
            this.allFile.forEach(x => {
                console.log(`${x.Marca} ${x.Modelo}`)
            })
        }

    }
}