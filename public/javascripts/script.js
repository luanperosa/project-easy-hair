document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.datepicker');
  let instances = M.Datepicker.init(elems, {
    format: 'dd/mm/yyyy',
    showClearBtn: true,
    
  });
  
});

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.timepicker');
  let instances = M.Timepicker.init(elems, {
    format: 'HH/MM/ss',
    showClearBtn: true,
    
  });
  
});


const calendar = document.getElementById('calendar');

calendar.onchange = (calend) => {
  const { value } = calend.target;
  console.log(value);
  
}

const hourService = document.getElementById('hour-service');

hourService.onchange = (hour) => {
  const { value } = hour.target;
  console.log(value);
  
}


// $('.datepicker').pickadate({
//   monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
//   monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
//   weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
//   weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
//   today: 'Hoje',
//   clear: 'Limpar',
//   close: 'Pronto',
//   labelMonthNext: 'Próximo mês',
//   labelMonthPrev: 'Mês anterior',
//   labelMonthSelect: 'Selecione um mês',
//   labelYearSelect: 'Selecione um ano',
//   selectMonths: true, 
//   selectYears: 15 
//   });




