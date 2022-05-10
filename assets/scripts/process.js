const userInput = {};
const userInputCf = {};

const diagnose_btn = document.querySelector(".run-form");
diagnose_btn.addEventListener("click", () => {
    const input1 = document.getElementsByName("gejala_akar");
    for(ga of input1){
        if(ga.checked){
            userInput["GA"] = ga.value;
            const GAcf = document.getElementById("GA-cf");
            if(GAcf.value === "") GAcf.value = 100;
            userInputCf["GA"] = GAcf.value;
        }
    }
    const input2 = document.getElementsByName("gejala_batang");
    for(gb of input2){
        if(gb.checked){
            userInput["GB"] = gb.value;
            const GBcf = document.getElementById("GB-cf");
            if(GBcf.value === "") GAcf.value = 100;
            userInputCf["GB"] = GBcf.value;
        }
    }
    const input3 = document.getElementsByName("gejala_daun");
    for(gd of input3){
        if(gd.checked){
            userInput["GD"] = gd.value;
            const GDcf = document.getElementById("GD-cf");
            if(GDcf.value === "") GAcf.value = 100;
            userInputCf["GD"] = GDcf.value;
        }
    }
    const input4 = document.getElementsByName("gejala_umum");
    for(gu of input4){
        if(gu.checked){
            userInput["GU"] = gu.value;
            const GUcf = document.getElementById("GU-cf");
            if(GUcf.value === "") GAcf.value = 100;
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
        const working_memory = {};
        const working_memoryCf = {};

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
        
        if(!working_memory["hama"]){
            getHamaUnlistedRule();
        }else{
            showDiagnoseResult(working_memory["hama"], certaintyValue);
        }
    });
}

function getHamaUnlistedRule(){

  fetch("../assets/data/ruleSet.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        const working_memory = {};
        const working_memoryCf = {};

        data["set1"].forEach(rule => {
            const keys = Object.keys(rule["gejala"]);
            let count = 0;
            for(kategori of keys){
                if(!working_memory[kategori]){
                    if(userInput[kategori]){
                        working_memory[kategori] = userInput[kategori];
                    }
                }
                if(working_memory[kategori] === rule["gejala"][kategori]){
                    count++;
                }
            }
            working_memoryCf[rule["hama"]] = (((count/keys.length)*100 + (rule["cf"] * 100))/2).toFixed(2);
        });
        const result = maxValue(working_memoryCf);
        showDiagnoseResult(result["kode hama"], result["cf"]);
    })
}

function maxValue(obj){
    const keys = Object.keys(obj);
    let index = 0;
    for(i = 1; i < keys.length; i++){
        if(obj[keys[i]] > obj[keys[index]]){
            index = i;
        }
    }
    const objResult = {
        "kode hama" : keys[index],
        "cf" : obj[keys[index]]
    }
    return objResult;
}