export class EdgeWeightedDigraph
{
    // Construct edge-weighted Digraph with V vertices and 0 edges
    constructor(V)
    {
        this.V = V;
        this.E = 0;
        this.inDegree = new Array(V);
        for(let i = 0; i < this.inDegree.length; i++)
            this.inDegree[i] = 0;
        Object.seal(this.inDegree);

        this.adj = new Array(V);
        Object.seal(this.inDegree);
        for(let i = 0; i < this.adj.length; i++)
            this.adj[i] = [];
    }

    V(){ return this.V; }
    E(){ return this.E; }
   
    // adds directed edge 'edge' to the Digraph
    addEdge(edge)
    {
        const v = edge.from();
        const w = edge.to();
        this.adj[v].push(edge);
        // this.inDegree[w]++;
        let inDegreeCopy = [...this.inDegree];
        inDegreeCopy[w]++;
        this.inDegree = inDegreeCopy;

        // this.E++
        let eCopy = this.E;
        eCopy++
        this.E = eCopy;
    }

    // return adjacency list of a vertex
    adj(v){ return this.adj[v]; }

    // return out-degree of a vertex
    outDegree(v){ return this.adj[v].length; }

    // return in-degree of a vertex
    inDegree(v){ return this.inDegree[v]; }

    // return list of all edges in Digraph
    edges()
    {
        let list = [];
        for(let v = 0; v < this.V; v++)
            for(let i = 0; i < this.adj[v].length; i++)
                list.push(this.adj[v][i]);
        return list; 
    }
}