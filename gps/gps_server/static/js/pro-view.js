
var menuExpandido = true; //variável que armazena o estado do menu se está aberto ou fechado.
var chartExpandido = false; //variável que armazena o estado o gráfico se está aberto ou fechado.
var filterExpandido = false;


/**
*** Fundção que apresenta o gráfico quando se clica na aba lateral
***/
$('#filter-header').click(function() {
  	if(filterExpandido){
  		$('.right').css('width','20px');
  		$('#filterDashboard').css('float','left');
  		$('#filterDashboard').css('width','20px');
  		filterExpandido = false;
  		chartExpandido = false;
  	}else{
  		$('.right').css('width','40%');
  		$('#filterDashboard').css('float','left');
  		$('#filterDashboard').css('width','calc(100%)');
  		filterExpandido = true;
  		chartExpandido = false;
  	}
  	resizeContentMap()
});

/**
***  Controle do menu lateral expandi e contrai
**/
function menuClickControl(){
	if(menuExpandido){
		var img = document.getElementById('logo_aid');
		var height = img.clientHeight;
		$('.left').css("width","40px");
		$('#txtDashboard').hide();
		$('#logo_aid').hide();
		$('#txtModel').hide();
		$('#menuPrincipal li a').css('width','40px');
		$('#imgDashboard').removeAttr('style')
		$('#imgDashboard').css('left','50%');
		$('#imgDashboard').css('margin-left','-16px');
		$('#imgDashboard').css('float','none');
		$('#imgModel').removeAttr('style')
		$('#imgModel').css('left','50%');
		$('#imgModel').css('margin-left','-16px');
		$('#imgModel').css('float','none');
		$('#menuPrincipal').css('margin-top',height+10);
		menuExpandido=false;
	}else{
		$('.left').css("width","250px");
		$('#txtDashboard').show();
		$('#txtModel').show();
		$('#logo_aid').show();
		$('#menuPrincipal li a').css('width','250px');
		$('#menuPrincipal li a').css('width','250px');
		$('#imgDashboard').removeAttr('style')
		$('#imgDashboard').css('float','right');
		$('#imgModel').removeAttr('style')
		$('#imgModel').css('float','right');
		$('#menuPrincipal').css('margin-top','10px');
		menuExpandido=true;
	}
	resizeContentMap()
}

/**
***  verfica se o estado do menu e da aba com o gráfico
***  para decidir qual o tamanho deve ser o mapa, bem como sua margem
**/
function resizeContentMap(){
	if(menuExpandido && (chartExpandido || filterExpandido)){
		$('.middle').css("width","calc(60% - 270px)");
		$('.middle').css("margin-left","250px");
		$('#mapDashboard').css("max-width","91%");
	}else{
		if(menuExpandido){
			$('.middle').css("width","calc(100% - 270px)");
			$('.middle').css("margin-left","250px");
			$('#mapDashboard').css("max-width","91%");
		}else if((chartExpandido || filterExpandido)){
			$('.middle').css("width","calc(60% - 60px)");
			$('.middle').css("margin-left","40px");
			$('#mapDashboard').css("max-width","96%");
		}else{
			$('.middle').css("width","calc(100% - 60px)");
			$('.middle').css("margin-left","40px");
			$('#mapDashboard').css("max-width", "76%");
		}
	}
}

/**
*** Expandi e contrai as que contém o mapa.
**/
var expandMapDashboard = true;
function dashboardMapControl(){
	if(expandMapDashboard){
		$("#map-content").slideDown();
		$("#dashboardExpandControl").hide();
		$("#dashboardCollapseControl").show();
		expandMapDashboard = false;
	}else{
		$("#map-content").slideUp();
		$("#dashboardExpandControl").show();
		$("#dashboardCollapseControl").hide();
		expandMapDashboard = true;
	}
}
