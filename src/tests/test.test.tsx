/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";

const Input = () => {
  const [ range, setRange ] = useState([ 0, 1000 ]);
  const handleChangeMin     = event => setRange([ event.target.value, range[ 1 ] ]);
  const handleChangeMax     = event => setRange([ range[ 0 ], event.target.value ]);

  return (
    <div>
      <input
        type="number"
        data-testid="min"
        onInput={handleChangeMin}
        value={range[ 0 ]}
      />
      <input
        type="number"
        data-testid="max"
        onInput={handleChangeMax}
        value={range[ 1 ]}
      />
    </div>
  );
};

describe("inputs", () => {
  test("should change values when typing", async () => {
    render(<Input />);
    const user = userEvent.setup();

    const min: HTMLInputElement = screen.getByTestId("min");
    const max: HTMLInputElement = screen.getByTestId("max");
    expect(min).not.toBe(max);

    await user.type(min, "13");
    await waitFor(() => {
      expect(min.value).toBe("13");
    });

    await user.clear(max);
    await user.type(max, "64");
    await waitFor(() => {
      expect(max.value).toBe("64");
    });
  });
});
