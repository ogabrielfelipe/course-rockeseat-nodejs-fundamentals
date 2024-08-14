import http from 'node:http'
import { Transform } from 'node:stream' 

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        
        callback(null, Buffer.from(String(transformed)))
    }
}

// req => ReadableStream
// res => Writablestream

const server = http.createServer(async (req, res) => {
    const buff = []

    for await (const chunk of req) {
        buff.push(chunk)
    }
    const fullStreamContent = Buffer.concat(buff).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // return req
    //         .pipe(new InverseNumberStream())
    //         .pipe(res)
})

server.listen(3334)