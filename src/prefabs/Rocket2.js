//Rocket prefab
class Rocket2 extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        //add sfx
        this.sfxRocket = scene.sound.add('sfx_vaccineshot'); // add rocket sfx

        //add object to existing scene
        scene.add.existing(this);
        this.isFiring = false; //track rocket's firing status
        this.moveSpeed = 4; //pixels per frame
    }

    update()
    {
        //left/right movement
        if(!this.isFiring)
        {
        
            if(keyJ.isDown&&this.x >= borderUISize + this.width)
            {
                this.x -= this.moveSpeed;
            }
            else if(keyL.isDown && this.x <= game.config.width - borderUISize - this.width)
            {
                this.x += this.moveSpeed;
            }
        
            
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyK) && !this.isFiring)
        {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }

        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding)
        {
            this.y -= this.moveSpeed;
        }

        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding)
        {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    //reset rocket to "ground"
    reset()
    {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}