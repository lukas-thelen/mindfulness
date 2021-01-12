  export const kurse =[
    {
        id:"PPKurs_1",
        Name:"Level 1",
        Ordnername:"Kurs1",
        Uebungen:[
            {
                id:"PPKurs_1_einführung",
                Name:"Breathing Space",
                Kategorie:"Mindfulness",
                Beschreibung:"Mit dieser Übung wollen wir dich der Meditation etwas näher bringen. Der Fokus liegt hier bei deiner Aufmerksamkeit und Konzentration.",
                Info:"Es geht bei dem Breathing Space um die Stärkung der Aufmerksamkeit und der Konzentration. Man bewältigt aufkommende negative Gefühle und Stresssymptome. Im ersten Schritt wird der Fokus auf aktuelle Gedanken, Gefühle und als Ganzes auf sich selbst gelenkt.Im zweiten Schritt richtet man seine Aufmerksamkeit auf seine Atmung.Im letzten Schritt weitet man seinen Fokus auf den kompletten Körper aus und die Atmung tritt in den Hintergrund.",
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
                id:"PPKurs_1_1",
                Name:"Grounding Exercise",
                Kategorie:"Körperübung",
                Beschreibung:"Hier wird dir eine Übung gezeigt, die dir dabei helfen wird deine Gedanken unter Kontrolle zu halten.",
                Info:"Diese Übung hilft dir, deine Aufmerksamkeit auf dich selber zu lenken – im Hier und Jetzt. Das Ziel der Übung ist es, negative Gedanken loszulassen. Die Intensität der Gefühle wird bei dieser Übung minimiert und durch den Fokus auf die fünf Sinne abgelenkt.Grounding Exercises helfen, von schwierigen Situationen nicht zu schnell überwältigt zu werden und den Körper und die Gedanken zu verknüpfen.",
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
                id:"PPKurs_1_2",
                Name:"Abdominal Breathing",
                Kategorie:"Atemübung",
                Beschreibung:"Hier wird der Fokus auf deinen Atem gelegt.",
                Info:"Abdominal Breathing oder auch Bauchatmen, ist eine Atemtechnik, die man immer gut in den Alltag integrieren kann, sich aber besonders mit einer gezielten Übung trainieren lässt. Dabei wird nicht wie bei der unbewussten und automatisierten Atmung in die Brust, sondern bewusst in den Bauch geatmet. Die Hand auf dem Bauch dient zur Selbstkontrolle, um sicher zu stellen, dass man auch wirklich bis in den Bauch atmet.",
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
        id:"PPKurs_2",
        Name:"Level 2",
        Ordnername:"Kurs2",
        Uebungen:[
            {
                id:"PPKurs_2_1",
                Name:"Geführte Meditation mit Klangschalen",
                Kategorie:"Mindfulness",
                Beschreibung:"In der folgenden Übung wird dir eine geführte Meditationsform gezeigt. Diese wird durch Klangschalen unterstützt.",
                Info:"Bei einer geführten Meditation mit Klangschalen wird man von einer Stimme bzw. Lehrer auf eine Meditation vorbereitet und in die Stille begleitet, in der man nur mit sich selbst und seinem Geist ist. Man wird angeleitet, Anweisungen aufmerksam zu folgen und in dieser Zeit meditieren zu lernen. Hier wird man zusätzlich durch beruhigende Klänge von Klangschalen begleitet.",
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
                id:"PPKurs_2_2",
                Name:"Breathing Anchor",
                Kategorie:"Atemübung",
                Beschreibung:"Hier wird eine Atemübung in Kombination mit einem Ankerpunkt genutzt. Es hilft dir dabei dich zu konzentrieren. ",
                Info:"Anchor Breathing ist eine Achtsamkeitstechnik, die die Konzentration mithilfe des Atems stärken soll. Dabei platziert man die Hände auf den Punkt, an dem man die Atmung am stärksten fühlen kann. Das ist der Anker Punkt. Während des Ein- und Ausatmens konzentriert man sich auf diesen Punkt und driften die Gedanken mal ab, fokussiert man sie zurück zu dem Punkt.",
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
                id:"PPKurs_2_3",
                Name:"Geführte Atemübung",
                Kategorie:"Atemübung",
                Beschreibung:"Bei dieser Übung wirst du geleitet. Hier konzentrieren wir uns auf den Atem.",
                Info:"Die geführte Atemmeditation besticht durch Einfachheit und Nutzen: Die durch das regelmäßige Ausführen der Atemmeditation erlernten Fähigkeiten, wie das bewusste Atmen und das Wahrnehmen des Kommens und Gehens der Gedanken, bereiten auf die anspruchsvolleren Achtsamkeitstechniken vor und sind darüber hinaus auch wichtige Alltagsfähigkeiten.",
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
    {
        id:"PPKurs_3",
        Name:"Level 3",
        Ordnername:"Kurs3",
        Uebungen:[
            {
                id:"PPKurs_3_1",
                Name:"Geführte Atemübung (mittel)",
                Kategorie:"Atemübung",
                Beschreibung:"Bei dieser Übung wirst du geleitet. Hier konzentrieren wir uns auf intensiver auf den Atem.",
                Info:"Die geführte Atemmeditation besticht durch Einfachheit und Nutzen: Die durch das regelmäßige Ausführen der Atemmeditation erlernten Fähigkeiten, wie das bewusste Atmen und das Wahrnehmen des Kommens und Gehens der Gedanken, bereiten auf die anspruchsvolleren Achtsamkeitstechniken vor und sind darüber hinaus auch wichtige Alltagsfähigkeiten. ",
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
                id:"PKurs_3_2",
                Name:"Geführte Meditation mit Klangschalen (mittel)",
                Kategorie:"Mindfulness",
                Beschreibung:"Diese Übung ist eine intensivere Klangschalen Meditation.",
                Info:"Bei einer geführten Meditation mit Klangschalen wird man von einer Stimme bzw. Lehrer auf eine Meditation vorbereitet und in die Stille begleitet, in der man nur mit sich selbst und seinem Geist ist. Man wird angeleitet, Anweisungen aufmerksam zu folgen und in dieser Zeit meditieren zu lernen. Hier wird man zusätzlich durch beruhigende Klänge von Klangschalen begleitet.",
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
                id:"PKurs_3_3",
                Name:"Body Scan",
                Kategorie:"Körperübung",
                Beschreibung:"Hier wird dein Bewusstsein trainiert mithilfe deines Körpers.",
                Info:"Der Body-Scan ist eine Achtsamkeitsübung, bei der einzelne Körperteile systematisch auf unterschiedliche Empfindungen, Gefühle oder Impulse „gescannt“ werden. Diese können angenehm, aber auch unangenehm sein. Diese Übung trainiert die Fähigkeit, den unangenehmen Empfindungen mit der gleichen Akzeptanz zu begegnen wie den angenehmen. Er ist keine Entspannungsübung, sondern ein Training des Bewusstseins.",
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
                id:"PKurs_3_4",
                Name:"Mindful Meditation",
                Kategorie:"Mindfulness",
                Beschreibung:"Hier sollst du dich auf deine Gedanken konzentrieren. Diese Übung hilft dir dir Selbst bewusster zu werden.",
                Info:"Ziel der Übung ist es, die Gedanken bei einem möglichen Abschweifen immer wieder zurück auf die Stille zu lenken. Es kann auch hilfreich sein, sich eine Weile nur auf den Atem zu konzentrieren. Wichtig ist, bei der Ausführung still zu liegen oder zu sitzen und aufkommende Gedanken nicht zu bewerten und nicht zu verfolgen. ",
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