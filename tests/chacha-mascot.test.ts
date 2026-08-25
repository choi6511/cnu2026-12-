import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const projectFile = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

describe("CHA-CHA mascot system", () => {
  it("uses only the supplied official design-system artwork for visible mascot variants", () => {
    const mascotComponent = projectFile(
      "src",
      "components",
      "brand",
      "chacha-mascot.tsx",
    );

    expect(mascotComponent).toContain(
      '"../../../CHA-CHA)Design System/assets/mascot-front.png"',
    );
    expect(mascotComponent).toContain(
      '"../../../CHA-CHA)Design System/assets/face-cheer.png"',
    );
    expect(mascotComponent).toContain(
      '"../../../CHA-CHA)Design System/assets/pose-cheering.png"',
    );
    expect(mascotComponent).toContain(
      '"../../../CHA-CHA)Design System/assets/pose-running.png"',
    );
    expect(mascotComponent).toContain(
      '"../../../CHA-CHA)Design System/assets/pose-studying.png"',
    );
    expect(mascotComponent).toContain(
      '"../../../CHA-CHA)Design System/assets/pose-together.png"',
    );
    expect(mascotComponent).not.toContain("/characters/");
  });

  it("gives each of the three MVP locations an intentional official pose", () => {
    const mascotComponent = projectFile(
      "src",
      "components",
      "brand",
      "chacha-mascot.tsx",
    );

    expect(mascotComponent).toContain('"industry-center": "cheering"');
    expect(mascotComponent).toContain('"language-center": "running"');
    expect(mascotComponent).toContain('library: "studying"');
  });
});
