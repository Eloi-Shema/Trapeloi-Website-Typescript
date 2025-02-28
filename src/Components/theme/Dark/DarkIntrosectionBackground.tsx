import { useEffect, useRef } from "react";
import "./DarkIntrosectionBackground.css";

interface NormalOptions {
  mean: number;
  dev: number;
  pool?: number[];
}

function normalPool(options: NormalOptions): number {
  let r = 0;
  do {
    const a = Math.round(
      randomNormal({ mean: options.mean, dev: options.dev })
    );
    if (options.pool && a < options.pool.length && a >= 0)
      return options.pool[a];
    r++;
  } while (r < 100);
  return options.mean;
}

function randomNormal(options: NormalOptions): number {
  options = Object.assign({ mean: 0, dev: 1, pool: [] }, options);
  if (Array.isArray(options.pool) && options.pool.length > 0)
    return normalPool(options);
  let r, a, n;
  do {
    a = 2 * Math.random() - 1;
    n = 2 * Math.random() - 1;
    r = a * a + n * n;
  } while (r >= 1);
  const e = a * Math.sqrt((-2 * Math.log(r)) / r);
  return options.dev * e + options.mean;
}

const NUM_PARTICLES = 600;
const PARTICLE_SIZE = 0.5;
const SPEED = 100000;

interface Particle {
  x: number;
  y: number;
  diameter: number;
  duration: number;
  amplitude: number;
  offsetY: number;
  arc: number;
  startTime: number;
  colour: string;
}

function rand(low: number, high: number): number {
  return Math.random() * (high - low) + low;
}

function createParticle(): Particle {
  const colour = {
    r: 0,
    g: 255,
    b: 241,
    a: rand(0, 1),
  };
  return {
    x: -2,
    y: -2,
    diameter: Math.max(
      0,
      randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })
    ),
    duration: randomNormal({ mean: SPEED, dev: SPEED * 0.1 }),
    amplitude: randomNormal({ mean: 16, dev: 2 }),
    offsetY: randomNormal({ mean: 0, dev: 30 }),
    arc: Math.PI * 2,
    startTime: performance.now() - rand(0, SPEED),
    colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
  };
}

function moveParticle(particle: Particle, time: number): Particle {
  const progress =
    ((time - particle.startTime) % particle.duration) / particle.duration;
  return {
    ...particle,
    x: progress,
    y:
      Math.sin(progress * particle.arc) * particle.amplitude + particle.offsetY,
  };
}

function drawParticle(
  particle: Particle,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): void {
  const vh = canvas.height / 100;
  ctx.fillStyle = particle.colour;
  ctx.beginPath();
  ctx.ellipse(
    particle.x * canvas.width,
    particle.y * vh + canvas.height / 2,
    particle.diameter * vh,
    particle.diameter * vh,
    0,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function draw(
  time: number,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  particles: Particle[]
): void {
  particles.forEach((particle, index) => {
    particles[index] = moveParticle(particle, time);
  });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => drawParticle(particle, canvas, ctx));
  requestAnimationFrame((newTime) => draw(newTime, canvas, ctx, particles));
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = Array.from(
      { length: NUM_PARTICLES },
      createParticle
    );
    requestAnimationFrame((time) => draw(time, canvas, ctx, particles));
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas absolute top-0 left-0 w-full h-full"
    />
  );
};

export default ParticleCanvas;
