class bloodFlow {
    
    //creating an array of points that loops around to make a track for the points to move along, the actual movement of the points will be provided by the class brainWaves
    constructor() {
        this.radius = 20;
        this.points = [];
    }

    addPoint(x, y) {
        //push the points onto the track
        let point = createVector(x, y);
        this.points.push(point);
    }
    //draw the track but make it invisable 
    display() {
        stroke(0);
        noFill();
        beginShape();
        for (let i = 0; i < this.points.length; i++) {
            vertex(this.points[i], this.points[i].y);
        }
        endShape();
    }



}
