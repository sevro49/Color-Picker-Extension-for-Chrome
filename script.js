const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const copyColor = elem => {
    navigator.clipboard.writeText(elem.dataset.color); // copying the data-color value of span
    elem.innerText = "Copied";
    setTimeout(() => elem.innerText = elem.dataset.color, 1000); // after 1000ms, text will revert back to the color code
}

const showColors = () => {
    if(!pickedColors.length) return; // Returnin if there are no picked colors
    colorList.innerHTML = pickedColors
        .map(
            (color) => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${
                color == "#ffffff" ? "#ccc" : color
            }" ></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
    `
        )
        .join(""); // Generation li for the picked color and adding it to the colorList
        document.querySelector(".picked-colors").classList.remove("hide");

        // Add a click evet listener to each color element to copy the color
        document.querySelectorAll(".color").forEach(li => {
            li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
        })
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

// Clearing all picked colors, updating localStorage, and hiding the pickedColors element
const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");

}

colorPickerBtn.addEventListener("click", activateEyeDropper);
clearAll.addEventListener("click", clearAllColors);
