import { describe, it, expect } from "vitest";
import { getTwCss } from '@test/helpers/getTwCss';

describe("postcss plugin", () => {

  it("base utitlities output", async () => {
    const res = await getTwCss('<view class="h-[10px] w-[20px] bg-[rgba(255,254,253,.5)]"></view>');
    expect(res.css).toMatchSnapshot();
  });
});
