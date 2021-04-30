document.addEventListener('DOMContentLoaded', () => {
    let hipo = document.querySelector(".hipo");
    let boles = document.querySelector(".boles");
    let horitzontal=0;
    let vertical=0;
    let balls=30;
    let punts=0;
    let altura=hipo.clientHeight;
    let amplada=hipo.clientWidth;
    let colors=["red","blue","yellow","green"];
    hipo.style.top = 50 + "vh";
    hipo.style.left = 50 + "vw";
    /// Creacio de boles
    function generateBalls(balls){
        let grogaCreada=false; /// Utilitzo un bool per comprobar que al menys es generi una bola correcta
        for (i=0;i<balls;i++)
        {
            let bola=document.createElement("div");
            bola.classList.add("bola");
            bola.style.top=(5+85*Math.random())+"vh";/// posar una posicio vertical random
            bola.style.left=(5+85*Math.random())+"vw";///posar una posicio horitzontal random
            let tamany=(2+13*Math.random())+"vh";
            bola.style.height=tamany; /// Posar el tamany
            bola.style.width=tamany;
            bola.style.backgroundColor=colors[parseInt((4*Math.random()))];/// posar un color random
            boles.appendChild(bola);
            if (bola.style.backgroundColor=="yellow")grogaCreada=true; // Si la bola creada es groga, activo el bool.
        }
        if (!grogaCreada) generateBalls(balls); /// Si no s'ha creat cap bola groga, torna a cridar la funció.
        return boles=document.getElementsByClassName("bola");        
    }
    boles=generateBalls(balls);
    // Control de marges
    function validaMarges()
        {
            if (vertical-altura/2<=0)vertical=0+altura/2;
            else if (vertical+altura/2>=window.innerHeight) vertical=window.innerHeight-altura/2;
            if (horitzontal-amplada/2<=0)horitzontal=0+amplada/2;
            else if (horitzontal+amplada/2>=window.innerWidth) horitzontal=window.innerWidth-amplada/2;
        }  
    // Control de punts
    function puntuacio(bola)
    {
        let punts=1;
        if (bola.style.backgroundColor!="yellow") punts=-1;
        return punts;
    }    
    //Control de col·lisió
    function detectarXoc(boles)
    {
        for(i=0;i<boles.length;i++)
        {
            if(
                (hipo.offsetTop < boles[i].offsetTop+boles[i].clientHeight) && 
                (hipo.offsetTop+altura > boles[i].offsetTop) &&
                (hipo.offsetLeft+amplada > boles[i].offsetLeft) &&
                (hipo.offsetLeft < boles[i].offsetLeft+boles[i].clientWidth)
            )
            {
                punts=punts+puntuacio(boles[i]);
                boles[i].remove();
            } 
        }   
        return boles; 
    }
    // Control de final de joc
    function detectarFinal(boles)
    {
        let final=true;
        for (i=0;i<boles.length&&final;i++)
        {
            if (boles[i].style.backgroundColor=="yellow") final=false;
        }
        return final;
    }
    // Mostrar resultat del joc
    function mostraResultat(punts,boles){
        boles.remove();
        hipo.remove();
        let veredicte;
        if (punts>0) veredicte=document.getElementById("win");
        else veredicte=document.getElementById("loose");
        veredicte.innerHTML+="<h2>Puntuació: "+punts+" </h2>";
        veredicte.style.display="block";
    }
    //Control per ratolí
    document.addEventListener('mousemove', function(ev){   
        horitzontal=ev.clientX;
        vertical=ev.clientY;
        validaMarges();
        hipo.style.left = horitzontal - amplada/2 + "px";
        hipo.style.top  = vertical - altura/2 + "px";
        boles=detectarXoc(boles);
        if (detectarFinal(boles)) mostraResultat(punts,document.querySelector(".boles"));
    },false);
},false);