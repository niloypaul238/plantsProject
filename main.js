
        let catagoryList = document.querySelector('.catagoryList');
        let plantsCards = document.querySelector('.plantsCards');
        let modelDtls = document.querySelector('.modelDtls')
        let cardAppend = document.querySelector('.cardAppend')
        let totalBlance = document.querySelector('.totalBlance')
        // catagorys
        let loadCatagory = () => {
            fetch(`https://openapi.programming-hero.com/api/categories`)
            .then(res => res.json())
            .then(data => {
                displayCata(data.categories)
            })
            
        }
        let displayCata = (peras) => {
            
            for( let pera of peras){
                catagoryList.innerHTML += `
                    <li onclick="catagoryByCarID(${pera.id})" id="${pera.id}" class="hover:bg-green-800 hover:text-white duration-200 cursor-pointer p-1">${pera.category_name}</li>
                `;

                // active section
                let catagoryLists = catagoryList.querySelectorAll('li') 

                catagoryLists.forEach( singleBtnActive => {
                
                    singleBtnActive.addEventListener('click' , () => {
                        
                        for(let i of catagoryLists){
                            i.classList.remove('active')
                        }
                    singleBtnActive.classList.add('active')
                    })
                }) 
            
        
        
            }
        }
        
        // all card 
        let allPlants = () => {
            fetch("https://openapi.programming-hero.com/api/plants")
            .then(rs => rs.json())
            .then(data =>{
                loading()
                showPlants(data.plants)  
            } )
        }

        // ID BY PLANTS SHOW
        let catagoryByCarID = (id) => {
            if(id == "all"){
                allPlants()
            }else{
                fetch(`https://openapi.programming-hero.com/api/category/${id}`)
                .then(res => res.json())
                .then(data =>{
                    loading()
                   showPlants(data.plants)  
                })
            }
            
        }

        let showPlants = (plnts) => {
            plantsCards.innerHTML = ""
            plnts.forEach(plat => {
                plantsCards.innerHTML += `
                
                        <div class="card bg-base-100 bg-white p-3 shadow-sm max-h-80">
                            <figure>
                                <img class="h-30 w-full object-cover"
                                src="${plat.image}"
                                alt="Shoes" />
                            </figure>
                            <div class="">
                                <h2 class="card-title hover:underline hover:underline-offset-4" onclick="modelOpen(${plat.id})">${plat.name}</h2>
                                <p>${plat.description.slice(0,40)}....</p>
                                <div class="flex justify-between my-2 text-sm">
                                    <p class="bg-green-100 rounded-full px-3 py-1 text-green-600">${plat.category}</p>
                                    <p>TK <span>${plat.price}</span></p>
                                </div>
                                <button onclick="cardAdd(${plat.id})"" class="bg-green-700 text-center w-full rounded-full p-2 hover:bg-green-600 duration-150 text-white cursor-pointer">Add to Cart</button>
                            </div>
                        </div>
                
                `
            })
        }

        // model section
        let modelOpen = (id) => {
            fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
            .then(res => res.json())
            .then(data =>{
                document.getElementById('showIdModel').showModal()
                showModelDtls(data.plants)
            } )
        }
        let showModelDtls = (data) => {
            console.log(data);
            modelDtls.innerHTML = `
                <h2 class="font-bold text-2xl">${data.name}</h2>
                <img class="h-50 w-full object-cover rounded" src="${data.image}" alt="">
                <p><span class="font-bold">Category :</span> ${data.category}</p>
                <p><span class="font-bold">Price :</span> ${data.price}</p>
                <p><span class="font-bold">Discription :</span> ${data.description}</p>
            `
        }
       
        // card sectio 
        let cardAdd = (id) => {
             fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
            .then(res => res.json())
            .then(data =>showCardDta(data.plants))
        }
        let showCardDta = (plan) => {
            cardAppend.innerHTML += `

                    <div class="flex flex-row justify-between items-center mt-1 bg-gray-200 p-2 rounded">
                            <div>
                                <h1>${plan.name}</h1>
                                <p class="text-sm mt-1">TK <span class="prize">${plan.price}</span> <i class="fa-solid fa-xmark text-gray-400 text-sm"></i> <span> 1</span></p>
                            </div>
                            <i  class="fa-solid fa-xmark text-red-400 delte text-lg cursor-pointer hover:text-gray-300 duration-150"></i>
                    </div>
            
            `
            // prize section
            prize()
            // delete function 
            let xMarks = cardAppend.querySelectorAll('.delte')
            xMarks.forEach( singleDelte => {
                singleDelte.addEventListener('click' , delteFun)
            })
        }
        // delete function
        let delteFun = (e) => {
            e.target.parentElement.remove()
            prize()
        }



        // prize section 
        let prize = () => {
            let prizes = cardAppend.querySelectorAll('.prize');
            let sum = 0;
            prizes.forEach( prize => {
                sum += Number(prize.innerHTML)
            })
            totalBlance.innerHTML = sum;
        }
       
        
       
        //    loading section
       let loading = () =>{
            plantsCards.innerHTML =`<div class="flex justify-center col-span-3">
                                        <span class="loading loading-dots loading-xs text-center"></span>
                                    </div>`
       }
       

        //delete function
            
        allPlants()
        loadCatagory()
    