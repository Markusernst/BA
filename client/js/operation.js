$(document).ready(function () {
      
      $.ajax({
          type: "GET",
          url: '/diagnose_rep',
          dataType: 'json',
          success: function(diagnosedata){
            console.log(diagnosedata);
            $('#diagnosebutton').modal({
                keyboard: true,
                backdrop: "static",
                show:false,
            }).on('click', function(e){ //subscribe to show method
              $('#treediagnose').treeview({
                data: diagnosedata, 
                onNodeSelected: function(event, data) {
                  $('#diagnose').val($('#diagnose').val() + data.text +', ');
                } });
            });
      
          },
          error: function(e) {
            console.log(e);
          }
        });


      $.ajax({
          type: "GET",
          url: '/ops_rep',
          dataType: 'json',
          success: function(opsdata){
          
            $('#opsbutton').modal({
                keyboard: true,
                backdrop: "static",
                show:false,
            }).on('click', function(e){ //subscribe to show method
              $('#treeops').treeview({
                data: opsdata, 
                onNodeSelected: function(event, data) {
                  $('#ops').val($('#ops').val() + data.text +', ');
                } });
            });
      
          },
          error: function(e) {
            console.log(e);
          }
        });


      $('#patientenauswahlbutton').modal({
          keyboard: true,
          backdrop: "static",
          show:false,
      }).on('click', function(e){ //subscribe to show method
        $.ajax({
          type: "GET",
          url: '/patient/ajax',
          dataType: 'json',
          success: function(data){
              var tbody = '';
              $(function() {
                  $.each(data, function(i, item) {
                      tbody +=  "<tr onclick='insertPatient(this)' data-dismiss='modal' style='cursor: pointer' class='patient-row'><td class='lastname'>" + data[i].lastname +"</td><td class='firstname'>" + data[i].firstname +"</td><td class='healthinsurance'>" + data[i].healthinsurance +"</td><td class='familydoctor'>" + data[i].familydoctor +"</td></tr>";
                      });
                  $('#bodyCal').html(tbody);
                  $('#patienten').not('.initialized').addClass('initialized').dataTable({
                    paging: false
                  });
              });
          },
          error: function(e) {
            console.log(e);
          }
        });
      });

      $('#berichtoeffnenauswahlbutton').modal({
          keyboard: true,
          backdrop: "static",
          show:false,
      }).on('click', function(e){ //subscribe to show method
        $.ajax({
          type: "GET",
          url: '/berichte',
          dataType: 'json',
          success: function(data){
              var tbodyVorlagen = '';
              var tbodyBerichte = '';
              $(function() {
                  $.each(data, function(i, item) {
                      if(data[i].vorlage==true){
                        tbodyVorlagen +=  "<tr onclick='openDocument(this)' id='"+ data[i]._id +"' data-dismiss='modal' style='cursor: pointer' class='document-row'><td class='titel'>" + data[i].titel +"</td></tr>";
                      }else{
                        tbodyBerichte +=  "<tr onclick='openDocument(this)' id='"+ data[i]._id +"' data-dismiss='modal' style='cursor: pointer' class='patient-row'><td class='titel'>" + data[i].titel +"</td><td class='datum'>" + data[i].staticcontent.operation.datum +"</td><td class='lastname'>" + data[i].staticcontent.patient.nachname +"</td><td class='firstname'>" + data[i].staticcontent.patient.vorname +"</td></tr>";
                        }
                      });

                  $('#bodyVorlagenTable').html(tbodyVorlagen);
                  $('#bodyBerichteTable').html(tbodyBerichte);
                  $('#vorlagen').not('.initialized').addClass('initialized').dataTable({
                    paging: false
                  });
                  $('#berichte').not('.initialized').addClass('initialized').dataTable({
                    paging: false
                  });
              });
          },
          error: function(e) {
            console.log(e);
          }
        });
      });

      $('#berichtspeichernbutton').modal({
          keyboard: true,
          backdrop: "static",
          show:false,
      }).on('click', function(e){ //subscribe to show method
        $.ajax({
          type: "GET",
          url: '/berichte',
          dataType: 'json',
          success: function(data){
              var tbodyVorlagen = '';
              $(function() {
                  $.each(data, function(i, item) {
                        tbodyVorlagen +=  "<tr onclick='ueberspeichernBericht(this)' id='"+ data[i]._id +"' data-dismiss='modal' style='cursor: pointer' class='patient-row'><td class='titel'>" + data[i].titel +"</td><td class='datum'>" + data[i].staticcontent.operation.datum +"</td><td class='lastname'>" + data[i].staticcontent.patient.nachname +"</td><td class='firstname'>" + data[i].staticcontent.patient.vorname +"</td></tr>";
                      });

                  $('#bodySpeichernTable').html(tbodyVorlagen);
                  $('#berichteSpeichern').not('.initialized').addClass('initialized').dataTable({
                    paging: false
                  });
              });
          },
          error: function(e) {
            console.log(e);
          }
        });
      });

      $('.input-group.date').datepicker({
        format: "dd.mm.yyyy",
        language: "de",
        autoclose: true,
        todayHighlight: true
      });

      $("#addPlain").click(function () {
        var id = ($('#content').children().length + 1).toString();
        $('#content').append(
          '<div id="control-group' + id + '" class="col-sm-6 col-md-4 varcontent"><div class="thumbnail"><div class="caption"><button type="button" class="close" onclick="closeFunction(this)" aria-hidden="true">&times;</button><input type="text" class="form-control" placeholder="Textfeld"></div><textarea class="form-control textarea_var" rows="3"></textarea></div></div>'
        );

        /*var varcontents = document.getElementsByClassName('varcontent');
        if(varcontents.length%4==0){
          console.log(varcontents.length);
          console.log(varcontents.length%4==0);
            $('#content').append(
              '<div class="page-break"></div>'
            );
        }*/

        addComplete();
      });

      $(".menu_item").on( 'click', function( event ) {
        var $target = $( event.currentTarget );

      $target.closest( '.btn-group' )
         .find( '[data-bind="label"]' ).text( $target.text() )
            .end()
         .children( '.dropdown-toggle' ).dropdown( 'toggle' );

      return false;
      });
  });

    function split( val ) {
      return val.split( / \ / );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }

    function addComplete(){

      var autocompletedata = [];
      $.ajax({
        type: "GET",
        url: '/wordpres_rep',
        dataType: 'json',
          success: function(data){
            $.each(data, function(i, item) {
              var tmp = { "label": data[i].name, "value": data[i].body};
              autocompletedata.push(tmp);
              
            });
            $.ajax({
              type: "GET",
              url: '/abbreviation_rep',
              dataType: 'json',
                success: function(data){
                  $.each(data, function(i, item) {
                    var tmp = { "label": data[i].abbreviation, "value": data[i].word};
                    autocompletedata.push(tmp);
                  });



        $( ".textarea_var" )
          // don't navigate away from the field on tab when selecting an item
          .bind( "keydown", function( event ) {
            if ( event.keyCode === $.ui.keyCode.TAB &&
                $( this ).autocomplete( "instance" ).menu.active ) {
              event.preventDefault();
            }
          })
          .autocomplete({
            minLength: 0,
            source: function( request, response ) {
              
                  response($.ui.autocomplete.filter( autocompletedata , extractLast( request.term )));
  
                
  
            },
            select: function( event, ui ) {
              var terms = split( this.value );
              // remove the current input
              terms.pop();
              // add the selected item
              terms.push( ui.item.value );
              // add placeholder to get the comma-and-space at the end
              this.value = terms.join( " \ " );
              return false;
            }
          });

            },
          error: function(e) {
            console.log(e);
          }
        });
        },
        error: function(e) {
          console.log(e);
        }
      });

}

    function closeFunction(elem) {
      var parentID = elem.parentNode.parentNode.parentNode.id;
      var parent = elem.parentNode.parentNode.parentNode;
      $('#'+parentID+'').remove();
    }

    function insertPatient(elem) {
      var getLastnameFromRow = elem.childNodes[0].innerHTML;
      var getFirstnameFromRow = elem.childNodes[1].innerHTML;
      var getHealthinsuranceFromRow = elem.childNodes[2].innerHTML;
      var getfamilydoctorFromRow = elem.childNodes[3].innerHTML;
      $('#patientname').val(getLastnameFromRow);
      $('#patientfirstname').val(getFirstnameFromRow);
      $('#patienthealth').val(getHealthinsuranceFromRow);
      $('#patientdoc').val(getfamilydoctorFromRow);
    }

    function openDocument(elem) {
      var getIdFromRow = elem.id;
      var varcontents = document.getElementsByClassName('varcontent');
      for(var i = 0; i < varcontents.length; i++) {
          $('.varcontent').remove();
      }
        $.ajax({
          type: "GET",
          url: '/berichte/id/' + getIdFromRow,
          dataType: 'json',
          success: function(data){

              $('#institut').val(data[0].staticcontent.korrespodent.institut);
              $('#chefarzt').val(data[0].staticcontent.korrespodent.chefaerzte);
              $('#korAdresse').val(data[0].staticcontent.korrespodent.addresse);
              $('#korTele').val(data[0].staticcontent.korrespodent.telefon);

              $('#patientname').val(data[0].staticcontent.patient.nachname);
              $('#patientfirstname').val(data[0].staticcontent.patient.vorname);
              $('#patienthealth').val(data[0].staticcontent.patient.krankenkasse);
              $('#patientdoc').val(data[0].staticcontent.patient.hausarzt);

              $('#diagnose').val(data[0].staticcontent.operation.diagnose);
              $('#ops').val(data[0].staticcontent.operation.opstext);
              $('#datum').val(data[0].staticcontent.operation.datum);
              $('#opdauerspan').text(data[0].staticcontent.operation.dauer);

              $('#operateur').val(data[0].staticcontent.personal.operateur);
              $('#anaesthesie').val(data[0].staticcontent.personal.anaesthesie);
              $('#instrum').val(data[0].staticcontent.personal.instrum);
              $('#springer').val(data[0].staticcontent.personal.springer);

              var id = ($('#content').children().length + 1).toString();
              for(var i = 0; i < data[0].varcontent.length; i++) {
                
                $('#content').append(
                  '<div id="control-group' + id + '" class="col-sm-6 col-md-4 varcontent"><div class="thumbnail"><div class="caption"><button type="button" class="close" onclick="closeFunction(this)" aria-hidden="true">&times;</button><input type="text" class="form-control" placeholder="Textfeld" value="'+data[0].varcontent[i].titel+'"></div><textarea class="form-control textarea_var" rows="3">'+data[0].varcontent[i].content+'</textarea></div></div>'
                );

                /*if(i%4==0){
                  $('#content').append(
                    '<div class="page-break"></div>'
                  );
                }*/
              }

              addComplete();
          },
          error: function(e) {
            console.log(e);
          }
        });

    }

    function ueberspeichernBericht(elem){
      var getIdFromRow = elem.id;
      var checkbox = document.getElementById('vorlageCheck');
      var vorlage;
      if (checkbox.checked){
        vorlage = true;
      }else{
        vorlage = false;
      }

      var institut = document.getElementById('institut').value;
      var chefaerzte = document.getElementById('chefarzt').value;
      var addresse = document.getElementById('korAdresse').value;
      var telefon = document.getElementById('korTele').value;
      var nachname = document.getElementById('patientname').value;
      var vorname = document.getElementById('patientfirstname').value;
      var krankenkasse = document.getElementById('patienthealth').value;
      var hausarzt = document.getElementById('patientdoc').value;
      var diagnose = document.getElementById('diagnose').value;
      var opstext = document.getElementById('ops').value;
      var datum = document.getElementById('datum').value;
      var dauer = $('#opdauerspan').text();
      var operateur = document.getElementById('operateur').value;
      var anaesthesie = document.getElementById('anaesthesie').value;
      var instrum = document.getElementById('instrum').value;
      var springer = document.getElementById('springer').value;

      var titel = document.getElementById('titelinput').value;
      
      var jsonSave = {"titel": titel,"vorlage": vorlage,"staticcontent":{"korrespodent":{"institut": institut,"addresse": addresse,"chefaerzte": chefaerzte,"telefon": telefon},"patient":{"nachname": nachname,"vorname": vorname,"krankenkasse": krankenkasse,"hausarzt": hausarzt},"operation":{"opstext": opstext,"diagnose": diagnose,"datum": datum,"dauer": dauer},"personal":{"operateur": operateur,"anaesthesie": anaesthesie,"instrum": instrum,"springer": springer}},"varcontent": []};

      var varcontents = document.getElementsByClassName('varcontent');
      for(var i = 0; i < varcontents.length; i++) {
        var obj = { "titel": varcontents[i].childNodes[0].childNodes[0].childNodes[1].value, "content": varcontents[i].childNodes[0].childNodes[1].value}
        jsonSave.varcontent.push(obj);
      }

      var json_data = JSON.stringify(jsonSave);

      $.ajax({
        type: "PUT",
        url: '/berichte/id/'+getIdFromRow,
        data: json_data,
        contentType: 'application/json',
        success: function(json_data){

      },
        error: function(e) {
          console.log(e);
        }
      });

    }

    function berichtspeichern(elem){
      var checkbox = document.getElementById('vorlageCheck');
      var vorlage;
      if (checkbox.checked){
        vorlage = true;
      }else{
        vorlage = false;
      }

      var institut = document.getElementById('institut').value;
      var chefaerzte = document.getElementById('chefarzt').value;
      var addresse = document.getElementById('korAdresse').value;
      var telefon = document.getElementById('korTele').value;
      var nachname = document.getElementById('patientname').value;
      var vorname = document.getElementById('patientfirstname').value;
      var krankenkasse = document.getElementById('patienthealth').value;
      var hausarzt = document.getElementById('patientdoc').value;
      var diagnose = document.getElementById('diagnose').value;
      var opstext = document.getElementById('ops').value;
      var datum = document.getElementById('datum').value;
      var dauer = $('#opdauerspan').text();
      var operateur = document.getElementById('operateur').value;
      var anaesthesie = document.getElementById('anaesthesie').value;
      var instrum = document.getElementById('instrum').value;
      var springer = document.getElementById('springer').value;

      var titel = document.getElementById('titelinput').value;
      
      var jsonSave = {"titel": titel,"vorlage": vorlage,"staticcontent":{"korrespodent":{"institut": institut,"addresse": addresse,"chefaerzte": chefaerzte,"telefon": telefon},"patient":{"nachname": nachname,"vorname": vorname,"krankenkasse": krankenkasse,"hausarzt": hausarzt},"operation":{"opstext": opstext,"diagnose": diagnose,"datum": datum,"dauer": dauer},"personal":{"operateur": operateur,"anaesthesie": anaesthesie,"instrum": instrum,"springer": springer}},"varcontent": []};

      var varcontents = document.getElementsByClassName('varcontent');
      for(var i = 0; i < varcontents.length; i++) {
        var obj = { "titel": varcontents[i].childNodes[0].childNodes[0].childNodes[1].value, "content": varcontents[i].childNodes[0].childNodes[1].value}
        jsonSave.varcontent.push(obj);
      }

      var json_data = JSON.stringify(jsonSave);

      $.ajax({
        type: "POST",
        url: '/berichte',
        data: json_data,
        contentType: 'application/json',
        success: function(json_data){

      },
        error: function(e) {
          console.log(e);
        }
      });

    }