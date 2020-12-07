class FlowNetwork
{
    // # vertices
    constructor(V)
    {
        this.edges = [];
        this.V = V;
        // adjacency list
        this.adj = [];
        for(let i = 0; i < this.V; i++)
            this.adj.push([]);
    }

    addEdge(flowEdge)
    {
        const v = flowEdge.from();
        const w = flowEdge.to();
        this.adj[v].push(flowEdge);
        this.adj[w].push(flowEdge);
        this.edges.push(flowEdge);
    }

    adjacencyList(v){ return this.adj[v]; }
    edges(){ return this.edges; }
    V(){ return this.V; }
    E(){ return this.edges.length; }
}