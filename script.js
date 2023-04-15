const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const showColors = () => {
    colorList.innerHTML = pickedColors
        .map(
            (color) => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${
                color == "#ffffff" ? "#ccc" : color
            }" ></span>
            <span class="value">${color}</span>
        </li>
    `
        )
        .join(""); // Generation li for the picked color and adding it to the colorList
};
showColors();

const activateEyeDropper = async () => {
    try {
        // Opening the eye dropper and getting the selected color
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex); // Copying the selected color to the clipboard

        // Adding the color to the list if it doesn't already exist
        if(!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex); // Adding selected colors to the pickedColors array
            localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
            showColors();
        }
    } catch (error) {
        console.log(error);
    }
};

colorPickerBtn.addEventListener("click", activateEyeDropper);
