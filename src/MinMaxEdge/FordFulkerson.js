class FordFulkerson
{
    // Params: FlowNetwork, edges s & t
    constructor(G, s, t)
    {
        this.value = 0.0; // value of flow
        while(this.hasAugmentingPath(G, s, t))
        {
            let bottle = Number.POSITIVE_INFINITY;

            // compute bottleneck capacity
            for(let v = t; v != s; v = this.edgeTo[v].other(v))
                bottle = Math.min(bottle, this.edgeTo[v].residualCapacityTo(v));

            // augment flow
            for(let v = t; v != s; v = this.edgeTo[v].other(v))
                this.edgeTo[v].addResidualFlowTo(v, bottle);
            
            this.value += bottle;
        }
    }
    
    // uses BFSs
    hasAugmentingPath(G, s, t)
    {
        this.edgeTo = new Array(G.V()); // last edge on s->v path
        this.marked = new Array(G.V()); // true if s->v path in residual network
        Object.seal(this.edgeTo);
        Object.seal(this.marked);

        let q = [] // temporary queue
        q.push(s);
        marked[s] = true;
        while(q.length >= 0)
        {
            let v = q.shift();
            for (const flowEdge of G.adj(v)) 
            {
                const w = flowEdge.other(v);

                // is there a path from s to w in the residual network?
                if(flowEdge.residualCapacityTo(w) > 0 && !marked[w])
                {
                    this.edgeTo[w] = flowEdge; // save last edge on path to w
                    this.marked[w] = true; // mark w
                    q.push(w); // add w to the queue
                }
            }
        }
        return this.marked[t]; // is t reachable from s in the residual network?
    }

    value(){ this.value; }
    inCut(v){ return this.marked[v]; } // is v reachable from s in residual network
}