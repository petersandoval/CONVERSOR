import keys from "./keys.js"
let select1 = document.querySelector("#primero"),
  select2 = document.querySelector("#segundo"),
  inputText = document.querySelector("#monto"),
  btn = document.querySelector(".convertir")
  fetch("https://openexchangerates.org/api/currencies.json")
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(json=>{
    let option1 = `<option value="">Elige la moneda</option>`
    document.querySelector(".error").innerHTML = ""
    for (const prop in json) {
        option1 += `<option value="${prop}">${json[prop]}</option>`
    }  
    select1.innerHTML = option1
    select2.innerHTML = option1
  })
  .catch(err=>{
    document.querySelector(".error").innerHTML = `ocurrió un error al solicitar los datos de la API. ${err.status}: ${err.statusText}`
  })

  async function loadConvert(value1, value2, monto) {
     try {
        let res = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${value2}&from=${value1}&amount=${monto}`,{
            method: "GET",
            headers:{
                "apikey": `${keys.key1}`,
                "content-type": "application/json; charset=utf-8"
            }
        }),
        json = await res.json()
        if(!res.ok) throw{status: res.status, statusText: res.statusText}
        document.querySelector(".error").innerHTML = ""
        document.querySelector("#result").innerHTML = `${inputText.value} ${select1.value} es igual a ${new Intl.NumberFormat().format(json.result)} ${select2.value}`
        document.querySelector(".loader").classList.add("d-none")
    } catch (err) {
        document.querySelector(".loader").classList.add("d-none")
        document.querySelector(".error").innerHTML = `ocurrió un error al solicitar los datos de la API. ${err.status}: ${err.statusText}`
     }
  }

  btn.addEventListener("click",e=>{
    document.querySelector(".loader").classList.remove("d-none")
    loadConvert(select1.value, select2.value, inputText.value)
  })