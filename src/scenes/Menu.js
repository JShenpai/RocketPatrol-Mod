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

        this.load.image('title','./assets/titlescreen.png');

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

        this.hospital = this.add.tileSprite(0,0,640,480,'title').setOrigin(0,0);

        /*LEGACCY
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'VACCINE PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 1: (A) (D) to move & (S) to administer', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Player 2: (J) (L) to move & (K) to administer', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#FF0000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press (A) for Novice and (D) for Expert', menuConfig).setOrigin(0.5);
        */

        //define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }
    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyA))
        {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 30000,
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyD))
        {
            // hard mode
            game.settings = {
                spaceshipSpeed: 5,
                gameTimer: 30000,
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}