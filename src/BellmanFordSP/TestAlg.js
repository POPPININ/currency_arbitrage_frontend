import { BellmanFordSP } from "./BellmanFordSP";
import { DirectedEdge } from "./DirectedEdge";
import { EdgeWeightedDigraph } from "./EdgeWeightedDigraph";
import { EdgeWeightedDirectedCycle } from "./EdgeWeightedDirectedCycle";

const G = new EdgeWeightedDigraph(4);
const e1 = new DirectedEdge(0, 1, 1.0);
const e2 = new DirectedEdge(1, 2, 1.5);
const e3 = new DirectedEdge(2, 3, 2.0);
const e4 = new DirectedEdge(3, 1, 2.5);

G.addEdge(e1);
G.addEdge(e2);
G.addEdge(e3);
G.addEdge(e4);

const cycleG = new EdgeWeightedDirectedCycle(G);
const verticesCycle = cycleG.cycle();
console.log(verticesCycle);