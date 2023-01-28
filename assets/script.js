let retrievedObject = localStorage.getItem('dataObject');
let parsedObject = JSON.parse(retrievedObject);
console.log(parsedObject);

$('.hour').css({'justify-content': 'flex-end', 'align-items': 'center'});

$('.button-box').css('padding', '0px')
$('.saveBtn').css({'width': '100%', 'height': '100%', 'border':'none', 'margin':'0', 'padding': '0'});
$('i').css('font-size', '25px');

for (let i = 9; i < 17; i++) {
   $('.form-control').eq(i - 9).text(parsedObject[i])
   $('.time-block').eq(0).clone().appendTo('#time-block-container');
   var newBlock = $('.time-block').last()
   newBlock.attr('data-number', i+1);
   newBlock.children().first().text(`${i + 1}:00`)
   // newBlock.children().eq(1).children().text(parsedObject[i+1])
   // console.log(newBlock.children().first().text)
   // console.log('Newblock.first is:' + newBlock.first());
   // console.log($('.time-block'));
   // console.log($(newBlock).attr('data-number'));
   //newBlock.first().text(i)

}



$('.form-outline').on('click', function(event){
    event.preventDefault();
    $(this).find('textarea').focus().css({'color':'white', 'background-color':'#d3d3d3'});
    console.log('clicked')
    }
);


const dataObject = parsedObject







$('.saveBtn').on('click', function (event) {
   var clickedNumber = $(this).parent().parent().attr('data-number');
   console.log(clickedNumber);
   var textInput = $(this).parent().prev().children().val()


   let assignData = function(dataObjectParam, messageParam, clickedNumberParam) {
      
      for (const property in dataObjectParam) {
      // if(message == dataObjectParam[property])
         if(property == clickedNumberParam) {
            dataObjectParam[property] = messageParam;
            console.log(`Here it is lads -  ${property}: ${dataObjectParam[property]}`);
         }
   
         }
      }

      assignData(dataObject, textInput, clickedNumber);
      console.log(dataObject);
      localStorage.setItem('dataObject', JSON.stringify(dataObject));
      retrievedObject = localStorage.getItem('dataObject');
      parsedObject = JSON.parse(retrievedObject);
      console.log(parsedObject);
    
//    let SaveData = function(message, hour) {
//     this.message = message;
//     this.hour = hour;
//    }
//    console.log(textInput);
//    let freshSaveData = new SaveData(textInput, clickedNumber);
//    console.log(freshSaveData)
//    localStorage.setItem('dataObject', JSON.stringify(dataObject))

});


