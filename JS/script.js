
    //construction d'une URL avec une API-KEY et concaténation de date qui sera utilisée dans l'appel AJAX
    function buildUrl (year, month, day) {
        return "https://api.nasa.gov/planetary/apod?api_key=57MUlBMrBf0Xi3YdrAz1cQVcEKPOJDztxhY88kS8&date=" + year + "-" + month + "-" + day;
    }

    //cette fonction est appelée lors de l'évènement
    function callAjax(year, month, day){

        //requête AJAX utilisant l'URL de l'api
        $.ajax({
            url: buildUrl (year, month, day),
            success: function(result){
                //on vérifie si le média est de type vidéo en priorité (car minoritaire)
                if (result.media_type == "video") {

                    const vid =  $('<iframe/>', {
                        src: result.url,
                        type: "text/html",
                        width: 250,
                        height: 150,
                        frameborder:0
                    });
                    // marge basse de la vidéo définie en négatif pour la rapprocher des images
                    //(sinon la vidéo est décalée par rapport aux images)
                    vid.css('margin-bottom', '-71px');
                    //insertion dans la balise où se trouve l'id div-img
                    //(ce qui permet à la vidéo d'être affichée au même endroit que les images)
                    vid.appendTo('#div-img');
                }
                //sinon on retourne un média image
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
        //lors du clic sur le form liste
        $("#liste").on("click", function(){
            let date = new Date();
            //la boucle affiche les images des 10 jours précédents
            //il faut mettre -1 à la date du jour pour n'afficher comme dernière image que celle de la veille
            // et +1 au mois car ils commencent à 0
            for (i=0; i<10;i++){
                date.setDate(date.getDate() - 1);
                callAjax(date.getFullYear(), date.getMonth() + 1, date.getDate())
            }
            callAjax(date.getFullYear(), date.getMonth() + 1, date.getDate());
        });

        //Suppression du contenu de la balise de contenu d'image
        $("#effacer").on("click", function(){
           $("#div-img").empty();
        });

        //choix de la date concernant l'image
        $("#datepicker").datepicker({
            //format de date française
            dateFormat: "dd/mm/yy",
            //former une date minimum à partir du 16/05/1995
            minDate: new Date(1995,5,16),
            //former une date max à la date du jour
            maxDate: new Date(),

            //La fonction callAjax est rappelée dans le calendrier
            onSelect: function(dateText, date){
                callAjax(date.selectedYear, date.selectedMonth + 1, date.selectedDay);
            }
        });


    });
