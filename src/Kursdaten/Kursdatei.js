const KognitiveProzesseListe = [
    ExekutiveFunktionen = {
        Name: "Exekutive Funktionen",
        Beschreibung: "Zu den exekutiven Funktionen werden in der Neuropsychologie kognitive Prozesse gezählt, die unser Verhalten, unsere Emotionen und unsere Aufmerksamkeit gezielt steuern. Die exekutiven Funktionen haben direkten Einfluss auf unser Arbeitsgedächtnis, die Reaktionshemmung und die flexible Aufmerksamkeitssteuerung. \n\n"+
        "Das heißt im Klartext: Wir brauchen diese Funktionen besonders dann, wenn zielorientiertes und situationsangepasstes Handeln und Denken nötig sind. Wenn etwa gut eingespielte und automatisierte Handlungsabläufe nicht mehr zielführend sind, kommen die exekutiven Funktionen zum Einsatz, um das Verhalten an die neuen Anforderungen anzupassen. Aber auch wenn Reihenfolgen eingehalten werden müssen kommen diese Funktionen zum Tragen."
    },
    Stresswahrnehmung = {
        Name: "Stresswahrnehmung",
        Beschreibung: "Stress ist eines der üblichsten Trigger, wenn es um problematisches Gaming geht. Durch Stress kann sich eine Coping-Strategie entwickeln. Das bedeutet, dass Du bei Stressempfinden eher zum Gaming flüchtest. Außerdem teilen sich Stress und spezifische Suchtvorgänge bestimmte Hormone und stärken sich so gegenseitig.\n\n"+  
        "Viele unserer Übungen in dieser App gehen genau das an. Sie sollen unter anderem Dein Stressempfinden vermindern oder zumindest erträglicher machen: Indem Du Dein wahrgenommenes Stresslevel reduzierst, wirst Du möglicherweise seltener zum Controller greifen."
    },
    dispositionaleAchtsamkeit ={
        Name:"Dispositionale Achtsamkeit",
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
                Kategorie:"Meditationen",
                Beschreibung:"Mit dieser Übung wollen wir dich der Meditation etwas näher bringen. Der Fokus liegt hier bei deiner Aufmerksamkeit und Konzentration.",
                Info:"Das 3 Minuten Breathing Space bringt dich aus deinem eigentlich habitualisierten Verhalten bewusst in den jetzigen Moment. Diese Übung kann dann sehr hilfreich sein, wenn aufkommende negative Gedanken Dich in eine Abwärtsspirale zu ziehen drohen. Die Übung kann dir da gut helfen, weil Du durch sie, stressige Situation besser bewältigen kannst.\n"+  
                "Außerdem kannst du durch gezielte Aufmerksamkeit auf negative Emotionen bewusst agieren, statt unbewusst zu reagieren. ",
                KognitiveProzesse: [dispositionaleAchtsamkeit, Stresswahrnehmung],
                Allgemeines:"Der 3-Minuten-Breathing Space wird oft als „Mini-Meditation“ angesehen und eignet sich daher hervorragend für Meditationsneulinge und Anfänger. Ziel der Übung ist es aus automatischen Gedankenmustern, vor allem den negativen, auszubrechen und sich auf das Hier und Jetzt zu konzentrieren. Dabei wird der Fokus erst geweitet, dann konzentriert und im letzten Schritt wieder geweitet.",
                Herkunft:"Als Zindel Segal, John Teasdale und Mark Williams ihr MBCT-Therapieprogramm (mindfulness-based cognitive therapy) entwickelten, stießen sie auf das Problem, dass längere Meditationssitzungen zwar gute Effekte erzielten, es aber an Anwendungsmöglichkeiten für den Alltag fehlte. Der 3 Minuten Breathing Space entstand daher als Möglichkeit, die in den längeren, geführten Meditationssitzungen gewonnenen Fähigkeiten auch zwischen den Sitzungen und im Alltag zu trainieren und zu erhalten.\n\n"+
                "Teilnehmer berichteten, dass der 3 Minuten Breathing Space eine der wenigen Übungen war, die sie auch nach Beenden des Programms weiterhin regelmäßig anwendeten. ",
                Effekt:"Der erste Schritt führt mit dem Fokussieren der Aufmerksamkeit auf sich selbst und die eigenen Gedanken und Gefühle zu einem Auseinandersetzen mit diesen. Der zweite Schritt lenkt dann die Aufmerksamkeit allein auf die Atmung, was meist eine beruhigende Wirkung hat. Der Übergang von Schritt 1 zu 2 zielt auch darauf ab, mögliche aufkommende negative Gedanken und Gefühle loszulassen.\n\n"+ 
                "Der dritte Schritt weitet die Aufmerksamkeit wieder auf den gesamten Körper aus. Gewöhnlich erlaubt dieser Schritt eine angemessene Antwort auf die negativen Gedankenmuster, statt in ihnen stecken zu bleiben. ",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Lukas",
                        VersionenNachDauer:[
                            {Dauer:3, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/3minuteLukas.mp3"}
                            // Audiodateien in den Assets-Ordner packen und hier den Dateipfad via "require" spezifizieren. Require akzeptiert nur 
                            // static Strings also daher bitte einfach nur den Namen der Audiodatei anpassen
                        ]
                    },
                    {
                        Sprecher:"Lisa",
                        VersionenNachDauer:[
                            {Dauer:3, Dateipfad:"https://www-stud.uni-due.de/~smluthel/Übungen/3minuteLisa.mp3"}
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
                Allgemeines:"Die Grounding Exercices fassen eine große Spannweite an Übungen unter diesem Sammelbegriff zusammen. Das Ziel dieser Übung ist, dass die ausübende Person sich  „erden“ kann, sodass sie sich auf das Hier und Jetzt konzentriert. Eine dieser Übungen beinhaltet die Aufgabe, sich auf einen bestimmten der fünf Sinne gezielt zu konzentrieren und bewusst alle Sinneseindrücke wahrzunehmen.\n\n"+ 
                "Ziel der Übung ist es, in überwältigenden oder schwierigen Situationen von negativen Gedankenmustern loszukommen, in dem man sich nur auf das konzentriert, was man in genau diesem Moment hört, sieht, fühlt, riecht oder schmeckt.  ",
                Herkunft:"Da die Grounding Exercice viele unterschiedliche Übungen beschreiben, lässt sich eine genaue Herkunft nicht bestimmen. Da viele dieser Übungen aber meditativen Charakter haben, lässt sich annehmen, dass sie am Buddhismus angelehnt sind.",
                Effekt:"Als oftmals im meditativen Kontext angewendete Achtsamkeitstechnik lassen sich der Grounding Exercice vor allem die Positivität und das Lösen von negativen Gedanken/Gefühlen als Wirkungsweisen zuschreiben. Wer sich oft gestresst, überfordert oder von negativen Emotionen wie Angst und Wut überrollt fühlt, findet mit Grounding Exercises eine gute Antwort darauf. ",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Lukas",
                        VersionenNachDauer:[
                            {Dauer:4, Dateipfad:"https://www-stud.uni-due.de/~smluthel/Übungen/GroundingExKurzLukas.mp3"},
                            {Dauer:6, Dateipfad:"https://www-stud.uni-due.de/~smluthel/Übungen/GroundingExLangLukas.mp3"}
                        ]
                    },
                    {
                        Sprecher:"Lisa",
                        VersionenNachDauer:[
                            {Dauer:4, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/GroundingExKurzLisa.mp3"},
                            {Dauer:6, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/GroundingExLangLisa.mp3"}
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
                Allgemeines:"Abdominal Breathing oder auch Bauchatmen, ist eine Atemtechnik, die man immer gut in den Alltag integrieren kann, sich aber besonders mit einer gezielten Übung trainieren lässt.\n\n"+
                "Dabei wird nicht wie bei der unbewussten und automatisierten Atmung in die Brust, sondern bewusst in den Bauch geatmet. Die Hand auf dem Bauch dient zur Selbstkontrolle, um sicher zu stellen, dass man auch wirklich bis in den Bauch atmet. ",
                Herkunft:"Bauchatmen ist wie die meisten Atemübungen an den yogischen oder buddhistischen Vorläufern der Atemmediation angelehnt, durch wissenschaftliche Untersuchungen aber längst in verschiedensten medizinischen und therapeutischen Kontexten anerkannt und angewandt. ",
                Effekt:"In Stresssituationen neigen wir dazu, unregelmäßiger, schneller und damit weniger effektiv zu atmen, was zu einer Verschlimmerung der Stresssymptome führen kann. Abdominal Breathing versucht, genau diesen Prozess umzukehren und durch das kontrollierte Atmen in den Bauch für Entspannung zu sorgen. ",
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
                Name:"Geführte Meditation mit Klangschalen (kurz)",
                Audio: true,
                Kategorie:"Meditationen",
                Beschreibung:"In der folgenden Übung wird dir eine geführte Meditationsform gezeigt. Diese wird durch Klangschalen unterstützt.",
                Info:"Stress ist für die meisten Menschen ein allgegenwärtiger Begleiter, und in gewissen Mengen auch nicht gleich ungesund. Gewisse Bewältigungsstrategien (sogenannte „Coping-Mechanismen“), die wir alle bewusst oder unbewusst anwenden, um Stress zu vermeiden oder zu reduzieren, können sich aber negativ auf unsere Lebensqualität auswirken.\n"+ 
                "Diese geführte Klangschalen-Meditation soll Dir deshalb dabei helfen, den Alltagsstress auf gesunde Weise für eine Weile beiseite zu schieben. Die harmonischen Klänge fördern nachweislich unser Wohlbefinden. Bei häufigerem Ausüben wirst du möglicherweise feststellen, dass es Dir leichter fällt, Deinen Alltagsstress zu bewältigen und den Einsatz von weniger konstruktiven Bewältigungsstrategien zu vermindern. ",
                KognitiveProzesse: [Stresswahrnehmung],
                Allgemeines:"Bei der Klangschalen-Meditation handelt es sich um eine geführte Übung, bei der man von einer Stimme und den Klangschalen durch die Meditation begleitet wird. Der Fokus wird dabei ganz auf die Klänge und die Ausführung der Anweisungen gelegt.\n\n"+
                "Da es gerade für Meditationsneulinge oft schwierig ist, sich über die Dauer der Sitzung ausschließlich auf die Meditation zu konzentrieren, eignet sich die Klangschalen-Mediation hier besonders. Denn man ist für die Dauer der Mediation nicht mit seinen Gedanken und der Stille allein, was es schwieriger machen kann, sich zu konzentrieren. Sondern wird von den harmonischen Klängen begleitet, auf die die Aufmerksamkeit gelenkt wird. ",
                Herkunft:"Hauptsächlich aus dem Buddhismus bekannt, haben die Klangschalen seit kurzem aber auch vermehrt Anwendung in der westlichen Hemisphäre gefunden.\n\n"+
                "Die Klangschalen-Meditation hat ebenso wie die Klangschalen selbst ihren Ursprung in Tibet, China. Dort hat diese Art der Meditation eine lange Tradition: Die Klangschalen wurden so konzipiert, dass sie eine bestimme, wohlklingende Frequenz treffen, der eine positive Wirkung auf Körper und Geist nachgesagt wird. ",
                Effekt:"Der größte Bestandteil der Wirkung von Klangschalenmeditation ist die empfundene Entspannung. Ähnlich wie Musik unterschiedliche emotionale Veränderungen und Zustände begünstigen oder gar auslösen kann, so kann man durch die Klänge der Meditation tiefe Entspannung empfinden. Neulinge und Interessierte finden in der Klangschalenmeditation außerdem einen guten Einstieg in das Thema Meditation. ",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Lukas",
                        VersionenNachDauer:[
                            {Dauer:4, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/KlangschaleKurzLukas.mp3"},
                            {Dauer:7, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/KlangschaleMittelLukas.mp3"}
                        ]
                    },
                    {
                        Sprecher:"Lisa",
                        VersionenNachDauer:[
                            {Dauer:4, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/KlangschaleKurzLisa.mp3"},
                            {Dauer:7, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/KlangschaleMittelLisa.mp3"}
                        ]
                    }
                ]
            },
            {
                id:"PPKurs_2_2",
                Name:"Breathing Anchor",
                Audio: true,
                Kategorie:"Meditationen",
                Beschreibung:"Hier wird eine Atemübung in Kombination mit einem Ankerpunkt genutzt. Es hilft dir dabei dich zu konzentrieren. ",
                Info:"Der Breathing Anchor adressiert wie die meisten Atemübungen den Stress und seine Symptome: Die bewusste Aufmerksamkeitssteuerung hin zu der Stelle, an der Du den Atem am intensivsten wahrnimmst, hilft Dir, Deiner Atmung bewusster zu werden. Stress verursacht oft flachen Atem, welcher konstruktiv ist, weil er das Stress-Level noch weiter erhöht. Dass wir flach atmen, ist uns in dem Moment aber selten bewusst.\n"+  
                "Die aufmerksame Grundhaltung zu Deinem Atem, die Du in dieser Übung trainierst, soll sich auch auf Deinen Alltag übertragen und Dir eine achtsame Grundhaltung gegenüber Deinen Gefühlen und Gedanken vermitteln. ",
                KognitiveProzesse: [dispositionaleAchtsamkeit, Stresswahrnehmung],
                Allgemeines:"Beim Anchor Breathing handelt es sich um eine geführte Achtsamkeitsübung, bei der der Fokus auf dem Körper und dessen Wahrnehmungen und vor allem auf dem Atem liegt.\n\n"+ 
                "Man konzentriert sich dabei auf den Punkt im Körper, an dem man die Atmung am stärksten wahrnehmen kann – das ist der sogenannte Ankerpunkt. Während des Ein- und Ausatmens konzentriert man sich auf diesen Punkt, und sollten die Gedanken mal abschweifen, lenkt man die Aufmerksamkeit zu diesem Punkt zurück.\n\n"+   
                "Es kann außerdem hilfreich sein, die Hände am Ankerpunkt (etwa dem Bauch, der Nase oder dem Brustkorb) platziert, was es leichter macht, sich auf diesen Punkt zu konzentrieren. ",
                Herkunft:"Viele Achtsamkeitsübungen, wie auch das Anchor Breathing, sind modernisierte und abgewandelte Formen von Atemtechniken, die bereits seit tausenden Jahren in unterschiedlichsten Kulturen auf der ganzen Welt, etwa im alten Griechenland oder in Indien, gelehrt und angewandt wurden.\n\n"+
                "Heute haben Atemübungen durch in Studien nachgewiesene positive Effekte auch wissenschaftliche Anerkennung erlangt und finden in unterschiedlichsten Bereichen wie zum Beispiel der Physiotherapie Anwendung. ",
                Effekt:"Das Anchor Breathing eignet sich gut als Einstiegsübung in das weite Feld der Achtsamkeitstechniken, da die, für Übungen nötige, Konzentration gestärkt wird, indem man sich darauf trainiert, nur auf ein einzelnes Objekt, den Atem, zu fokussieren.\n\n"+ 
                "Weiterhin sind Bekämpfung von Stresssymptomen und die damit einhergehende Verbesserung des allgemeinen Wohlbefindens unbestrittene positive Effekte von Atemübungen, insbesondere dem Breathing Anchor. ",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Lukas",
                        VersionenNachDauer:[
                            {Dauer:8, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/BreathingAnchorLukas.mp3"}
                        ]
                    },
                    {
                        Sprecher:"Lisa",
                        VersionenNachDauer:[
                            {Dauer:8, Dateipfad:"https://www-stud.uni-due.de/~smluthel/Übungen/BreathingAnchorLisa.mp3"}
                        ]
                    }
                ]
            },
            {
                id:"PPKurs_2_3",
                Name:"Geführte Meditation mit Fokus Atem",
                Audio: true,
                Kategorie:"Meditationen",
                Beschreibung:"Bei dieser Übung wirst du geleitet. Hier konzentrieren wir uns auf den Atem.",
                Info:"Diese Mediation soll Dir helfen Deinen Stress-Level zu reduzieren. Allein durch das bewusste Beobachten des Atems wird sich Dein Empfinden verändern.\n"+  
                "Menschen, die gestresst sind, atmen in der Regel schneller und flacher. Also: Weniger effektiv. Denn unter Stress bereitet sich der Körper auf eine bevorstehende bedrohliche Situation vor. In dem Du Deinem Atem Aufmerksamkeit schenkst, wirst Du automatisch bewusster und möglicherweise langsamer atmen. Dadurch wird Dein Atem durch erhöhte Sauerstoffzufuhr effizienter und Dein Körper entspannt sich. \n"+
                "Zusätzlich kannst Du auch wichtige kognitive Funktionen, wie die Handlungsüberwachung, die Du ja auch für diese Übung brauchst, stärken. Denn sowie die meisten Meditationsformen Deine exekutiven Funktionen verbessern, hilft auch diese Atemübung Dir dabei, bewusster und gezielter Deine Aufmerksamkeit, sowie hier auf den Atem, zu steuern. ",
                KognitiveProzesse: [ExekutiveFunktionen, Stresswahrnehmung],
                Allgemeines:"Die geführte Atemmeditation besticht durch Einfachheit und Nutzen: Die durch das regelmäßige Ausführen der Atemmeditation erlernten Fähigkeiten, wie das bewusste Atmen und das Wahrnehmen des Kommens und Gehens der Gedanken, bereiten auf die anspruchsvolleren Achtsamkeitstechniken vor und sind darüber hinaus auch wichtige Alltagsfähigkeiten.\n\n"+
                "Sich in einer reizüberfluteten Welt auf nur ein Objekt zu konzentrieren, ist eine oft unterschätzte, aber wichtige Fähigkeit. Wer also seine Konzentration stärken und Stresssymptome mindern möchte, für den ist eine kurze Atemmeditation die richtige Lösung.",
                Herkunft:"Atemmeditationen sind aus dem Buddhismus oder dem Yoga bekannt. Pranayama ist eine der wohl bekanntesten Techniken aus dem indischen Yoga.\n\n"+  
                "Pranayama, dass sich grob übersetzt als „Atemkontrolle“ oder „Atemerweiterung“ übersetzen lässt, hat in seinen abgewandelten und moderneren Formen der westlichen Hemisphäre aber längst den esoterischen oder religiösen Charakter abgelegt. So konnten Studien den unterschiedlichen Atemübungen und -meditationen viele Verbesserungen der allgemeinen Gesundheit nachweisen.",
                Effekt:"Verbesserung der Konzentrationsfähigkeit wird neben dem Abbau von Stresssymptomen und einer erhöhten Sauerstoffversorgung des Körpers und des Gehirns zu den wichtigsten Wirkungsweisen von Atemmeditationen gezählt.",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Lukas",
                        VersionenNachDauer:[
                            {Dauer:3, Dateipfad:"https://www-stud.uni-due.de/~smluthel/Übungen/AtemKurzLukas.mp3"}
                        ]
                    },
                    {
                        Sprecher:"Lisa",
                        VersionenNachDauer:[
                            {Dauer:3, Dateipfad:"https://www-stud.uni-due.de/~smluthel/Übungen/AtemKurzLisa.mp3"}
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
                Name:"Geführte Meditation mit Fokus Atem (lang)",
                Audio: true,
                Kategorie:"Meditationen",
                Beschreibung:"Bei dieser Übung wirst du geleitet. Hier konzentrieren wir uns auf intensiver auf den Atem.",
                Info:"Diese Mediation soll Dir helfen Deinen Stress-Level zu reduzieren. Allein durch das bewusste Beobachten des Atems wird sich Dein Empfinden verändern.\n"+  
                "Menschen, die gestresst sind, atmen in der Regel schneller und flacher. Also: Weniger effektiv. Denn unter Stress bereitet sich der Körper auf eine bevorstehende bedrohliche Situation vor. In dem Du Deinem Atem Aufmerksamkeit schenkst, wirst Du automatisch bewusster und möglicherweise langsamer atmen. Dadurch wird Dein Atem durch erhöhte Sauerstoffzufuhr effizienter und Dein Körper entspannt sich. \n"+
                "Zusätzlich kannst Du auch wichtige kognitive Funktionen, wie die Handlungsüberwachung, die Du ja auch für diese Übung brauchst, stärken. Denn sowie die meisten Meditationsformen Deine exekutiven Funktionen verbessern, hilft auch diese Atemübung Dir dabei, bewusster und gezielter Deine Aufmerksamkeit, sowie hier auf den Atem, zu steuern. ",
                KognitiveProzesse: [ExekutiveFunktionen, Stresswahrnehmung],
                Allgemeines:"Die geführte Atemmeditation besticht durch Einfachheit und Nutzen: Die durch das regelmäßige Ausführen der Atemmeditation erlernten Fähigkeiten, wie das bewusste Atmen und das Wahrnehmen des Kommens und Gehens der Gedanken, bereiten auf die anspruchsvolleren Achtsamkeitstechniken vor und sind darüber hinaus auch wichtige Alltagsfähigkeiten.\n\n"+
                "Sich in einer reizüberfluteten Welt auf nur ein Objekt zu konzentrieren, ist eine oft unterschätzte, aber wichtige Fähigkeit. Wer also seine Konzentration stärken und Stresssymptome mindern möchte, für den ist eine kurze Atemmeditation die richtige Lösung.",
                Herkunft:"Atemmeditationen sind aus dem Buddhismus oder dem Yoga bekannt. Pranayama ist eine der wohl bekanntesten Techniken aus dem indischen Yoga.\n\n"+  
                "Pranayama, dass sich grob übersetzt als „Atemkontrolle“ oder „Atemerweiterung“ übersetzen lässt, hat in seinen abgewandelten und moderneren Formen der westlichen Hemisphäre aber längst den esoterischen oder religiösen Charakter abgelegt. So konnten Studien den unterschiedlichen Atemübungen und -meditationen viele Verbesserungen der allgemeinen Gesundheit nachweisen.",
                Effekt:"Verbesserung der Konzentrationsfähigkeit wird neben dem Abbau von Stresssymptomen und einer erhöhten Sauerstoffversorgung des Körpers und des Gehirns zu den wichtigsten Wirkungsweisen von Atemmeditationen gezählt.",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Lukas",
                        VersionenNachDauer:[
                            {Dauer:6, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/AtemLangLukas.mp3"}
                        ]
                    },
                    {
                        Sprecher:"Lisa",
                        VersionenNachDauer:[
                            {Dauer:6, Dateipfad:"https://www-stud.uni-due.de/~smluthel/Übungen/AtemLangLisa.mp3"}
                        ]
                    }
                ]
            },
            {
                id:"PKurs_3_2",
                Name:"Geführte Meditation mit Klangschalen (lang)",
                Audio: true,
                Kategorie:"Meditationen",
                Beschreibung:"Diese Übung ist eine intensivere Klangschalen Meditation.",
                Info:"Stress ist für die meisten Menschen ein allgegenwärtiger Begleiter, und in gewissen Mengen auch nicht gleich ungesund. Gewisse Bewältigungsstrategien (sogenannte „Coping-Mechanismen“), die wir alle bewusst oder unbewusst anwenden, um Stress zu vermeiden oder zu reduzieren, können sich aber negativ auf unsere Lebensqualität auswirken.\n"+ 
                "Diese geführte Klangschalen-Meditation soll Dir deshalb dabei helfen, den Alltagsstress auf gesunde Weise für eine Weile beiseite zu schieben. Die harmonischen Klänge fördern nachweislich unser Wohlbefinden. Bei häufigerem Ausüben wirst du möglicherweise feststellen, dass es Dir leichter fällt, Deinen Alltagsstress zu bewältigen und den Einsatz von weniger konstruktiven Bewältigungsstrategien zu vermindern. ",
                KognitiveProzesse: [Stresswahrnehmung],
                Allgemeines:"Bei der Klangschalen-Meditation handelt es sich um eine geführte Übung, bei der man von einer Stimme und den Klangschalen durch die Meditation begleitet wird. Der Fokus wird dabei ganz auf die Klänge und die Ausführung der Anweisungen gelegt.\n\n"+
                "Da es gerade für Meditationsneulinge oft schwierig ist, sich über die Dauer der Sitzung ausschließlich auf die Meditation zu konzentrieren, eignet sich die Klangschalen-Mediation hier besonders. Denn man ist für die Dauer der Mediation nicht mit seinen Gedanken und der Stille allein, was es schwieriger machen kann, sich zu konzentrieren. Sondern wird von den harmonischen Klängen begleitet, auf die die Aufmerksamkeit gelenkt wird. ",
                Herkunft:"Hauptsächlich aus dem Buddhismus bekannt, haben die Klangschalen seit kurzem aber auch vermehrt Anwendung in der westlichen Hemisphäre gefunden.\n\n"+
                "Die Klangschalen-Meditation hat ebenso wie die Klangschalen selbst ihren Ursprung in Tibet, China. Dort hat diese Art der Meditation eine lange Tradition: Die Klangschalen wurden so konzipiert, dass sie eine bestimme, wohlklingende Frequenz treffen, der eine positive Wirkung auf Körper und Geist nachgesagt wird. ",
                Effekt:"Der größte Bestandteil der Wirkung von Klangschalenmeditation ist die empfundene Entspannung. Ähnlich wie Musik unterschiedliche emotionale Veränderungen und Zustände begünstigen oder gar auslösen kann, so kann man durch die Klänge der Meditation tiefe Entspannung empfinden. Neulinge und Interessierte finden in der Klangschalenmeditation außerdem einen guten Einstieg in das Thema Meditation. ",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Lukas",
                        VersionenNachDauer:[
                            {Dauer:15, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/KlangschaleLangLukas.mp3"}
                        ]
                    },
                    {
                        Sprecher:"Lisa",
                        VersionenNachDauer:[
                            {Dauer:15, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/KlangschaleLangLisa.mp3"}
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
                Allgemeines:"Der Body Scan ist eine geführte Meditation, bei der man mit seiner Wahrnehmung den gesamten Körper durchleuchtet und versucht, alle Empfindungen ganz genau wahrzunehmen. Dabei wird der Fokus der Aufmerksamkeit nacheinander auf alle einzelnen Teile des Körpers gelenkt. Deshalb kann ein Body Scan je nach Genauigkeit der Durchführung und der Länge der Übung schwieriger als andere Achtsamkeitstechniken sein.\n\n"+ 
                "Wichtig bei einem Body Scan ist die Qualität der Aufmerksamkeit und der Umgang mit aufkommenden Empfindungen, Gefühlen oder Gedanken: Man sollte mit der gleichen Akzeptanz, die man den angenehmen Empfindungen entgegenbringt, auch den unangenehmen Empfindungen begegnen.\n\n"+ 
                "Bei der Durchführung der Übung kommt es immer wieder vor, dass die Gedanken abschweifen. Entscheidend ist, sich in einem solchen Fall nicht über die eigene Unkonzentriertheit zu ärgern, sondern auch das Abschweifen der Gedanken möglichst urteilslos wahrnehmen. Dann führt man den Fokus behutsam zum gewünschten Ziel der Aufmerksamkeit zurück.",
                Herkunft:"Der Body Scan entspringt der zweieinhalb Tausend Jahre alten Vipassana-Tradition aus dem Buddhismus, hat mittlerweile aber auch den Einzug in die westliche Welt gefunden. Zuletzt erlangte diese Achtsamkeitstechnik Popularität durch die Eingliederung der Übung in das MBSR-Programm (mindfulness-based stress reduction) von Jon Kabat-Zinn. Medizinprofessor Kabat-Zinn vereinte 1979 Wissenschaft und Meditation in seinem MBSR-Programm, welches auch Übungen wie den Body Scan beinhaltete. Heute wird MBSR in Kliniken und Gesundheitsinstitutionen weltweit angewendet.",
                Effekt:"Der Body Scan stärkt vor allem die Eigenwahrnehmung für den Körper enorm, festigt aber auch die Akzeptanz für alles Wahrgenommene und macht einem bewusst, dass man nicht sofort auf alle Reize reagieren muss.\n\n"+ 
                "Oft wird der Body Scan als reine Entspannungsübung verstanden. Auch wenn Entspannung ein positiver Nebeneffekt der Übung ist, ist diese nicht das eigentliche Ziel. Der Body Scan lehrt den Ausführenden, stiller und achtsamer Beobachter zu werden, denn gerade das urteilslose Wahrnehmen aller Empfindungen bringt die Einsicht mit sich, dass Schmerzen, Sorgen und negative Gedanken vorüber gehen.",
                VersionenNachSprecher:[
                    {
                        Sprecher:"Lukas",
                        VersionenNachDauer:[
                            {Dauer:23, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/BodyScanLukas.mp3"}
                        ]
                    },
                    {
                        Sprecher:"Lisa",
                        VersionenNachDauer:[
                            {Dauer:23, Dateipfad: "https://www-stud.uni-due.de/~smluthel/Übungen/BodyScanLisa.mp3"}
                        ]
                    }
                ]
            },
            {
                id:"PKurs_3_4",
                Name:"Mindful Meditation",
                Audio: false,
                Kategorie:"Meditationen",
                Beschreibung:"Suche Dir einen ruhigen Ort. Setze (oder lege) Dich hin und mache es Dir gemütlich. Wenn der Gong erklingt, schließe die Augen und richte Deine Wirbelsäule auf.\n"+ 
                "Achte auf die Stille um Dich herum und versuche Dich nicht zu bewegen. Wenn Gedanken aufkommen, dann versuche Deine Achtsamkeit wieder auf die Stille zu richten. Deine Gedanken sollten von Dir nicht beurteilt, nicht analysiert werden und du solltest versuchen nicht auf diese zu reagieren. Die Lücken zwischen den Gedanken werden mit der Zeit immer länger. Du kannst Dich auch auf Deine Atmung konzentrieren, wenn Gedanken aufkommen.\n"+
                "Wenn wieder ein Gong erklingt, dann öffne langsam Deine Augen. ",
                Info:"Mindfulness Meditation zeigt einen generellen Effekt auf die Exekutiven Funktionen. Denn Mindfulness Meditation stärkt die inhibitorische Kontrolle: Das bedeutet für Dich, Impulse oder Reaktionen bewusst zu hemmen oder zu kontrollieren und stattdessen durch logisches Denken und Aufmerksamkeit Antworten zu finden. Durch das Betreiben von Mindfulness  Meditation wirst Du besser in der Lage sein, unangemessene Reaktionen zu kontrollieren und besser mit diesen umzugehen. Auch aufkommende negative Emotionen kannst Du eher verarbeiten und Dich stattdessen auf das Hier und Jetzt konzentrieren.  ",
                KognitiveProzesse: [ExekutiveFunktionen, dispositionaleAchtsamkeit],
                Allgemeines:"Die ungeführte achtsame Meditation kann auf Grund des Fehlens einer Führung und je nach Länge der Übung anspruchsvoller als andere Achtsamkeitstechniken sein. Aber das ist auch so gewollt – denn die eigenen Gedanken zu kontrollieren, wenn keine Reize vorhanden sind, auf die sich die Aufmerksamkeit lenkt, erfordert Konzentration und vor allem Übung.\n\n"+
                "Ziel der Übung ist es, die Gedanken bei einem möglichen Abschweifen immer wieder zurück auf die Stille zu lenken. Es kann auch hilfreich sein, sich eine Weile nur auf den Atem zu konzentrieren. Wichtig ist, bei der Ausführung still zu liegen oder zu sitzen und aufkommende Gedanken nicht zu bewerten und nicht zu verfolgen. ",
                Herkunft:"Mindful Meditation ist eine der ältesten Meditationsformen und wohl am ehesten als im Schneidersitz verharrende, in sich gekehrt meditierende Person bekannt.\n\n"+
                "Allgemein aus dem Buddhismus oder dem Yoga bekannt, ist Mindfulness oder Achtsamkeit aber längst keine rein religiöse Eigenschaft mehr. Mehr noch ist es eine trainierbare Fähigkeit, die durch Jon Kabat-Zinn und sein MBSR-Programm Bekanntheit im wissenschaftlichen Kontext erlangte. ",
                Effekt:"Die Wirkungsweisen der Mindful Meditation gehen weit über reine Entspannung hinaus: Studien konnten belegen, dass durch das regelmäßige Ausführen von Achtsamkeitsmeditationen die Eigenwahrnehmung, Emotionskontrolle und –verarbeitung, so wie Konfliktlösungsfähigkeiten entscheidend gesteigert und verbessert werden können. ",
            }
        ] 
    },
    //mehr Kurse
]

export const sprecherBilder={
    Lukas:require("mindfulness/assets/Sprecher/Lukas.png"),
    Lisa:require("mindfulness/assets/Sprecher/Lisa.png"),
}