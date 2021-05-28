export class Food {
  constructor(foodObject) {
    Object.entries(foodObject).map(([key, value]) => {
      this[key] = value;
    });
  }

  get foodItem() {
    return {
      id: this.nix_item_id,
      foodName: this.food_name,
      servingUnit: this.serving_unit,
      calories: this.nf_calories,
      image: this.photo.thumb,
    };
  }

  static fromCollection(foodObjects) {
    return foodObjects.map((food) => new Food(food).foodItem);
  }
}
