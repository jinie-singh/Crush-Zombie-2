class Link
{
    constructor(bodyA, bodyB)
    {
        var lastLink = bodyA.body.bodies.length-2;
        this.link = Constraint.create
        (
            {
                bodyA: bodyA.body.bodies[lastLink],
                bodyB: bodyB.body,
                length: 10,
                stiffness: 0.8,
            }
        );
        World.add(myWorld, this.link)
    }
    dettach() {
        World.remove(myWorld, this.link);
    }
}