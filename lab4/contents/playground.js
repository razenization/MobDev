// Variant 1
console.log(`Variant ${(8119 % 2) + 1}`);

const Direction = Object.freeze({
  North: 'N',
  West: 'W',
  South: 'S',
  East: 'E',
});

class CoordinateOM {
  constructor(deg = 0, min = 0, sec = 0, direction = Direction.North) {
    this.direction = direction;

    if (!this.getDirection()) {
      throw new Error('Invalid value for direction.');
    }

    if (this.getDirection() === 'latitude' && !(deg >= -90 && deg <= 90)) {
      throw new Error('Invalid value for degrees.');
    } else if (
      this.getDirection() === 'longitude' &&
      !(deg >= -180 && deg <= 180)
    ) {
      throw new Error('Invalid value for degrees.');
    }
    this.deg = deg;

    if (min < 0 || min > 59) {
      throw new Error('Invalid value for minutes.');
    }
    this.min = min;

    if (sec < 0 || sec > 59) {
      throw new Error('Invalid value for seconds.');
    }
    this.sec = sec;
  }

  getDirection() {
    if (
      this.direction === Direction.West ||
      this.direction === Direction.East
    ) {
      return 'latitude';
    } else if (
      this.direction === Direction.North ||
      this.direction === Direction.South
    ) {
      return 'longitude';
    }

    return undefined;
  }

  getFullCoordinates() {
    return `"${this.deg}°${this.min}'${this.sec}" ${this.direction}"`;
  }

  getDecimalCoordinates() {
    return (this.deg + this.min) / 60 + this.sec / 3600;
  }

  getDecimalCoordinatesStringified() {
    return `"${(this.deg + this.min) / 60 + this.sec / 3600}" ${
      this.direction
    }`;
  }

  static fromDecimal(decimal) {
    let sign;

    if (decimal < 0) {
      sign = -1;
    } else {
      sign = 1;
    }

    const abs = Math.abs(Math.round(decimal * 1000000));

    const degrees = Math.floor(abs / 1000000) * sign;
    const minutes = Math.floor(
      (abs / 1000000 - Math.floor(abs / 1000000)) * 60,
    );
    const seconds =
      (Math.floor(
        ((abs / 1000000 - Math.floor(abs / 1000000)) * 60 -
          Math.floor((abs / 1000000 - Math.floor(abs / 1000000)) * 60)) *
          100000,
      ) *
        60) /
      100000;

    return new CoordinateOM(degrees, minutes, seconds);
  }

  toRadians(num) {
    return (num * Math.PI) / 180;
  }

  toDegrees(num) {
    return (num * 180) / Math.PI;
  }

  getMidPoint(point) {
    if (point.direction !== this.direction) {
      return null;
    }

    let lon1, lat1, lon2, lat2;

    if (this.getDirection() === 'longitude') {
      lon1 = this.getDecimalCoordinates();
      lat1 = 0;
      lon2 = point.getDecimalCoordinates();
      lat2 = 0;
    } else {
      lon1 = 0;
      lat1 = this.getDecimalCoordinates();
      lon2 = 0;
      lat2 = point.getDecimalCoordinates();
    }

    var φ1 = this.toRadians(lat1),
      λ1 = this.toRadians(lon1);
    var φ2 = this.toRadians(lat2);
    var Δλ = this.toRadians(lon2 - lon1);

    var Bx = Math.cos(φ2) * Math.cos(Δλ);
    var By = Math.cos(φ2) * Math.sin(Δλ);

    var x = Math.sqrt((Math.cos(φ1) + Bx) * (Math.cos(φ1) + Bx) + By * By);
    var y = Math.sin(φ1) + Math.sin(φ2);
    var φ3 = Math.atan2(y, x);

    var λ3 = λ1 + Math.atan2(By, Math.cos(φ1) + Bx);

    return CoordinateOM.fromDecimal(
      this.getDirection() === 'longitude'
        ? this.toDegrees(φ3)
        : ((this.toDegrees(λ3) + 540) % 360) - 180,
    );
  }
}

console.log('Демонстрація методів ініціалізації');

const point1 = new CoordinateOM();
const point2 = new CoordinateOM(23, 0, 59);
const point3 = new CoordinateOM(33, 59, 5);

console.log(point1.getFullCoordinates());
console.log(point2.getDecimalCoordinatesStringified());
console.log(point3.getMidPoint(point2));
