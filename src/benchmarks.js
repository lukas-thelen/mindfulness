import { uebungen } from "./Kursdaten/Uebungsliste"


export const benchmarks = {
    Ü1: {
        title: "Aller Anfang ist klein",
        goal: 1,
        description: "Führe deine erste Übung durch!",
        var: "meditations",
    },

    Ü5: {
        title: "Mühsam ernähert sich das Eichhörnchen!",
        goal: 5,
        description: "Führe mindestens 5 Übungen durch!",
        var: "meditations",
    },
    Ü10: {
        title: "Auf dem Weg zu etwas Großem!",
        goal: 10,
        description: "Führe mindestens 10 Übungen durch!",
        var: "meditations",
    },

    Ü50: {
        title: "Aufstrebende:r Held:in!",
        goal: 50,
        description: "Führe mindestens 50 Übungen durch!",
        var: "meditations",
    },
    Ü100: {
        title: "Auf dem richtigen Weg!",
        goal: 100,
        description: "Führe mindestens 100 Übungen durch!",
        var: "meditations",
    },

    Ü500: {
        title: "Legende",
        goal: 500,
        description: "Führe mindestens 500 Übungen durch!",
        var: "meditations",
    },
    Ü1000: {
        title: "Unstoppable!",
        goal: 1000,
        description: "Führe mindestens 1000 Übungen durch!",
        var: "meditations",
    },
    M10: {
        title: "Lehrling",
        goal: 10,
        description: "Übe mindestens 10 Minuten!",
        var: "meditationMinutes",
    },
    M30: {
        title: "Du investierst in dich!",
        goal: 30,
        description: "Übe mindestens 30 Minuten!",
        var: "meditationMinutes",
    },
    M60: {
        title: "Selfcare!",
        goal: 60,
        description: "Übe mindestens 60 Minuten!",
        var: "meditationMinutes",
    },
    M120: {
        title: "Die Zeit rennnt!",
        goal: 120,
        description: "Übe mindestens 2 Stunden!",
        var: "meditationMinutes",
    },
    M480: {
        title: "Selfcare Experte!",
        goal: 480,
        description: "Übe mindestens 8 Stunden!",
        var: "meditationMinutes",
    },
    M999: {
        title: "Timelord",
        goal: 999,
        description: "Übe mindestens 999 Minuten!",
        var: "meditationMinutes",
    },
    S7: {
        title: "Was ist schon eine Woche?",
        goal: 7,
        description: "Erreiche ein Tägliche Streak von 7 Tagen",
        var: "streak",
    },
    S30: {
        title: "Was ist schon ein Monat?",
        goal: 30,
        description: "Erreiche ein Tägliche Streak von 30 Tagen",
        var: "streak",
    },
    S365: {
        title: "Was ist schon ein Jahr?",
        goal: 365,
        description: "Erreiche ein Tägliche Streak von 365 Tagen",
        var: "streak",
    },

    V10Uhr: {
        title: "Der frühe Vogel",
        goal: 30,
        description: "Übe mindestens 30 Minuten vor 10 Uhr!",
        var: "meditationsEarly",
    },
    N20Uhr: {
        title: "Nachteule",
        goal: 30,
        description: "Übe mindestens 30 Minuten Nach 20 Uhr!",
        var: "meditationsLate",
    },
    N23Uhr: {
        title: "Die Nacht ist noch jung",
        goal: 1,
        description: "Schließe eine Übung nach 23 Uhr ab!",
        var: "meditationsNight",
    },
    E5: {
        title: "Entdecker:in",
        goal: 5,
        description: "Beende 5 verschiedene Übungen ein mal!",
        var: "xMeditations",
    },
    EAlle: {
        title: "Meisterhafte:r Entdecker:in!",
        goal: uebungen.length,
        description: "Beende jede Übung ein Mal!",
        var: "xMeditations",
    },
    xErfolge: {
        title: "Sammler!",
        goal: 1,
        description: "Schalte 10 Erfolge frei!",
        var: "benchmarks10",
    },
    R3:{
        title: "Übung mach den Meister!",
        goal: 3,
        description: "Wiederhole die selbe Übung 3 mal!",
        var: "maxRepeats",
    }

}

export const checkBenchmarks = (userData) => {
    var currentlyReached = []
    for (benchmark in benchmarks){
        if (!userData.benchmarks.benchmarksReached.includes(benchmark)){
            if (userData.benchmarks[benchmarks[benchmark].var] >= benchmarks[benchmark].goal){
                currentlyReached.push(benchmark)
            }
        }
    }
    return currentlyReached
}