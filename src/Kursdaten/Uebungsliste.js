import {kurse} from "./Kursdatei.js"


const uebungsListe =()=>{
    var uebungenTemp =[]
    var uebung={}
    for(var i=0; i<kurse.length; i++){
        for(var j=0;j<kurse[i].Uebungen.length;j++){
            uebung=kurse[i].Uebungen[j]
            uebung.KursIndex=i
            uebung.UebungsIndex=j
            uebung.Name = kurse[i].Uebungen[j].Name
            uebung.Kategorie = kurse[i].Uebungen[j].Kategorie
            uebungenTemp.push(uebung)
        }
    }
    return uebungenTemp
} 

export const uebungen = uebungsListe()