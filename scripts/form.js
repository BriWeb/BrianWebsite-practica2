import personDates from "./person.js";

export default function form(){

  const $form = document.querySelector(".form");
  const $inputsRequired = document.querySelectorAll("[required]");
  $inputsRequired.forEach( input => {
    if(input.type !== "radio"){
      const $span = document.createElement("span");
      $span.classList.add("message-error", "none");
      $span.id = input.name;
      $span.textContent = input.title;

      input.after($span)
    }
  })

  const handleKeyup = (e) => {
    if(e.target.matches("[required]")){
      const $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;
      if(pattern && $input.value !== ""){
        let regex = new RegExp(pattern);
        if(!regex.exec($input.value)) document.getElementById($input.name).classList.add("message-error--is-active")
        else document.getElementById($input.name).classList.remove("message-error--is-active")
      }
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const person = personDates();
    if(person){
      const $user = document.querySelector(".user"),
        $userDates = document.querySelector(".user__dates"),
        $userMessage = document.querySelector(".user__message");

      if($userDates.textContent !== "") $userDates.textContent = "";
      if($userMessage.textContent !== "") $userMessage.textContent = "";

      const dates = `${person.gender === 'man' ? 'Bienvenido' : 'Bienvenida'} ${person.nickname} (${person.name}), de edad de ${person.age} años y con email ${person.email}, se te agradece por tomarte el tiempo de ingresar a la página y rellenar el formulario.`,
          message = `${person.message}.`;

      const textDates = document.createTextNode(dates),
        textMessage = document.createTextNode(message);

      //show loader
      const $loaderContainer = document.querySelector(".loader-container");
      $loaderContainer.classList.remove("none");

      setTimeout(() => {
        //show messages
        $userDates.append(textDates);
        $userMessage.append(textMessage);
        $user.classList.remove("none");

        //hide loader
        $loaderContainer.classList.add("none");

        //clear inputs
        const $inputs = document.querySelectorAll(".clear");
        $inputs.forEach( $input => {
          if($input.type === "radio" && $input.checked === true){
            $input.checked = false;
          } else {
            $input.value = ""
          }
        })

        //scroll bottom
        let height = window.innerHeight;
        window.scrollTo({
          behavior: "smooth",
          top: height
        })
      }, 1000)
    }
  }


  document.addEventListener("keyup", handleKeyup);
  $form.addEventListener("submit", handleSubmit);
}