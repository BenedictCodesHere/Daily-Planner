let thisHour = moment().format('HH');
console.log(thisHour);

let parsedObject = {
   9:"",
   10:"",
   11:"",
   12:"",
   13:"",
   14:"",
   15:"",
   16:"",
   17:""
};

let retrievedObject = localStorage.getItem('dataObject');
if (retrievedObject != null) {
   parsedObject = JSON.parse(retrievedObject);
}


$('.hour').css({'justify-content': 'flex-end', 'align-items': 'center'});

$('.button-box').css('padding', '0px')
$('.saveBtn').css({'width': '100%', 'height': '100%', 'border':'none', 'margin':'0', 'padding': '0'});
$('i').css('font-size', '25px');

for (let i = 9; i < 20; i++) {
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

var presentHour = $('.time-block').filter(function(){
   return $(this).data("number") == thisHour;
})

var futureHour = $('.time-block').filter(function(){
   return $(this).data("number") > thisHour;
})
console.log(futureHour);

for (let index = 0; index < futureHour.length; index++) {

   var misanthrope = futureHour[index];

   
   var futureBoxes = $(misanthrope).children().eq(1)

   console.log(futureBoxes)
   futureBoxes.addClass('future')
   futureBoxes.children().addClass('future');
   //misanthrope.children().eq(1);
   //.children().eq(1).addClass('future');
  // futureBox.children().addClass('future');
}

var presentBox = presentHour.children().eq(1);

presentBox.addClass('present');
presentBox.children().addClass('present');


console.log(presentHour);

console.log(presentBox.children())


$('.form-outline').on('click', function(event){
    event.preventDefault();
    console.log(event.target);
    console.log(presentBox[0]);
    console.log(presentBox.children()[0]);
    if(event.target == presentBox[0] || event.target == presentBox.children()[0]) {
      console.log('just clicked me')
      $(this).find('textarea').focus();
      $(":focus").css('background-color', '#ff6961');
   } else if(event.target == futureBoxes || event.target == futureBoxes.children()[0]) {
      console.log('future clickage')
   } else {
      $(this).find('textarea').focus().css({'color':'white', 'background-color':'#d3d3d3'});
      console.log('clicked')
   }
   
   
   }
);


const dataObject = parsedObject;







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


