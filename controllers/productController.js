import products from "../products.json" assert { type: "json" };
import { getGoldPrice } from "../utils/goldPrice.js";

export const getProducts = async (req, res) => {
    try {
        const goldPrice = await getGoldPrice();

        const enrichedProducts = products.map((product) => {
            const price = ((product.popularityScore + 1) * product.weight * goldPrice).toFixed(2);
            return {
                ...product,
                price: parseFloat(price),
            };
        });

        const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;

        const filtered = enrichedProducts.filter((product) => {
            const priceMatch =
                (!minPrice || product.price >= parseFloat(minPrice)) &&
                (!maxPrice || product.price <= parseFloat(maxPrice));

            const popularityMatch =
                (!minPopularity || product.popularityScore >= parseFloat(minPopularity)) &&
                (!maxPopularity || product.popularityScore <= parseFloat(maxPopularity));

            return priceMatch && popularityMatch;
        });

        res.json(filtered);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
