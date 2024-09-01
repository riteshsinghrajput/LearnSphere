export const time = (date) => {
    // Original UTC time
    const D = new Date(date);


    // Convert to IST
    const istDate = new Date(D.getTime())

    // Extract date and time components
    const istDateString = istDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const istTimeString = istDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });


    return { istDateString, istTimeString }

}