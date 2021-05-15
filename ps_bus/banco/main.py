import json

f = open('carros_do_banco_oracle', 'r')
string =  ""
for line in f:
	carro={}
	line = line.replace("\n","")
	arrayOnibus = line.split(",")
	carro["placa"] = arrayOnibus[0]
	carro["capacidade_tanque"] = arrayOnibus[1]
	carro["prefixo"] = arrayOnibus[2][2:]
	carro["modelo_carroceria"] = arrayOnibus[3]
	carro["marca_carroceria"] = arrayOnibus[4]
	carro["modelo_chassi"] = arrayOnibus[5]
	carro["marca_chassi"] = arrayOnibus[6]
	string = string + ", \n" + json.dumps(carro)

f = open('json_carro.json', 'w')
f.write(string)

f = open('funcionario_empresa', 'r')
string =  ""
for line in f:
	funcionario={}
	line = line.replace("\n","")
	arrayFuncionario = line.split(",")
	funcionario["matricula"] = arrayFuncionario[0]
	funcionario["nome_completo"] = arrayFuncionario[1].strip()
	funcionario["data_admissao"] = arrayFuncionario[2]
	string = string + ", \n" + json.dumps(funcionario)

f = open('json_funcionario.json', 'w')
f.write(string)

