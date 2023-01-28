

$('.hour').css({'justify-content': 'flex-end', 'align-items': 'center'});

$('.button-box').css('padding', '0px')
$('.saveBtn').css({'width': '100%', 'height': '100%', 'border':'none', 'margin':'0', 'padding': '0'});
$('i').css('font-size', '25px');

for (let i = 9; i < 17; i++) {
   $('.time-block').eq(0).clone().appendTo('#time-block-container');
   var newBlock = $('.time-block').last()
   newBlock.attr('data-number', i+1);
   newBlock.children().first().text(`${i + 1}:00`)
   console.log(newBlock.children().first().text)
   console.log('Newblock.first is:' + newBlock.first());
   console.log($('.time-block'));
   console.log($(newBlock).attr('data-number'));
   //newBlock.first().text(i)
}

$('.form-outline').on('click', function(event){
    event.preventDefault();
    $(this).find('textarea').focus().css({'color':'white', 'background-color':'#d3d3d3'});
    console.log('clicked')
    }
);