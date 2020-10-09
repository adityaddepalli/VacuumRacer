class LevelOne extends Phaser.Scene {
    constructor(){
        super('levelone')
    }
preload(){
        //audio
        this.load.audio('song','../music/Art.mp3');
        this.load.audio('jump_sound', 'sounds/jump_sound.wav')
        this.load.audio('death_sound', 'sounds/death_sound.mp3')

        //platforms
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('splatform', 'assets/platform_hor.png')
        this.load.image('bplatform', 'assets/platform_blue.png')
        this.load.image('gplatform', 'assets/platform_green.png')
        this.load.image('pplatform', 'assets/platform_purple.png')
        this.load.image('vplatform', '../assets/platform_vert.png')
        this.load.image('vplatform_xl', '../assets/vert_xl.png')
        this.load.image('mover', 'assets/platform_vert.png')

        //etc
        this.load.image('dust_bunny','assets/dust_bunny.png')
        this.load.image('portal','assets/portal.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('turret', 'assets/turret.png');
        this.load.image('bullet', 'assets/tracer.png');
        this.load.image('star', '../assets/star.png');
        this.load.image('backdrop', '../backdrops/white.png');
}
    
create(){
        var mover1;
        var mover2;
        cursors = this.input.keyboard.createCursorKeys();
        this.tdelay = 0;

        //music config
        this.music = this.sound.add('song');
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);

        //these two lines change the size of the scene and camera bounds!!
        this.physics.world.setBounds(0, 0, 800, 2600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 800, 2600);

        //set background
        var backdrop = this.add.image(400,1300,'backdrop');
        backdrop.setScale(1);
    
        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        checkpoint.create(600, 400, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();

        //add portals
        portal = this.physics.add.staticGroup();
        portal.create(725,1560, 'portal').setScale(.25).refreshBody();
        portal.create(120,1700, 'portal').setScale(.25).refreshBody();
        portal.create(275,875, 'portal').setScale(.15).refreshBody();
        portal.create(475,875, 'portal').setScale(.15).refreshBody();
        
        //add turret
        this.turret1 = this.add.image(475, 1800, 'turret');
        this.turret2 = this.add.image(275, 1840, 'turret');
    
        this.turret3 = this.add.image(475, 1100, 'turret');
        this.turret3.angle = 180;
        this.turret4 = this.add.image(275, 1140, 'turret');
        this.turret4.angle = 180;
    
        this.turret5 = this.add.image(50, 875, 'turret');
        this.turret5.angle = 90;
    
        this.turretArr = [this.turret1];
        this.tdelay = 0;

        //add player and set physics
        player = this.physics.add.sprite(60, 2480, 'player').setScale(0.25);
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.body.setGravityY(300);
    
        //create star checkpoints
        this.star1 = this.add.image(640, 1630, 'star');
        this.star2 = this.add.image(110, 1280, 'star');
        this.star3 = this.add.image(640, 880, 'star');
        
        //make camera follow player
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);
    
        //check if player overlaps with star
        //this.physics.add.overlap(player, stars, collectStar, null, this);
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(0,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
       
        //first star
        platforms.create(200,2500,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400, 2450, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(600, 2400, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(700, 2000, 'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(550, 1800, 'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(700, 1600, 'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
        
        platforms.create(500, 1650, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(300, 1700, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(100, 1750, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(0, 1350, 'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(500, 1200, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(300, 1250, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(100, 1300, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(500, 900, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(300, 900, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(100, 900, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        platforms.create(200, 700, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(500, 500, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(50, 700, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400, 500, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
  
        //moving vertical platform
        mover1 = this.physics.add.image(750, 1150, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover1.body.setAllowGravity(false);
        this.physics.add.collider(player, platforms);
        
        //collider with moving platform
        this.physics.add.collider(player, mover1);
        this.physics.add.collider(player, mover2);
        mover = [mover1];
    
    
        this.tweens.timeline({
        targets: [mover1.body.velocity],
        loop: -1,
        tweens: [
          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
        ]
      });

        //add bullet group and collider
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 100
        });

        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.scene.start("leveloneb");
        }, null, this);

        //restart scene if player overlaps portal
        this.physics.add.overlap(player, portal, this.restart, null, this);

        canGrab = false;
        rotated = false;
        wallJumped = false;
        isOnWall = false;
        isOnRight = false;
        isOnLeft = false;
        findMover = false;
}

update(){

    checkKeyboard();


    //stickMechanic
    if(cursors.space.isDown && wallJumped == false){
        //if the player is touching the wall or a moving body, it is made note of here
        if (player.body.onWall() || player.body.touching.right || player.body.touching.left){
            if (player.body.onWall()){
                isOnWall = true;
            }
            if (player.body.touching.right){
                isOnRight = true;
            }
            if (player.body.touching.left){
                isOnLeft = true;
            }
        }
        if (!(isOnWall)&& (isOnLeft || isOnRight)){
            if (findMover == false){
             moverTouching = whichMover(mover);   
            }
            stickmechanicMoving();
            findMover = true;
        }
        else if(isOnWall){
        stickmechanic();
          }
    }

      //jumping
      if (cursors.up.isDown)
      {
          player.setVelocityY(-320);
          this.sound.play('jump_sound');
      }

        if (player.body.touching.down){
            canGrab = true;
            wallJumped = false;
            bodyTouchingLeft = null;
            //resets wall booleans upon touching floor
            isOnWall = false;
            isOnLeft = false;
            isOnRight = false;
            findMover = false;
        }
        if (cursors.space.isUp){
            player.body.setAllowGravity(true);
            canGrab = false;
            //resets wall booleans when letting go of space
            isOnWall = false;
            isOnLeft = false;
            isOnRight = false;
            //allows player to stick again as long as they let go of space first
            wallJumped = false;
            //resets player rotation
            if (rotated == true){
                player.angle = 0;
            }
        }

        //checkWorldBounds
        if (player.body.checkWorldBounds() == true) {
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene
            this.music.stop();
            console.log("yoo");
        }

        //inactivate bullets after leaving screen
        this.bullets.children.each(function(b) {
            if (b.active) {
                if (b.y < 0 || b.y > 800) {
                    b.setActive(false);
                }
            }
        }.bind(this));
    
    
    
//    function collectStar (player, star)
//    {
//        star.disableBody(true, true);
//    }

//        if(this.tdelay > 30) {
//            for(var i = 0, i < this.turretArr; i++) {
//                tempTurret =
//            }
//            this.shoot(this.turret1.x, this.turret1.y, this.turret1);
//            this.tdelay = 0;
//        }
//        this.tdelay++;
}
// shoot(x, y, turret)
//    {
//       var bullet = this.bullets.get(x, y-20);
//        if (bullet) {
//            bullet.setActive(true);
//            bullet.setVisible(true);
//            bullet.body.setAllowGravity(false);
//            bullet.body.velocity.y = -300;
//            }
//    }
//
}
