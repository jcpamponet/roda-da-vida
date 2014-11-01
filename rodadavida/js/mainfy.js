var $fn = new Globals();
var $test = new Test();
var listValues = [];
var flag = false;

$(document).ready(function(e){
    $('#btn-start').bind('click',function iniciarTeste(e){      
        $fn.start();
        $("#left-box").css('background','white');
        $fn.getAudio();
        $( "#init-box" ).toggle("explode");
        $("#box-responsive").fadeIn();
        //$fn.getContent('#left-box','main.html');
         var data = $test.getList();
         $fn.showQuestions(data[0],false,e,false);                                
        $fn.onClickFunction();
        e.preventDefault();
    });
    
    $('table tr td input').on('blur',function(){
            var valor = $(this).val();
            
            if(parseInt(valor) > 10){
                $(this).focus();
                return alert('O valor deve ser menor ou igual a 10!');
            }else{
                if(valor != ""){
                    if(!isNumeric(valor)){
                        $(this).focus();
                        return alert('Informe apenas números!');
                    }  
                }  
            }    
        
        });
        
        function isNumeric(str) {   
            var er = /^[0-9]+$/;   
            return (er.test(str));
        } 
});

function Test() {
	var list = [];
	var next = 0;
	var previews = 0;
	var indexNext = 0;
	var data = [];

	this.getIndexNext = function() {
		return this.indexNext;
	};

	this.setIndexNext = function(index) {
		this.indexNext = indexNext;
	};

	this.getList = function() {
		return this.list;
	};

	this.setList = function(list) {
		this.list = list;
	};

	this.getData = function() {
		return this.data;
	};

	this.setData = function(data) {
		this.data = data;
	};

	this.getNext = function(next) {
		return this.list[next];
	};

	this.getPreviews = function(previews) {
		return this.list[previews];
	};

}

