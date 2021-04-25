//--------------------------------------------------------------- MINI HOMEWORK 2 ----------------------------------------------------------------------------------
//FUNZIONE PER INSERIRE DINAMICAMENTE GLI ELEMENTI NEL MIO SITO
function inizializza(){
    let i=0;
    for(let elemento of contenuti){
        let container = document.createElement('div');
        container.classList.add('container');
        container.setAttribute('id',[i]);
        const immagine = document.createElement('img');
        immagine.src=elemento.immagine;
        immagine.classList.add('Sfondo');
        const title = document.createElement('h1');
        title.textContent = elemento.titolo;
        title.classList.add('Titolo')
        const bottone = document.createElement('button');
        bottone.classList.add('pulsante');
        bottone.textContent = '+ Dettagli';
        const preferiti = document.createElement('img');
        preferiti.src=elemento.preferiti;
        preferiti.classList.add('preferiti2');
        const descrizione = document.createElement('p');
        descrizione.textContent= elemento.descrizione;
        descrizione.classList.add('hidden');
        const section = document.querySelector('#griglia');
        section.appendChild(container);
        container.appendChild(preferiti);
        container.appendChild(immagine);
        container.appendChild(title);
        container.appendChild(bottone);
        container.appendChild(descrizione);
        i++;
    }
    }
    inizializza();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

//FUNZIONE MOSTRA-NASCONDI DETTAGLI
function MoreDetails(event){
    const pulsante = event.currentTarget;
    const box = pulsante.parentNode;
    const dettagli = box.querySelector('p');
    
    Visibile = !Visibile;
    if(Visibile){
        dettagli.classList.remove('hidden');
        dettagli.classList.add('descrizione')
        pulsante.textContent= '- Dettagli';
        box.classList.add('bordoPlus')
    }
    else{
        dettagli.classList.add('hidden');
        dettagli.classList.remove('descrizione');
        pulsante.textContent= '+ Dettagli';
        box.classList.remove('bordoPlus')
    }
    }


