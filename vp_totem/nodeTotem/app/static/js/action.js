var iniciarJornada = null;

$('#cadAbastecimento').click(function(){
    msg = validaAbastecimento();
    if(msg == "É obrigatório informar: "){
        montaAbastecimento();
        sucessMessage("Abastecimento salvo com sucesso!");
    }else{
        dangerMessage(msg);
    }
});
$('#cadEncerrarJornada').click(function(){
    msg = validaEncerraJornada();
    if(msg == "É obrigatório informar: "){
        sucessMessage("Jornada encerrada com sucesso.");
        encerrarJornadaJson()
        $('#iniciarJornada').show();
        $('#idAbastacimento').hide();
        $('#encerrarJornada').hide();
        $('#formInicioJornada').show();
        dataAtual();
        $('#formFimJornada').hide();
        $('#formAbastecimentoJornada').hide();
    }else{
        dangerMessage(msg);
    }
});
$('#cadAbrirJornada').click(function(){
    msg = validaAbrirJornada();
    if(msg == "É obrigatório informar: "){
        $('#formInicioJornada').hide();
        $('#formFimJornada').hide();
        $('#formAbastecimentoJornada').show();
        montaJson();
        sucessMessage("Jornada aberta com sucesso.");
        $('#iniciarJornada').hide();
        $('#idAbastacimento').show();
        $('#encerrarJornada').show();
    }else{
        dangerMessage(msg);
    }
});

function validaAbastecimento(){
    if(iniciarJornada != null){
        msg = "É obrigatório informar: ";
        if($('#numeroCarro').val().trim() != ""){
            $('#numeroCarro').removeClass('has-error-input');
            $('#numeroCarroLabel').removeClass('has-error-label');
        }else{
            $('#numeroCarro').addClass('has-error-input');
            $('#numeroCarroLabel').addClass('has-error-label');
            msg= msg + "número do carro; ";
        }

        if($('#matriculaMotorista').val().trim() != ""){
            $('#matriculaMotorista').removeClass('has-error-input');
            $('#matriculaMotoristaLabel').removeClass('has-error-label');
        }else{
            $('#matriculaMotorista').addClass('has-error-input');
            $('#matriculaMotoristaLabel').addClass('has-error-label');
            msg= msg + "matrícula do motorista; "
        }

        if($('#odometro').val().trim() != ""){
            $('#odometro').removeClass('has-error-input');
            $('#odometroLabel').removeClass('has-error-label');
        }else{
            $('#odometro').addClass('has-error-input');
            $('#odometroLabel').addClass('has-error-label');
            msg= msg + "odômetro; "
        }

        if($('#combustivel').val().trim() != ""){
            if(parseInt($('#combustivel').val().trim()) > 0  && parseInt($('#combustivel').val().trim()) <= 500 ){
                    msg= msg + "Quantidade de combustível deve estar no intervalo de 0 a 500 litros; "
            }else{
                $('#combustivel').removeClass('has-error-input');
                $('#combustivelLabel').removeClass('has-error-label');
            }
        }else{
            $('#combustivel').addClass('has-error-input');
            $('#combustivelLabel').addClass('has-error-label');
            msg= msg + "combustível; "
        }
        return msg;
    }else{
        return "É obrigatório inicar uma jornada antes.";
    }
}

function validaEncerraJornada(){
    if(iniciarJornada != null){
        msg = "É obrigatório informar: ";
        if($('#medicaoVaraFim').val().trim() != ""){
            $('#medicaoVaraFim').removeClass('has-error-input');
            $('#medicaoVaraFimLabel').removeClass('has-error-label');
        }else{
            $('#medicaoVaraFim').addClass('has-error-input');
            $('#medicaoVaraFimLabel').addClass('has-error-label');
            msg= msg + "medição com vara; "
        }

        if($('#posicaoRegistroBombaFim').val().trim() != ""){
            $('#posicaoRegistroBombaFim').removeClass('has-error-input');
            $('#posicaoRegistroBombaFimLabel').removeClass('has-error-label');
        }else{
            $('#posicaoRegistroBombaFim').addClass('has-error-input');
            $('#posicaoRegistroBombaFimLabel').addClass('has-error-label');
            msg= msg + "posição registro bomba; "
        }

        if($('#oleoMotorFim').val().trim() != ""){
            $('#oleoMotorFim').removeClass('has-error-input');
            $('#oleoMotorFimLabel').removeClass('has-error-label');
        }else{
            $('#oleoMotorFim').addClass('has-error-input');
            $('#oleoMotorFimLabel').addClass('has-error-label');
            msg= msg + "óleo de motor; "
        }
        return msg;
    }else{
        return "É obrigatório inicar uma jornada antes."
    }
}

