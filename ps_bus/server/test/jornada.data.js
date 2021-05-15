'use strict';

const util = require('../app/tools/util');
// returna jornada para teste
let abastecimentoMesmoVeiculo = [
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 7,
			"odometro": 507788,
			"matriculaMotorista": 8922,
			"numeroCarro": 40412
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 25.5,
			"odometro": 161852,
			"matriculaMotorista": 8916,
			"numeroCarro": 44431
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 39.5,
			"odometro": 507789,
			"matriculaMotorista": 8897,
			"numeroCarro": 40412
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 80,
			"odometro": 27141,
			"matriculaMotorista": 6812,
			"numeroCarro": 27141
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 50.5,
			"odometro": 465614,
			"matriculaMotorista": 8735,
			"numeroCarro": 11115
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 65.7,
			"odometro": 457949,
			"matriculaMotorista": 8735,
			"numeroCarro": 11113
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 152.7,
			"odometro": 507790,
			"matriculaMotorista": 8675,
			"numeroCarro": 40412
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 47.1,
			"odometro": 140824,
			"matriculaMotorista": 8891,
			"numeroCarro": 44430
		}
	];

let abastecimentos = [
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 7,
			"odometro": 507788,
			"matriculaMotorista": 8922,
			"numeroCarro": 40412
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 25.5,
			"odometro": 161852,
			"matriculaMotorista": 8916,
			"numeroCarro": 44431
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 39.5,
			"odometro": 146561,
			"matriculaMotorista": 8897,
			"numeroCarro": 44432
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 80,
			"odometro": 27141,
			"matriculaMotorista": 6812,
			"numeroCarro": 27141
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 50.5,
			"odometro": 465614,
			"matriculaMotorista": 8735,
			"numeroCarro": 11115
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 65.7,
			"odometro": 457949,
			"matriculaMotorista": 8735,
			"numeroCarro": 11113
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 152.7,
			"odometro": 192548,
			"matriculaMotorista": 8675,
			"numeroCarro": 25219
		},
		{
			"tipo_combustivel": "0001",
			"tanque": "1",
			"bomba": "1",
			"garagem": "1",
			"time": util.getYesterdayDate(),
			"combustivel": 47.1,
			"odometro": 140824,
			"matriculaMotorista": 8891,
			"numeroCarro": 44430
		}
	];

let jornada = {
	"enviada": false,
	"abastecimento": abastecimentos,
	"inicio": {
		"oleoMotor": 0,
		"matriculaBombeiro": 8172,
		"posicaoRegistroBomba": 65397,
		"data": util.getYesterdayDate(),
		"medicaoVara": 79
	},
	"fim": {
		"data": util.getDatePlusOneHour(util.getYesterdayDate()),
		"oleoMotor": 1,
		"posicaoRegistroBomba": 71318,
		"medicaoVara": 74
	}
};

let jornadaMesmoVeiculo = {
	"enviada": false,
	"abastecimento": abastecimentoMesmoVeiculo,
	"inicio": {
		"oleoMotor": 0,
		"matriculaBombeiro": 8172,
		"posicaoRegistroBomba": 65397,
		"data": util.getYesterdayDate(),
		"medicaoVara": 79
	},
	"fim": {
		"data": util.getDatePlusOneHour(util.getYesterdayDate()),
		"oleoMotor": 1,
		"posicaoRegistroBomba": 71318,
		"medicaoVara": 74
	}
};

module.exports = {jornada, abastecimentos, jornadaMesmoVeiculo};
