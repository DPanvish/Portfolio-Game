import Phaser from 'phaser';
import { pathWaypoints } from '@/lib/pathTemplate';
import { mockExperiences, mockProjects, mockSkills, mockEducation, mockStartup, mockFootprint } from '@/lib/data';
import { useGameStore } from '@/lib/store';

// We'll combine our mock data to map them onto the waypoints
const allNodes = [
  ...mockExperiences.map(e => ({ type: 'experience', data: e })),
  ...mockEducation.map(e => ({ type: 'education', data: e })),
  ...mockProjects.map(p => ({ type: 'project', data: p })),
  { type: 'startup', data: mockStartup },
  { type: 'footprint', data: mockFootprint },
  ...mockSkills.map(s => ({ type: 'skill', data: s })),
];

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private nodeZones!: Phaser.Physics.Arcade.Group;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {}

  create() {
    // 1. Draw the smooth vector path
    this.drawPathLine();

    // 2. Generate interactive nodes from mock data
    this.generateDynamicNodes();

    // 3. Create the player (a sleek glowing orb)
    this.createPlayer();

    // 4. Set up camera to smoothly follow player
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1.2);

    // 5. Setup physics overlap between player and nodes
    this.physics.add.overlap(this.player, this.nodeZones, this.handleNodeOverlap, undefined, this);

    // 6. Setup Input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys('W,A,S,D') as any;
    }
  }

  update() {
    this.handlePlayerMovement();
  }

  private drawPathLine() {
    const graphics = this.add.graphics();
    graphics.lineStyle(4, 0x334155, 0.5); // Subtle glass border color for the path line

    graphics.beginPath();
    graphics.moveTo(pathWaypoints[0].x, pathWaypoints[0].y);

    // Draw lines between waypoints
    for (let i = 1; i < pathWaypoints.length; i++) {
      graphics.lineTo(pathWaypoints[i].x, pathWaypoints[i].y);
    }
    graphics.strokePath();
  }

  private generateDynamicNodes() {
    this.nodeZones = this.physics.add.group();
    const graphics = this.add.graphics();

    // Only generate nodes up to the number of available waypoints
    const nodeCount = Math.min(allNodes.length, pathWaypoints.length);

    for (let i = 0; i < nodeCount; i++) {
      const wp = pathWaypoints[i];
      const nodeData = allNodes[i];

      // Draw the glowing node
      graphics.fillStyle(0x0F172A, 1); // Dark inner
      graphics.fillCircle(wp.x, wp.y, 16);
      
      // Differentiate colors slightly based on type, or stick to gold accent
      let borderColor = 0xA16207; // Gold default
      if (nodeData.type === 'project') borderColor = 0x2563EB; // Blue for projects
      if (nodeData.type === 'skill') borderColor = 0x22C55E; // Green for skills
      if (nodeData.type === 'education') borderColor = 0x9333EA; // Purple for education
      if (nodeData.type === 'startup') borderColor = 0xDC2626; // Red for startup
      if (nodeData.type === 'footprint') borderColor = 0xF59E0B; // Amber for footprint
      
      graphics.lineStyle(2, borderColor, 0.8);
      graphics.strokeCircle(wp.x, wp.y, 16);

      // Create an invisible physics zone for the trigger
      const zone = this.add.zone(wp.x, wp.y, 40, 40);
      this.physics.add.existing(zone);
      
      // Store the mock data inside the zone so we can access it on overlap
      (zone as any).nodeData = nodeData;
      this.nodeZones.add(zone);
    }
  }

  private handleNodeOverlap(_player: any, _zone: any) {
    const nodeData = _zone.nodeData;
    
    // Get the current state
    const store = useGameStore.getState();
    
    // Only dispatch if it's a new node to prevent infinite re-renders
    if (store.activeNode?.data.id !== nodeData.data.id) {
      store.setActiveNode(nodeData);
      store.markNodeVisited(nodeData.data.id);
    }
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
    const { mobileMovement } = useGameStore.getState();

    if (this.cursors.left.isDown || this.wasd.A.isDown || mobileMovement.left) {
      this.player.setAccelerationX(-speed);
      moved = true;
    } else if (this.cursors.right.isDown || this.wasd.D.isDown || mobileMovement.right) {
      this.player.setAccelerationX(speed);
      moved = true;
    } else {
      this.player.setAccelerationX(0);
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown || mobileMovement.up) {
      this.player.setAccelerationY(-speed);
      moved = true;
    } else if (this.cursors.down.isDown || this.wasd.S.isDown || mobileMovement.down) {
      this.player.setAccelerationY(speed);
      moved = true;
    } else {
      this.player.setAccelerationY(0);
    }
  }
}
