import { expect } from "earljs";
import { add } from "./math";

describe(add.name, () => {
  it("adds two numbers", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
