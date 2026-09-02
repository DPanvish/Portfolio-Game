import Phaser from 'phaser';
import { pathWaypoints } from '@/lib/pathTemplate';
import { useGameStore } from '@/lib/store';
import { allNodes } from '@/lib/nodeList';

// Node color map
const NODE_COLORS: Record<string, number> = {
  experience: 0xF59E0B, // amber
  education:  0xA855F7, // purple
  project:    0x3B82F6, // blue
  startup:    0xEF4444, // red
  footprint:  0x22C55E, // green
  skill:      0x06B6D4, // cyan
};

const allNodes = [
  ...mockExperiences.map(e => ({ type: 'experience', data: e })),
  ...mockEducation.map(e   => ({ type: 'education',  data: e })),
  ...mockProjects.map(p   => ({ type: 'project',    data: p })),
  { type: 'startup',   data: mockStartup },
  { type: 'footprint', data: mockFootprint },
  ...mockSkills.map(s     => ({ type: 'skill',      data: s })),
];

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private playerGlow!: Phaser.GameObjects.Image;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private nodeZones!: Phaser.Physics.Arcade.Group;
  private starfield!: Phaser.GameObjects.Graphics;
  private stars: Array<{ x: number; y: number; r: number; speed: number }> = [];
  private nodePulses: Array<{ gfx: Phaser.GameObjects.Graphics; x: number; y: number; color: number; t: number }> = [];
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key; };

  constructor() { super({ key: 'MainScene' }); }

  preload() {}

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // 1. Deep space background gradient
    this.createBackground(W, H);

    // 2. Scrolling starfield
    this.createStarfield(W, H);

    // 3. HUD grid lines
    this.createGridLines(W, H);

    // 4. Path connectors
    this.drawPathLine();

    // 5. Nodes
    this.generateDynamicNodes();

    // 6. Player reticle
    this.createPlayer();

    // 7. Camera
    this.cameras.main.startFollow(this.player, true, 0.06, 0.06);
    this.cameras.main.setZoom(1.15);

    // 8. Overlap
    this.physics.add.overlap(this.player, this.nodeZones, this.handleNodeOverlap as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

    // 9. Input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys('W,A,S,D') as any;
    }

    // 10. Signal ready
    setTimeout(() => useGameStore.getState().setGameReady(true), 1600);
  }

  update(time: number) {
    this.handlePlayerMovement();
    this.animatePulses(time);
    this.animateStars();
  }

  // ─── BACKGROUND ────────────────────────────────────────────────────────────
  private createBackground(W: number, H: number) {
    const bg = this.add.graphics();
    // Deep navy-to-black radial feel using filled rect layers
    bg.fillGradientStyle(0x000510, 0x000510, 0x020B2A, 0x020B2A, 1);
    bg.fillRect(-2000, -2000, 6000, 6000);
  }

  // ─── STARFIELD ─────────────────────────────────────────────────────────────
  private createStarfield(W: number, H: number) {
    this.starfield = this.add.graphics();
    for (let i = 0; i < 200; i++) {
      this.stars.push({
        x: Phaser.Math.Between(-1500, 2000),
        y: Phaser.Math.Between(-1500, 2000),
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.15 + 0.05,
      });
    }
  }

  private animateStars() {
    this.starfield.clear();
    for (const s of this.stars) {
      const alpha = 0.3 + Math.random() * 0.5;
      this.starfield.fillStyle(0xC8D6F0, alpha);
      this.starfield.fillCircle(s.x, s.y, s.r);
    }
  }

  // ─── GRID ──────────────────────────────────────────────────────────────────
  private createGridLines(W: number, H: number) {
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x0D2847, 0.6);
    const step = 80;
    for (let x = -2000; x < 3000; x += step) {
      grid.beginPath(); grid.moveTo(x, -2000); grid.lineTo(x, 3000); grid.strokePath();
    }
    for (let y = -2000; y < 3000; y += step) {
      grid.beginPath(); grid.moveTo(-2000, y); grid.lineTo(3000, y); grid.strokePath();
    }
  }

  // ─── PATH LINE ─────────────────────────────────────────────────────────────
  private drawPathLine() {
    const gfx = this.add.graphics();
    // Outer dim glow
    gfx.lineStyle(8, 0x1E40AF, 0.15);
    gfx.beginPath();
    gfx.moveTo(pathWaypoints[0].x, pathWaypoints[0].y);
    for (let i = 1; i < pathWaypoints.length; i++) gfx.lineTo(pathWaypoints[i].x, pathWaypoints[i].y);
    gfx.strokePath();
    // Inner bright line
    gfx.lineStyle(2, 0x3B82F6, 0.5);
    gfx.beginPath();
    gfx.moveTo(pathWaypoints[0].x, pathWaypoints[0].y);
    for (let i = 1; i < pathWaypoints.length; i++) gfx.lineTo(pathWaypoints[i].x, pathWaypoints[i].y);
    gfx.strokePath();
  }

  // ─── NODES ─────────────────────────────────────────────────────────────────
  private generateDynamicNodes() {
    this.nodeZones = this.physics.add.group();
    const nodeCount = Math.min(allNodes.length, pathWaypoints.length);

    for (let i = 0; i < nodeCount; i++) {
      const wp = pathWaypoints[i];
      const nodeData = allNodes[i];
      const color = NODE_COLORS[nodeData.type] ?? 0xFFFFFF;

      // Outer glow ring (large, semi-transparent)
      const glow = this.add.graphics();
      glow.lineStyle(12, color, 0.08);
      glow.strokeCircle(wp.x, wp.y, 36);

      // Mid ring
      glow.lineStyle(2, color, 0.35);
      glow.strokeCircle(wp.x, wp.y, 24);

      // Inner fill
      glow.fillStyle(color, 0.12);
      glow.fillCircle(wp.x, wp.y, 18);

      // Bright center dot
      glow.fillStyle(color, 0.9);
      glow.fillCircle(wp.x, wp.y, 5);

      // Cross-hair lines
      glow.lineStyle(1, color, 0.5);
      glow.beginPath(); glow.moveTo(wp.x - 32, wp.y); glow.lineTo(wp.x - 22, wp.y); glow.strokePath();
      glow.beginPath(); glow.moveTo(wp.x + 22, wp.y); glow.lineTo(wp.x + 32, wp.y); glow.strokePath();
      glow.beginPath(); glow.moveTo(wp.x, wp.y - 32); glow.lineTo(wp.x, wp.y - 22); glow.strokePath();
      glow.beginPath(); glow.moveTo(wp.x, wp.y + 22); glow.lineTo(wp.x, wp.y + 32); glow.strokePath();

      // Pulsing outer ring — stored separately for animation
      const pulse = this.add.graphics();
      this.nodePulses.push({ gfx: pulse, x: wp.x, y: wp.y, color, t: i * 0.4 });

      // Node label
      const label = nodeData.data.title ?? nodeData.data.name ?? nodeData.data.institution ?? nodeData.type;
      this.add.text(wp.x, wp.y + 40, label.toUpperCase().slice(0, 16), {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: `#${color.toString(16).padStart(6, '0')}`,
        alpha: 0.7,
      }).setOrigin(0.5, 0);

      // Physics zone
      const zone = this.add.zone(wp.x, wp.y, 48, 48);
      this.physics.add.existing(zone);
      (zone as any).nodeData = nodeData;
      this.nodeZones.add(zone);
    }
  }

  private animatePulses(time: number) {
    for (const p of this.nodePulses) {
      p.t += 0.018;
      const scale = 1 + Math.sin(p.t) * 0.5;
      const alpha = (0.15 + Math.sin(p.t) * 0.1);
      p.gfx.clear();
      p.gfx.lineStyle(2, p.color, Math.max(0, alpha));
      p.gfx.strokeCircle(p.x, p.y, 28 * scale);
    }
  }

  // ─── PLAYER ────────────────────────────────────────────────────────────────
  private createPlayer() {
    const size = 40;

    // Build reticle texture
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    const cx = size / 2, cy = size / 2, r = 10;

    // Outer glow
    g.lineStyle(6, 0x38BDF8, 0.2);
    g.strokeCircle(cx, cy, r + 6);

    // Main ring
    g.lineStyle(1.5, 0xF0F9FF, 0.9);
    g.strokeCircle(cx, cy, r);

    // Cross-hair
    g.lineStyle(1, 0x7DD3FC, 0.8);
    const arm = 6;
    g.beginPath(); g.moveTo(cx - arm - 6, cy); g.lineTo(cx - arm, cy); g.strokePath();
    g.beginPath(); g.moveTo(cx + arm, cy);      g.lineTo(cx + arm + 6, cy); g.strokePath();
    g.beginPath(); g.moveTo(cx, cy - arm - 6);  g.lineTo(cx, cy - arm); g.strokePath();
    g.beginPath(); g.moveTo(cx, cy + arm);       g.lineTo(cx, cy + arm + 6); g.strokePath();

    // Center dot
    g.fillStyle(0xBAE6FD, 1);
    g.fillCircle(cx, cy, 2);

    g.generateTexture('reticle', size, size);
    g.destroy();

    const startX = pathWaypoints[0].x;
    const startY = pathWaypoints[0].y;

    this.player = this.physics.add.sprite(startX, startY, 'reticle');
    this.player.setDamping(true);
    this.player.setDrag(0.001);
    this.player.setMaxVelocity(240);
    this.player.setDepth(10);
  }

  // ─── OVERLAP ───────────────────────────────────────────────────────────────
  private handleNodeOverlap(_player: any, _zone: any) {
    const nodeData = _zone.nodeData;
    const store = useGameStore.getState();
    if (store.activeNode?.data.id !== nodeData.data.id) {
      store.setActiveNode(nodeData);
      store.markNodeVisited(nodeData.data.id);
    }
  }

  // ─── MOVEMENT ──────────────────────────────────────────────────────────────
  private handlePlayerMovement() {
    const speed = 900;
    const { mobileMovement } = useGameStore.getState();

    const left  = this.cursors?.left?.isDown  || this.wasd?.A?.isDown || mobileMovement.left;
    const right = this.cursors?.right?.isDown || this.wasd?.D?.isDown || mobileMovement.right;
    const up    = this.cursors?.up?.isDown    || this.wasd?.W?.isDown || mobileMovement.up;
    const down  = this.cursors?.down?.isDown  || this.wasd?.S?.isDown || mobileMovement.down;

    this.player.setAccelerationX(left ? -speed : right ? speed : 0);
    this.player.setAccelerationY(up   ? -speed : down  ? speed : 0);
  }
}
