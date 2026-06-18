document.addEventListener('DOMContentLoaded', function() {
    const movieCards = document.querySelectorAll('.movie-card');
    const seats = document.querySelectorAll('.seating-chart .seat:not(.occupied)');
    
    const countLabel = document.getElementById('count');
    const priceLabel = document.getElementById('total');
    
    const bookingForm = document.querySelector('form');
   
    let currentTicketPrice = 10; 
    let currentMovieName = "زومبي";

    console.log("نظام تحديد الأفلام والمقاعد التفاعلي جاهز! 🎬💰");

    function updateSelectedCountAndTotal() {
        const selectedSeatsCount = document.querySelectorAll('.seating-chart .seat.selected').length;
        
        const totalPrice = selectedSeatsCount * currentTicketPrice;

        if (countLabel) countLabel.innerText = selectedSeatsCount;
        if (priceLabel) priceLabel.innerText = totalPrice;
    }

    movieCards.forEach(function(card) {
        card.addEventListener('click', function() {
          
            movieCards.forEach(c => c.classList.remove('selected-movie'));
           
            card.classList.add('selected-movie');
            
            const movieTitleText = card.querySelector('h3').innerText; 
            
            const priceMatch = movieTitleText.match(/\((\d+)\$\)/);
            if (priceMatch) {
                currentTicketPrice = Number(priceMatch[1]); 
            }
            
            currentMovieName = movieTitleText.split(':')[1] ? movieTitleText.split(':')[1].split('(')[0].trim() : movieTitleText;

            console.log(`تم اختيار فيلم: ${currentMovieName} بسعر ${currentTicketPrice}$`);
          
            updateSelectedCountAndTotal();
        });
    });

    seats.forEach(function(seat) {
        seat.addEventListener('click', function() {
            seat.classList.toggle('selected');
            updateSelectedCountAndTotal();
        });
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            const selectedSeatsCount = document.querySelectorAll('.seating-chart .seat.selected').length;
            const totalPrice = selectedSeatsCount * currentTicketPrice;
            
            const userNameInput = document.querySelector('input[name="full_name"]');
            const userName = userNameInput ? userNameInput.value : "العميل";

            if (selectedSeatsCount === 0) {
                event.preventDefault(); 
                alert("❌ عذراً يا " + userName + "، يرجى تحديد مقعد واحد على الأقل من خريطة الصالة لإتمام الحجز!");
                return;
            }

            alert(`🎉 تم الحجز بنجاح يا ${userName}! \n\n🎬 الفيلم المختار: فيلم ${currentMovieName} \n💺 عدد المقاعد: ${selectedSeatsCount} \n💰 السعر الإجمالي: ${totalPrice} دولار \n\nاضغط موافق للانتقال وتأكيد تذكرتك! ✨`);
        });
    }
});