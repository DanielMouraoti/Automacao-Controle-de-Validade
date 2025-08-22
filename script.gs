// Função principal que verifica a validade dos produtos
function verificarValidade() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  var values = range.getValues();

  var today = new Date();
  today.setHours(0, 0, 0, 0); 

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var dataValidade = row[1];

    if (dataValidade) {
      // Cria uma data a partir de um string, garantindo o formato correto (dd/MM/yyyy)
      var dataPartes = dataValidade.toString().split("/");
      var dataValidadeCorreta = new Date(dataPartes[2], dataPartes[1] - 1, dataPartes[0]);
      
      var oneDay = 1000 * 60 * 60 * 24;
      var daysDiff = Math.ceil((dataValidadeCorreta.getTime() - today.getTime()) / oneDay);
      
      var status;
      if (daysDiff < 0) {
        status = "VENCIDO";
      } else if (daysDiff <= 7) {
        status = "ALERTA - VENCIMENTO PRÓXIMO";
      } else {
        status = "OK";
      }

      sheet.getRange(i + 2, 3).setValue(status);
    }
  }
}
