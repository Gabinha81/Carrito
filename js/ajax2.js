console.log ('correct');

document.querySelector('#boton').addEventListener('click', traerDatos);

function traerDatos(){

    const xhttp = new XMLHttpRequest();
    xhttp.open ('GET','js/catalogo.json',true);
    xhttp.send();
    xhttp.onreadystatechange = function(){

        if ( this.readyState == 4 && this.status ==200){
            console.log(this.responseText);
            //transformo texto en json
            let datos = JSON.parse(this.responseText);
            
            let res = document.querySelector('#res');
            res.innerHTML =' ';
            
            for (let item of datos){

              console.log(item.producto);
               //por cada ciclo agrega nueva información
               res.innerHTML += `
               <tr>
                    <td>${item.producto}</td>
                    <td>${item.precio}</td>
               </tr>
               
               `
            }
        }
    }
}