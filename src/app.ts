import { createCanvas, loadImage } from "canvas";
import axios from "axios";
const imageURL = "https://static.netshoes.com.br/produtos/tenis-kappa-foam/18/D24-4942-018/D24-4942-018_zoom1.jpg?ts=1692846909&ims=544x";


const main_action = async () => {
  function rgbToHex(r: number, g: number, b: number) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  try {

    const image = await loadImage(imageURL);

    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const x = image.width / 2;
    const y = image.height /2;
    const pixelData = context.getImageData(x, y, 1, 1).data;

    const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    const colorName = await getColorName(hexColor);

    console.log(hexColor);
    console.log(colorName);
  } catch (error) {
    console.log(error);
  }
};

const getColorName = async (colorHex: string) => {
  try {
    const response = await axios.get(
      `https://www.thecolorapi.com/id?hex=${colorHex}`
    );
    const colorData = response.data;
    return colorData.name.value;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

main_action();
