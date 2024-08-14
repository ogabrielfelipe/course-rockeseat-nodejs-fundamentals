//Netflix  & Spotify

// Ler pequenas partes de algo, antes de ter o arquivo carregado por completo

// Importação de clientes via CSV (Excel)


import { Readable, Writable, Transform } from 'node:stream' 

class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() =>{
            if (i > 100){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 500)
        
    }

}


class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        // callback(error, resultando)
        callback(null, Buffer.from(String(transformed)))
    }
}


class MultiplyByTenStream extends Writable {
    _write(chunk, enconding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())