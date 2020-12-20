export const kurse =[
    {
        id:"hhdbl23bl",
        Name:"Level 1",
        Ordnername:"Level_eins",
        Uebungen:[
            {
                id:"884hkjsdudgfwer",
                Name:"Einführung",
                Kategorie:"Mindfulness",
                Beschreibung:"eine sehr tolle Übung. Hier schreibe ich mal einen Text hin, der mehr als eine Zeile beansprucht, damit wir mal ausprobieren können, wie das aussieht",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Der Weihnachtsmann",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"EinführungW3.mp3"}
                        ]
                    },
                    {
                        Sprecher:"Das Christkind",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"EinführungC3.mp3"},
                            {Dauer:7, Dateiname:"EinführungC7.mp3"}
                        ]
                    },
                    //mehr Sprecher
                ]
            },
            {
                id:"fgsfhgjhr8hjd",
                Name:"Atemübung 1",
                Kategorie:"Atemübung",
                Beschreibung:"auch eine sehr tolle Übung. ",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Klaus",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname: require(".\\assets\\Atem1K3.mp3")} 
                            // muss hier wenn die Dateien im assets Ordner sind als "require" Returnwert sein, für den Audio-Player
                        ]
                    },
                    {
                        Sprecher:"Claudia",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"Atem1C3.mp3"},
                            {Dauer:7, Dateiname:"Atem1C7mp3"},
                            {Dauer:13, Dateiname:"Atem1C13.mp3"},
                        ]
                    },
                    //mehr Sprecher
                ]
            },
            //mehr Übungen
        ]
    },
    //mehr Kurse
]