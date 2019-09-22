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

