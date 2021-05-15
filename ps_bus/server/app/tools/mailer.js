// mailer.js
// Implements the mailing functions for the project
const nodemailer = require('nodemailer');
const Workload = require('../model/workload.model');
const schedule = require('node-schedule');
const util = require('./util');
const Garagem = require('../model/garage.model');

/**
 * Export the mail methods
 * @type {Object}
 */
module.exports = {
  sendEmail,
  abastecimentoCron,
};

/**
 * Send email with destination, subject and content from the parameters
 * @method sendEmail
 * @param  {String}  [to="nti@viacaoprogresso.com.br"]    Email destination
 * @param  {String}  [subject="Fechamento Abastecimento"] Email subject
 * @param  {String}  [text=""]                            The email content
 */
function sendEmail( mailOptions = {
                      to: "nti@viacaoprogresso.com.br",
                      subject: "Fechamento Abastecimento",
                    }, successCallback, failureCallback) {

  let address = 'smtps://totem%40prosolutionsbi.com.br:06F0d6$55vW5@smtp.kinghost.net';
  let transporter = nodemailer.createTransport(address);

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        failureCallback();
        console.log(error);
      }
      else {
        successCallback();
        console.log('Message sent: ' + info.response);
      }
  });
};

/**
 * Recebe um Array de jornadas e salva os abastecimentos em seus respectivos
 * arquivos
 * @method salvaJornadasEmArquivos
 * @param  {Array}                jornadas Array contendo as jornadas a serem
 *                                         salvas
 * @return {Object}                         Um objeto contendo uma coleção de
 *                                             arquivos a serem anexados
 */
function salvaJornadasEmArquivos(jornadas) {
  let hojeFormatoBrasileiroSemBarras = util.formatDateToBrazilian().replace(/\//g,'-');
  let workloadTexto = '';
  let filename = `jornadas_${hojeFormatoBrasileiroSemBarras}.txt`;
  for (let workload of workloads) {

    let workloadSerialized = workload.serialize();
    if (workloadSerialized !== '') {
      // recupera o codigo da Garagem desta jornada
      let garageCode = 1;
      if (workload.refuel[0]) {
        garageCode = workload.refuel[0].garagem;
      }
      else if(workload.oleoMotor[0]) {
        codigoGaragem = workload.oil[0].garagem;
      }
      // append jornada to the file
      util.appendTextToFile(jornadaSerialized, filename);
    }
  }

  util.saveFileObject(filename);

  File
    .where('sent').eq(false)
    .exec( (err, files) => {
      for(let file of files) {
        let attachment = {path: file.path+file+name};
        let abastecimentoDate = util.formatDateToBrazilian(file.createdAt);
        try {
          // coloca o caminho para o arquivo no array de nomes
          let mailOptions = {
            from: 'totem@prosolutionsbi.com.br',
            to: 'nti@viacaoprogresso.com.br',
            bcc: 'victorp@r7.com',
            subject: `Fechamento Abastecimento ${abastecimentoDate}`,
            text: 'Segue em anexo o arquivo contendo os abastecimentos do dia anterior',
            attachments: attachment,
          };
          sendEmail(mailOptions,
            () => {
              file.sent = true;
              file.save();
            },
            () => {
              file.sent = false;
              file.save();
            });
        }
        catch(err) {
          console.error(err);
        }
      }
    });
}

/**
 * Setup and initiate a cron job to send the abastecimento email with the files
 * attached every day at 6 a.m.
 * @method abastecimentoCron
 */
function abastecimentoCron() {
  let job = schedule.scheduleJob('0 0 6 * * *', function() {
    Jornada.jornadasParaExportacao((err, jornadas) => {
      salvaJornadasEmArquivos(jornadas);
    });
  });
}
