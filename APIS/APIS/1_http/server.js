import http from 'node:http'
import { report } from 'node:process'
//essa é toda uma estrutura de uma api trabalahno dos metodos de requisicoes 
const PORT = 3333
/** */
// 3Tipos de Requisição via fromulario sao aquisicoes que eu recebo minhas rotas 
// * body -> via fromulario -> uso o POST 
// * ROUTER -> para os parametros utilizamos -> GET < PUT , DELETE, PATH 
// * QUERY -> /uruarios?param1=valor1&param2=valor2 -> GET 

const usuarios = []//Base de dados 
const server = http.createServer((request, response)=>{
    const {method, url } = request
    //localhost:3333/usuario/{id}
    if(method === 'GET' && url.startsWith ('/usuarios/')){
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(usuarios));
        response.end('GET /usuarios') //**starWith : começar com  */
    }else if(method === 'POST' && url.startsWith ('/usuarios/')){
        let body = ''
        request.on('data', (chuck)=>{
            //linha
            //linha 2
            //linha 3
            body+=chuck.toString()
        })
        
        response.on('end', ()=>{
            const novoUsuario = JSON.parse(body)
            novoUsuario.id = usuarios.length + 1
            usuarios.push(novoUsuario)
            //JSON.parse : tô transformanto o body que é um texto em json 
           response.writeHead(201, {'Content-Type':'application/json'})
            response.end(JSON.stringify(novoUsuario))

        });
    }else if(method === 'PUT' && url.startsWith ('/usuarios/')){
        response.end('PUT /usuarios')
    }else if(method === 'DELETE' && url.startsWith ('/usuarios/')){
        response.end('DELETE /usuarios')
    }else if(method === 'GET' && url.startsWith ('/usuarios/')){
        //local:3333/usuarios/1
        //metodo split-> separa o array assim [localhost:3333, usuarios, 1]
        const id = url.split('/')[2]
        const usuarios = usuarios.find((usuario)=>usuario.id === id)
    //    console.log(usuarios)
    //     response.end(id)
    if(!user){
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message:'Usuário não encontrado'}))
        return
    }
     
    }else{
     response.writeHead(404,{"Content-Type":"application/json"});
     response.end(JSON.stringify({message:'Rota Não EXISTE'}))
    }
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT: ${PORT}`)
})