function Globals() {
	this.start = function() {
        var list = [];
        if (questions != "") {
            $.each(questions, function(i, value) {
				list.push(value);
            });
        }
        $test.setList(list);
	};

	this.getContent = function(container, url) {
		$.get(url).success(function(data) {
			return $(container).html(data);
		}).error(function(err) {
			return alert("Erro na conexão! Por favor tente novamente.");
		});
	};

	this.popIt = function() {
		$('#alavanca').html($('#areaAlavanca').val());
		$('#acao01').html($('#acao1').val());
		$('#data01').html($('#data1').val());
		$('#estrategia01').html($('#estrategia1').val());
		$('#acao02').html($('#acao2').val());
		$('#data02').html($('#data2').val());
		$('#estrategia02').html($('#estrategia2').val());
		$('#acao03').html($('#acao3').val());
		$('#data03').html($('#data3').val());
		$('#estrategia03').html($('#estrategia3').val());
	};

	this.setTransition = function(target, val, speed) {
		$(target).animate({
			opacity : val
		}, speed);
	};

	this.getAudio = function() {
		return document.getElementById('transition').play();
	};

	this.showQuestions = function(data, reset, e, indexNext) {
		var value = 0;

		if (data != undefined) {
			if (reset) {
				$fn.setTransition('.id-1', 0, 0);
				$fn.setTransition('.question', 0, 0);
			}
			for (var i = 0; i < data.length; i++) {
				$('#title').html(data[i].title);
				if (i > 0 && i <= (data.length - 1)) {
					$('#id-' + i).html(data[i].id);
					$('#question-' + i).html(data[i].question);
				}

				if (e.currentTarget.id != "btn-start" && i <= 4) {
					value = value + parseInt($('#resul-' + i).val());
				}
			}
			$fn.setTransition('.id-1', 1, 700);
			$fn.setTransition('.question', 1, 70);

			if (e.currentTarget.id == "btn-start") {
				return false;
			}
		}
		var index = 0;
		var array = [ 'familia', 'ramorosa', 'vidaSocial', 'espiritualidade',
				'hobbies', 'plenitude', 'contribuicao', 'recursos',
				'realizacao', 'saude', 'equilibrio' ];
		if (indexNext > 1) {
			index = indexNext - 1;
		}

		value = value / (i - 1);

		listValues.push(isNaN(value) ? 0 : value);

		$('#' + array[index]).attr('data-value', listValues);

		if (indexNext >= 12) {
			indexNext++;
			$fn.showChart(index, listValues);
		}
		$fn.clear();
	};

	this.showChart = function(index, values) {
		$('#left-box').hide();
		$('#right-box').show()
		google.setOnLoadCallback($fn.draw(values));
		$('#right-box')
				.append(
						'<a style="position: relative;top: -50px;left: 370px;" class="btn btn-primary" id="btnTerminar" href="#">CONTINUAR <span class="glyphicon glyphicon-arrow-right"></span></a>');
		this.onClickFunction();
	};

	this.draw = function draw(values) {
		var lista = [ [ 'Task', 'Média' ], [ 'Família', parseInt(values[0]) ],
				[ 'R.Amorosa', parseInt(values[1]) ],
				[ 'Vida Social', parseInt(values[2]) ],
				[ 'Espiritualidade', parseInt(values[3]) ],
				[ 'Hobbies e Diversão', parseInt(values[4]) ],
				[ 'Plenitude e Felicidade', parseInt(values[5]) ],
				[ 'Contribuição Social', parseInt(values[6]) ],
				[ 'Recursos Financeiros', parseInt(values[7]) ],
				[ 'Realização e Propozito', parseInt(values[8]) ],
				[ 'Saúde e Disposição', parseInt(values[9]) ],
				[ 'Equilíbrio Emocional', parseInt(values[10]) ],
				[ 'Des. Intelectual', parseInt(values[11]) ] ];

		var data = google.visualization.arrayToDataTable(lista);

		var options = {
			title : 'Está é a representação atual da sua vida em cada uma das áreas.',
			pieSliceText : "value",
			chartArea : {
				width : 450
			}

		};

		var chart = new google.visualization.PieChart(document
				.getElementById('right-box'));
		chart.draw(data, options);
		$('.col-lg-offset-2').css('margin-left', '0');
        $('#left-box').html('<center style="margin-top:190px;"><img style="width:90px;height:90px" src="http://img696.imageshack.us/img696/5867/carregando2.gif"/></center>');
	};

	this.clear = function() {
		return $('.clean').val('');
	};
    
    this.capitalize = function capitalize(str){
        if(str.length >= 1 ){
            return str[0].toUpperCase() + str.slice(1);
        }
    };

	this.onClickFunction = function onClickFunction() {
		$('#btn-next').bind(
				'click',
				function next(e) {
					$fn.getAudio();

					$('#btn-previews').fadeIn();
					var indexNext = parseInt($('#btn-next').attr("data-next"));
					$('#left-box').css('background', '#fff');

					var data = $test.getNext(indexNext);
					$('#btn-next').attr("data-next", indexNext + 1);
					$('#btn-previews').attr("data-previews", indexNext - 1);
				    $fn.showQuestions(data, true, e,indexNext);
				    $test.setIndexNext(indexNext);
				});

		$('#btn-previews').bind(
				'click',
				function next(e) {
					$fn.getAudio();
					var indexPreviews = parseInt($('#btn-previews').attr("data-previews"));
					var data = $test.getPreviews(indexPreviews);
					$('#btn-next').attr("data-next", indexPreviews + 1);
					$('#btn-previews').attr("data-previews",
							(indexPreviews - 1) > 0 ? (indexPreviews - 1) : 0);
					$fn.showQuestions(data, true, e, false);

					if (indexPreviews == 0) {
						$('#right-box').hide('fast');
						$('#btn-previews').fadeOut();
						$("#content").animate({
							width : '573px'
						}, {
							duration : 1000,
							complete : function() {
								$fn.clear();
								// google.setOnLoadCallback($fn.draw());
							}
						});
					}

				});

		$('#acoes')
				.bind(
						'click',
						function(e) {
							if ($('#areaAlavanca').val() == ""
									|| isNumeric($('#areaAlavanca').val())) {
								//$('#areaAlavanca').focus();
								return alert('Por favor infome a área de alavanca para continuar!');
							}

							$('#panel-acoes').fadeIn();
							$(this).hide();
							$('#continue').fadeIn();
							$('#areaAlavanca').prop('disabled', true);
						});

		$('#continue').bind('click', function(e) {
			$('#panel-acoes').hide();
			$('#panel-end').hide();
			$('#panel-result').fadeIn();
			$('#continue').hide();
            $('#right-hide').hide();

			$fn.popIt();
		});

		$('#btnTerminar').bind('click', function() {
			$('#left-box').show();
			$fn.getContent('#left-box', 'end.html');
            $('#right-box').hide();
		});
         $('#alavanca').val();
		$('#formEmail').bind(
				'submit',
				function(e) {
					var email = $('#email').val();
					var mensagem = "<p><h3><strong>Área de Alavanca: </strong></h3>" 
                            + $fn.capitalize($('#areaAlavanca').val()) +"</p><p><strong>Ação: </strong> " 
                            + $fn.capitalize($('#acao01').html()) + "<br>"
							+ "<strong>Data: </strong>" + $('#data01').html() + "<br>"
							+ "<strong>Estratégia: </strong>" + $fn.capitalize($('#estrategia01').html()) + "</p>"
							+ "<p><strong>Ação: </strong>" + $fn.capitalize($('#acao02').html()) + "<br>"
                            + "<strong>Data: </strong>" + $('#data02').html() + "<br>"
							+ "<strong>Estratégia: </strong>" + $fn.capitalize($('#estrategia02').html()) + "</p>"  
							+ "<p><strong>Ação: </strong>" + $fn.capitalize($('#acao03').html()) + "</br>"
                            + "<strong>Data: </strong>" + $('#data03').html() + "<br>"
							+ "<strong>Estratégia: </strong>" + $fn.capitalize($('#estrategia03').html()) + "</p>";

					var urlData = "&email=" + email + "&mensagem=" + mensagem;

					$.ajax({
						type : "POST", /* tipo post */
						url : "../enviarEmail.php", /* endereço do script PHP */
						async : true,
						data : urlData,
                        success : function(data){     
                            $('#sucessoEmail').fadeIn();
                            setTimeout(function(){window.location.href = 'http://rodadavida.gestaopessoal.net';}, 1300);
                        },
						error : function(err) { /* error */
							console.log(err + ' Erro ao enviar email!');

						}
					});
					e.preventDefault();
				});
	}
}

