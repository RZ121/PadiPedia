const userInput = {};
const userInputCf = {};

const diagnose_btn = document.querySelector(".btn-form");
diagnose_btn.addEventListener("click", () => {
    const input1 = document.getElementsByName("gejala_akar");
    for(ga of input1){
        if(ga.checked){
            userInput["GA"] = ga.value;
            const GAcf = document.getElementById("GA-cf");
            userInputCf["GA"] = GAcf.value;
        }
    }
    const input2 = document.getElementsByName("gejala_batang");
    for(gb of input2){
        if(gb.checked){
            userInput["GB"] = gb.value;
            const GBcf = document.getElementById("GB-cf");
            userInputCf["GB"] = GBcf.value;
        }
    }
    const input3 = document.getElementsByName("gejala_daun");
    for(gd of input3){
        if(gd.checked){
            userInput["GD"] = gd.value;
            const GDcf = document.getElementById("GD-cf");
            userInputCf["GD"] = GDcf.value;
        }
    }
    const input4 = document.getElementsByName("gejala_umum");
    for(gu of input4){
        if(gu.checked){
            userInput["GU"] = gu.value;
            const GUcf = document.getElementById("GU-cf");
            userInputCf["GU"] = GUcf.value;
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
        let working_memoryCf = {};
        data["set1"].forEach(rule => {
            const keys = Object.keys(rule["gejala"]);
            let count = 0;
            for(kategori of keys){
                if(!working_memory[kategori]){
                    if(userInput[kategori]){
                        working_memory[kategori] = userInput[kategori];
                        working_memoryCf[kategori] = userInputCf[kategori];
                        if(userInput[kategori] !== rule["gejala"][kategori]){
                            break;
                        }else{
                            count++;
                        }
                    }
                }else{
                    if(working_memory[kategori] === rule["gejala"][kategori]){
                        count++;
                    }else{
                        break;
                    }
                }
                if(count === keys.length){
                    working_memory["hama"] = rule["hama"];
                    working_memory["CFrule"] = rule["cf"];
                }
            }
        });
        const keys = Object.keys(working_memoryCf);
        let minimumCf = working_memoryCf[keys[0]];
        for(key of keys){
            if(minimumCf > working_memoryCf[key]){
                minimumCf = working_memoryCf[key];
            }
        }
        const certaintyValue = (minimumCf * working_memory["CFrule"]).toFixed(2);
        showDiagnoseResult(working_memory["hama"],certaintyValue);
    });
}

function getHamaUnlistedRule(){
  //Fungsi direncanakan untuk eksekusi proses diagnosa yang tidak terdaftar didalam rule
}