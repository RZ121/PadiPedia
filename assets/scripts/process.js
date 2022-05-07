const userInput = {};

const diagnose_btn = document.querySelector(".btn-form");
diagnose_btn.addEventListener("click", () => {
    const input1 = document.getElementsByName("gejala_akar");
    for(ga of input1){
        if(ga.checked){
            userInput["GA"] = ga.value;
        }
    }
    const input2 = document.getElementsByName("gejala_batang");
    for(gb of input2){
        if(gb.checked){
            userInput["GB"] = gb.value;
        }
    }
    const input3 = document.getElementsByName("gejala_daun");
    for(gd of input3){
        if(gd.checked){
            userInput["GD"] = gd.value;
        }
    }
    const input4 = document.getElementsByName("gejala_umum");
    for(gu of input4){
        if(gu.checked){
            userInput["GU"] = gu.value;
        }
    }
    getHama();
});

function getHama(){
    fetch("../assets/data/ruleSet.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        let working_memory = {};
        data["set1"].forEach(rule => {
            const keys = Object.keys(rule["gejala"]);
            let count = 0;
            for(kategori of keys){
                if(userInput[kategori]){
                    working_memory[kategori] = userInput[kategori];
                    if(userInput[kategori] !== rule["gejala"][kategori]){
                        break;
                    }else{
                        count++;
                    }
                }
                if(count === keys.length){
                    working_memory["hama"] = rule["hama"];
                }
            }
        });
        // console.log(working_memory["hama"]);
        showDiagnoseResult(working_memory["hama"]);
    });
}