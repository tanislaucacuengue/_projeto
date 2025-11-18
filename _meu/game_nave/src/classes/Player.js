import { PATH_NAVE_IMAGE } from "../utils/constantes.js";

class Player {
    
   constructor(canvasWidth, canvasHeight) {
    this.width = 48;
    this.height = 48;
    this.velocidade = 6;

    this.position = {
        x: canvasWidth / 2 - this.width / 2,
        y: canvasHeight - this.height - 30,
    };

    this.image = this.getImage(PATH_NAVE_IMAGE);

   }

   getImage (path) {
        const image = new Image();
        image.src = path;
        return image;

   }

   moveLeft() {
         this.position.x -= this.velocidade;
   }

    moveRight() {
         this.position.x += this.velocidade;
   }


   draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
   }
}

export default Player;