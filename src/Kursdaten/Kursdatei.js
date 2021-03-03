const KognitiveProzesseListe = [
    ExekutiveFunktionen = {
        Name: "Exekutive Funktionen",
        Beschreibung: "Zu den exekutiven Funktionen werden in der Neuropsychologie kognitive Prozesse gezählt, die unser Verhalten, unsere Emotionen und unsere Aufmerksamkeit gezielt steuern. Die exekutiven Funktionen haben direkten Einfluss auf unser Arbeitsgedächtnis, die Reaktionshemmung und die flexible Aufmerksamkeitssteuerung. \n\n"+
        "Das heißt im Klartext: Wir brauchen diese Funktionen besonders dann, wenn zielorientiertes und situationsangepasstes Handeln und Denken nötig sind. Wenn etwa gut eingespielte und automatisierte Handlungsabläufe nicht mehr zielführend sind, kommen die exekutiven Funktionen zum Einsatz, um das Verhalten an die neuen Anforderungen anzupassen. Aber auch wenn Reihenfolgen eingehalten werden müssen kommen diese Funktionen zum Tragen."
    },
    Stresswahrnehmung = {
        Name: "Stresswahrnehmung",
        Beschreibung: "Stress ist eines der üblichsten Trigger, wenn es um problematisches Gaming geht. Durch Stress kann sich eine Coping-Strategie entwickeln. Das bedeutet, dass Du bei Stressempfinden eher zum Gaming flüchtest. Außerdem teilen sich Stress und spezifische Suchtvorgänge bestimmte Hormone und stärken sich so gegenseitig.\n\n"+  
        "Viele unserer Übungen in dieser App gehen genau das an. Sie sollen unter anderem Dein Stressempfinden vermindern oder zumindest erträglicher machen: Indem Du Dein wahrgenommenes Stresslevel reduzierst, wirst Du möglicherweise seltener zum Controller greifen.  "
    },
    dispositionaleAchtsamkeit ={
        Name:"dispositionale Achtsamkeit",
        Beschreibung: "Durch die Stärkung Deiner dispositionellen Achtsamkeit wird die Entwicklung einer Sucht erschwert. Dispositionelle Achtsamkeit greift durch non-reactivity den Trigger an: Siehst Du zum Beispiel eine Werbung zu Deiner bevorzugten Gaming-Plattform oder Deinem Lieblingsspiel, wirst Du bestimmt schon mal festgestellt haben, dass Dein Verlangen zu Spielen sich gerade erhöht hat. Die Werbung ist in diesem Fall der Trigger, der eine Reaktion, nämlich das Verlangen, auslöst. Deine durch dispositionelle Achtsamkeit gestärkte non-reactivity kann diese Reaktion schwächen: Dadurch wirst Du resistenter gegen Trigger und seltener rückfällig."  
    }
]
  export const kurse =[
    {
        id:"PPKurs_1",
        Name:"Level 1",
        Ordnername:"Kurs1",
        Uebungen:[
            {
                id:"PPKurs_1_einführung",
                Name:"Breathing Space",
                Audio: true,
                Kategorie:"Mindfulness",
                Beschreibung:"Mit dieser Übung wollen wir dich der Meditation etwas näher bringen. Der Fokus liegt hier bei deiner Aufmerksamkeit und Konzentration.",
                Info:"Das 3 Minuten Breathing Space bringt dich aus deinem eigentlich habitualisierten Verhalten bewusst in den jetzigen Moment. Diese Übung kann dann sehr hilfreich sein, wenn aufkommende negative Gedanken Dich in eine Abwärtsspirale zu ziehen drohen. Die Übung kann dir da gut helfen, weil Du durch sie, stressige Situation besser bewältigen kannst.\n"+  
                "Außerdem kannst du durch gezielte Aufmerksamkeit auf negative Emotionen bewusst agieren, statt unbewusst zu reagieren. ",
                KognitiveProzesse: [dispositionaleAchtsamkeit, Stresswahrnehmung],
                VersionenNachSprecher:[
                    {
                        Sprecher:"männlich",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"EinführungM3.mp3", Dateipfad: require("../../assets/Kurs1/3MinutenLukas.mp3")}
                            // Audiodateien in den Assets-Ordner packen und hier den Dateipfad via "require" spezifizieren. Require akzeptiert nur 
                            // static Strings also daher bitte einfach nur den Namen der Audiodatei anpassen
                        ]
                    },
                    {
                        Sprecher:"weiblich",
                        VersionenNachDauer:[
                            {Dauer:3, Dateiname:"EinführungF3.mp3", Dateipfad: require("../../assets/Kurs1/3MinutenLisa.mp3")}
                        ]
                    },
                    //mehr Sprecher
                ]
            },
            {
                id:"PPKurs_1_1",
                Name:"Grounding Exercise",
                Audio: true,
                Kategorie:"Körperübung",
                Beschreibung:"Hier wird dir eine Übung gezeigt, die dir dabei helfen wird deine Gedanken unter Kontrolle zu halten.",
                Info:"Die Grounding Exercises ziehen Deine Aufmerksamkeit auf bestimmte Objekte und Momente. Dadurch bekommst Du eine objektivere Sicht auf die Geschehnisse und reduzierst Deine emotionale Involvierung. Das führt zu einer Verbesserung Deiner Emotionsregulation. Denn Du wirst in der Lage sein, mit negativen Emotionen besser umzugehen, anstatt Dich von ihnen kontrollieren zu lassen. ",
                KognitiveProzesse: [ExekutiveFunktionen, dispositionaleAchtsamkeit],
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
                Audio: false,
                Kategorie:"Atemübung",
                Beschreibung:"1) Setze oder Lege dich in eine bequeme Position, deinem Bett oder einer flachen Unterlage.\n\n"+
                "2) Entspanne deine Schultern. \n\n"+ 
                "3) Lege eine Hand auf deine Brust und die andere auf deinen Bauch.  \n\n"+ 
                "4) Atme mit deiner Nase für 2 Sekunden ein. Du solltest jetzt bemerken, wie die Luft durch deine Nase fließt bis hin zu deinem Bauch. Die Hand auf deinem Bauch sollte sich heben, während die Hand auf deiner Brust still liegen bleibt. \n\n"+ 
                "5) Atme die Luft durch deinen Mund für 2 Sekunden aus. Die Hand auf deinem Bauch sollte sich jetzt senken. \n\n"+ 
                "6) Diese Schritte kannst du beliebig oft wiederholen ",
                Info:"Das „Bauchatmen“ in dieser Übung dient dem Abbau von Stress und der Förderung Deiner achtsamen Grundhaltung, der sogenannten dispositionellen Achtsamkeit.\n"+ 
                "In dieser Übung sollst du Deine Aufmerksamkeit bewusst auf Deinen Atem lenken und ihn nicht nur beobachten, sondern auch gezielt Steuern. Dieses gezielte Steuern des Atems hat einen nachweisbaren Einfluss auf das autonome Nervensystem, welches Herzschlag, Stoffwechsel, Kreislauf und viele weitere wichtige Körperfunktionen reguliert. Wenn Du Deine Atmung bewusst kontrollierst, wirst Du bemerken, wie auch Deine Herzfrequenz sich verringert und Du entspannst.\n"+ 
                "Zusätzlich liefert Dir diese Übung auch weitere Vorteile im Bereich der dispositionellen Achtsamkeit: Die bewusste Steuerung der normalerweise automatisierten Atmung schärft Deine Aufmerksamkeit für den Atem. Durch regelmäßiges Üben wirst Du Dir Deiner Atmung vielleicht auch im Alltag öfter gewahr, und denkst in stressigen Situationen eher daran, einfach mal durchzuatmen. ",
                KognitiveProzesse: [dispositionaleAchtsamkeit, Stresswahrnehmung],
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
                Audio: true,
                Kategorie:"Mindfulness",
                Beschreibung:"In der folgenden Übung wird dir eine geführte Meditationsform gezeigt. Diese wird durch Klangschalen unterstützt.",
                Info:"Stress ist für die meisten Menschen ein allgegenwärtiger Begleiter, und in gewissen Mengen auch nicht gleich ungesund. Gewisse Bewältigungsstrategien (sogenannte „Coping-Mechanismen“), die wir alle bewusst oder unbewusst anwenden, um Stress zu vermeiden oder zu reduzieren, können sich aber negativ auf unsere Lebensqualität auswirken.\n"+ 
                "Diese geführte Klangschalen-Meditation soll Dir deshalb dabei helfen, den Alltagsstress auf gesunde Weise für eine Weile beiseite zu schieben. Die harmonischen Klänge fördern nachweislich unser Wohlbefinden. Bei häufigerem Ausüben wirst du möglicherweise feststellen, dass es Dir leichter fällt, Deinen Alltagsstress zu bewältigen und den Einsatz von weniger konstruktiven Bewältigungsstrategien zu vermindern. ",
                KognitiveProzesse: [Stresswahrnehmung],
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
                Audio: true,
                Kategorie:"Atemübung",
                Beschreibung:"Hier wird eine Atemübung in Kombination mit einem Ankerpunkt genutzt. Es hilft dir dabei dich zu konzentrieren. ",
                Info:"Der Breathing Anchor adressiert wie die meisten Atemübungen den Stress und seine Symptome: Die bewusste Aufmerksamkeitssteuerung hin zu der Stelle, an der Du den Atem am intensivsten wahrnimmst, hilft Dir, Deiner Atmung bewusster zu werden. Stress verursacht oft flachen Atem, welcher konstruktiv ist, weil er das Stress-Level noch weiter erhöht. Dass wir flach atmen, ist uns in dem Moment aber selten bewusst.\n"+  
                "Die aufmerksame Grundhaltung zu Deinem Atem, die Du in dieser Übung trainierst, soll sich auch auf Deinen Alltag übertragen und Dir eine achtsame Grundhaltung gegenüber Deinen Gefühlen und Gedanken vermitteln. ",
                KognitiveProzesse: [dispositionaleAchtsamkeit, Stresswahrnehmung],
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
                Audio: true,
                Kategorie:"Atemübung",
                Beschreibung:"Bei dieser Übung wirst du geleitet. Hier konzentrieren wir uns auf den Atem.",
                Info:"Diese Mediation soll Dir helfen Deinen Stress-Level zu reduzieren. Allein durch das bewusste Beobachten des Atems wird sich Dein Empfinden verändern.\n"+  
                "Menschen, die gestresst sind, atmen in der Regel schneller und flacher. Also: Weniger effektiv. Denn unter Stress bereitet sich der Körper auf eine bevorstehende bedrohliche Situation vor. In dem Du Deinem Atem Aufmerksamkeit schenkst, wirst Du automatisch bewusster und möglicherweise langsamer atmen. Dadurch wird Dein Atem durch erhöhte Sauerstoffzufuhr effizienter und Dein Körper entspannt sich. \n"+
                "Zusätzlich kannst Du auch wichtige kognitive Funktionen, wie die Handlungsüberwachung, die Du ja auch für diese Übung brauchst, stärken. Denn sowie die meisten Meditationsformen Deine exekutiven Funktionen verbessern, hilft auch diese Atemübung Dir dabei, bewusster und gezielter Deine Aufmerksamkeit, sowie hier auf den Atem, zu steuern. ",
                KognitiveProzesse: [ExekutiveFunktionen, Stresswahrnehmung],
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
                Audio: true,
                Kategorie:"Atemübung",
                Beschreibung:"Bei dieser Übung wirst du geleitet. Hier konzentrieren wir uns auf intensiver auf den Atem.",
                Info:"Diese Mediation soll Dir helfen Deinen Stress-Level zu reduzieren. Allein durch das bewusste Beobachten des Atems wird sich Dein Empfinden verändern.\n"+  
                "Menschen, die gestresst sind, atmen in der Regel schneller und flacher. Also: Weniger effektiv. Denn unter Stress bereitet sich der Körper auf eine bevorstehende bedrohliche Situation vor. In dem Du Deinem Atem Aufmerksamkeit schenkst, wirst Du automatisch bewusster und möglicherweise langsamer atmen. Dadurch wird Dein Atem durch erhöhte Sauerstoffzufuhr effizienter und Dein Körper entspannt sich. \n"+
                "Zusätzlich kannst Du auch wichtige kognitive Funktionen, wie die Handlungsüberwachung, die Du ja auch für diese Übung brauchst, stärken. Denn sowie die meisten Meditationsformen Deine exekutiven Funktionen verbessern, hilft auch diese Atemübung Dir dabei, bewusster und gezielter Deine Aufmerksamkeit, sowie hier auf den Atem, zu steuern. ",
                KognitiveProzesse: [ExekutiveFunktionen, Stresswahrnehmung],
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
                Audio: true,
                Kategorie:"Mindfulness",
                Beschreibung:"Diese Übung ist eine intensivere Klangschalen Meditation.",
                Info:"Stress ist für die meisten Menschen ein allgegenwärtiger Begleiter, und in gewissen Mengen auch nicht gleich ungesund. Gewisse Bewältigungsstrategien (sogenannte „Coping-Mechanismen“), die wir alle bewusst oder unbewusst anwenden, um Stress zu vermeiden oder zu reduzieren, können sich aber negativ auf unsere Lebensqualität auswirken.\n"+ 
                "Diese geführte Klangschalen-Meditation soll Dir deshalb dabei helfen, den Alltagsstress auf gesunde Weise für eine Weile beiseite zu schieben. Die harmonischen Klänge fördern nachweislich unser Wohlbefinden. Bei häufigerem Ausüben wirst du möglicherweise feststellen, dass es Dir leichter fällt, Deinen Alltagsstress zu bewältigen und den Einsatz von weniger konstruktiven Bewältigungsstrategien zu vermindern. ",
                KognitiveProzesse: [Stresswahrnehmung],
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
                Audio: true,
                Kategorie:"Körperübung",
                Beschreibung:"Hier wird dein Bewusstsein trainiert mithilfe deines Körpers.",
                Info:"Der Body Scan stärkt wie ein Konzentrationstraining deine „exekutiven Funktionen“. Unter diese Funktionen fallen viele Skills die für unser normales Funktionieren im Alltag unabdingbar sind. Das längere Fokussieren auf Deine Körperwahrnehmungen verbessert nicht nur Deine Konzentrationsfähigkeit an sich, sondern erhöht auch die Handlungsüberwachung, das sogenannte „Monitoring”: Das hilft uns dabei, uns erfolgreich an sich ändernde Umstände im Alltag anzupassen. \n"+ 
                "Beim regelmäßigen Üben wirst du möglicherweise auch eine Erhöhung deiner inhibitorischen Kontrolle bemerken. Das bedeutet, dass du resistenter gegen Reize Deiner Umwelt wirst, und nicht gleich auf sie reagieren musst. Ein Verlangen zu Spielen, das unserer Produktivität manchmal im Weg steht, kommt im Alltag so weniger stark zum Tragen.\n"+                
                "Des Weiteren hilft dir diese Übung, Deine dispositionelle Achtsamkeit zu verbessern: Diese Eigenschaft beschreibt Deine Fähigkeit, eine achtsame Grundhaltung zu wahren, sodass Du Deinen Alltag bewusster erlebst und wahrnimmst. Dispositionelle Achtsamkeit ist eng mit den exekutiven Funktionen verknüpft. In dieser Übung achtsam und urteilslos gegenüber Deinen Körperwahrnehmungen und Gedanken zu sein, hilft Dir, eine achtsamere und bewusstere Grundhaltung im Alltag zu haben und deine kognitiven Skills zu stärken. ",
                KognitiveProzesse: [ExekutiveFunktionen, dispositionaleAchtsamkeit],
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
                Audio: false,
                Kategorie:"Mindfulness",
                Beschreibung:"Suche Dir einen ruhigen Ort. Setze (oder lege) Dich hin und mache es Dir gemütlich. Wenn der Gong erklingt, schließe die Augen und richte Deine Wirbelsäule auf.\n"+ 
                "Achte auf die Stille um Dich herum und versuche Dich nicht zu bewegen. Wenn Gedanken aufkommen, dann versuche Deine Achtsamkeit wieder auf die Stille zu richten. Deine Gedanken sollten von Dir nicht beurteilt, nicht analysiert werden und du solltest versuchen nicht auf diese zu reagieren. Die Lücken zwischen den Gedanken werden mit der Zeit immer länger. Du kannst Dich auch auf Deine Atmung konzentrieren, wenn Gedanken aufkommen.\n"+
                "Wenn wieder ein Gong erklingt, dann öffne langsam Deine Augen. ",
                Info:"Mindfulness Meditation zeigt einen generellen Effekt auf die Exekutiven Funktionen. Denn Mindfulness Meditation stärkt die inhibitorische Kontrolle: Das bedeutet für Dich, Impulse oder Reaktionen bewusst zu hemmen oder zu kontrollieren und stattdessen durch logisches Denken und Aufmerksamkeit Antworten zu finden. Durch das Betreiben von Mindfulness  Meditation wirst Du besser in der Lage sein, unangemessene Reaktionen zu kontrollieren und besser mit diesen umzugehen. Auch aufkommende negative Emotionen kannst Du eher verarbeiten und Dich stattdessen auf das Hier und Jetzt konzentrieren.  ",
                KognitiveProzesse: [ExekutiveFunktionen, dispositionaleAchtsamkeit],
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
