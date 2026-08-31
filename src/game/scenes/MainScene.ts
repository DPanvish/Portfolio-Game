import Phaser from 'phaser';
import { pathWaypoints } from '@/lib/pathTemplate';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // We can load assets here later if needed
  }

  create() {
    // 1. Draw the smooth vector path
    this.drawPath();

    // 2. Create the player (a sleek glowing orb)
    this.createPlayer();

    // 3. Set up camera to smoothly follow player
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1.2);

    // 4. Setup Input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys('W,A,S,D') as any;
    }
  }

  update() {
    this.handlePlayerMovement();
  }

  private drawPath() {
    const graphics = this.add.graphics();
    graphics.lineStyle(4, 0x334155, 0.5); // Subtle glass border color for the path line

    graphics.beginPath();
    graphics.moveTo(pathWaypoints[0].x, pathWaypoints[0].y);

    // Draw lines between waypoints
    for (let i = 1; i < pathWaypoints.length; i++) {
      graphics.lineTo(pathWaypoints[i].x, pathWaypoints[i].y);
    }
    graphics.strokePath();

    // Draw glowing nodes at each waypoint
    pathWaypoints.forEach((wp) => {
      graphics.fillStyle(0x0F172A, 1); // Dark inner
      graphics.fillCircle(wp.x, wp.y, 12);
      graphics.lineStyle(2, 0xA16207, 0.8); // Gold accent border
      graphics.strokeCircle(wp.x, wp.y, 12);
    });
  }

  private createPlayer() {
    // Generate a simple glowing orb texture programmatically
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xF8FAFC, 1); // Crisp white/silver foreground
    graphics.fillCircle(16, 16, 12);
    graphics.generateTexture('playerOrb', 32, 32);

    // Start player at the first waypoint
    const startX = pathWaypoints[0].x;
    const startY = pathWaypoints[0].y;

    this.player = this.physics.add.sprite(startX, startY, 'playerOrb');
    
    // Add some soft drag for buttery smooth stops
    this.player.setDamping(true);
    this.player.setDrag(0.001); 
    this.player.setMaxVelocity(200);
  }

  private handlePlayerMovement() {
    const speed = 800; // Acceleration force
    let moved = false;

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      this.player.setAccelerationX(-speed);
      moved = true;
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      this.player.setAccelerationX(speed);
      moved = true;
    } else {
      this.player.setAccelerationX(0);
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      this.player.setAccelerationY(-speed);
      moved = true;
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      this.player.setAccelerationY(speed);
      moved = true;
    } else {
      this.player.setAccelerationY(0);
    }
  }
}
