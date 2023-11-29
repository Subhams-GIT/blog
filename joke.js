let jokes=["I just got my doctor's test results and I'm really upset about it. Turns out, I'm not gonna be a doctor.",
    " My grief counselor died. He was so good, I don’t even care.","Today, I asked my phone “Siri, why am I still single?” and it activated the front camera.",
    "The doctor gave me some cream for my skin rash. He said I was a sight for psoriasis."," I don’t have a carbon footprint. I just drive everywhere."];
   let index=Math.floor(Math.random()*(jokes.length-1))
 // let element= document.getElementById('intro');
  let element=document.getElementById("intro");
    element.innerHTML=jokes[index];
