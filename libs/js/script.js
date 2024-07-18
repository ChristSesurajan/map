var map,clickedcountry,countryName,countcode,fromcur,tocur, valu;
var citys = L.layerGroup(); 
var markers = L.markerClusterGroup(); 
var airpo= L.layerGroup();
var cityl= L.layerGroup();

function addMarkers(data, fcode, markerOptions, popupText) {
  data.forEach(function (item) {
      if (item.fcode === fcode) {
          var marker = L.marker([item.lat, item.lng], markerOptions)
                           .bindPopup(`<b>${item.toponymName}</b><br>${popupText}<br>Population: ${item.population}`);

          markers.addLayer(marker);

          if (fcode === 'PPLC') {
              citys.addLayer(marker); 
          }
          if (fcode === 'AIRP') {
            airpo.addLayer(marker); 
        }
        if (fcode === 'PPLA2') {
          cityl.addLayer(marker);
      }
      }
  });
}


function gettime(time){
  const unixTimestamp = time;


const date = new Date(unixTimestamp * 1000);


const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

 // console.log(formattedTime);
  return formattedTime;
}
function getDayOfWeek(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  
  const date = new Date(dateString);


  const dayIndex = date.getDay();

 
  return daysOfWeek[dayIndex];
 }

var countryMarker = L.ExtraMarkers.icon({
  icon: 'fa-globe',
  markerColor: 'purple',
  shape: 'star',
  prefix: 'fa'
});
var locatMarker = L.ExtraMarkers.icon({
  icon: 'fa-location-arrow',
  markerColor: 'orange-dark',
  shape: 'penta',
  prefix: 'fa'
});

var captialMarker = L.ExtraMarkers.icon({
  icon: 'fa-bolt',
  markerColor: 'red',
  shape: 'star',
  prefix: 'fa'
});
var cityMarker = L.ExtraMarkers.icon({
  icon: 'fa-flag-checkered',
  markerColor: 'green',
  shape: 'penta',
  prefix: 'fa'
});

var airportMarker = L.ExtraMarkers.icon({
  icon: 'fa-plane',
  markerColor: 'orange-dark',
  shape: 'square',
  prefix: 'fa'
});

var waterMarker = L.ExtraMarkers.icon({
  icon: 'fa-tint',
  markerColor: 'blue',
  shape: 'circle',
  prefix: 'fa'
});

var seaMarker = L.ExtraMarkers.icon({
  icon: 'fa-ship',
  markerColor: 'blue',
  shape: 'circle',
  prefix: 'fa'
});

var valcMarker = L.ExtraMarkers.icon({
  icon: 'fa-fire',
  markerColor: 'orange',
  shape: 'star',
  prefix: 'fa'
});

var hosMarker = L.ExtraMarkers.icon({
  icon: 'fa-hospital-o',
  markerColor: 'green',
  shape: 'penta',
  prefix: 'fa'
});

var univMarker = L.ExtraMarkers.icon({
  icon: 'fa-graduation-cap',
  markerColor: 'yellow',
  shape: 'square',
  prefix: 'fa'
});

var hillMarker = L.ExtraMarkers.icon({
  icon: 'fa-modx',
  markerColor: 'violet',
  shape: 'circle',
  prefix: 'fa'
});

var streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
});

var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
});

var basemaps = {
  "Streets": streets,
  "Satellite": satellite
};

var infoBtn1 = L.easyButton("fa-info", function (btn, map) {
  $("#exampleModal1").modal("show");
});

var holi = L.easyButton('<i class="fa fa-tree fa-xl"></i>', function (btn, map) {
  $("#exampleModal5").modal("show");
});
var wikiin= L.easyButton("fa-university fa-xl", function (btn, map) {
  $("#exampleModal4").modal("show");
});

var weatherBtn = L.easyButton("fa-cloud fa-xl", function (btn, map) {
  $("#exampleModal2").modal("show");
})
var currencyBtn = L.easyButton('<i class="fa fa-dollar-sign fa-xl"></i>', function (btn, map) {
  $("#exampleModal3").modal("show");
})
function getLatLng(coordinates) {
  let latLngs = [];

  function traverseCoords(coords) {
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
      latLngs.push([coords[1], coords[0]]);
    } else if (Array.isArray(coords)) {
      coords.forEach(coord => traverseCoords(coord));
    }
  }

  traverseCoords(coordinates);
  return latLngs;
}

