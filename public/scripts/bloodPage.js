var URL = location.protocol + '//' + location.host;

$(document).ready(function() {
    var hospitalNumber= window.location.pathname.split('/');

    var patientAPI = URL + "/app/getBloodPage/" + hospitalNumber[3];

   // $("#form-patient").attr("action", "/app/updatepatient/" + hospitalNumber[3]);
    $("#delete-button").attr("href", "/app/deleteblood/" + hospitalNumber[3]);
let a=URL+"/app/getOne/"+hospitalNumber[3];
    $.getJSON(a).done(function(patient) {
       // console.log(patient);
       $("#first-name-disabled").attr("placeholder", patient["Id"]);
       $("#hospitalNumber-disabled").attr("placeholder", patient["BloodGroup"]);
      
       var diseasesAPI = URL +"/app/allBloods";
       $.getJSON(diseasesAPI).done(function(allDiseases) {
       // console.log(allDiseases)
         var diseasesScoresCheckboxes = [];

         for(var disease in allDiseases) {
             var diseaseScoreCheckbox = [];
             let k=allDiseases[disease]
             diseaseScoreCheckbox[0] = k['Id'];
             diseaseScoreCheckbox[1] = k['BloodGroup']; // This is the score.

             diseasesScoresCheckboxes.push(diseaseScoreCheckbox)
         }

         $('#diagnosis').dataTable({
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
});
