export const kurse =[
    {
        id:"hhdbl23bl",
        Name:"Level 1",
        Ordnername:"Kurs1",
        Uebungen:[
            {
                id:"884hkjsdudgfwer",
                Name:"Einführung",
                Kategorie:"Mindfulness",
                Beschreibung:"eine sehr tolle Übung. Hier schreibe ich mal einen Text hin, der mehr als eine Zeile beansprucht, damit wir mal ausprobieren können, wie das aussieht",
                Info:"Info über die Übung",
                VersionenNachSprecher:[
                    {
                        Sprecher:"männlich",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"EinführungM3.mp3", Dateipfad: require("../../assets/Kurs1/EinführungM3.mp3")},
                            {Dauer:5, Dateiname:"EinführungM5.mp3", Dateipfad: require("../../assets/Kurs1/EinführungM5.mp3")}
                            // Audiodateien in den Assets-Ordner packen und hier den Dateipfad via "require" spezifizieren. Require akzeptiert nur 
                            // static Strings also daher bitte einfach nur den Namen der Audiodatei anpassen
                        ]
                    },
                    {
                        Sprecher:"weiblich",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"EinführungF3.mp3", Dateipfad: require("../../assets/Kurs1/EinführungF3.mp3")},
                            {Dauer:7, Dateiname:"EinführungF7.mp3", Dateipfad: require("../../assets/Kurs1/EinführungF7.mp3")}
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
                Info:"Info über die Übung",
                VersionenNachSprecher:[
                    {
                        Sprecher:"männlich",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"Übung1M3.mp3", Dateipfad: require("../../assets/Kurs1/Übung1M3.mp3")},
                            {Dauer:5, Dateiname:"Übung1M5.mp3", Dateipfad: require("../../assets/Kurs1/Übung1M5.mp3")}
                        ]
                    },
                    {
                        Sprecher:"weiblich",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"Übung1F3.mp3", Dateipfad: require("../../assets/Kurs1/Übung1F3.mp3")}
                        ]
                    },
                    //mehr Sprecher
                ]
            },
            {
                id:"fufu89894ufhfh",
                Name:"Mindfulness-Übung 1",
                Kategorie:"Mindfulness",
                Beschreibung:"die nächste sehr tolle Übung",
                Info:"Info über die Übung",
                VersionenNachSprecher:[
                    {
                        Sprecher:"männlich",
                        VersionenNachDauer:[
                            {Dauer:7, Dateiname:"Übung2M7.mp3", Dateipfad: require("../../assets/Kurs1/Übung2M7.mp3")}
                        ]
                    },
                    {
                        Sprecher:"weiblich",
                        VersionenNachDauer:[
                            {Dauer:8, Dateiname:"Übung2F8.mp3", Dateipfad: require("../../assets/Kurs1/Übung2F8.mp3")}
                        ]
                    }
                ]
            },
            //mehr Übungen
        ]
    },
    {
        id:"giiebfecvcd",
        Name:"Level 2",
        Ordnername:"Kurs2",
        Uebungen:[
            {
                id:"popfjfvcvezet4556",
                Name:"Mindfulness-Übung 2",
                Kategorie:"Mindfulness",
                Beschreibung:"Wow! Noch eine sehr tolle Übung",
                Info:"Info über die Übung",
                VersionenNachSprecher:[
                    {
                        Sprecher:"männlich",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"K2Übung1M3.mp3", Dateipfad: require("../../assets/Kurs2/K2Übung1M3.mp3")},
                            {Dauer:8, Dateiname:"K2Übung1M8.mp3", Dateipfad: require("../../assets/Kurs2/K2Übung1M8.mp3")}
                        ]
                    },
                    {
                        Sprecher:"weiblich",
                        VersionenNachDauer:[
                            {Dauer:2, Dateiname:"K2ÜbungF2.mp3", Dateipfad: require("../../assets/Kurs2/K2Übung1F2.mp3")}
                        ]
                    }
                ]
            },
            {
                id:"0495hhf74fbfbS04",
                Name:"Atemübung 2",
                Kategorie:"Atemübung",
                Beschreibung:"So langsam reichts aber mit den tollen Übungen",
                Info:"Info über die Übung",
                VersionenNachSprecher:[
                    {
                        Sprecher:"männlich",
                        VersionenNachDauer:[
                            {Dauer:2, Dateiname:"K2Übung2M2.mp3", Dateipfad: require("../../assets/Kurs2/K2Übung2M2.mp3")}
                        ]
                    },
                    {
                        Sprecher:"weiblich",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"K2ÜbungF3.mp3", Dateipfad: require("../../assets/Kurs2/K2Übung2F3.mp3")}
                        ]
                    }
                ]
            }
        ] 
    },
    //mehr Kurse
]