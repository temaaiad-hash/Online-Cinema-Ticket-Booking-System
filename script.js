document.addEventListener('DOMContentLoaded', function() {
    
    const movieCards = document.querySelectorAll('.movie-card');
    const seats = document.querySelectorAll('.seating-chart .seat:not(.occupied)');
    const countLabel = document.getElementById('count');
    const priceLabel = document.getElementById('total');
    const bookingForm = document.querySelector('form');
    
    let currentTicketPrice = 10; 
    let currentMovieName = "زومبي";

    console.log("نظام السينما المطور (VIP + التوقيت) جاهز للعمل! 🚀🎬");

   
    function updateSelectedCountAndTotal() {
        const selectedSeats = document.querySelectorAll('.seating-chart .seat.selected');
        const selectedSeatsCount = selectedSeats.length;
        
        let totalPrice = 0;

       
        selectedSeats.forEach(function(seat) {
            if (seat.classList.contains('vip')) {
                
                totalPrice += (currentTicketPrice + 5);
            } else {
                
                totalPrice += currentTicketPrice;
            }
        });

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
            const selectedSeats = document.querySelectorAll('.seating-chart .seat.selected');
            const selectedSeatsCount = selectedSeats.length;
            const userName = document.querySelector('input[name="full_name"]').value;
            const movieDate = document.querySelector('input[name="booking_date"]').value;
            const movieTime = document.getElementById('booking_time').value;
            const finalPrice = priceLabel ? priceLabel.innerText : '0';

            if (selectedSeatsCount === 0) {
                event.preventDefault(); 
                alert("❌ عذراً يا " + userName + "، يرجى تحديد مقعد واحد على الأقل من خريطة الصالة لإتمام الحجز!");
                return;
            }
            event.preventDefault(); 

            alert(`🎉 تم تأكيد حجز تذكرتك بنجاح! \n-----------------------------------\n👤 العميل: ${userName} \n🎬 الفيلم المختار: فيلم ${currentMovieName} \n📅 التاريخ: ${movieDate} \n⏰ التوقيت: ${movieTime} \n💺 عدد المقاعد: ${selectedSeatsCount} \n💰 الإجمالي النهائي: ${finalPrice} دولار \n-----------------------------------\nنتمنى لك سهرة ممتعة ومشاهدة شيقة! ✨`);
            
            selectedSeats.forEach(function(seat) {
                seat.classList.remove('selected');
                seat.classList.add('occupied');
            });
            
            if (countLabel) countLabel.innerText = '0';
            if (priceLabel) priceLabel.innerText = '0';
            bookingForm.reset();
        });
    }
});