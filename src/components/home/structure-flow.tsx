"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CODE_LINES = [
  "const stack = [",
  '  "software",',
  '  "ai", "cloud"',
  "];",
  "stack.map(name =>",
  "  ({ name })",
  ");",
];

// Lifecycle adapted from ThreeUI (MIT); custom BracketDex kinetic geometry.
export function StructureFlow() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};
    import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
      catch { return; }
      element.appendChild(renderer.domElement);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 10);
      renderer.setClearColor(0x151619, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.5;
      const bracketMaterial = new THREE.MeshPhysicalMaterial({ color: 0xc7d0df, metalness: 0.65, roughness: 0.22, clearcoat: 1 });
      const sculpture = new THREE.Group();
      const geometries: InstanceType<typeof THREE.ExtrudeGeometry>[] = [];
      const addShape = (shape: InstanceType<typeof THREE.Shape>, x: number, mirror = false) => {
        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.045, bevelSize: 0.045, bevelSegments: 3, curveSegments: 24 });
        geometry.translate(0, 0, -0.15);
        geometries.push(geometry);
        const mesh = new THREE.Mesh(geometry, bracketMaterial);
        mesh.position.x = x;
        if (mirror) mesh.scale.x = -1;
        sculpture.add(mesh);
      };
      // Custom coding braces, without letters or remote assets.
      const brace = new THREE.Shape();
      brace.moveTo(0.64, 1.32); brace.lineTo(0.4, 1.32);
      brace.quadraticCurveTo(0.07, 1.32, 0.07, 0.85); brace.lineTo(0.07, 0.4);
      brace.quadraticCurveTo(0.07, 0.15, -0.16, 0.15); brace.lineTo(-0.16, -0.15);
      brace.quadraticCurveTo(0.07, -0.15, 0.07, -0.4); brace.lineTo(0.07, -0.85);
      brace.quadraticCurveTo(0.07, -1.32, 0.4, -1.32); brace.lineTo(0.64, -1.32); brace.lineTo(0.64, -1.03);
      brace.quadraticCurveTo(0.37, -1.03, 0.37, -0.8); brace.lineTo(0.37, -0.4);
      brace.quadraticCurveTo(0.37, -0.1, 0.2, 0); brace.quadraticCurveTo(0.37, 0.1, 0.37, 0.4);
      brace.lineTo(0.37, 0.8); brace.quadraticCurveTo(0.37, 1.03, 0.64, 1.03); brace.closePath();
      addShape(brace, -2.6); addShape(brace, 2.6, true);
      const codeCanvas = document.createElement("canvas");
      codeCanvas.width = 1024;
      codeCanvas.height = 720;
      const context = codeCanvas.getContext("2d");
      const texture = new THREE.CanvasTexture(codeCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const codeGeometry = new THREE.PlaneGeometry(3.85, 2.7);
      const codeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false });
      const codePlane = new THREE.Mesh(codeGeometry, codeMaterial);
      codePlane.position.z = 0.22;
      sculpture.add(codePlane);
      const totalCharacters = CODE_LINES.reduce((sum, line) => sum + line.length, 0);
      const typing = { characters: 0, cursor: 1 };
      let isLight = !document.documentElement.classList.contains("dark");
      const codeFontFamily = getComputedStyle(element).getPropertyValue("--font-geist-mono").trim() || "monospace";
      const paintCode = () => {
        if (!context) return;
        context.clearRect(0, 0, 1024, 720);
        context.font = `78px ${codeFontFamily}`;
        context.textBaseline = "middle";
        let remaining = Math.floor(typing.characters);
        let cursorPlaced = false;
        CODE_LINES.forEach((line, index) => {
          const y = 100 + index * 82;
          context.fillStyle = isLight ? "#525866" : "#797d88";
          context.font = `28px ${codeFontFamily}`;
          context.fillText(String(index + 1).padStart(2, "0"), 20, y);
          context.font = `78px ${codeFontFamily}`;
          const visibleText = line.slice(0, Math.max(0, remaining));
          const tokens = visibleText.match(/"[^"]*"?|\bconst\b|\bmap\b|=>|[^"\s]+|\s+/g) ?? [];
          let x = 90;
          for (const token of tokens) {
            context.fillStyle = token.startsWith('"') ? (isLight ? "#166859" : "#A8D9C5")
              : token === "const" || token === "=>" ? (isLight ? "#2448C8" : "#B8C7FF")
              : token.startsWith("stack.map") ? (isLight ? "#7541A0" : "#B8C7FF")
              : (isLight ? "#273244" : "#FAF9F6");
            context.fillText(token, x, y);
            x += context.measureText(token).width;
          }
          if (!cursorPlaced && remaining <= line.length) {
            context.fillStyle = isLight ? `rgba(36,72,200,${typing.cursor})` : `rgba(184,199,255,${typing.cursor})`;
            context.fillRect(x + 4, y - 32, 4, 64);
            cursorPlaced = true;
          }
          remaining -= line.length;
        });
        texture.needsUpdate = true;
      };
      const codeTimeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.8 });
      codeTimeline.to(typing, { characters: totalCharacters, duration: 7, ease: "none", onUpdate: paintCode })
        .to(typing, { cursor: 0, duration: 0.45, repeat: 5, yoyo: true, onUpdate: paintCode })
        .set(typing, { characters: 0, cursor: 1, onUpdate: paintCode });
      paintCode();
      sculpture.rotation.set(-0.09, -0.22, 0.015);
      scene.add(sculpture);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x222328, 3));
      const key = new THREE.DirectionalLight(0xffffff, 5);
      key.position.set(3, 4, 5);
      const rim = new THREE.DirectionalLight(0x315bff, 5);
      rim.position.set(-4, 1, -2);
      scene.add(key, rim);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      let frame = 0;
      let visible = true;
      const draw = () => renderer.render(scene, camera);
      const updateTheme = () => {
        isLight = !document.documentElement.classList.contains("dark");
        bracketMaterial.color.set(isLight ? 0x303849 : 0xc7d0df);
        bracketMaterial.metalness = isLight ? 0.35 : 0.65;
        bracketMaterial.roughness = isLight ? 0.32 : 0.22;
        renderer.toneMappingExposure = isLight ? 1 : 1.5;
        key.intensity = isLight ? 3 : 5;
        paintCode();
        draw();
      };
      const themeObserver = new MutationObserver(updateTheme);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      updateTheme();
      // Canvas text must explicitly load the face; CSS inheritance only covers DOM text.
      // Repaint even when reduced motion has stopped the animation loop.
      void document.fonts.load(`78px ${codeFontFamily}`, CODE_LINES.join(" ")).then(() => {
        if (disposed) return;
        paintCode();
        draw();
      }).catch(() => { /* Keep the already-painted monospace fallback if loading fails. */ });
      let previousTime = 0;
      let elapsed = 0;
      const tick = (time: number) => {
        const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
        previousTime = time;
        elapsed += delta;
        sculpture.rotation.y = -0.18 + Math.sin(elapsed * 0.45) * 0.22;
        sculpture.rotation.x = -0.08 + Math.cos(elapsed * 0.35) * 0.07;
        sculpture.position.y = Math.sin(elapsed * 0.65) * 0.09;
        draw();
        frame = requestAnimationFrame(tick);
      };
      const sync = () => {
        cancelAnimationFrame(frame);
        previousTime = 0;
        if (visible && !document.hidden && !reduced.matches) {
          codeTimeline.resume();
          frame = requestAnimationFrame(tick);
        } else {
          codeTimeline.pause();
          if (reduced.matches) { typing.characters = totalCharacters; typing.cursor = 0; paintCode(); }
          draw();
        }
      };
      const resize = new ResizeObserver(() => {
        const { width, height } = element.getBoundingClientRect();
        camera.aspect = width / Math.max(height, 1);
        camera.position.z = Math.max(7.6, 9.4 / camera.aspect);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        draw();
      });
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
      resize.observe(element);
      intersection.observe(element);
      document.addEventListener("visibilitychange", sync);
      reduced.addEventListener("change", sync);
      sync();
      cleanup = () => {
        cancelAnimationFrame(frame);
        codeTimeline.kill();
        themeObserver.disconnect();
        resize.disconnect(); intersection.disconnect();
        document.removeEventListener("visibilitychange", sync);
        reduced.removeEventListener("change", sync);
        geometries.forEach((geometry) => geometry.dispose());
        bracketMaterial.dispose(); renderer.dispose();
        codeGeometry.dispose(); codeMaterial.dispose(); texture.dispose();
        renderer.domElement.remove();
      };
    });
    return () => { disposed = true; cleanup(); };
  }, []);
  return <div className="bd-flow-visual">
    <div className="bd-flow-canvas" ref={host} aria-hidden="true" />
    <div className="bd-flow-brand" aria-hidden="true"><span>{"{ "}</span>BracketDex<span>{" }"}</span><small>Software · AI · Automation</small></div>
    <pre className="sr-only" aria-label="Illustrative JavaScript code">{CODE_LINES.join("\n")}</pre>
    <div className="bd-flow-label">Connected systems. Built around you.</div>
  </div>;
}
