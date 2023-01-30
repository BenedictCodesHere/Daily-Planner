

// key points to look for:
/*
   1. The CSS classes "past", "present", and "future", are coloring the 
   div tags which have the class of "form-outline", and their textarea children
   are also being styled by this class.

   2. The default behaviour of the textareas was causing issues - upon mousedown, they
    would turn white. I have written a section of code which fixes this.

   3. I have attempted to leave the HTML and CSS as reasonably barebones as possible,
   so as to demonstrate my ability to manipulate the DOM using JQuery.
   I appreciate that this makes for more dense, less elegant JavaScript.

   4.
*/

// CSS Styling in Jquery
$('.hour').css({'justify-content': 'flex-end', 'align-items': 'center'});
$('.button-box').css('padding', '0px');
$('.saveBtn').css({'width': '100%', 'height': '100%', 'border':'none', 'margin':'0', 'padding': '0'});
$('i').css('font-size', '25px');

// Initialising Variables
let stringHour = (moment().format('HH'));
let thisHour = Number(15);
let now = moment();

// Function to run every second. Displaying current time.
function setTime() {
   now = moment();
   $('#currentDay').text(now);
};

// Text refreshes every second.
setInterval(setTime, 1000);

// Defining the object that will be parsed from localStorage later on.
// The keys are the relevant hours in the working day, 9am to 5pm.
// Empty strings are chosen simply as placeholder values.
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

// This section retrieves workdayObject from localStorage. 
// If workdayObject is not a null value,
// then parsedObject is assigned the value of workdayObject.
// The value of workdayObject becomes apparent further down the page.
let retrievedObject = localStorage.getItem('workdayObject');
if (retrievedObject != null) {
   parsedObject = JSON.parse(retrievedObject);
};

console.log(parsedObject);



// This for loop edits the text of the textarea element, to be filled with 
// whatever the value of parsedObject is for the relevant hour.
// The default is the empty string placeholder. The alternative is
// whatever the value is that has been assigned to the relevant key
// upon retrieving the workdayObject value from localStorage.
for (let i = 9; i < 17; i++) {
   console.log($('.form-control'));
   $('.form-control').eq(i - 9).text(parsedObject[i]);

   // the next step is to clone the first time block and append the
   // newly created time block to the end of the time block container.
   $('.time-block').eq(0).clone().appendTo('#time-block-container');

   // this line is assigns the initial time block the class "past".
   $('.time-block').first().addClass('past');

   // this selects the most recently created time block, and
   // assigns it the relevant data-number equivalent to its hour.
   var newBlock = $('.time-block').last();
   newBlock.attr('data-number', i+1);

   // this targets the first child div, and assigns it the relevant 
   // text corresponding to its hour.
   newBlock.children().first().text(`${i + 1}:00`);

   // this highlights the middle div (the colored box) and assigns it the 
   // "past" class.
   newBlock.children().eq(1).addClass('past');

   // this condition fixes a bug where, because the loop in fact terminates upon
   // i reaching 17 (i = 17), then the final time block's value was not being 
   //updated with the relevant key [17] from the parsedObject. 
   //This part hard-codes it so that the final time block gets updated
   // with the relevant stored text that has been saved into localStorage.
   if (i == 16) {
      $('.form-control').eq(8).text(parsedObject[17]);
   };
};
// end of for loop

// this section filters the time blocks by whatever the current hour, thisHour, is.
// presentHour is assigned the value of whichever time block is the current hour.
var presentHour = $('.time-block').filter(function(){
   return $(this).data("number") == thisHour;
})

console.log(presentHour);

// this section similarly filters the time blocks, and returns a Jquery collection of 
// time blocks which have a data-number greater than the current hour.
var futureHour = $('.time-block').filter(function(){
   return $(this).data("number") > thisHour;
})

 console.log(futureHour);


// this for loop removes the class of "past"
for (let index = 0; index < futureHour.length; index++) {

   // the currentBox is simply targeting the relevant time block that was returned
   // in the Jquery collection assigned to futureHour.
   var currentBox = futureHour[index];

   // futureBox targets the "form-outline" div of the relevant timeblock.
   var futureBox = $(currentBox).children().eq(1);

   // and here we remove the class of "past", replacing it with the class of "future"
   // from both the "form-outline" div, and its child, the textarea.
   futureBox.removeClass('past');
   futureBox.children().eq(0).removeClass('past');
   futureBox.addClass('future');
   futureBox.children().eq(0).addClass('future');
   futureBox.children().addClass('future');
}


var presentBox = presentHour.children().eq(1);

// this section simply adds the "present" class to the relevant div and textarea.
presentBox.addClass('present');
presentBox.removeClass('past');
presentBox.children().addClass('present');
presentBox.children().removeClass('past');


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
      };
   });

const workdayObject = parsedObject;


$('.saveBtn').on('click', function (event) {
   var clickedNumber = $(this).parent().parent().attr('data-number');
   console.log(clickedNumber);
   var textInput = $(this).parent().prev().children().val();


   let assignData = function(workdayObjectParam, messageParam, clickedNumberParam) {
      for (const property in workdayObjectParam) {
         if(property == clickedNumberParam) {
            workdayObjectParam[property] = messageParam;
            console.log(`Here it is lads -  ${property}: ${workdayObjectParam[property]}`);
          };
       };
   };

      assignData(workdayObject, textInput, clickedNumber);
      console.log(workdayObject);
      localStorage.setItem('workdayObject', JSON.stringify(workdayObject));
      retrievedObject = localStorage.getItem('workdayObject');
      parsedObject = JSON.parse(retrievedObject);
      console.log(parsedObject);
});


