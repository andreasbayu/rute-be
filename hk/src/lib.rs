use itertools::Itertools;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::{
    collections::HashMap,
};

use wasm_bindgen::prelude::*;


/*
 * Algotima Held-Karp
 * https://https://github.com/andreasbayu/hk
 *
 *
 * Implementasi algoritma Held-Karp, algoritma yang digunakan untuk
 * menyelesaikan Traveling Salesman Problem.
 *
 * Code ini adalah hasil recode dari https://github.com/CarlEkerot/held-karp.
 */

#[derive(Serialize, Deserialize)]
struct Distace {
    distance: Vec<Vec<i32>>,
}
// return berupa string

#[wasm_bindgen]
pub fn held_karp(mat_dist: String) -> String {
    let c_str = {
        assert!(!mat_dist.is_empty());

        mat_dist
    };

    let parse: Distace = serde_json::from_str(&c_str).unwrap();

    let distance: Vec<Vec<i32>> = parse.distance;

    let n = distance.len() as i32;

    let mut c = HashMap::new();

    for k in 1..n {
        c.insert((1 << k, k), (distance[0][k as usize], 0));
    }

    for subset_size in 2..n {
        for subset in (1..n).combinations(subset_size as usize) {
            let mut bits = 0;

            for bit in &subset {
                bits |= 1 << bit;
            }

            for k in &subset {
                let prev = bits & !(1 << k);

                let mut result: Vec<(i32, i32)> = Vec::new();

                for m in &subset {
                    if (m == &0) || (m == k) {
                        continue;
                    }
                    result.push((
                        c[&(prev, *m as i32)].0 + distance[*m as usize][*k as usize],
                        *m,
                    ));
                }

                c.insert((bits, *k), result.iter().min().unwrap().to_owned());
            }
        }
    }

    let mut bits = (i32::pow(2, n.try_into().unwrap()) - 1) - 1;

    let mut optimal_cost: Vec<(i32, i32)> = Vec::new();

    for k in 1..n {
        optimal_cost.push(((c[&(bits, k)].0) + distance[k as usize][0], k))
    }

    let minimal = optimal_cost.iter().min().unwrap().to_owned();

    let (opt, mut parent) = minimal;

    let mut path = Vec::new();

    for _i in 0..(n - 1) {
        path.push(parent);
        let new_bits = bits & !(1 << parent);
        parent = c[&(bits, parent)].1;
        bits = new_bits;
    }
    path.push(0);
    path.reverse();

    let result = json!({
        "cost": opt,
        "path": path
    });

    let to_string = result.to_string();

    to_string
    
}  


