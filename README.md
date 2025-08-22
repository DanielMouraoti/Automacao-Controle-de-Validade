# 🛒 Sistema de Automação para Controle de Validade de Produtos

### 📄 Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de otimizar a gestão de estoque e reduzir o desperdício em ambientes de varejo, como supermercados. A solução é um sistema de automação simples, mas poderoso, que utiliza o Google Sheets e o Google Apps Script para monitorar automaticamente o estoque, fornecendo uma solução eficiente e visualmente intuitiva para a equipe.

O projeto elimina a necessidade de inspeção manual diária de centenas de itens, permitindo que a equipe se concentre apenas nos produtos que realmente precisam de atenção.

![Screenshot da Planilha]([Controle de Validade.png](https://github.com/DanielMouraoti/Automacao-Controle-de-Validade/blob/main/Controle%20de%20Validade.png))

### ✨ Funcionalidades

* **Verificação Diária Automática:** Um script é executado diariamente para verificar a validade de todos os itens cadastrados.
* **Status Dinâmico:** Atualiza automaticamente o status de cada produto para: **`OK`**, **`ALERTA - VENCIMENTO PRÓXIMO`** ou **`VENCIDO`**.
* **Alertas Visuais:** Usa formatação condicional para destacar visualmente os produtos em risco (amarelo) e os já vencidos (vermelho).
* **Redução de Perdas:** Permite que a equipe tome decisões proativas (ex: promoções) para vender produtos antes do vencimento, minimizando perdas financeiras.
* **Eficiência Operacional:** Libera a equipe de inspeções manuais, direcionando o foco para tarefas que exigem ação imediata.

### 🛠️ Tecnologias Utilizadas

* **Google Sheets:** Utilizado como o banco de dados e a interface principal para a equipe.
* **Google Apps Script (JavaScript):** Linguagem de programação para a lógica de automação.
* **Google Workspace Trigger:** Gatilho de automação que executa o script em um horário definido.

### ⚙️ Como Funciona

1.  A equipe de estoque insere os dados do produto (nome, data de validade) em uma planilha no Google Sheets.
2.  Um gatilho configurado executa a função `verificarValidade` no Google Apps Script, geralmente no início do dia de trabalho.
3.  O script calcula a diferença entre a data de validade e a data atual.
4.  Com base nesse cálculo, a coluna de `Status` é atualizada.
5.  A formatação condicional da planilha muda a cor da linha, criando um painel de controle visual.

### 💻 Código do Script

```javascript
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