var questions = {
    "0" : [{"position": 0, "title" : "FAMÍLIA"},
        {"id": 1, "question" : "Tempo dedicado aos famíliares."},
        {"id": 2, "question" : "Momentos agradáveís e amistosos com a família."},
        {"id": 3, "question" : "Diálogo e boa vontade para resolver conflitos."},
        {"id": 4, "question" : "Grau de abertura para falar e ouvir."},
        {"id": 5, "question" : "Confiança e apoio mútuos."}],
    "1" : [{"position": 1, "title" : "RELAÇÃO AMOROSA"},
        {"id": 1, "question" : "Tempo dedicado ao parceiro(a)."},
        {"id": 2, "question" : "Grau de abertura para falar e ouvir."},
        {"id": 3, "question" : "Satisfação com as relações sexuais."},
        {"id": 4, "question" : "Criação de momentos românticos."},
        {"id": 5, "question" : "Compartilhamento de sonos e expectativas de vida."}],
    "2" : [{"position": 2, "title" : "VIDA SOCIAL"},
        {"id": 1, "question" : "Festas e reuniões de amigos(periodicidade)."},
        {"id": 2, "question" : "Esforço para manter contato com amigos e colegas."},
        {"id": 3, "question" : "Qualidade de amigos que encontra regularmente."},
        {"id": 4, "question" : "Qualidade dos encontros com amigos."},
        {"id": 5, "question" : "Participação em atividades em grupo."}],
    "3" : [{"position": 3, "title" : "ESPIRITUALIDADE"},
        {"id": 1, "question" : "Paz interior."},
        {"id": 2, "question" : "Coerência de valores.(faz o mesmo que prega)."},
        {"id": 3, "question" : "Força e equilíbrio internos."},
        {"id": 4, "question" : "Tempo para si.(introspecção, meditação, oração)."},
        {"id": 5, "question" : "Religiosidade."}],
    "4" : [{"position": 4, "title" : "HOBBIES E DIVERSÃO"},
        {"id": 1, "question" : "Qualidade do tempo dedicado ao hobbie e lazer."},
        {"id": 2, "question" : "Diversidade de formas para relaxar e se divertir."},
        {"id": 3, "question" : "Prazer que as atividades proporcionam."},
        {"id": 4, "question" : "Periodicidade das atividades de hobbie e lazer."},
        {"id": 5, "question" : "Relaxamento ou revigoramento após as atividades."}],
    "5" : [{"position": 5, "title" : "PLENITUDE E FELICIDADE"},
        {"id": 1, "question" : "Otimismo em relação ao futuro."},
        {"id": 2, "question" : "Satisfação com a vida atual."},
        {"id": 3, "question" : "Frequência com que sorri."},
        {"id": 4, "question" : "Confiança em você mesmo(a)."},
        {"id": 5, "question" : "Sentimento de orgulho pelas conquistas do passado."}],
    "6" : [{"position": 6, "title" : "CONTRIBUIÇÃO SOCIAL"},
        {"id": 1, "question" : "Desejo sincero pela prosperidade dos outros."},
        {"id": 2, "question" : "Cordialidade com as pessoas em geral."},
        {"id": 3, "question" : "Colocar-se a disposição para ajudar alguém."},
        {"id": 4, "question" : "Dedicação a ensinar o que sabe a outra pessoa."},
        {"id": 5, "question" : "Trabalhos voluntários ou doações."}],
    "7" : [{"position": 7, "title" : "RECURSOS FINANCEIROS"},
        {"id": 1, "question" : "Satisfação  com os rendimentos financeiros."},
        {"id": 2, "question" : "Equilibrio entre ganhos e gastos."},
        {"id": 3, "question" : "Reservas para possíveis crises."},
        {"id": 4, "question" : "Satisfação com os investimentos realizados no último ano."},
        {"id": 5, "question" : "Oportunidades para o aumento da renda."}],
    "8" :[{"position": 8, "title" : "REALIZAÇÃO E PROPÓSITO"},
        {"id": 1, "question" : "Auto-Imagem Profissional Positiva."},
        {"id": 2, "question" : "Satisfação com a carreira."},
        {"id": 3, "question" : "Oportunidade de crescimento profissional."},
        {"id": 4, "question" : "Atividade profissional congruente com crenças e valores."},
        {"id": 5, "question" : "Ambiente de trabalho proporciona desafios."}],
    "9" : [{"position": 9, "title" : "SAÚDE E DISPOSIÇÃO"},
        {"id": 1, "question" : "Alimentação equilibrada."},
        {"id": 2, "question" : "Exercícios físicos regulares."},
        {"id": 3, "question" : "Horas de sono diárias."},
        {"id": 4, "question" : "Controle do nível de stress."},
        {"id": 5, "question" : "Check-up e exames de rotina."}],
    "10" : [{"position": 10, "title" : "EQUILIBRIO EMOCIONAL"},
        {"id": 1, "question" : "Manter foco em momentos difíceis."},
        {"id": 2, "question" : "Controle das emoções sob pressão e stress."},
        {"id": 3, "question" : "Reações emocionais proporcionais aos eventos que a geraram."},
        {"id": 4, "question" : "Expressar opniões de forma clara e cordial."},
        {"id": 5, "question" : "Controle da frustação quando as expectativas não são atingidas."}],
    "11" : [{"position": 11, "title" : "DESENVOLVIMENTO INTELECTUAL"},
        {"id": 1, "question" : "Participação em cursos e treinamentos."},
        {"id": 2, "question" : "Leitura de livros e artigos sobre temas diversos."},
        {"id": 3, "question" : "Participação em atividades novas e não habituais."},
        {"id": 4, "question" : "Manter-se informado(jornais,revistas,fóruns,blogs)."},
        {"id": 5, "question" : "Participação em conversas com assuntos diferentes dos habituais."}]
};
