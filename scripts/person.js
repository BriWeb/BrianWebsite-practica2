export default function personDates() {
    const genders = document.querySelectorAll("[name='gender']");
    let gender;

    genders.forEach(item => {
      if(item.checked){
        gender = item.value
        return
      }   
    })

    const person = {
      name : document.querySelector("[name='name']").value,
      nickname : document.querySelector("[name='nickname']").value,
      age : document.querySelector("[name='age']").value,
      gender,
      email : document.querySelector("[name='email']").value,
      message : document.querySelector("[name='message']").value
    }

    return person;
}