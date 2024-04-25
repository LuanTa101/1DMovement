class Avatar extends Phaser.Scene {
    constructor() {
        super("first");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        // Start position of avatar sprite
        this.bodyX = 500;
        this.bodyY = 675;
    }


    preload() {
        this.load.setPath("./assets/");
        this.load.image("avatar", "alienBlue_front.png");
        this.load.image("fireball", "fireball.png");
        // Update instruction text
        document.getElementById('description').innerHTML = '<h2>firstScene.js<br>Space - shoot<br>A - move left // D - move right</h2>'
    } 

    create() {
        let my = this.my;   // Create an alias to this.my for readability
        
        // Add sprites
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "avatar");
        my.sprite.fire = this.add.sprite(this.bodyX, this.bodyY - 40, "fireball");
        my.sprite.fire.visible = false;

        // Polling Input: movement
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // Create a key object for the space bar
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }  

    update() {
        let my = this.my;    // Create an alias to this.my for readability
        // Move left
        if (this.aKey.isDown && my.sprite.body.x > 50) {
            my.sprite.body.x -= 10;
        }
        // Move right
        if (this.dKey.isDown && my.sprite.body.x < this.sys.game.config.width - 50) {
            my.sprite.body.x += 10;
        }

        // Emit fireball when space bar is pressed
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && !my.sprite.fire.visible) {
            // Position fireball at the same position as the player avatar
            my.sprite.fire.setPosition(my.sprite.body.x, my.sprite.body.y - 40);
            my.sprite.fire.visible = true;
        }

        // Move the emitted fireball upwards
        if (my.sprite.fire.visible == true) {
            my.sprite.fire.y -= 20;
            // Check if fireball has moved off-screen, hide it if it has
            if (my.sprite.fire.y < 0) {
                my.sprite.fire.visible = false;
            }
        }
    }
}
 