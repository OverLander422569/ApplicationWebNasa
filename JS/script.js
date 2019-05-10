

    function buildUrl (year, month, day) {
        return "https://api.nasa.gov/planetary/apod?api_key=57MUlBMrBf0Xi3YdrAz1cQVcEKPOJDztxhY88kS8&date=" + year + "-" + month + "-" + day;
    }

    function callAjax(year, month, day){

        $.ajax({
            url: buildUrl (year, month, day),
            success: function(result){
                if (result.media_type == "video") {


                // <iframe id="apod_vid_id" type="text/html" width="640" height="385" frameborder="0"></iframe>

                    const vid =  $('<iframe/>', {
                        src: result.url,
                        type: "text/html",
                        width: 250,
                        height: 150,
                        frameborder:0
                    });

                    vid.css('margin-bottom', '-71px');

                    vid.appendTo('#div-img');
                    //les vidéos ne s'affichent pas, essayer de trouver une solution
                }
                else{
                    const img = $('<img/>', {
                        src: result.url,
                        height: "150px"
                    });
                    img.appendTo('#div-img');
                }

            }
        });

    }

    $(document).ready(function (){
        $("#liste").on("click", function(){
            let date = new Date();
            for (i=0; i<10;i++){
                date.setDate(date.getDate() - 1);
                callAjax(date.getFullYear(), date.getMonth() + 1, date.getDate())
            }
            callAjax(2008,1,1);
        });

        $("#effacer").on("click", function(){
           $("#div-img").empty();
        });

        //fonction effacer juste la dernière image

        $("#datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            //former une date minimum à partir du 16/05/1995
            minDate: new Date(1995,5,16),
            maxDate: new Date(),
            //la date max doit être la veille du jour

            onSelect: function(dateText, date){

                callAjax(date.selectedYear, date.selectedMonth + 1, date.selectedDay);
            }
        });


    });
