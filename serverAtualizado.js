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
    const {method, url } = request // Na requisao eu recebo as informacoes que tem dentro do request e ai vou tratar elas  
    // const method = request.method
    //localhost:3333/usuario/{id}

    //1xx -> indica que até o momento tudo está OK e que o cliente pode continuar com a requisição ou ignorar caso já tenha terminado
    //2xx -> que toda a operação foi concluida com SUCESSO.
    //3xx -> Foi redirecionando  
    //4xx -> cliente/navegador algo não deu certo
    //5xx -> erro no servidor 

    //**CADASTRO */
    if(method === 'GET' && url.startsWith ('/usuarios/')){
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(usuarios));
        response.end('GET /usuarios') //**starWith : começar com  */
        //**.end ->   */
        //**.writeHead ->  */
        //** stringify -> */
        //** startWith -> */
    }else if(method === 'POST' && url.startsWith ('/usuarios/')){
        let body = ''
        request.on('data', (chuck)=>{
            //**request.on: ele recebe informacoes muito grandes e guarda essa informacoes  */
            //**chuck é apenas um parametro não é algo fixo */
            //linha
            //linha 2
            //linha 3
            body+=chuck.toString()
        })
        
        response.on('end', ()=>{
            const novoUsuario = JSON.parse(body)
            //**.parse transforma o json texto para um objeto  */
            novoUsuario.id = usuarios.length + 1
            usuarios.push(novoUsuario)
            //**tô pegando os dados do novo usuario e colocando no array de uruarios  */
           
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
        const id = url.split('/')[2] //** O dois representa o pedaço que quero selecionar ele, ao aplicar o metodo split(separa) a url pelo caracter "/" barra ele divide essa url em 0,1,2 como o id esta na posição 2 é ele que é passado na função  */
        const usuario = usuarios.find((usuario)=> usuario.id === id)
        //** Essa instrução acima eu peço, No arrey usurios procura o id do usuario */
    //    console.log(usuario)
    //     response.end(id)
    if(!usuario){
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
