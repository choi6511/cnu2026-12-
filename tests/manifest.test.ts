import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";

describe("PWA manifest", () => {
  it("설치형 앱에 필요한 이름, standalone 표시, 192/512 아이콘을 제공한다", () => {
    const result = manifest();

    expect(result.name).toBe("차차 캠퍼스");
    expect(result.short_name).toBe("차차 캠퍼스");
    expect(result.display).toBe("standalone");
    expect(result.start_url).toBe("/");
    expect(result.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sizes: "192x192" }),
        expect.objectContaining({ sizes: "512x512" }),
      ]),
    );
  });
});
