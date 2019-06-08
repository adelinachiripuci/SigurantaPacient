var config = {};

function ajax(method, url, body, callback, rejectCallback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        if (typeof callback === "function") {
          callback(JSON.parse(this.responseText));
        }
      } else {
        if (typeof rejectCallback === "function") {
          rejectCallback(new Error("serverul a dat eroare"));
        }
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send(body);
};

function getQuestions() {

  ajax("GET", "https://ca2019-backend.herokuapp.com/api/form/1", undefined, function(answer) {
    config = answer;
    var sum = 0;
    for (var i in cart) {
      if (cart[i] === null) {
        continue
      };
      sum += Number(cart[i].quantity);
    }
    document.querySelector("#nr-of-prod-in-cart").innerHTML = "(" + sum + ")";
  })
}

function draw(config) {
  var str = '';
  for (var i = 0; i < config.length; i++) {
      if (config[i].type === "textarea" ) {
        str += `<div class="form-group">
                 <label>${config[i].label}
                 <textarea class="form-control" name="${config[i].name}" rows="${config[i].rows}"></textarea></label>
                 </div>`
      } else if (config[i].type === "radio" || config[i].type === "checkbox") {
        var radiobtn = ``;
        for (var j = 0; j < config[i].options.length; j++) {
          if(typeof config[i].options[j] === "string" || typeof config[i].options[j] === "number") {
            radiobtn += `<div class="form-check">
                <label class="form-check-label">
                  <input type="${config[i].type}" class="form-check-input" name="${config[i].name}" value="  ${config[i].options[j]}" >
                ${config[i].options[j]}
                  </label>
                </div>`
          } else {
            var sublist="";
            for(var k = 0; k < config[i].options[j].options.length; k++) {
              sublist+=`<div class="form-check">
                 <label class="form-check-label">
                   <input type="${config[i].options[j].type}" class="form-check-input" name="${config[i].name}" value=" ${config[i].options[j].label}" >
                 ${config[i].options[j].options[k]}
                   </label>
                 </div>`
            }
            radiobtn += `<div class="form-check">
                <label class="form-check-label">
                  <input type="${config[i].type}" class="form-check-input" name="${config[i].name}" value="  ${config[i].options[j]}" >
                   ${config[i].options[j].label}
                   ${sublist}
                  </label>
                </div>`
          }
        }
        str += `<fieldset class="form-group">
        <legend>${config[i].label}</legend>
        ${radiobtn}
        </fieldset>`
    } else if ( config[i].type === "text") {
      str += `  <input type="text" name="" value="">`
    } else if(config[i].type === "number") {
      str += `  <input type="number" name="" value="">`
    }
  }
  return str;
}



