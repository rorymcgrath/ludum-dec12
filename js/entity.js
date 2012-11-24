function Entity()
{
    this.id = Entity.count++;
    this.componentList = {}
}

Entity.count = 0;
