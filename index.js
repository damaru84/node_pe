console.log ("inicializando el programa")
const url_API = "https://fakestore.api.com"
const argumentos = process.argv.slice(2)

const argumentos_validos = ["GET", "POST","PUT", "DELETE"]

console.log(argumentos),

async function programa_principal(argumentos){
    if(!argumentos[0] in argumentos_validos){
        console.log ("comandos incorrectos")
        break
    }
    switch(argumentos[0]){
        case "GET:"
            if(!argumentos[0].includes("/"){
                try{
                    response = await fetch(url_API,{
                        method: "GET"
                    })
                    if (response.status !==200){
                        throw new Error ("falla en la solicitud")
                        break
                    }
                    data = await response.json()
                    console.log(data)
                }
            })
 }
}