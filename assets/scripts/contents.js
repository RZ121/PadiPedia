// responsive navbar
const brand = document.querySelector(".mobile-nav-brand");
const desktop_nav = document.querySelector(".desktop-nav");

brand.addEventListener("click", () => {
    desktop_nav.classList.toggle("active");
});

//Menampilkan list hama
const cardList = document.querySelector(".card-list");
if(cardList){
    fetch("../assets/data/database.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        data["hama"].forEach(type => {
            const dataCard = document.createElement("div");
            const dataCardBody = document.createElement("div");
            const dataCardInfo = document.createElement("div");
            const dataCardImage = document.createElement("img");
            const dataCardUl = document.createElement("ol");
    
            dataCard.setAttribute("class","data-card");
            dataCard.innerHTML = `
                                <div class="data-card-header">
                                    <h3 class="data-card-title">${type["nama"]}</h3>
                                    <p>(<i>${type["latin"]}</i>)</p>
                                </div>`;
    
            dataCardBody.setAttribute("class","data-card-body");
            dataCardImage.setAttribute("class","data-card-image");
            dataCardImage.src = `../assets/img/hama/${type['gambar']}`;
            dataCardInfo.setAttribute("class","data-card-info");
            
            let i = 1;
            data["gejala"][type["gejala"]].forEach(el => {
                const dataCardList = document.createElement("li");
                dataCardList.setAttribute("class","rf-15");
                const textContent = document.createTextNode(el);
                dataCardList.appendChild(textContent);
                dataCardUl.appendChild(dataCardList);
                i++;
            });
            dataCardInfo.innerHTML = `<p class="rf-15"> Gejala yang ditimbulkan : </p>`;
            dataCardInfo.appendChild(dataCardUl);
            dataCardBody.appendChild(dataCardImage);
            dataCardBody.appendChild(dataCardInfo);
            dataCard.appendChild(dataCardBody);
            cardList.appendChild(dataCard);
        });
    });
}

//Menampilkan alert hasil diagnosa (sementara)
function showDiagnoseResult(kodeHama){
    fetch("../assets/data/database.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        let idx = 0;
        for(el of data["hama"]){
            if(el["kode"] == kodeHama){
                break;
            }
            idx++;
        }
        const hama = data["hama"][idx];
        alert(`Diagnosa Hama :\nNama : ${hama["nama"]}\nLatin : ${hama["latin"]}`);
    });
}
