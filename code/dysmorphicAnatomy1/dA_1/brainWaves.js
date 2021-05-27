class brainWave {

    // this class will make up the brain waves or little dots that flow from the brain too the other organs using the flow class to guide them
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(2, 0);
        this.acceleration = createVector(0, 0);

        this.Force = 0.1;
        //control speed
        this.topSpeed = 4;


    }
    getNormality(p, a, b) {
        let norm1 = p5.Vector.sub(p, a);
        let norm2 = p5.Vector.sub(b, a);
        norm2.normalize();

        let d = norm1.dot(norm2);

        norm2.mult(d);

        let normality = p5.Vector.add(a, norm2);
        return normality;
    }


    flowing(o) {
        //oracle sees where the particles are going next and flows from one point to next without stopping between
        let oracle = this.velocity.copy();
        //normalise the numbers to use the force numbers above to create the movement
        //oracle = velocity/ accelerationX*force
        oracle.normalize();
        oracle.mult(25);
        //note the position of the oracle
        let oracleLog = p5.Vector.add(this.position, oracle);
        // goal number set up
        let goal = 0;
        //ridiculous number
        let ridic = 10000000000;

        //for loop of locating the next point of the path
        for (let i = 0; i < o.points.length - 1; i++) {
            let a = o.points[i].copy();
            let b = o.points[i + 1].copy();
            let normality = this.getNormality(oracleLog, a, b);

            if (normality.y < a.y || normality.y > b.y) {
                normality = b.copy();
            }
            //find the distace between where path wants to go and where the path currently is
            let distance = p5.Vector.dist(oracleLog, normality);

            if (distance < ridic) {
                ridic = distance;
                goal = normality.copy();
            }
        }
        this.seek(goal);
    }


    seek(goal) {
        //seeking missile! tracking the goal and following it with steering adding a smoothness to the process
        let desire = p5.Vector.sub(goal, this.position);
        desire.normalize();
        desire.mult(this.topSpeed);
        let steering = p5.Vector.sub(desire, this.velocity);
        steering.limit(this.Force);
        this.applyForce(steering);
    }


    applyForce(movement) {
        //speed
        this.acceleration.add(movement);
    }
    update() {
        //add all forces to create movement

        //        this.position.add(this.velocity);
        //        this.velocity.add(this.acceleration);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }


    show() {
        //draw the brainwaves as little black dots 
        this.theta = this.velocity.heading() + PI / 2;
        strokeWeight(5);
        stroke(0);
        point(this.position.x, this.position.y - 2);


    }
}