$(document).ready(function () {
  $('#selcetfrom').change(function(){
    fromcur = $('#selcetfrom').val();
    //console.log(fromcur);
  })
  $('#selcetto').change(function(){
    tocur = $('#selcetto').val();
    //console.log(tocur);
  })

  $('#amount').change(function(){
    valu = $('#amount').val();
    //console.log(valu);
  })



  $('#sumbitcu').click(function () {
      
    $.ajax({
      url: "libs/php/currencyconverter.php",
      type: 'POST',
      dataType: 'json',
      data: { value: valu,
              fromcu: fromcur,
              tocu:tocur

      },
      success: function(result) {
       // console.log(JSON.stringify(result));
        Object.entries(result.data.data).forEach(function([key, value]) {
         
          if (key === tocur) {
              let sum = valu * value; 
              sum=sum.toFixed(2);
              $('#result').text(sum);
              return; 
          }
      });
      
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('AJAX call failed:', textStatus, errorThrown);
        console.log(jqXHR.responseText); 
      }
    });
   

  });



  $.ajax({
    url: "libs/php/getcurrency.php",
    type: 'GET',
    dataType: 'json',
    success: function(result) {
     // console.log(JSON.stringify(result));
      
      var from =$('#selcetfrom');
      var to=$('#selcetto');
      from.empty();
      to.empty(); 
        Object.entries(result.data.data).forEach(function([key, value]) {
        var option = $('<option></option>').attr('value',key).text(value.name);
          
          to.append(option.clone());
          from.append(option);
         });
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('AJAX call failed:', textStatus, errorThrown);
      console.log(jqXHR.responseText); 
    }
  });
  $.ajax({
    url: "libs/php/getCountryInfo.php",
    type: 'GET',
    dataType: 'json',
    success: function(result) {
       // console.log(result);
        if (result.error) {
            console.error("Server Error: " + result.error);
            return;
        }
        populateCountrySelect(result);
    },
    error: function(xhr, status, error) {
        console.error("AJAX Error: " + error);
        console.log(xhr.responseText);
    }
  });

  /*$('#countrySelect').click(function(){
    if( $("option:selected").text()){
      var couname=$("option:selected").text();
      var concode=$("option:selected").val();
      var select = $('#countrySelect');
      $("option:selected").text('');
      $("option:selected").val('');
      var option = $('<option></option>').attr('value', concode).text(couname);
      select.append(option);


    }
  })*/





  $('#countrySelect').change(function () {
    var latitu,longitu;
    var isoCode = $(this).val();
    var countryName = $("option:selected").text(); 
    countryName=countryName.replaceAll('EuroEuro','');
    countryName = encodeURIComponent(countryName);
    //console.log(countryName);
  
    
    $.ajax({
      url: "libs/php/changecountry.php",
      type: 'POST',
      dataType: 'json',
      data: { ISO: isoCode },
      success: function (result) {
        //console.log(result);
        if (!result || result.length === 0 || !result[0].coordinates || result[0].coordinates.length === 0) {
          console.error("Empty or invalid coordinates received.");
          return;
        }
        
        var coordinates = result[0].coordinates;
        var countcode = result[0].iso_a2;
        var latlong = getLatLng(coordinates);
        var polyline = L.polyline(latlong, { color: 'red' }).addTo(map);
        map.fitBounds(polyline.getBounds());

        $.ajax({
          url: "libs/php/searchApi.php",
          type: 'POST',
          dataType: 'json',
          data: { name: countryName },
          success: function (result) {
           // console.log(result.data);
              if (result.status.name == "ok" && result.data.length > 0) {
                  latitu = result.data[0].lat;
                  longitu = result.data[0].lng;
                  //console.log(markers.latitu);
                 
                   markers.clearLayers();
                    addMarkers(result.data, 'PCLI', {icon:countryMarker}, "Country");
                    addMarkers(result.data, 'PPLC', { icon:captialMarker}, "Capital City");
                    addMarkers(result.data, 'PPL', { icon:cityMarker}, "Area");
                    addMarkers(result.data, 'PPLA2', { icon:cityMarker}, "City");
                    addMarkers(result.data, 'AIRP', { icon:airportMarker}, "Airport");
                    addMarkers(result.data, 'LK', {icon:waterMarker}, "Lake");
                    addMarkers(result.data, 'RSD', { icon: L.icon({ iconUrl: 'libs/icon/railway.jpg', iconSize: [38, 38] }) }, "Railroad station");
                    addMarkers(result.data, 'HLL', { icon:hillMarker}, "Hill");
                    addMarkers(result.data, 'SEA', {icon:seaMarker}, "SEA");
                    addMarkers(result.data, 'VLC',{ icon:valcMarker}, "volcano");
                    addMarkers(result.data, 'HSP', { icon:hosMarker}, "Hospital");
                    addMarkers(result.data, 'UNIV', { icon:univMarker}, "University");
                    markers.addTo(map);
                  
                  
              /*    addMarkers(result.data, 'PCLI', {icon:countryMarker}, "Country");
                  addMarkers(result.data, 'PPLC', { icon:captialMarker}, "Capital City");
                  addMarkers(result.data, 'PPL', { icon:cityMarker}, "Area");
                  addMarkers(result.data, 'PPLA2', { icon:cityMarker}, "City");
                  addMarkers(result.data, 'AIRP', { icon:airportMarker}, "Airport");
                  addMarkers(result.data, 'LK', {icon:waterMarker}, "Lake");
                  addMarkers(result.data, 'RSD', { icon: L.icon({ iconUrl: 'libs/icon/railway.jpg', iconSize: [38, 38] }) }, "Railroad station");
                  addMarkers(result.data, 'HLL', { icon:hillMarker}, "Hill");
                  addMarkers(result.data, 'SEA', {icon:seaMarker}, "SEA");
                  addMarkers(result.data, 'VLC',{ icon:valcMarker}, "volcano");
                  addMarkers(result.data, 'HSP', { icon:hosMarker}, "Hospital");
                  addMarkers(result.data, 'UNIV', { icon:univMarker}, "University");
                  markers.addTo(map); */

             // console.log(latitu);
              // console.log(longitu);


              $.ajax({
                url: "libs/php/wheather.php",
                type: 'POST',
                dataType: 'json',
                data: { latitude:latitu,
                        longitude:longitu
          
                },
                success: function(result) {
                  countryName = decodeURIComponent(countryName);
                 // console.log(JSON.stringify(result));
                 
                     $('#cname').text(countryName);
                     $('#curenti').attr('src','https://openweathermap.org/img/w/'+result.data.weather[0].icon+'.png');
                    $('#weather').text(result.data.weather[0].description);
                    $('#temp').text((result.data.main.temp-273).toFixed(2)+'°C');
                    $('#feelli').text((result.data.main.feels_like-273).toFixed(2)+'°C');
                    $('#tempmin').text((result.data.main.temp_min-273).toFixed(2)+'°C');
                    $('#tempmax').text((result.data.main.temp_max-273).toFixed(2)+'°C');

                    $.ajax({
                      url: "libs/php/forcast.php",
                      type: 'POST',
                      dataType: 'json',
                      data: { latitude:latitu,
                              longitude:longitu
                      },
                      success: function(result) {
                        //console.log(JSON.stringify(result));
                        
                      
                       
                    

                      let currtime=result.data.list[0].dt;
                     
                        
                        $('#forcas').attr('src','https://openweathermap.org/img/w/'+result.data.list[0].weather[0].icon+'.png');
                        $('#forcast').attr('src','https://openweathermap.org/img/w/'+result.data.list[1].weather[0].icon+'.png');
                        $('#forc').attr('src','https://openweathermap.org/img/w/'+result.data.list[2].weather[0].icon+'.png');
                         $('#time1for').text(gettime(result.data.list[0].dt));
                         $('#time2for').text(gettime(result.data.list[1].dt));
                         $('#time3for').text(gettime(result.data.list[2].dt));
                       $('#tempfo').text((result.data.list[0].main.temp-273).toFixed(2)+'°C');
                       $('#tempfo1').text((result.data.list[1].main.temp-273).toFixed(2)+'°C');
                       $('#tempfo2').text((result.data.list[2].main.temp-273).toFixed(2)+'°C');
                       $('#desp1').text(result.data.list[0].weather[0].description);
                       $('#desp2').text(result.data.list[1].weather[0].description);
                       $('#desp3').text(result.data.list[2].weather[0].description);
              
              
                       
                       Object.entries(result.data.list).forEach(obj => {
                        obj.forEach(oj=>{
                          let nextday=currtime+86400;
                        let nextnxtday=currtime+(2*86400);
                        let thirday=currtime+(3*86400);
                        if(oj.dt===nextday){
                        $('#tday').text(getDayOfWeek(oj.dt_txt));
                        $('#daytempfo').text((oj.main.temp-273).toFixed(2)+'°C');
                        $('#daydesp1').text(oj.weather[0].description);
                        $('#tdayicon').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                        }
                        if(oj.dt===nextnxtday){
                          $('#tday1').text(getDayOfWeek(oj.dt_txt));
                          $('#daytempfo1').text((oj.main.temp-273).toFixed(2)+'°C');
                          $('#daydesp2').text(oj.weather[0].description);
                          $('#tdayicon1').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                          }
                          if(oj.dt===thirday){
                            $('#tday2').text(getDayOfWeek(oj.dt_txt));
                            $('#daytempfo2').text((oj.main.temp-273).toFixed(2)+'°C');
                            $('#daydesp3').text(oj.weather[0].description);
                            $('#tdayicon2').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                            }
                        })
                       
                        
                        
                     });
              /*
                       
                      // $('#tday').text(getDayOfWeek(result.data.list[7].dt_txt));
                       //  $('#tday1').text(getDayOfWeek(result.data.list[19].dt_txt));
                       //  $('#tday2').text(getDayOfWeek(result.data.list[22].dt_txt));
                         $('#tdayicon').attr('src','https://openweathermap.org/img/w/'+result.data.list[7].weather[0].icon+'.png');
                         $('#tdayicon1').attr('src','https://openweathermap.org/img/w/'+result.data.list[19].weather[0].icon+'.png');
                         $('#tdayicon2').attr('src','https://openweathermap.org/img/w/'+result.data.list[22].weather[0].icon+'.png');
                         // $('#tempmin').text((result.data.main.temp_min-273).toFixed(2)+'°C');
                        // $('#tempmax').text((result.data.main.temp_max-273).toFixed(2)+'°C');
                       // $('#daytempfo').text((result.data.list[7].main.temp-273).toFixed(2)+'°C');
                        $('#daytempfo1').text((result.data.list[19].main.temp-273).toFixed(2)+'°C');
                        $('#daytempfo2').text((result.data.list[22].main.temp-273).toFixed(2)+'°C');
                        //$('#daydesp1').text(result.data.list[7].weather[0].description);
                        $('#daydesp2').text(result.data.list[19].weather[0].description);
                        $('#daydesp3').text(result.data.list[22].weather[0].description);*/
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.error('AJAX call for search API failed:', textStatus, errorThrown);
                        console.log(jqXHR.responseText);
                      }
                    });
              
                  
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  console.error('AJAX call failed:', textStatus, errorThrown);
                  console.log(jqXHR.responseText); 
                }
              });


            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX call for search API failed:', textStatus, errorThrown);
            console.log(jqXHR.responseText);
          }
        });
          
        




        let currentYear = new Date().getFullYear();
        $.ajax({
          url: "libs/php/holiday.php",
          type: 'POST',
          dataType: 'json',
          data: { code: countcode, 
                  year:currentYear
          },
          success: function (result) {
            //console.log(JSON.stringify(result));
            let i=0;
            var $tableBody = $('#myTableBody');
            result.data.forEach(function(item) {
              var $tr = $('<tr>');

              ['date', 'localName', 'name', 'types'].forEach(function(key) {
                  var $td = $('<td>').attr('id', key).text(key);
                  var value = Array.isArray(item[key]) ? item[key].join(', ') : item[key];
                  var $p = $('<p>').text(value);
                  $td.append($p);
                  $tr.append($td);
              });

              $tableBody.append($tr);
          });
           
           
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX call for search API failed:', textStatus, errorThrown);
            console.log(jqXHR.responseText); 
          }
        });

        $.ajax({
          url: "libs/php/wiki.php",
          type: 'POST',
          dataType: 'json',
          data: { name: countryName },
          success: function (result) {
           // console.log(JSON.stringify(result));
            //var $row = $('#myRow');
            //  var $td = $('<td>');
            $('#imageofco').attr('src',result.data[0].thumbnailImg);
            $('#despc').text(result.data[0].summary);
            $('#titl').text(result.data[0].title);
            $('#wikiurl').text(result.data[0].wikipediaUrl);
            $('#imageofco1').attr('src',result.data[1].thumbnailImg);
            $('#despc1').text(result.data[1].summary);
            $('#titl1').text(result.data[1].title);
            $('#wikiurl1').text(result.data[1].wikipediaUrl);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX call for search API failed:', textStatus, errorThrown);
            console.log(jqXHR.responseText);
          }
        });
        
        $.ajax({
          url: "libs/php/contryinfodisplay.php",
          type: 'POST',
          dataType: 'json',
          data: { name: countcode },
          success: function (result) {
            //console.log(JSON.stringify(result));
            if (result.status.name == "ok" && result.data.length > 0) {
              $('#continentname').text(result.data[0].continentName);
              $('#countryname').text(result.data[0].countryName);
              $('#popu').text(result.data[0].population);
              $('#capital').text(result.data[0].capital);
              $('#languages').text(result.data[0].languages);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX call for country info failed:', textStatus, errorThrown);
            console.log(jqXHR.responseText); 
          }
        });
  
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error('AJAX call for coordinates failed:', textStatus, errorThrown);
        console.log(jqXHR.responseText); 
      }
    });
  });
  




  

  function populateCountrySelect(countries) {
    var select = $('#countrySelect');
    
   
    var options = [];

   
    countries.forEach(function(country) {
        var option = $('<option></option>').attr('value', country.iso).text(country.name);
        options.push(option);
    });

    options.sort(function(a, b) {
        return a.text().localeCompare(b.text());
    });

    
    options.forEach(function(option) {
        select.append(option);
    });
}

  map = L.map("map", { layers: [streets] }).setView([54.5, -4], 6);
  map.locate({ setView: true, maxZoom: 16 });

  function onLocationFound(e) {
    var radius = e.accuracy;
   // console.log(e.latlng);
    L.marker(e.latlng,{ icon: locatMarker }).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
    $.ajax({
      url: "libs/php/wheather.php",
      type: 'POST',
      dataType: 'json',
      data: { latitude:e.latlng.lat,
              longitude:e.latlng.lng
      },
      success: function(result) {
       // console.log(JSON.stringify(result));
        
      
       
           // var longg=result.data.coord.lon;
          //  var latt=result.data.coord.lat;

        
        
        $('#curenti').attr('src','https://openweathermap.org/img/w/'+result.data.weather[0].icon+'.png');
       $('#weather').text(result.data.weather[0].description);
       $('#temp').text((result.data.main.temp-273).toFixed(2)+'°C');
       $('#feelli').text((result.data.main.feels_like-273).toFixed(2)+'°C');
       $('#tempmin').text((result.data.main.temp_min-273).toFixed(2)+'°C');
       $('#tempmax').text((result.data.main.temp_max-273).toFixed(2)+'°C');

       $.ajax({
        url: "libs/php/forcast.php",
        type: 'POST',
        dataType: 'json',
        data: { latitude:e.latlng.lat,
                longitude:e.latlng.lng
        },
        success: function(result) {
          //console.log(JSON.stringify(result));
          
        
         
  
          
          
          $('#forcas').attr('src','https://openweathermap.org/img/w/'+result.data.list[0].weather[0].icon+'.png');
          $('#forcast').attr('src','https://openweathermap.org/img/w/'+result.data.list[1].weather[0].icon+'.png');
          $('#forc').attr('src','https://openweathermap.org/img/w/'+result.data.list[2].weather[0].icon+'.png');
           $('#time1for').text(gettime(result.data.list[0].dt));
           $('#time2for').text(gettime(result.data.list[1].dt));
           $('#time3for').text(gettime(result.data.list[2].dt));
         $('#tempfo').text((result.data.list[0].main.temp-273).toFixed(2)+'°C');
         $('#tempfo1').text((result.data.list[1].main.temp-273).toFixed(2)+'°C');
         $('#tempfo2').text((result.data.list[2].main.temp-273).toFixed(2)+'°C');
         $('#desp1').text(result.data.list[0].weather[0].description);
         $('#desp2').text(result.data.list[1].weather[0].description);
         $('#desp3').text(result.data.list[2].weather[0].description);



         let currtime=result.data.list[0].dt;
         Object.entries(result.data.list).forEach(obj => {
          obj.forEach(oj=>{
            let nextday=currtime+86400;
          let nextnxtday=currtime+(2*86400);
          let thirday=currtime+(3*86400);
          if(oj.dt===nextday){
          $('#tday').text(getDayOfWeek(oj.dt_txt));
          $('#daytempfo').text((oj.main.temp-273).toFixed(2)+'°C');
          $('#daydesp1').text(oj.weather[0].description);
          $('#tdayicon').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
          }
          if(oj.dt===nextnxtday){
            $('#tday1').text(getDayOfWeek(oj.dt_txt));
            $('#daytempfo1').text((oj.main.temp-273).toFixed(2)+'°C');
            $('#daydesp2').text(oj.weather[0].description);
            $('#tdayicon1').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
            }
            if(oj.dt===thirday){
              $('#tday2').text(getDayOfWeek(oj.dt_txt));
              $('#daytempfo2').text((oj.main.temp-273).toFixed(2)+'°C');
              $('#daydesp3').text(oj.weather[0].description);
              $('#tdayicon2').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
              }
          })
         
          
          
       });


                      /* $('#tday').text(getDayOfWeek(result.data.list[7].dt_txt));
                         $('#tday1').text(getDayOfWeek(result.data.list[19].dt_txt));
                         $('#tday2').text(getDayOfWeek(result.data.list[22].dt_txt));
                         $('#tdayicon').attr('src','https://openweathermap.org/img/w/'+result.data.list[7].weather[0].icon+'.png');
                         $('#tdayicon1').attr('src','https://openweathermap.org/img/w/'+result.data.list[19].weather[0].icon+'.png');
                         $('#tdayicon2').attr('src','https://openweathermap.org/img/w/'+result.data.list[22].weather[0].icon+'.png');
                         // $('#tempmin').text((result.data.main.temp_min-273).toFixed(2)+'°C');
                        // $('#tempmax').text((result.data.main.temp_max-273).toFixed(2)+'°C');
                        $('#daytempfo').text((result.data.list[7].main.temp-273).toFixed(2)+'°C');
                        $('#daytempfo1').text((result.data.list[19].main.temp-273).toFixed(2)+'°C');
                        $('#daytempfo2').text((result.data.list[22].main.temp-273).toFixed(2)+'°C');
                        $('#daydesp1').text(result.data.list[7].weather[0].description);
                        $('#daydesp2').text(result.data.list[19].weather[0].description);
                        $('#daydesp3').text(result.data.list[22].weather[0].description);*/
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error('AJAX call for search API failed:', textStatus, errorThrown);
          console.log(jqXHR.responseText);
        }
      });


          var cocode=result.data.sys.country;
        
          let currenttear = new Date().getFullYear();
          $.ajax({
            url: "libs/php/holiday.php",
            type: 'POST',
            dataType: 'json',
            data: { code: cocode, 
                    year:currenttear
            },
            success: function (result) {
             // console.log(JSON.stringify(result));
              let i=0;
              var $tableBody = $('#myTableBody');
              result.data.forEach(function(item) {
                var $tr = $('<tr>');
  
                ['date', 'localName', 'name', 'types'].forEach(function(key) {
                    var $td = $('<td>').attr('id', key).text(key);
                    var value = Array.isArray(item[key]) ? item[key].join(', ') : item[key];
                    var $p = $('<p>').text(value);
                    $td.append($p);
                    $tr.append($td);
                });
  
                $tableBody.append($tr);
            });
             
             
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error('AJAX call for search API failed:', textStatus, errorThrown);
              console.log(jqXHR.responseText); 
            }
          });
          
          
          $.ajax({
            url: "libs/php/contryinfodisplay.php",
            type: 'POST',
            dataType: 'json',
            data: { name: cocode },
            success: function (result) {
              //console.log(JSON.stringify(result));
              
              
                var coname=result.data[0].countryName;
                coname=encodeURIComponent(coname);
                $('#continentname').text(result.data[0].continentName);
                $('#countryname').text(result.data[0].countryName);
                $('#popu').text(result.data[0].population);
                $('#capital').text(result.data[0].capital);
                $('#languages').text(result.data[0].languages);
                $('#op').text(result.data[0].countryName);
                $('#cname').text(result.data[0].countryName);
                
                $.ajax({
                  url: "libs/php/searchApi.php",
                  type: 'POST',
                  dataType: 'json',
                  data: { name: coname },
                  success: function (result) {
                      if (result.status.name == "ok" && result.data.length > 0) {
                          latitu = result.data[0].lat;
                          longitu = result.data[0].lng;
              
                          
                        markers.clearLayers();
                  addMarkers(result.data, 'PCLI', {icon:countryMarker}, "Country");
                  addMarkers(result.data, 'PPLC', { icon:captialMarker}, "Capital City");
                  addMarkers(result.data, 'PPL', { icon:cityMarker}, "Area");
                  addMarkers(result.data, 'PPLA2', { icon:cityMarker}, "City");
                  addMarkers(result.data, 'AIRP', { icon:airportMarker}, "Airport");
                  addMarkers(result.data, 'LK', {icon:waterMarker}, "Lake");
                  addMarkers(result.data, 'RSD', { icon: L.icon({ iconUrl: 'libs/icon/railway.jpg', iconSize: [38, 38] }) }, "Railroad station");
                  addMarkers(result.data, 'HLL', { icon:hillMarker}, "Hill");
                  addMarkers(result.data, 'SEA', {icon:seaMarker}, "SEA");
                  addMarkers(result.data, 'VLC',{ icon:valcMarker}, "volcano");
                  addMarkers(result.data, 'HSP', { icon:hosMarker}, "Hospital");
                  addMarkers(result.data, 'UNIV', { icon:univMarker}, "University");
                  markers.addTo(map);
                    }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.error('AJAX call for search API failed:', textStatus, errorThrown);
                      console.log(jqXHR.responseText);
                    }
                  });
              
              $.ajax({
                url: "libs/php/wiki.php",
                type: 'POST',
                dataType: 'json',
                data: { name: coname },
                success: function (result) {
                  //console.log(JSON.stringify(result));
                  //var $row = $('#myRow');
                  //  var $td = $('<td>');
                  $('#imageofco').attr('src',result.data[0].thumbnailImg);
                  $('#despc').text(result.data[0].summary);
                  $('#titl').text(result.data[0].title);
                  $('#wikiurl').text(result.data[0].wikipediaUrl);
                  $('#imageofco1').attr('src',result.data[1].thumbnailImg);
                  $('#despc1').text(result.data[1].summary);
                  $('#titl1').text(result.data[1].title);
                  $('#wikiurl1').text(result.data[1].wikipediaUrl);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  console.error('AJAX call for search API failed:', textStatus, errorThrown);
                  console.log(jqXHR.responseText);
                }
              });
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error('AJAX call for country info failed:', textStatus, errorThrown);
              console.log(jqXHR.responseText); 
            }
          });
    
          
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error('AJAX call for coordinates failed:', textStatus, errorThrown);
          console.log(jqXHR.responseText); 
        }
      });
        
    


  }

  map.on('locationfound', onLocationFound);
  function onLocationError(e) {
    alert(e.message);
  }
  map.on('locationerror', onLocationError);

  layerControl = L.control.layers(basemaps).addTo(map);
  layerControl.addOverlay(citys, "Capital City");
  layerControl.addOverlay(airpo, "Airport");
  layerControl.addOverlay(cityl, "City");
  infoBtn1.addTo(map);
  weatherBtn.addTo(map);
  currencyBtn.addTo(map);
  wikiin.addTo(map);
  holi.addTo(map);
  var popup = L.popup();

  function onMapClick(e) {
    var clickedcountcde;
    var laungua;
   // console.log(e.latlng);
    var lati = e.latlng.lat;
    var longo = e.latlng.lng;
   // console.log(lati);
   
    $.ajax({
      url: "libs/php/getclickcountryinfo.php",
      type: 'POST',
      dataType: 'json',
      data: { latitu: lati, longi: longo },
      success: function(result) {
        //console.log(JSON.stringify(result.data));
        clickedcountry = result.data.countryName;
        clickedcountcde = result.data.countryCode;
        laungua = result.data.languages;
  
        popup
          .setLatLng(e.latlng)
          .setContent("Country Name: " + clickedcountry + "<br>Country Code: " + clickedcountcde + "<br>Languages: " + laungua)
          .openOn(map);
          //console.log("countryName:", clickedcountry);

         
        
       // console.log("clickedcountry:", clickedcountcde);
        
     
        clickedcountry = encodeURIComponent(clickedcountry);
       // console.log("countryName:", clickedcountry);

        $.ajax({
          url: "libs/php/searchApi.php",
          type: 'POST',
          dataType: 'json',
          data: { name: clickedcountry },
          success: function (result) {
              if (result.status.name == "ok" && result.data.length > 0) {
                  latitu = result.data[0].lat;
                  longitu = result.data[0].lng;
      
                 
        
                  markers.clearLayers();
                  addMarkers(result.data, 'PCLI', {icon:countryMarker}, "Country");
                  addMarkers(result.data, 'PPLC', { icon:captialMarker}, "Capital City");
                  addMarkers(result.data, 'PPL', { icon:cityMarker}, "Area");
                  addMarkers(result.data, 'PPLA2', { icon:cityMarker}, "City");
                  addMarkers(result.data, 'AIRP', { icon:airportMarker}, "Airport");
                  addMarkers(result.data, 'LK', {icon:waterMarker}, "Lake");
                  addMarkers(result.data, 'RSD', { icon: L.icon({ iconUrl: 'libs/icon/railway.jpg', iconSize: [38, 38] }) }, "Railroad station");
                  addMarkers(result.data, 'HLL', { icon:hillMarker}, "Hill");
                  addMarkers(result.data, 'SEA', {icon:seaMarker}, "SEA");
                  addMarkers(result.data, 'VLC',{ icon:valcMarker}, "volcano");
                  addMarkers(result.data, 'HSP', { icon:hosMarker}, "Hospital");
                  addMarkers(result.data, 'UNIV', { icon:univMarker}, "University");
                  markers.addTo(map);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX call for search API failed:', textStatus, errorThrown);
            console.log(jqXHR.responseText); 
          }
        });
        let currentyear = new Date().getFullYear();
        $.ajax({
          url: "libs/php/holiday.php",
          type: 'POST',
          dataType: 'json',
          data: { code: clickedcountcde, 
                  year:currentyear
          },
          success: function (result) {
            //console.log(JSON.stringify(result));
            let i=0;
            var $tableBody = $('#myTableBody');
            result.data.forEach(function(item) {
              var $tr = $('<tr>');

              ['date', 'localName', 'name', 'types'].forEach(function(key) {
                  var $td = $('<td>').attr('id', key).text(key);
                  var value = Array.isArray(item[key]) ? item[key].join(', ') : item[key];
                  var $p = $('<p>').text(value);
                  $td.append($p);
                  $tr.append($td);
              });

              $tableBody.append($tr);
          });
            
           
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX call for search API failed:', textStatus, errorThrown);
            console.log(jqXHR.responseText); 
          }
        });

        $.ajax({
          url: "libs/php/wiki.php",
          type: 'POST',
          dataType: 'json',
          data: { name: clickedcountry },
          success: function (result) {
            //console.log(JSON.stringify(result));
           
            $('#imageofco').attr('src',result.data[0].thumbnailImg);
            $('#despc').text(result.data[0].summary);
            $('#titl').text(result.data[0].title);
            $('#wikiurl').text(result.data[0].wikipediaUrl);
            $('#imageofco1').attr('src',result.data[1].thumbnailImg);
            $('#despc1').text(result.data[1].summary);
            $('#titl1').text(result.data[1].title);
            $('#wikiurl1').text(result.data[1].wikipediaUrl);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX call for search API failed:', textStatus, errorThrown);
            console.log(jqXHR.responseText); 
          }
        });

        $.ajax({
          url: "libs/php/contryinfodisplay.php",
          type: 'POST',
          dataType: 'json',
          data: { name: clickedcountcde },
          success: function(result) {
            //console.log(JSON.stringify(result));
            if (result.status.name == "ok" && result.data.length > 0) {

                    $('#continentname').text(result.data[0].continentName);
                    $('#countryname').text(result.data[0].countryName);
                    $('#popu').text(result.data[0].population);
                    $('#capital').text(result.data[0].capital);
                    $('#languages').text(result.data[0].languages);
                    var iljcname=result.data[0].countryName;
                    $('#op').text(iljcname).show();
                    $('#countrySelect option').each(function() {
                      
                      if ($(this).text() === iljcname) {
                          
                          $(this).prop('selected', true);
                        
                          return false;
                      }
                  });

                    $.ajax({
                      url: "libs/php/wheather.php",
                      type: 'POST',
                      dataType: 'json',
                      data: { latitude:lati,
                              longitude:longo
                
                      },
                      success: function(result) {
                        //console.log(JSON.stringify(result));
                        
                      
                        
                        $('#cname').text(iljcname);
                        $('#curenti').attr('src','https://openweathermap.org/img/w/'+result.data.weather[0].icon+'.png');
                       $('#weather').text(result.data.weather[0].description);
                       $('#temp').text((result.data.main.temp-273).toFixed(2)+'°C');
                       $('#feelli').text((result.data.main.feels_like-273).toFixed(2)+'°C');
                       $('#tempmin').text((result.data.main.temp_min-273).toFixed(2)+'°C');
                       $('#tempmax').text((result.data.main.temp_max-273).toFixed(2)+'°C');

                       $.ajax({
                        url: "libs/php/forcast.php",
                        type: 'POST',
                        dataType: 'json',
                        data: { latitude:e.latlng.lat,
                                longitude:e.latlng.lng
                        },
                        success: function(result) {
                          //console.log(JSON.stringify(result));
                          
                        
                         
                      
                          
                          
                          $('#forcas').attr('src','https://openweathermap.org/img/w/'+result.data.list[0].weather[0].icon+'.png');
                          $('#forcast').attr('src','https://openweathermap.org/img/w/'+result.data.list[1].weather[0].icon+'.png');
                          $('#forc').attr('src','https://openweathermap.org/img/w/'+result.data.list[2].weather[0].icon+'.png');
                           $('#time1for').text(gettime(result.data.list[0].dt));
                           $('#time2for').text(gettime(result.data.list[1].dt));
                           $('#time3for').text(gettime(result.data.list[2].dt));
                         $('#tempfo').text((result.data.list[0].main.temp-273).toFixed(2)+'°C');
                         $('#tempfo1').text((result.data.list[1].main.temp-273).toFixed(2)+'°C');
                         $('#tempfo2').text((result.data.list[2].main.temp-273).toFixed(2)+'°C');
                         $('#desp1').text(result.data.list[0].weather[0].description);
                         $('#desp2').text(result.data.list[1].weather[0].description);
                         $('#desp3').text(result.data.list[2].weather[0].description);
                
        
                         let currtime=result.data.list[0].dt;
                         Object.entries(result.data.list).forEach(obj => {
                          obj.forEach(oj=>{
                            let nextday=currtime+86400;
                          let nextnxtday=currtime+(2*86400);
                          let thirday=currtime+(3*86400);
                          if(oj.dt===nextday){
                          $('#tday').text(getDayOfWeek(oj.dt_txt));
                          $('#daytempfo').text((oj.main.temp-273).toFixed(2)+'°C');
                          $('#daydesp1').text(oj.weather[0].description);
                          $('#tdayicon').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                          }
                          if(oj.dt===nextnxtday){
                            $('#tday1').text(getDayOfWeek(oj.dt_txt));
                            $('#daytempfo1').text((oj.main.temp-273).toFixed(2)+'°C');
                            $('#daydesp2').text(oj.weather[0].description);
                            $('#tdayicon1').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                            }
                            if(oj.dt===thirday){
                              $('#tday2').text(getDayOfWeek(oj.dt_txt));
                              $('#daytempfo2').text((oj.main.temp-273).toFixed(2)+'°C');
                              $('#daydesp3').text(oj.weather[0].description);
                              $('#tdayicon2').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                              }
                          })
                         
                          
                          
                       });
                
                        /* $('#tday').text(getDayOfWeek(result.data.list[7].dt_txt));
                         $('#tday1').text(getDayOfWeek(result.data.list[19].dt_txt));
                         $('#tday2').text(getDayOfWeek(result.data.list[22].dt_txt));
                         $('#tdayicon').attr('src','https://openweathermap.org/img/w/'+result.data.list[7].weather[0].icon+'.png');
                         $('#tdayicon1').attr('src','https://openweathermap.org/img/w/'+result.data.list[19].weather[0].icon+'.png');
                         $('#tdayicon2').attr('src','https://openweathermap.org/img/w/'+result.data.list[22].weather[0].icon+'.png');
                         // $('#tempmin').text((result.data.main.temp_min-273).toFixed(2)+'°C');
                        // $('#tempmax').text((result.data.main.temp_max-273).toFixed(2)+'°C');
                        $('#daytempfo').text((result.data.list[7].main.temp-273).toFixed(2)+'°C');
                        $('#daytempfo1').text((result.data.list[19].main.temp-273).toFixed(2)+'°C');
                        $('#daytempfo2').text((result.data.list[22].main.temp-273).toFixed(2)+'°C');
                        $('#daydesp1').text(result.data.list[7].weather[0].description);
                        $('#daydesp2').text(result.data.list[19].weather[0].description);
                        $('#daydesp3').text(result.data.list[22].weather[0].description);*/
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                          console.error('AJAX call for search API failed:', textStatus, errorThrown);
                          console.log(jqXHR.responseText);
                        }
                      });
                
                        
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                        console.error('AJAX call failed:', textStatus, errorThrown);
                        console.log(jqXHR.responseText); 
                      }
                    });
                    
                } 



          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX call failed:', textStatus, errorThrown);
          }
        });
        
        
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('AJAX call failed:', textStatus, errorThrown);
      }
    });
  }


  map.on('click', onMapClick);

  $(window).on('load', function() {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function() {
            $(this).remove();
        });
    }
  });
});
