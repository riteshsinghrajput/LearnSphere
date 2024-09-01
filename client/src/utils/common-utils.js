
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM ' : ' PM '; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

export const FormatDate = (date) =>{
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    let time =  `${hours<10? '0' + hours : hours}:${minutes<10? '0' + minutes : minutes}`

    return tConvert(time)
}

export const downloadMedia = (e , originalImage)=>{
  e.preventDefault();

  try {
     fetch(originalImage)
     .then(resp=>resp.blob())
     .then(blob =>{
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = "none";
      a.href = url;

      const nameSplit = originalImage.split('/');
      const duplicateName = nameSplit.pop();
      
      a.download = "" + duplicateName + "";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
     })
     .catch(error => console.log("Erro while downloading the image" , error.message))
  } catch (error) {
    console.log("Erro while downloading the image" , error.message)
  }
}