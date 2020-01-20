

$("#botao-frase").click(trocaFraseAleatoria)
$("#botao-frase-id").click(buscaFrase)


function trocaFraseAleatoria(){
    reiniciaJogo()
    $("#spinner").toggle()
    $.get("http://localhost:3000/frases", alteraFrase).fail(function(){
        
        $("#erro").toggle()

        setTimeout(function(){
            $("#erro").toggle()
        },2000)
    })
        .always(function(){
        $("#spinner").toggle()
    })
}

function alteraFrase(data){
    var frase = $(".frase")
    var numAleatorio = Math.floor(Math.random() * data.length)
        frase.text(data[numAleatorio].texto)
        atualizaTamanhoFrase()
        atualizaTempoInicial(data[numAleatorio].tempo)
}

function buscaFrase(){
    reiniciaJogo()
    $("#spinner").toggle()
    var fraseId = $("#frase-id").val()
    var dados = {id: fraseId}

    $.get("http://localhost:3000/frases",dados,trocaFrase).fail(function(){

        $("#erro").toggle()

        setTimeout(function(){
            $("#erro").toggle()
        },2000)

    }).always(function(){
        $("#spinner").toggle()
    })
}

function trocaFrase(data){
    var frase = $(".frase")
    frase.text(data.texto)
    atualizaTamanhoFrase()
    atualizaTempoInicial(data.tempo)

}



