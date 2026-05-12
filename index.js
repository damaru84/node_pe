console.log ("inicializando el programa");
const url_API = "https://fakestore.api.com";
const argumentos = process.argv.slice(2);
const argumentos_validos = ["GET", "POST","PUT", "DELETE"];

async function programa_principal(argumentos = []){
    if(!argumentos[0] in argumentos_validos){
        console.log ("comandos incorrectos");
        break;
    }
    switch(argumentos[0]){

///////////////////////////////////////////////////////////////////////////GET///////////////////////////////////////////////////////////////////////////
        case "GET": 
            if (!argumentos[1].includes("/") && argumentos[1] == "productos"){
                try{
                    const response = await fetch (`${url_API}/products`, {
                        method: "GET"
                    })
                    if (response.status !== 200){
                        throw new Error ("falla en la solicitud")
                        break
                    }
                    const data = await response.json()
                    data.forEach(element => {
                        console.log(element)
                    });
                 
                    break;
                }catch(error){
                    console.log(error)
                    break;
                }
            } else if (argumentos[1].includes("/") && argumentos[1].includes("products")){
                let id_sin_separar = argumentos[1].split("/")
                try{
                    const id = parseInt(id_sin_separar[1])
                    const response = await fetch(`${url_API}/products/${id}`,{
                        method: "GET"
                    })
                    if (response.status != 200){
                         throw new Error ("Error en la solicitud")
                        break;
                    }
                    const data = await response.json()
                    console.log(data)
                    break;
                }catch(error){
                    console.log(error)
                    break;
                }
            }else{
                console.log("comando incorrecto")
                break;
            }

///////////////////////////////////////////////////////////////////////////POST///////////////////////////////////////////////////////////////////////////
            case "POST":
                if(argumentos.length == 5 && argumentos[1] == "productos"){
                    const [ , , nombre, precio, categoria] = argumentos;
                try {
                    const response = await fetch(`${url_API}/products`,{
                        method : "POST",
                        headers:  { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, precio, categoria })
                });
                if(!response.ok){throw new Error("Error en la solicitud")};
                const data = await response.json();
                console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }else{
                console.log("Solicitud incompleta")
                break;
            }
/////////////////////////////////////////////////////////////////////////// PUT ///////////////////////////////////////////////////////////////////////////
            case "PUT":
                 if (argumentos.length == 5 && argumentos[1].includes("/") && argumentos[1].includes("products")) {
                     let id_sin_separar = argumentos[1].split("/");
             try {
                const id = parseInt(id_sin_separar[1]);
                const [ , , nombre, precio, categoria] = argumentos;
                const response = await fetch(`${url_API}/products/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({ nombre, precio, categoria })
            });
            if (!response.ok) throw new Error("Error en la solicitud");
            const data = await response.json();
            console.log("Producto actualizado:", data);
            } catch (error) {
            console.log(error);
            }
        } else {
             console.log("Solicitud incompleta o incorrecta");
            break;
        }
         

///////////////////////////////////////////////////////////////////////////DELETE///////////////////////////////////////////////////////////////////////////
        case "DELETE":
            if(argumentos[1].includes("/") && argumentos[1].includes("products")){
                let id_sin_separar = argumentos[1].split("/")
                try{
                    const id = parseInt(id_sin_separar[1])
                    const reponse = await fetch(`${url_API}/products/${id}`,{method: "DELETE"})
                    if (!reponse.ok){throw new Error ("Error en la solicitud");
                    }
                    const data = await reponse.json()
                    console.log(data)
                    break;
                }catch(error){
                    console.log(error)
                }
            }else{
                console.log("Solicitud incorrecta")
            }
            break;
    }
}
programa_principal(argumentos);