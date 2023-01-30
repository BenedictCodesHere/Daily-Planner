let stringHour = (moment().format('HH'));
let thisHour = Number(11);
console.log(thisHour);
console.log(typeof thisHour)
let now = moment();

function setTime() {
   now = moment();
   $('#currentDay').text(now);
}
setInterval(setTime, 1000);

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
};

console.log(parsedObject);


$('.hour').css({'justify-content': 'flex-end', 'align-items': 'center'});

$('.button-box').css('padding', '0px');
$('.saveBtn').css({'width': '100%', 'height': '100%', 'border':'none', 'margin':'0', 'padding': '0'});
$('i').css('font-size', '25px');

for (let i = 9; i < 17; i++) {
   console.log($('.form-control'));
   $('.form-control').eq(i - 9).text(parsedObject[i]);
   $('.time-block').eq(0).clone().appendTo('#time-block-container');
   $('.time-block').first().addClass('past');
   var newBlock = $('.time-block').last();
   newBlock.attr('data-number', i+1);
   newBlock.children().first().text(`${i + 1}:00`)
   newBlock.children().eq(1).addClass('past');

   if (i == 16) {
      $('.form-control').eq(8).text(parsedObject[17]);
   };
};

var presentHour = $('.time-block').filter(function(){
   return $(this).data("number") == thisHour;
})

console.log(presentHour);
// var futureHour = $('.time-block').filter(function(){
//    if(Number($('.time-block').data('number')) > thisHour){
//       return $('.time-block').data("number");
//    }

// })
var futureHour = $('.time-block').filter(function(){
   return $(this).data("number") > thisHour;
})

 console.log(futureHour);


for (let index = 0; index < futureHour.length; index++) {

   var currentBox = futureHour[index];


   var futureBox = $(currentBox).children().eq(1);
   futureBox.removeClass('past');
   futureBox.children().eq(0).removeClass('past');
   futureBox.addClass('future');
   futureBox.children().eq(0).addClass('future');
   futureBox.children().eq(1).addClass('future');
  futureBox.children().addClass('future');
}

var presentBox = presentHour.children().eq(1);

presentBox.addClass('present');
presentBox.children().addClass('present');


console.log(presentHour);

console.log(presentBox.children())


$('.form-outline').on('mousedown', function(event){
    console.log(event.target);
    var brutal = event.target;
    console.log(brutal);
    if(event.target == presentBox[0] || event.target == presentBox.children()[0]) {
      console.log('just clicked me')
      $(this).find('textarea').focus();
      $(":focus").css('background-color', '#ff6961');
   } else if($(brutal).hasClass('future')) {
      console.log('future clickage');
      $(this).find('textarea').focus();
      $(":focus").css('background-color', '#77dd77');
   } else {
      $(this).find('textarea').focus().css('background-color','#d3d3d3');
      console.log('clicked');
   }


   }
);

const dataObject = parsedObject;


$('.saveBtn').on('click', function (event) {
   var clickedNumber = $(this).parent().parent().attr('data-number');
   console.log(clickedNumber);
   var textInput = $(this).parent().prev().children().val();


   let assignData = function(dataObjectParam, messageParam, clickedNumberParam) {

      for (const property in dataObjectParam) {
         if(property == clickedNumberParam) {
            dataObjectParam[property] = messageParam;
            console.log(`Here it is lads -  ${property}: ${dataObjectParam[property]}`);
          };
       };
   };

      assignData(dataObject, textInput, clickedNumber);
      console.log(dataObject);
      localStorage.setItem('dataObject', JSON.stringify(dataObject));
      retrievedObject = localStorage.getItem('dataObject');
      parsedObject = JSON.parse(retrievedObject);
      console.log(parsedObject);

});