let Visibile = false;
const AllDetails = document.querySelectorAll(".pulsante");
for(Detail of AllDetails){
    Detail.addEventListener('click' , MoreDetails)
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------


//FUNZIONE BARRA DEI PREFERITI

function preferenze(event){
    const barrapreferiti = document.querySelector('.preferiti');
    barrapreferiti.classList.remove('hidden');
    const stellaplus = event.currentTarget;
    const box = stellaplus.parentNode;
    
    const Sfondo = box.querySelector('.Sfondo');
    const Titolo = box.querySelector('.Titolo');

    let container = document.createElement('div');
    container.classList.add('blocco');
    container.setAttribute('id',box.id);
    const stellaless = document.createElement('img');
    stellaless.src='stellameno.png';
    stellaless.classList.add('stella');
    const icona = document.createElement('img');
    icona.src=Sfondo.src;
    icona.classList.add('icona');
    const title = document.createElement('p');
    title.textContent=Titolo.textContent;
    title.classList.add('testo');

    barrapreferiti.appendChild(container);
    container.appendChild(stellaless);
    container.appendChild(icona);
    container.appendChild(title);
    
    stellaplus.classList.add('hidden');
    
    conta++;
    stellaless.addEventListener('click',rimuoviPreferenze);
    event.stopPropagation();
}


function rimuoviPreferenze(event){
    const stellaless = event.currentTarget;
    const box = stellaless.parentNode;
    const containers = document.querySelectorAll('.container');
    for(container of containers){
        if(box.id === container.id){
            const stellaplus = container.querySelector('img');
            stellaplus.classList.remove('hidden');
        }
    } 
    box.remove();
    conta--;
    if(conta===0){
        document.querySelector('.preferiti').classList.add('hidden');
    }
}

let conta=0;
const allAggiungi = document.querySelectorAll(".preferiti2");
for(aggiungi of allAggiungi){
    aggiungi.addEventListener('click' , preferenze)
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

//FUNZIONE BARRA DI RICERCA
function ricerca(event){

    const input = event.currentTarget;
    const filtro = input.value.toUpperCase();
    const griglia = document.querySelector("#griglia");
    const box = document.querySelectorAll(".container");
    
    for(let z=0 ; z < box.length ; z++){
        let item = box[z];
        let testo = item.querySelector("h1").textContent;
        console.log(item);
        
       if(testo.toUpperCase().indexOf(filtro) > -1){
             item.classList.remove("hidden");
        }
        else{
             item.classList.add("hidden");
        }
    }
}



const input = document.querySelector('#cerca');
input.addEventListener('keyup',ricerca);


//------------------------------------------------------------------------ MINI HOMEWORK 3 -----------------------------------------------------------------------------

//FUNZIONE + API LIBRO IN REGALO    ----> API ottenute da openlibrary.org
function onJson(json){
    console.log('JSON ricevuto');
    console.log(json);
    const sezione= document.getElementById('free-gift');
    sezione.style.height='1800px';
    const library = document.querySelector('#library-view');
    library.innerHTML=''; 
    let num_results = json.num_found 
    if(num_results > 6){
        num_results=6;
    } 
    
    for(let i=0; i<num_results;i++){
        const doc = json.docs[i]
        const title = doc.title;  
        const isbn=doc.isbn[0]; 
        const cover_url = 'http://covers.openlibrary.org/b/isbn/'+isbn+'-M.jpg';
    
    if(doc.isbn){
    const book = document.createElement('div');
    book.classList.add('book');
    const img = document.createElement('img');
    img.src=cover_url;
    const caption = document.createElement('span');
    caption.textContent=title;
    const disponibilità = document.createElement('h3');
    let si_no = Math.random()*(100-0)+0;

    if(si_no >= 60){
    disponibilità.textContent='DISPONIBILE';
    disponibilità.classList.add('disponibile');
    }
    else{
        disponibilità.textContent='NON DISPONIBILE';
    disponibilità.classList.add('non_disponibile');
    }
    book.appendChild(img);
    book.appendChild(caption);
    book.appendChild(disponibilità);
    library.appendChild(book);   
    }

    else{   
        console.log('ISBN non trovato,salto');
        continue;
    }
}
}

function onResponse(response){
    if(!response.ok){
        console.log('Risposta non valida');
        return null;
    }else return response.json();
}


function search(event){
    event.preventDefault(); 
    const libro_input = document.querySelector('#libro');      
    const libro_value = encodeURIComponent(libro_input.value);
    if(!libro_value){
        alert("inserisci testo nella barra di ricerca");
    } 
    else{
    console.log('Eseguo ricerca:'+ libro_value);
    const rest_url='http://openlibrary.org/search.json?title='+libro_value; 
    console.log('URL:'+rest_url);
    fetch(rest_url)
    .then(onResponse)
    .then(onJson)
    }
}
 
const form1=document.querySelector('#form1');
form1.addEventListener('submit',search);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE + API METEO   ---> API ottenute da weatherstack


function onResponse1(response){
    if(!response.ok){
        console.log('Risposta non valida');
        return null;
    }else return response.json();
}

function onJson1(json){
    console.log(json)
    const visualizza_meteo = document.querySelector('#visualizza_meteo');
    visualizza_meteo.innerHTML='';
    const location = json.location;
    const current=json.current;

    const icona = current.weather_icons[0];
    const orario = location.localtime;
    const temperatura = current.temperature;
    const prob_precipitazione = current.precip;
    const umidità = current.humidity;

    const o = document.createElement('p');
    o.innerText='Data e Ora : '+orario;
    
    const t = document.createElement('p');
    t.innerText='Temperatura : '+temperatura+'°C';

    const u = document.createElement('p');
    u.innerText='umidità : '+umidità +'%';

    const pp= document.createElement('p');
    pp.innerText=('Probabilità Precipitazione : '+prob_precipitazione+'%');

    const i = document.createElement('img');
    i.src=icona;

    visualizza_meteo.appendChild(o);
    visualizza_meteo.appendChild(t);
    visualizza_meteo.appendChild(u);
    visualizza_meteo.appendChild(pp);
    visualizza_meteo.appendChild(i);

    if(prob_precipitazione>=0.5){
        const effettua = document.createElement('h1');
        effettua.innerText='Spedizione Sconsigliata';
        effettua.classList.remove('spedizione_consigliata');
        effettua.classList.add('spedizione_sconsigliata');
        visualizza_meteo.appendChild(effettua)
    }
    else if(prob_precipitazione<0.5){
        const effettua = document.createElement('h1');
        effettua.innerText='Spedizione Consigliata';
        effettua.classList.remove('spedizione_sconsigliata');
        effettua.classList.add('spedizione_consigliata');
        visualizza_meteo.appendChild(effettua)
    }
}

function search_meteo(event){
    event.preventDefault();     
    const provincia = document.querySelector('#provincia').value
    const meteo_request = end_point + '?access_key='+ client_secret+'&query='+ provincia + '&region=Sicilia' ;
    console.log('Inviata richiesta :' + meteo_request);
    fetch(meteo_request)
    .then(onResponse1)
    .then(onJson1);
}

const end_point = 'http://api.weatherstack.com/current';
const client_secret ='13fba4989021ef024fc749944bb6c63b';
const form2=document.querySelector('#form2');
form2.addEventListener('submit',search_meteo);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE + API COVID19 ottenute da disease.sh

function onResponse2(response){
    if(!response.ok){
        console.log('Risposta non valida');
        return null;
    }else return response.json();
}

function onJson2(json){
    console.log(json);
    const info_covid = document.querySelector('#dati_covid19');
    const Nazione = json.country;
    const casi_totali = json.cases;
    const casi_oggi = json.todayCases;
    const attualmente_attivi = json.active;
    const morti = json.deaths;
   
   const p1 =  document.createElement('p');
   p1.innerText='Nazione: '+Nazione;

   const p2= document.createElement('p');
   p2.innerText = 'Casi totali: '+casi_totali;

   const p3=document.createElement('p');
   p3.innerText='Morti totali: '+morti;

   const p4=document.createElement('p');
   p4.innerText='Casi ultime 24 ore: '+casi_oggi;

   const p5=document.createElement('p');
   p5.innerText='Attualmente Positivi: '+attualmente_attivi;

   info_covid.appendChild(p1);
   info_covid.appendChild(p2);
   info_covid.appendChild(p3);
   info_covid.appendChild(p4);
   info_covid.appendChild(p5);
    
}

const richiesta_dati_covid19 = 'https://disease.sh/v3/covid-19/countries/italia?yesterday=true&twoDaysAgo=false&strict=true&allowNull=true';
fetch(richiesta_dati_covid19)
.then(onResponse2)
.then(onJson2)

