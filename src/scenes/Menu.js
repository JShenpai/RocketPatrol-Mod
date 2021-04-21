class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload() 
    {
        // load audio
        /*LEGACY
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        */

        this.load.audio('sfx_select','./assets/vaccineselect.wav');
        this.load.audio('sfx_vaccinated','./assets/vaccinated.wav');
        this.load.audio('sfx_vaccineshot','./assets/vaccineshot.wav');

        //
    }

    create()
    {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'VACCINE PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'User <--> arrows to move & (F) to administer', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#FF0000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice and -> for Expert', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }
    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT))
        {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}