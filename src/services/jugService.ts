import { Step } from "../mapping/stepType";
import { JugsState } from "../mapping/jugsStateType";
import gcd from "../utils/math_utils";

function generatePath(endingState: JugsState): Step[] {
  let path: Step[] = [];
  let currentState: JugsState | undefined = endingState;
  let stepCounter = 0;

  while (currentState && currentState.previous) {
    path.push({
      step: ++stepCounter,
      bucketX: currentState.bucketX,
      bucketY: currentState.bucketY,
      action: currentState.action,
      status: currentState === endingState ? "Solved" : undefined,
    });
    currentState = currentState.previous;
  }

  path.reverse();
  path.forEach((step, index) => (step.step = index + 1));

  return path;
}

function jugService(
  x_capacity: number,
  y_capacity: number,
  z_amount_wanted: number
): Step[] | string {
  if (
    z_amount_wanted > Math.max(x_capacity, y_capacity) ||
    z_amount_wanted % gcd(x_capacity, y_capacity) !== 0
  ) {
    return "No solution possible";
  }

  const visited = new Set<string>();
  const queue: JugsState[] = [];

  pushStates(
    queue,
    { bucketX: 0, bucketY: 0, action: "" },
    x_capacity,
    y_capacity,
    visited
  );

  while (queue.length) {
    const current = queue.shift();

    if (
      (current?.bucketX === z_amount_wanted) ||
      (current?.bucketY === z_amount_wanted)
    ) {
      return generatePath(current);
    }

    pushStates(queue, current as JugsState, x_capacity, y_capacity, visited);
  }

  return "No solution possible";
}

function pushStates(
  queue: JugsState[],
  currentState: JugsState,
  x_capacity: number,
  y_capacity: number,
  visited: Set<string>
) {
  const nextStates = [
    {
      bucketX: x_capacity,
      bucketY: currentState.bucketY,
      action: "Fill bucket X",
      previous: currentState,
    },
    {
      bucketX: currentState.bucketX,
      bucketY: y_capacity,
      action: "Fill bucket Y",
      previous: currentState,
    },
    {
      bucketX: 0,
      bucketY: currentState.bucketY,
      action: "Empty bucket X",
      previous: currentState,
    },
    {
      bucketX: currentState.bucketX,
      bucketY: 0,
      action: "Empty bucket Y",
      previous: currentState,
    },
    {
      bucketX: Math.max(
        0,
        currentState.bucketX - (y_capacity - currentState.bucketY)
      ),
      bucketY: Math.min(
        y_capacity,
        currentState.bucketX + currentState.bucketY
      ),
      action: "Transfer from bucket X to Y",
      previous: currentState,
    },
    {
      bucketX: Math.min(
        x_capacity,
        currentState.bucketY + currentState.bucketX
      ),
      bucketY: Math.max(
        0,
        currentState.bucketY - (x_capacity - currentState.bucketX)
      ),
      action: "Transfer from bucket Y to X",
      previous: currentState,
    },
  ];

  for (const state of nextStates) {
    const stateKey = `${state.bucketX},${state.bucketY}`;
    if (!visited.has(stateKey)) {
      queue.push(state);
      visited.add(stateKey);
    }
  }
}

export default jugService;
