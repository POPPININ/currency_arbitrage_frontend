// Represents a weighted directed-edge
export class DirectedEdge
{
    constructor(v, w, weight)
    {
        // add weighted directed edge from v to w
        this.v = v;
        this.w = w;
        this.edgeWeight = weight;
    }

    from(){ return this.v; }
    to(){ return this.w; }
    weight(){ return this.edgeWeight; }
}