document.querySelector("#form").innerHTML = (draw([{
    "label": "Cine sunteti?",
    "type": "radio",
    "name": "cine_sunteti",
    "options": [
      "Persoana afectata",
      "Ruda, partener, sot al persoanei afectate",
      "Altcineva"
    ]
  },
  {
    "label": "De care etapa de ingrijire este legat evenimentul advers?",
    "type": "radio",
    "name": "etapa_eveniment",
    "options": [
      "In timpul efectuarii internarii",
      "Diagnosticului",
      "Tratament",
      "Externare",
      "Urmarirea post spitalizare",
      "Alt moment................."
    ]
  },
  {
    "label": "Care considerati ca este cauza evenimentul advers:",
    "type": "checkbox",
    "name": "eveniment_advers1",
    "options": [
      "Disponibilitatea personalului",
      "Coordonarea ingrijirilor",
      "Echipamente/dispozitive",
      "Infectii",
      "Probleme de comunicare",
      "Probleme legate de medicatie",
      "Inregistrarea datelor in documentele medicale",
      "Abilitatile personajului",
      "Timp prelungit de asteptare",
      "Abuz",
      "Altele"
    ]
  },
  {
    "label": "Va rugam sa descrieti ce s-a intamplat:",
    "type": "textarea",
    "name": "descrieti_intamplarea",
    "rows": 4
  },
  {
    "label": "Va rugam sa ne spuneti pentru ce afectiune era tratat pacientul:",
    "type": "textarea",
    "name": "spuneti_afectiunea",
    "rows": 4
  },
  {
    "label": "Considerați că pacientul a suferit o vătămare fizică sau psihologică?",
    "type": "radio",
    "name": "vatamare_pacient",
    "options": [
      "Da",
      "Nu"
    ]
  },
  {
    "label": "Cât de gravă a fost suferința pacientului determinată de evenimentul produs?",
    "type": "radio",
    "name": "gravitate_suferinta",
    "options": [
      "Pacientul a necesitat observare suplimentară sau tratament minor",
      "Pacientul a necesitat îngrijiri suplimentare sau efectuarea unor investigații suplimentare",
      "Pacientul a prezentat o vătămare permanentă sau de lungă durată",
      "Pacientul a decedat",
      "(varianta Pacientul nu a fost afectat – nu are sens daca a selectat Da la 6, altfel ar trebui să existe și această variantă)"
    ]
  },
  {
    "label": "Puteți detalia cum a fost afectat pacientul de această experiență?",
    "type": "text area",
    "name": "detaliati_experienta",
    "rows": 4
  },
  {
    "label": "Unde s-a produs evenimentul advers?",
    "type": "radio",
    "name": "eveniment_advers",
    "options": [
      "Cabinet medicina familiei",
      "Centru de permanență",
      "Îngrijiri la domiciliu",
      "Farmacie",
      "Cabinet dentar",
      "Cabinet specialitate în ambulatoriu",
      "Laborator analize medicale",
      "Centru imagistica/radiologie"
    ]
  },
  {
    "label": "Spital/secție de boli psihice",
    "type": "radio",
    "name": "spital_sectie",
    "options": [
      "Ambulatoriu – LSM",
      "Secție spital",
      "Unitate specială",
      "Curte",
      "Alte"
    ]
  },
  {
    "label": "Spital",
    "type": "radio",
    "name": "spital",
    "options": [
      "UPU/Cameră de gardă",
      "Cabinet ambulatoriu integrat",
      "Secție internare de zi",
      "Sala de operație",
      "Terapie intensivă",
      "Secție cu paturi (internare continuă)",
      "Curte",
      "Altele"
    ]
  },
  {
    "label": "Ambulanță/SMURD",
    "type": "radio",
    "name": "ambulanta",
    "options": [
      "În timpul convorbirii telefonice",
      "În timpul consultației la domiciliu",
      "În vehicul",
      "Alte"
    ]
  },
 {
  "label": "În ce spital s-a produs acest eveniment advers?",
  "type": "radio",
  "options": [
    "Lista spitale din țară – se selectează județ/localitatea aferenta acelui județ unde exista spitale/spitalul din orașul selectat; se poate alege soluția județ/spitalele din județ; se poate alege interfață pornind de la harta senzitivă cu județele",
    "Nu doresc să specific spitalul"
  ]

},
{
  "label": "Vă rugăm precizați ce tip de îngrijiri a primit pacientul în timpul internării?",
  "type": "checkbox",
  "name": "tip_ingrijiri",
  "options": [
    "Analize / investigații",
    "Diagnostic",
    "Tratament medical (de exemplu la cardiologie, oncologie etc)",
    "Îngrijiri obstetrică, ginecologie, fertilizare",
    "Tratament chirurgical",
    "Altele"
  ]
},
{
  "label": "Când s-a produs evenimentul?",
  "type": "radio",
  "name":"producere_eveniment",
  "options": [
    "Data:______",
    "Nu cunosc data"
  ]
},
{
  "label": "Când a observat pacientul că a avut loc evenimentul advers",
  "type": "radio",
  "name":"observare_pacient",
  "options": [
    "Imediat",
    "Mai târziu",
    "Mai târziu, dar nu cunosc data"
  ]
},
{
  "label": "În ce interval orar s-a produs evenimentul?",
  "type": "radio",
  "name":"interval",
  "options": [
    "Ziua (7,00 – 14,00)",
    "După-amiază (14,00-21,00)",
    "Noaptea (21,00-07,00)",
    "Nu cunosc"
  ]
},
{
  "label": "Ce categorii de personal au fost implicate în acest incident?",
  "type": "checkbox",
  "name":"categorii_personal",
  "options": [
    "Personal ambulanță",
    "Medic",
    "Asistență",
    " Moașă",
    "Infirmieră",
    "Optician",
    "Terapeut",
    "Chimist",
    "Farmacist",
    "Vizitator",
    "Nu cunosc",
    "Alții"

  ]
},
{
  "label": "Ați fost anunțat de personalul medical că a avut loc un eveniment advers asociat asistenței medicale?",
  "type": "radio",
  "name":"asociat_asistentei",
  "options": [
    "Da",
    "Nu",
    "Nu sunt sigur"

  ]
},
{
  "label": "Dacă ați fost anunțat, vi s-au precizat", "type": "checkbox",
  "name":"precizat",
  "options": [
    "cauzele",
    "consecințele posibile",
    "modificarea planului terapeutic",
    "măsuri necesare a fi urmate",
    "... alte "

  ]
},
{
  "label": "Sexul:",
  "type": "radio",
  "name":"sexul",
  "options": [
    "Masculin",
    "Feminin",
    "Nu cunosc"
  ]

},
{
  "label": "In ce grupă de vârstă poate fi încadrat pacientul?",
  "type": "radio",
  "name":"grupa_de_varsta",
  "options": [
    "Sub 1 an",
    "1-4 ani",
    "4-15 ani",
    "16-25 ani",
    "25-34 ani",
    "35-44 ani",
    "45-54 ani",
    "55-64 ani",
    "65-74 ani",
    "75-84 ani",
    "Peste 85 ani"
  ]
},
{
  "label": "Ați anunțat acest eveniment la alte instituții?",
  "type": "radio",
  "name":"ati_anuntat",
  "options": [
    "Nu",
    "Da"
  ]

},
{
  "label": "Completati Institutia:",
  "type": "text",
  "name":"completati_institutia"
},
{
  "label": "Doriți să ne mai spuneți ceva legat de acest eveniment advers?",
  "type": "textarea",
  "name":"altceva",
  "rows":4

},
{
  "label": "Considerați că acest sistem de anunțare al evenimentelor adverse este util? (Vă rugăm apreciați de la 0 la 5, unde 0=nu este util; 5= foarte util)     [sau scală 1-5]",
  "type": "radio",
  "name":"este_util",
  "options": [
    0, 1, 2, 3, 4, 5
  ]

}

]))
