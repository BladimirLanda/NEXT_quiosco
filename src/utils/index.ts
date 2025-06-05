//UTILS

//Formato de dinero
export function formatCurrency(amount : number) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(amount);
}

//Ruta de imagenes
export function getImagePath(imagePath : string) {
    const cloudinayBaseUrl = 'https://res.cloudinary.com'

    if(imagePath.startsWith(cloudinayBaseUrl)) {
        return imagePath;
    } else {
        return `/products/${imagePath}.jpg`
    }
}
