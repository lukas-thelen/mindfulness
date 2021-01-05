

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
    console.log(currentlyReached)
    return currentlyReached
}