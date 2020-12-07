class FlowEdge
{
    // edge from vertex v to w with some capacity
    constructor(v, w, capacity)
    {
        this.v = v;
        this.w = w;
        this.capacity = capacity;
    }

    from(){ return this.v; }

    to(){ return this.w; }

    capacity(){ return this.capacity; }

    flow(){ return this.flow; }

    other(vertex)
    {
        if(vertex === this.v) return this.w;
        else if(vertex === this.w) return this.v;
        else throw new Error('Not a valid vertex for this flow edge.');
    }

    residualCapacityTo(vertex)
    {
        if(vertex === this.v) return this.flow;
        else if(vertex === this.w) return this.capacity - this.flow; // forward edge
        else throw Error('Not a valid vertex for this flow edge.');
    }

    // delta is the residual capacity
    addResidualFlowTo(vertex, delta)
    {
        if(vertex === this.v) return flow -= delta; // backward edge
        else if(vertex === this.w) return flow += delta; // forward edge
        else throw Error('Not a valid vertex for this flow edge.');
    }
}