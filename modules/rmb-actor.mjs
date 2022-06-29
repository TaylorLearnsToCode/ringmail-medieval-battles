export class RmbActor extends Actor {
  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    this._calculatePointsTotal(this.data.data);
  }

  _calculatePointsTotal(actorData) {
    if (!!actorData.pointsEach && actorData.strength.value) {
      actorData.pointsTotal = actorData.pointsEach * actorData.strength.max;
    }
  }
}
