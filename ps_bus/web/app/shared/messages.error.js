"use strict";

export const emptyField = (field) => {
  return 'O campo ' + field + ' é obrigatório.';
}

export const datesNotEqual = () => {
  return 'As datas de abertura e encerramento devem ser iguais.';
}

export const earlierCloseTime = () => {
  return 'O horário de encerramento deve ser posterior ao de abertura.';
}

export const emptyArray = (field) => {
  return 'Adicione pelo menos um(a) ' + field + '.';
}
