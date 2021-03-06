class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        //load images/tile sprites
        /*LEGACY
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starfield','./assets/starfield.png');
        */

        this.load.image('syringe','./assets/syringe.png');
        this.load.image('syringe2','./assets/syringe2.png');
        this.load.image('patient','./assets/patient-big.png');
        this.load.image('hospital','./assets/hospital.png');

        //load sprite sheet
        /*LEGACY
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        */

        this.load.spritesheet('checkmark','./assets/checkmark.png',{frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 11});
    }

    create()
    {
        //place tile sprite
        this.hospital = this.add.tileSprite(0,0,640,480,'hospital').setOrigin(0,0);
        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/4, game.config.height - borderUISize - borderPadding, 'syringe').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket2(this, game.config.width/4*3, game.config.height - borderUISize - borderPadding, 'syringe2').setOrigin(0.5, 0);
        // define keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'patient', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'patient', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'patient', 0, 10).setOrigin(0,0);
        //animation config
        this.anims.create(
            {
                key: 'explode',
                frames: this.anims.generateFrameNumbers('checkmark', {start: 0, end: 9, first: 0}),
                frameRate: 30
            }
        );
        //initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#639BFF',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding*10, borderUISize + borderPadding*2, this.p2Score, scoreConfig2);
        //GAME OVER flag
        this.gameOver = false;
        
        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>
        {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press SPACE to Restart or A for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        },null,this);

    }

    update()
    {
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyA))
        {
            this.scene.start('menuScene');
        }
        if(!this.gameOver)
        {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            //increase timer by a quarter of a second
            this.clock.elapsed -= 250;
        }
        if(this.checkCollision(this.p1Rocket, this.ship02))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            //increase timer by 125 ms
            this.clock.elapsed -= 125;
        }
        if(this.checkCollision(this.p1Rocket, this.ship01))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            //increase timer by 50 ms
            this.clock.elapsed -= 50;
        }

        //check collisions for player 2
        if(this.checkCollision(this.p2Rocket, this.ship03))
        {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship03);
            //increase timer by a quarter of a second
            this.clock.elapsed -= 250;
        }
        if(this.checkCollision(this.p2Rocket, this.ship02))
        {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship02);
            //increase timer by 125 ms
            this.clock.elapsed -= 125;
        }
        if(this.checkCollision(this.p2Rocket, this.ship01))
        {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship01);
            //increase timer by 50 ms
            this.clock.elapsed -= 50;
        }
    }

    checkCollision(rocket, ship)
    {
        //simple AABB checking
        if(rocket.x <  ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y)
            {
                return true;
            }
            else
            {
                return false;
            }
    }

    shipExplode(ship)
    {
        //temporarily hide ship
        ship.alpha = 0;

        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'checkmark').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () =>
        {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //play explosion audio
        this.sound.play('sfx_vaccinated');
    }
    shipExplode2(ship)
    {
        //temporarily hide ship
        ship.alpha = 0;

        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'checkmark').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () =>
        {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;

        //play explosion audio
        this.sound.play('sfx_vaccinated');
    }
}