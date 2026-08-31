export type Waypoint = {
  x: number;
  y: number;
};

/**
 * A sleek, meandering path template for our nodes.
 * Instead of a rigid grid, these waypoints represent a smooth, sweeping curve
 * (e.g., an S-curve or gentle zig-zag) through our minimal dark canvas.
 */
export const pathWaypoints: Waypoint[] = [
  { x: 400, y: 800 },
  { x: 400, y: 650 },
  { x: 600, y: 550 },
  { x: 700, y: 400 },
  { x: 600, y: 250 },
  { x: 400, y: 150 },
  { x: 200, y: 250 },
  { x: 100, y: 400 },
  { x: 200, y: 550 },
  { x: 400, y: 600 },
  // Add more as needed for overflow nodes
];

/**
 * Helper to get interpolated points between waypoints to draw a glowing path line
 * between the nodes in the game engine.
 */
export function getPathBounds() {
  return {
    minX: Math.min(...pathWaypoints.map(p => p.x)),
    maxX: Math.max(...pathWaypoints.map(p => p.x)),
    minY: Math.min(...pathWaypoints.map(p => p.y)),
    maxY: Math.max(...pathWaypoints.map(p => p.y)),
  };
}