function validaAbrirJornada(){
    msg = "É obrigatório informar: ";
    if($('#matriculaBombeiroInicio').val().trim() != ""){
        $('#matriculaBombeiroInicio').removeClass('has-error-input');
        $('#matriculaBombeiroInicioLabel').removeClass('has-error-label');
    }else{
        $('#matriculaBombeiroInicio').addClass('has-error-input');
        $('#matriculaBombeiroInicioLabel').addClass('has-error-label');
        msg= msg + "matrícula; ";
    }

    if($('#oleoMotorInicio').val().trim() != ""){
        $('#oleoMotorInicio').removeClass('has-error-input');
        $('#oleoMotorInicioLabel').removeClass('has-error-label');
    }else{
        $('#oleoMotorInicio').addClass('has-error-input');
        $('#oleoMotorInicioLabel').addClass('has-error-label');
        msg= msg + "a quantidade de óleto de motor; ";
    }

    if($('#posicaoRegistroBombaInicio').val().trim() != ""){
        $('#posicaoRegistroBombaInicio').removeClass('has-error-input');
        $('#posicaoRegistroBombaInicioLabel').removeClass('has-error-label');
    }else{
        $('#posicaoRegistroBombaInicio').addClass('has-error-input');
        $('#posicaoRegistroBombaInicioLabel').addClass('has-error-label');
        msg= msg + "a posição inicial da bomba; ";
    }

    if($('#medicaoVaraInicio').val().trim() != ""){
        $('#medicaoVaraInicio').removeClass('has-error-input');
        $('#medicaoVaraInicioLabel').removeClass('has-error-label');
    }else{
        $('#medicaoVaraInicio').addClass('has-error-input');
        $('#medicaoVaraInicioLabel').addClass('has-error-label');
        msg= msg + "a medição com vara; ";
    }

    if($('#data').val().trim() != ""){
        $('#data').removeClass('has-error-input');
        $('#dataLabel').removeClass('has-error-label');
    }else{
        $('#data').addClass('has-error-input');
        $('#dataLabel').addClass('has-error-label');
    }

    if($('#regional').val().trim() != ""){
        $('#regional').removeClass('has-error-input');
        $('#regionalLabel').removeClass('has-error-label');
    }else{
        $('#regional').addClass('has-error-input');
        $('#regionalLabel').addClass('has-error-label');
    }
    return msg;
}

function encerrarJornadaJson(){

    iniciarJornada.medicacaoVaraFim =  $('#medicaoVaraFim').val()
    iniciarJornada.posicaoRegistroBombaFim = $('#posicaoRegistroBombaFim').val()
    iniciarJornada.oleoMotorFim = $('#oleoMotorFim').val()

    $('#medicaoVaraFim').val("")
    $('#posicaoRegistroBombaFim').val("")
    $('#oleoMotorFim').val("")
}

function montaAbastecimento(){
    var abastecimento = {
        "numeroCarro" : $('#numeroCarro').val(),
        "matriculaMotorista": $('#matriculaMotorista').val(),
        "odometro": $('#odometro').val(),
        "combustivel": $('#combustivel').val(),
        "oleoMotor": $('#oleoMotor').val()
    }
    $('#numeroCarro').val("")
    $('#matriculaMotorista').val("")
    $('#odometro').val("")
    $('#combustivel').val("")
    $('#oleoMotor').val("")
}

function montaJson(){
    iniciarJornada = {
    'regional': $('#regional').val(),
    'data': $('#data').val(),
    'medicaoVaraInicio': $('#medicaoVaraInicio').val(),
    'posicaoRegistroBombaInicio': $('#posicaoRegistroBombaInicio').val(),
    'matriculaBombeiroInicio': $('#matriculaBombeiroInicio').val(),
    'oleoMotorInicio': $('#oleoMotorInicio').val(),
    }

    $('#regional').val("");
    $('#data').val("");
    $('#medicaoVaraInicio').val("");
    $('#posicaoRegistroBombaInicio').val("");
    $('#matriculaBombeiroInicio').val("");
    $('#oleoMotorInicio').val("");
}
function dangerMessage(msg){
    $('#msgContent').html("<div class='alert alert-danger'> <a href='#' class='close' data-dismiss='alert'>&times;</a> <span id='msg'><strong>Atenção:</strong>"+msg+"</span></div>");
}

function sucessMessage(msg){
    $('#msgContent').html("<div class='alert alert-success'> <a href='#' class='close' data-dismiss='alert'>&times;</a> <span id='msg'><strong>Informação:</strong>"+msg+"</span></div>");
}
