<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'ProductName'=>$this->faker->text(10),
            'price'=>$this->faker->numberBetween(100,2000)
        ];
    }
}
