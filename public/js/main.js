var tempoInicial = $("#tempo-digitacao").text()
var campo = $(".campo-digitacao")


$(function(){
    atualizaTamanhoFrase()
    inicializaCronometro()
    inicializaMarcadores()
    $("#botao-reinicia").click(reiniciaJogo)
    atualizaPlacar()

    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $('.tooltip-hover').tooltipster();
    $('.tooltip-sync').tooltipster({
        trigger : "custom"
    });
    $(".campo-digitacao").bind("cut copy paste", function(e){
        e.preventDefault()
    })
})



//Funções

function atualizaTempoInicial(tempo){
    tempoInicial = tempo
    $("#tempo-digitacao").text(tempo)
}

function atualizaTamanhoFrase(){
    var frase = $(".frase").text()
    var numPalavras = frase.split(" ").length
    $("#tamanho-frase").text(numPalavras)
}


function inicializaContadores(){
    campo.on("input",function(){
      
    var conteudo = campo.val()
    var qtdPalavras = conteudo.split(/\S+/).length -1 //O (/\S+/) é uma expressão regular para que o JavaScript não considere espaços como palavras
    $("#contador-palavras").text(qtdPalavras)

    var conteudoSemEspaco = conteudo.replace(/\s+/g,'') //retirando os espaços da string
    var qtdCaracteres = conteudoSemEspaco.length
    $("#contador-caracteres").text(qtdCaracteres)

        })
}



function inicializaCronometro(){
    campo.one("focus", function(){   
    var tempoRestante = $("#tempo-digitacao").text()
    desabilitaBotoes()


    var cronometroId = setInterval(function(){
    tempoRestante--
    $("#tempo-digitacao").text(tempoRestante)
        if (tempoRestante <1) {
                clearInterval(cronometroId)
                finalizaJogo()
                inserePlacar()               
            }
        },1000)

    })
}

function finalizaJogo(){
    campo.attr("disabled", true)
    habilitaBotoes()
    campo.addClass("campo-desativado")   
     
}


function reiniciaJogo(){
        campo.attr("disabled", false)
        campo.val("")
        $("#contador-palavras").text("0")
        $("#contador-caracteres").text("0")
        $("#tempo-digitacao").text(tempoInicial)
        inicializaCronometro()
        campo.removeClass("campo-desativado")
        campo.removeClass("borda-verde")
        campo.removeClass("borda-vermelha")
}

function desabilitaBotoes(){
    $("#botao-reinicia").addClass("disabled")
    $("#botao-frase").addClass("disabled")
    $("#botao-frase-id").addClass("disabled")
    $("#botao-sync").addClass("disabled")
}

function habilitaBotoes(){
    $("#botao-reinicia").removeClass("disabled")
    $("#botao-frase").removeClass("disabled")
    $("#botao-frase-id").removeClass("disabled")
    $("#botao-sync").removeClass("disabled")
}

function inicializaMarcadores(){
    campo.on("input", function(){   
    var frase = $(".frase").text()
    var digitado = campo.val()
    var digitouCorreto = frase.startsWith(digitado) //O método startsWith() determina se uma string começa com os 
    //mesmos caracteres de outra string, retorna true ou false conforme apropriado.
        if (digitouCorreto) {
            campo.addClass("borda-verde")
            campo.removeClass("borda-vermelha")
            inicializaContadores()
            
            
        }else{
            campo.addClass("borda-vermelha")
            campo.removeClass("borda-verde")
            inicializaContadores().stop
            


            //Outra forma de fazer a comparação
    //var comparado = frase.substr(0,digitado.length)
    //     if (digitado == comparado) {
    //         campo.addClass("borda-verde")
    //         campo.removeClass("borda-vermelha")
            
    //     }else{
    //         campo.addClass("borda-vermelha")
    //         campo.removeClass("borda-verde")
    //     }    
    // })  
    /*console.log("Digitado " + digitado)
        console.log("Frase C: " + comparado)*/
        }
    })
}

    

