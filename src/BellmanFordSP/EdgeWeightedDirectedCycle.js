// import { EdgeWeightedDigraph } from "./EdgeWeightedDigraph";
export class EdgeWeightedDirectedCycle
{
    // Edge-weighted digraph
    constructor(G)
    {
        this.G = G;
        this.marked = new Array(G.V());
        Object.seal(this.marked);
        this.onStack = new Array(G.V());
        Object.seal(this.onStack);
        this.edgeTo = new Array(G.V());
        Object.seal(this.edgeTo);
        this.cycle = [];

        for (let v = 0; v < G.V(); v++)
            if (!this.marked[v]) this.dfs(G, v);
    }

    dfs(G, v)
    {
        this.onStack[v] = true;
        this.marked[v] = true;
        for(const edge of G.adj(v))
        {
            const w = edge.to();
            if(this.cycle.length > 0) return;
            else if(!this.marked[w])
            {
                this.edgeTo[w] = edge;
                this.dfs(G, w);
            }
            else if(this.onStack[w])
            {
                let f = edge;
                while(f.from() !== w)
                {
                    this.cycle.push(f);
                    f = this.edgeTo[f.from()];
                }
                this.cycle.push(f);
                return;
            }
        }
        this.onStack[v] = false;
    }

    hasCycle(){ return this.cycle.length > 0; }
    cycle(){ return this.cycle; }

}