/* Arquivo responsável paraser um helper para datas */

function dataToString(data){
    var dt = data.split('T')[0].split('-');
    var hr = data.split('T')[1].split(':');
    return dt[2] + '/' + dt[1] + '/' + dt[0] + ' às ' + hr[0] + ':' + hr[1];
  }
  
  function dataToInput(data){
    var dt = data.split('T')[0].split('-');
    return dt[0] + '-' + dt[1] + '-' + dt[2];
  }