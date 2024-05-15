import http, { request } from 'node:http'

const PORT = 3333


//{
// "nome":"luci"
// "email":"taci@gmail.com"
// "senha":"123454"
// "idade":"19"
// "cidade": "maceio"
// }


const participants = []

const teste = http.createServer((request, response) => {

    const { method, url } = request
    //http://localhost:3333/participants
    //http://localhost:3333/participants/{id}

    if (method === 'GET' && url === '/participants') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(participants));

    } else if (method === 'POST' && url === '/participants') {
        let body = ''
        request.on('data', (um) => {
            body += um.toString()
        })

        request.on('end', () => {
            const novoParticipante = JSON.parse(body)
            if(novoParticipante.idade >= 18){
            
            }
            novoParticipante.id = participants.length + 1
            participants.push(novoParticipante)

            response.writeHead(201, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(novoParticipante));


        });
    } else if (method === 'GET' && url.startsWith('/participants/')) {

        const id = parseInt(url.split('/')[2])
        const buscaParticipante = participants.find((participante) => participante.id === id)


        if (!participants) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Usuário não encontrado' }))
            return
        }

        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(buscaParticipante))
    } else if (method === 'DELETE') {

    } else if (method === 'GET') {

        if (!participants) {

            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Usuário não pode ser cadastrado' }))
            return
        }


    }});


//   //**Maior que dezoito  */
//     }else if(method === 'GET'){
//         if(!participante){
//             response.writeHead(404, {'Content-Type': 'application/json'})
//             response.end(JSON.stringify({message:'Usuário não pode ser cadastrado'}))
//             return
//         }
// if (idade >= 18) {
//     const maioresDezoito = novoParticipante.map((maioresDezoito) => maioresDezoito.idade === idade)
//     const idade =  
//     }
//     }




























teste.listen(PORT, () => {
    console.log(`Servidor on PORT: ${PORT}`)
})