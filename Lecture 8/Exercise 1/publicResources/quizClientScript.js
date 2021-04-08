let nick = prompt("Enter your nickname");
let input = document.getElementById("input");
input.focus(); // Set keyboard focus

let quiz = new EventSource("/quiz");
quiz.addEventListener("quiz", event => {
    let div = document.createElement("div");
    div.append(event.data);
    input.before(div);
    input.scrollIntoView();
});

input.addEventListener("change", () => {
    fetch("/quiz", {
            method: "POST",
            body: nick + ": " + input.value 
        })
        .catch(e => console.error);
    input.value = "";
});
