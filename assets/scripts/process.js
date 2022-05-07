const userInput = {
    "GA" : "kosong",
    "GB" : "kosong",
    "GD" : "kosong",
    "GU" : "kosong"
}

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
    console.log(userInput);
});