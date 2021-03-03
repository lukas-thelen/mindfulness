const array =[
    require("mindfulness/assets/Personen/Junge_1_blau.png"),
    require("mindfulness/assets/Personen/Junge_1_pink.png"),
    require("mindfulness/assets/Personen/Junge_2_hellblau.png"),
    require("mindfulness/assets/Personen/Junge_2_pink.png"),
    require("mindfulness/assets/Personen/Junge_3_dunkelblau.png"),
    require("mindfulness/assets/Personen/Junge_3_pink.png"),
    require("mindfulness/assets/Personen/Mädchen_1_dunkelblau.png"),
    require("mindfulness/assets/Personen/Mädchen_1_hellblau.png"),
    require("mindfulness/assets/Personen/Mädchen_2_dunkelblau.png"),
    require("mindfulness/assets/Personen/Mädchen_2_hellblau.png"),
    require("mindfulness/assets/Personen/Mädchen_3_dunkelblau.png"),
    require("mindfulness/assets/Personen/Mädchen_3_pink.png"),
]

const getRnd=()=>{
    return array[Math.floor(Math.random()*12)]
}

export const randomPerson = getRnd()