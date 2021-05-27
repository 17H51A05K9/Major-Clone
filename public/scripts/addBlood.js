var URL = location.protocol + '//' + location.host;

$(document).ready(function() {
    var diseasesAPI = URL + "/app/allBloods";
  // console.log(diseasesAPI)
    $.getJSON(diseasesAPI).done(function(allDiseases) {
      //  console.log(allDiseases)
         var diseasesScoresCheckboxes = [];

         for(var disease in allDiseases) {
             var diseaseScoreCheckbox = [];
             let k=allDiseases[disease]
             diseaseScoreCheckbox[0] = k['Id'];
             diseaseScoreCheckbox[1] = k['BloodGroup']; // This is the score.
             diseasesScoresCheckboxes.push(diseaseScoreCheckbox)
         }

         $('#add-new-Blood').dataTable({
               data: diseasesScoresCheckboxes,
               columns:
               [
                   {
                       title: "Hospital Id"
                   },
                   {
                       title: "Blood Group"
                   }
               ],
               scrollY: '40vh',
               scrollCollapse: true,
               paging: false,
               info: false,
               language: {
                 sSearch: "Search disease"
               }
          });
     });
});

/*
     Google analytics
*/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-97568701-1', 'auto');
ga('send', 'pageview');
