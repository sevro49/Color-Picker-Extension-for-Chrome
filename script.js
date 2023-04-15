const colorPickerBtn = document.querySelector("#color-picker");

const activateEyeDropper = async () => {
    try {
        // Opening the eye dropper and getting the selected color
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex); // Copying the selected color to the clipboard
        console.log(sRGBHex);
    } catch (error) {
        console.log(error);
    }
};

colorPickerBtn.addEventListener("click", activateEyeDropper);
