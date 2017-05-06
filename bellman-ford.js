const calculatePath = (graph, source) => {
  // Calculating the vertices we need to traverse
  const vertices = graph.reduce((acc, node) => {
    if (!acc.find(i => i === node.from)) {
      acc.push(node.from);      
    }

    return acc;
  }, []);

  // Creating memo table to save our costs
  // The source node always starts with a cost of 0, others start as Infinity
  const memo = graph.reduce((obj, node) => {
    if (node.from === source.from) {
      obj[node.from] = 0;
    } else {
      obj[node.from] = Number.POSITIVE_INFINITY;
    }

    return obj;
  }, {});

  const calculate = () => {
    // Traverse each vertex
    vertices.forEach((vertex) => {
      // Collect outgoing edges for the vertex
      const outgoingEdges = graph.filter(node => node.from === vertex);

      outgoingEdges.forEach((edge) => {
        // If potential cost is lower, we replace it and traverse again to
        // make sure every path is calculated again.
        // This is because when a vertex is changed, the edges have to be calculated
        // again as well because it's possible that the path length has changed.
        const potentialCost = memo[edge.from] + edge.cost;

        if (potentialCost < memo[edge.to]) {
          memo[edge.to] = potentialCost;

          calculate();
        }
      });
    });
  };
  
  calculate();
  
  return memo;
};

const graph = [
  { from: 'S', to: 'A', cost: 4 },
  { from: 'S', to: 'E', cost: -5 },
  { from: 'A', to: 'C', cost: 6 },
  { from: 'B', to: 'A', cost: 3 },
  { from: 'C', to: 'B', cost: -2 },
  { from: 'D', to: 'C', cost: 3 },
  { from: 'D', to: 'A', cost: 10 },
  { from: 'E', to: 'D', cost: 8 },
];

const calculatedPath = calculatePath(graph, graph[0]);

console.log(calculatedPath);

// Outputs:
// {
//   A: 4,
//   B: 4,
//   C: 6,
//   D: 3,
//   E: -5,
//   S: 0
// }
