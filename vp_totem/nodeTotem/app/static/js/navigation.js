var foco;

function redirectTotem(text){
    if(text == 'abastecimento'){
        urlPath = "/abastecimento/index.html";
        window.location.href = window.location.href.substring(0,window.location.href.lastIndexOf("/")) + urlPath;
    }
}

function load(){
    $('#formInicioJornada').show();
    $('#formFimJornada').hide();
    $('#formAbastecimentoJornada').hide();
    $('.alert.alert-danger').hide();
    $('#regional').val("Vassouras");
    $('#idAbastacimento').hide();
    $('#encerrarJornada').hide();
    dataAtual();
}

function dataAtual(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    today = dd+'/'+mm+'/'+yyyy;
    $("#data").val(today);
}

function navigationAbastecimento(acao){
    if(acao=='ABASTECER'){
        $('#formInicioJornada').hide();
        $('#formFimJornada').hide();
        $('#formAbastecimentoJornada').show();
    } else if(acao=='INICIAR'){
        $('#formInicioJornada').show();
        dataAtual();
        $('#formFimJornada').hide();
        $('#formAbastecimentoJornada').hide();

    } else if(acao=='ENCERRAR'){
        $('#formInicioJornada').hide();
        $('#formFimJornada').show();
        $('#formAbastecimentoJornada').hide();
    } else if(acao=='MENU'){
        urlPath = "/abastecimento/index.html";
        aux = window.location.href.replace(urlPath,"");
        window.location.href = aux + "/index.html"
    }
}

$('.number').click(function() {
  if(foco)
    var value = $(this).text();
    var content = $('#'+foco).val();
    $('#'+foco).val(content+value);
    $('#'+foco).focus();
});

$('input.input').on('focus', function() {
  foco = $(this).attr('id');
});

$('.cancel').click(function(){
    if(foco)
        $('#'+foco).val("");
});

$('.back').click(function(){
    if(foco)
        valor = $('#'+foco).val();
        valor = valor.substring(0,valor.length-1);
        $('#'+foco).val(valor)
});
