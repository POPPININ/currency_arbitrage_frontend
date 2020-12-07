import { EdgeWeightedDirectedCycle } from "./EdgeWeightedDirectedCycle";
import { EdgeWeightedDigraph } from "./EdgeWeightedDigraph";
export class BellmanFordSP
{
    // Edge-weighted Digraph and target vertex s
    constructor(G, s)
    {
        this.distTo = new Array(G.V()); // length of path to v
        Object.seal(this.distTo);
        this.edgeTo = new Array(G.V()); // last edge on path to v
        Object.seal(this.edgeTo);
        this.onQ = new Array(G.V()); // Is this vertex on the queue?
        Object.seal(this.onQ);
        this.queue = []; // vertices being relaxed
        this.cycle = []; // negative cycle (or null if no such cycle)

        for(let v = 0; v < G.V(); v++)
            this.distTo[v] = Number.POSITIVE_INFINITY;
        this.distTo[s] = 0.0;

        // Bellman-Ford algorithm
        this.queue.push(s);
        this.onQ[s] = true;
        while(this.queue.length > 0 && !this.hasNegativeCycle())
        {
            const v = this.queue.shift();
            this.onQ[v] = false;
            this.relax(G, v);
        }
       
    }

    // Does the input Digraph have a negative cycle?
    hasNegativeCycle(){ return this.cycle.length > 0; }

    // return negative cycle, if any
    negativeCycle(){ return this.cycle }

    // relax vertex v and put other endpoints on queue if changed
    relax(G, v)
    {
        for (const edge of G.adj(v)) 
        {
            const w = edge.to();
            if(this.distTo[w] > this.distTo[v] + edge.weight())
            {
                this.distTo[w] = this.distTo[v] + edge.weight();
                this.edgeTo[w] = edge;
                if(!this.onQ[w])
                {
                    this.queue.push(w);
                    this.onQ[w] = true;
                }
            }
            if(++this.cost % G.V() == 0)
            {
                this.findNegativeCycle();
                if(this.hasNegativeCycle()) return; // found a negative cycle
            }
        }
    }

    // find negative cycle in Digraph, if any.
    findNegativeCycle()
    {
        const V = this.edgeTo.length;
        let spt = new EdgeWeightedDigraph(V);
        for(let v = 0; v < V; v++)
            if(this.edgeTo[v] != null)
                spt.addEdge(this.edgeTo[v]);
        
        let finder = new EdgeWeightedDirectedCycle(spt);
        this.cycle = finder.cycle();
    }

    // list of vertices in path from s to v
    pathTo(v)
    {
        if(this.hasNegativeCycle()) throw Error('Unsupported operation!');
        if(!this.hasPathTo(v)) return null;
        let path = [];
        for(let e = this.edgeTo[v]; e != null; e = this.edgeTo[e.from()])
            path.push(e);
        return path;
    }

    // is there a directed path from s to v?
    hasPathTo(v){ return this.distTo[v] < Number.POSITIVE_INFINITY; }

    // distance from s to v
    distTo(v)
    { 
        if(this.hasNegativeCycle()) throw Error('Unsupported operation!');
        else return this.distTo[v]; 
    }

}